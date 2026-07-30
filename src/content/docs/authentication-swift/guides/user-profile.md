---
title: User profile
description: Read and edit the signed-in user's profile through Microsoft Graph.
sidebar:
  order: 12
---

## Reading the profile

Fetches Microsoft Graph `/me` using a silently-acquired token:

```swift
let profile = try await TophhieAuth.shared.getUserProfile()
print(profile.displayName ?? "", profile.userPrincipalName, profile.mail ?? "")
```

Only `id` and `userPrincipalName` are non-optional. Everything else depends on what the
account actually has set, so write UI that copes with a user who has filled in almost
nothing.

The framework requests a specific `$select` list rather than Graph's defaults, because
the address and language fields are not returned otherwise. See
[Types](/authentication-swift/reference/types/) for the full shape.

## Editing the profile

Editing goes through a delegated `PATCH /me`, so the user is editing their own account
rather than an admin editing someone else's.

Build a `TophhieProfileUpdate` with only the fields you want to change:

```swift
var update = TophhieProfileUpdate()
update.givenName = "Jane"
update.surname = "Smith"
update.city = "London"

let refreshed = try await TophhieAuth.shared.updateProfile(update)
```

The nil rules matter and are easy to get wrong:

| Value | Effect |
| --- | --- |
| `nil` | Field is left untouched |
| `""` | Field is cleared |
| Any other string | Field is set |

So an edit form that maps empty text fields to `""` will clear every field the user did
not fill in. Map untouched fields to `nil` instead. `hasChanges` tells you whether the
update would write anything at all, which is handy for enabling a Save button.

The call re-reads `/me` afterwards and returns the canonical profile, so use the return
value rather than assuming your local copy is now correct.

### Writable fields

Exactly the fields Entra External ID lets a consumer edit about themselves:
`displayName`, `givenName`, `surname`, `jobTitle`, `streetAddress`, `city`, `state`,
`postalCode`, `country`, `preferredLanguage`.

`preferredLanguage` is a BCP-47 tag such as `en-GB`. The SwiftUI edit form presents a
curated list from `TophhieLanguages.all` so users pick a language by name rather than
typing a tag.

## Scopes, and the one that needs admin consent

Profile editing requests two scopes, and the second one is the awkward part:

| Scope | Why |
| --- | --- |
| `User.ReadWrite` | Enough on its own for external-tenant consumer accounts |
| `Directory.AccessAsUser.All` | Also needed for member and admin accounts |

The reason for the second is not obvious. Graph applies the restrictive work/school
`User.ReadWrite` property set to member and admin accounts, and that set excludes
`displayName`, `givenName` and the address fields. Without
`Directory.AccessAsUser.All`, `PATCH /me` on those accounts returns
`403 Authorization_RequestDenied` even though the same call works fine for a consumer
account.

:::caution
`Directory.AccessAsUser.All` requires admin consent granted on the app registration.
Until that is done, profile editing will work when you test it with a consumer account
and fail for staff.
:::

### Prompting for consent

The silent overload throws `.interactionRequired` if the scopes have not been consented
yet. Either request them at sign-in, or pass a presenting controller and let the SDK
prompt at first use:

```swift
let refreshed = try await TophhieAuth.shared.updateProfile(
    presenting: viewController,
    update
)
```

Requesting at sign-in is usually the better experience: one consent prompt during
sign-in beats an unexpected one when the user taps Save.

## Errors

`.profileFetch(status:)` and `.profileUpdate(status:)` carry the HTTP status Graph
returned, which is what you need to tell a permissions problem from an outage. A `403`
on update almost always means the consent situation described above.
