---
title: Tenant and app setup
description: Register an app in the Tophhie Cloud external tenant and wire up the redirect.
sidebar:
  order: 3
---

The framework talks to the Tophhie Cloud Entra External ID tenant,
`tophhiecustomers`. Before any of it works, your app needs a registration in that
tenant and a redirect wired into the app.

## App registration

Register a public client app in the external tenant through the
[Microsoft Entra admin center](https://entra.microsoft.com) and note the
**Application (client) ID**. Add an **iOS/macOS** platform redirect using your bundle
identifier. MSAL's default redirect URI takes the form:

```
msauth.<your.bundle.id>://auth
```

If you do not have access to the tenant, ask
[help@tophhie.cloud](mailto:help@tophhie.cloud) to create the registration and send you
the client ID.

## URL scheme

MSAL completes interactive sign-in by redirecting back into your app, so the scheme has
to be registered in `Info.plist` along with the schemes MSAL queries for:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>msauth.$(PRODUCT_BUNDLE_IDENTIFIER)</string>
        </array>
    </dict>
</array>
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>msauthv2</string>
    <string>msauthv3</string>
</array>
```

## Forward the redirect

The redirect arrives as a URL your app has to hand back to MSAL. In a scene-based app:

```swift
func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    guard let context = URLContexts.first else { return }
    TophhieAuth.handleRedirect(
        context.url,
        sourceApplication: context.options.sourceApplication
    )
}
```

In an app-based one, implement `application(_:open:options:)` and call the same thing.

`TophhieAuth.handleRedirect(_:sourceApplication:)` passes the URL into MSAL for you,
which is why your app never imports MSAL directly.

:::caution
Forgetting this step is the classic failure. Sign-in appears to work, the web view
completes, and then nothing happens because the response never reaches MSAL. If an
interactive sign-in hangs after the user authenticates, check this first.
:::

## Native authentication

Password reset, in-app sign-up and in-app MFA all use MSAL native authentication, which
has its own prerequisites. Skip this section if you only need interactive sign-in.

Enable **native authentication** on both the tenant and the app registration, following
[Prepare your app for native authentication](https://learn.microsoft.com/entra/identity-platform/tutorial-native-authentication-prepare-ios-macos-app).

For password reset specifically, also enable **self-service password reset** with Email
OTP at minimum, following
[Enable SSPR](https://learn.microsoft.com/entra/external-id/customers/how-to-enable-password-reset-customers).

:::note
Password reset only applies to local accounts, meaning email and password. A user who
signs in with Apple, Google or Microsoft, or with an email one-time passcode, has no
password here to reset.
:::

## Profile editing and sign-in history

Two features need scopes beyond the default `User.Read`, and one of them needs admin
consent. Both are covered where they are used, in
[User profile](/authentication-swift/guides/user-profile/) and
[Sign-in history](/authentication-swift/guides/sign-in-history/), but the short version
is that `Directory.AccessAsUser.All` must be consented by an admin on the app
registration before profile editing works for member accounts.
