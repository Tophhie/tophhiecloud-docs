---
title: SwiftUI views
description: The drop-in Tophhie Cloud Account screen and the composable views behind it.
sidebar:
  order: 17
---

The package ships a ready-made account experience, so an app can render a full account
screen with one view.

```swift
import SwiftUI
import TophhieCloudAuthentication

struct SettingsScreen: View {
    var body: some View {
        NavigationStack {
            TophhieAccountView(onSignOut: {
                // Route back to your login screen.
            })
        }
    }
}
```

That is the whole integration. It has to sit inside a `NavigationStack`, because it
pushes to the sign-in history list.

## What the account screen does

- Loads the profile through `getUserProfile()`, with pull to refresh.
- Renders a profile header and an account details section.
- Offers **Edit** in the toolbar, presenting `ProfileEditView`. Preferred language is a
  picker over a curated locale list, so users choose a language by name rather than
  typing a BCP-47 tag.
- Offers **Change password**, presenting
  [`PasswordResetView`](/authentication-swift/guides/password-reset/).
- Offers **Multi-factor authentication**, presenting `MFASetupView`, which
  re-authenticates and then registers an email or SMS method.
- Shows a sign-in activity section with the last sign-in, pushing to
  `SignInHistoryView` for the full list.
- Offers **Sign out** with a confirmation, resolving a presenting controller for you.

The sign-in summary loads silently, and consent for `AuditLog.Read.All` is only
requested when the user opens the full history list. That is deliberate: it keeps an
unexpected consent prompt off the main account screen.

## Prerequisites

The user must already be signed in through `TophhieAuth`, since the screen reads their
profile.

Change password and MFA setup also need `TophhieNativeAuth.configure(...)`. For MFA
specifically that means `capabilities: [.registrationRequired]` and a tenant that asks
for registration. Without those, the options are present but the flows cannot complete.

## Composable views

The screen is assembled from public views you can use on their own:

| View | Purpose |
| --- | --- |
| `TophhieAccountView` | The full account screen. Place inside a `NavigationStack` |
| `TophhieAccountModel` | `@Observable @MainActor` view model. Inject it to share state |
| `ProfileEditView` | Edit form for the self-editable fields, saving via delegated `PATCH /me` |
| `SignInHistoryView` | Full recent sign-ins list |
| `PasswordResetView` | Self-contained password reset flow |
| `MFASetupView` | Re-authenticate, then register a strong auth method |
| `StrongAuthRegistrationView` | Reusable email and SMS registration flow |

Pass the shared `TophhieAccountModel` into `ProfileEditView` and `SignInHistoryView`
rather than letting them create their own. It is what stops the history being fetched
twice and keeps an edit reflected everywhere immediately.

`TophhieAccountModel` exposes `profile`, `state`, `signInHistory`, `lastSignIn`,
`refresh()`, `signOut()` and `updateProfile(_:)`, which is enough to build your own
screen against the same state if the packaged one does not fit.

## Using a single view on its own

The registration flow is the most useful one to lift out, since native sign-in can
demand it before a user is signed in at all:

```swift
if case .strongAuthRegistrationRequired(let registration) = signInStep {
    StrongAuthRegistrationView(registration: registration) { result in
        finishSignIn(idToken: result.idToken)
    }
}
```

## Skipping it entirely

The SwiftUI layer is guarded by `#if canImport(SwiftUI)` and adds no dependencies beyond
SwiftUI and UIKit. It is a thin layer over the same async APIs documented in the
[guides](/authentication-swift/guides/), so building your own UI costs you nothing and
loses you nothing.
