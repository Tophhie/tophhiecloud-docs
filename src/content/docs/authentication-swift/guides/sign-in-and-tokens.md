---
title: Sign-in and tokens
description: Interactive sign-in, silent token refresh, sign-out, and using the ID token with a backend.
sidebar:
  order: 11
---

Interactive sign-in presents Microsoft's web UI, which is the normal path and the only
one that supports federated providers.

## Interactive sign-in

```swift
@MainActor
func signIn(from viewController: UIViewController) async {
    do {
        let result = try await TophhieAuth.shared.signIn(presenting: viewController)
        // result.idToken      → send to your backend
        // result.accessToken  → call Microsoft Graph or your own APIs
        // result.username     → display
    } catch let error as AuthError {
        if case .userCancelled = error { return }   // user dismissed, not an error
        showError(error.localizedDescription)
    } catch {
        showError(error.localizedDescription)
    }
}
```

Handling `.userCancelled` separately matters. A user dismissing the sheet is a normal
outcome, and showing them an error for it is a bug users will report.

The call is `@MainActor` and needs a presenting view controller, because MSAL presents
the web UI itself.

### Customising the prompt

```swift
let result = try await TophhieAuth.shared.signIn(
    presenting: viewController,
    scopes: ["User.Read"],
    prompt: .selectAccount,          // .selectAccount, .login, .consent, .default
    loginHint: "user@example.com",
    extraQueryParameters: ["domain_hint": "google"]
)
```

`loginHint` prefills the username field, which is worth passing if you already know who
the user is. `prompt: .selectAccount` forces the account picker even when a session
exists, which is what you want on a "switch account" action.

Ask for any extra scopes you know you will need here, rather than at first use. Both
[profile editing](/authentication-swift/guides/user-profile/) and
[sign-in history](/authentication-swift/guides/sign-in-history/) need scopes beyond the
default, and requesting them up front avoids a second consent prompt later.

## Silent tokens

After the first interactive sign-in, or after a relaunch with a restored account,
acquire tokens without any UI:

```swift
let result = try await TophhieAuth.shared.acquireTokenSilent()
```

This throws `.interactionRequired` if MSAL needs the user back, or `.noAccount` if
there is nobody signed in. You can handle those yourself, or let the SDK do it:

```swift
// Tries silent first, falls back to interactive automatically.
let result = try await TophhieAuth.shared.acquireToken(presenting: viewController)
```

`acquireToken(presenting:)` is the right default for most call sites. Use
`acquireTokenSilent()` when you specifically want no UI, such as a background refresh
where a sign-in sheet would be wrong.

Cached-account restore is what makes this work after a cold launch. It is on by
default; see [Configuration](/authentication-swift/getting-started/configuration/).

## Using the ID token with a backend

The common pattern is to exchange the Entra ID token for your own session token.
`signIn` surfaces it directly:

```swift
let result = try await TophhieAuth.shared.signIn(presenting: viewController)
guard let idToken = result.idToken else { return }

var request = URLRequest(url: backendSignInURL)
request.httpMethod = "POST"
request.httpBody = try JSONEncoder().encode(["id_token": idToken])
// exchange for your app's own auth token
```

:::caution
Your backend must verify the token before trusting anything in it: signature against
the tenant's JWKS, `aud` against your client ID, and `iss` against the tenant. A token
posted to your endpoint is attacker-controlled input until it has been verified.
:::

Note that `idToken` is optional. Treat a missing one as a failure rather than
force-unwrapping it.

## Sign-out

```swift
@MainActor
func signOut(from viewController: UIViewController) async throws {
    try await TophhieAuth.shared.signOut(presenting: viewController)
}
```

This signs the user out and clears local state. It presents UI, so it is `@MainActor`
and needs a view controller.

## What you get back

```swift
public struct TophhieAuthResult: Sendable {
    public let accessToken: String
    public let idToken: String?
    public let expiresOn: Date?
    public let scopes: [String]
    public let accountIdentifier: String?
    public let username: String?
}
```

`scopes` is worth checking when you requested more than the default: it tells you what
was actually granted, which may be less than you asked for.
