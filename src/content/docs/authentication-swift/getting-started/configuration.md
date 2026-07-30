---
title: Configuration
description: Configure TophhieAuth and TophhieNativeAuth at app launch.
sidebar:
  order: 4
---

Configure the SDK once, early in the app lifecycle, typically in
`application(_:didFinishLaunchingWithOptions:)`.

```swift
import TophhieCloudAuthentication

do {
    try TophhieAuth.shared.configure(
        clientId: "00000000-0000-0000-0000-000000000000",
        redirectUri: "msauth.com.yourcompany.YourApp://auth"
    )
} catch {
    print("Failed to configure TophhieAuth: \(error.localizedDescription)")
}
```

`configure` throws rather than failing silently, so a bad client ID or redirect URI
surfaces at launch instead of at the first sign-in attempt.

## The full signature

```swift
public func configure(
    clientId: String,
    redirectUri: String,
    tenantSubdomain: String = TophhieAuth.defaultTenantSubdomain,  // "tophhiecustomers"
    restoreCachedAccount: Bool = true
) throws
```

`tenantSubdomain` defaults to `tophhiecustomers`, which is the Tophhie Cloud external
tenant, giving the authority `https://tophhiecustomers.ciamlogin.com`. Override it only
if you are pointing an app at a different tenant.

`restoreCachedAccount` defaults to true, which loads any cached account during
configuration. That is what makes `acquireTokenSilent()` work immediately after a
relaunch rather than requiring a fresh interactive sign-in first. Turn it off only if
you want to control when the account is restored.

## Native authentication

Native authentication is a separate stack with its own configuration and its own client
ID parameter. Configure it as well if you need password reset, in-app sign-up or in-app
MFA:

```swift
try TophhieNativeAuth.shared.configure(
    clientId: "00000000-0000-0000-0000-000000000000"
)
```

Capabilities are opt-in and tell the service what your app is able to handle:

```swift
try TophhieNativeAuth.shared.configure(
    clientId: "00000000-0000-0000-0000-000000000000",
    capabilities: [.mfaRequired, .registrationRequired]
)
```

| Capability | Meaning |
| --- | --- |
| `.mfaRequired` | The app can complete an MFA challenge, so the tenant may require MFA |
| `.registrationRequired` | The app can register a new strong authentication method just in time |

Declaring a capability commits you to handling the corresponding step. Setting
`.mfaRequired` without handling the `.mfaRequired` case from `signIn` leaves users
stuck at a step your UI never renders.

## Checking configuration

Both stacks expose `isConfigured`, which is useful if configuration happens somewhere
you cannot easily assert on:

```swift
guard TophhieAuth.shared.isConfigured else { return }
```

Calls made before configuration throw `.notConfigured` rather than crashing.
