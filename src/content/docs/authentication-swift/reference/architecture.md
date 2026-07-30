---
title: Architecture
description: How the two authentication stacks are built, and the design decisions behind them.
sidebar:
  order: 25
---

The framework is two independent stacks over MSAL, each a thread-safe singleton.

| Stack | Type | MSAL surface | Purpose |
| --- | --- | --- | --- |
| Interactive | `TophhieAuth` | `MSALPublicClientApplication` | Sign-in, silent refresh, sign-out, profile. Presents Microsoft's web UI |
| Native | `TophhieNativeAuth` | `MSALNativeAuthPublicClientApplication` | Password reset, sign-up, sign-in, MFA and strong auth registration. Renders no Microsoft UI |

They are configured separately and share no state, so an app can use one without the
other.

## Design decisions

**Callbacks bridged to async.** MSAL's web API is completion-handler based, so
`TophhieAuth` wraps each call in `withCheckedThrowingContinuation`. The native-auth API
is delegate based and multi-step, so `TophhieNativeAuth` uses one small `NSObject`
bridge delegate per step. Each bridge holds a `keepAlive` self-reference because MSAL
does not strongly retain the delegate, released as soon as a callback fires.

**Typed errors.** Raw MSAL `NSError`s are mapped to `AuthError`, `PasswordResetError`
and `NativeAuthError`, so callers switch on cases instead of matching error codes.
Everything conforms to `LocalizedError`.

**Sendable boundaries.** `MSALAccount` and MSAL's native-auth state objects are not
`Sendable`. Types that cross concurrency boundaries, such as `TophhieAuthResult` and
`TophhieCloudUserProfile`, deliberately omit them; the live `MSALAccount` stays inside
`TophhieAuth` and is exposed through `currentAccount`. The password reset step structs
are `@unchecked Sendable`, which is sound because the flow is strictly sequential and
driven by the UI.

**Locking.** Mutable state is guarded by an `NSLock`, because MSAL completion handlers
fire on arbitrary threads.

**Cached-account restore.** `configure` restores the first cached account by default, so
`acquireTokenSilent()` succeeds immediately after a relaunch without a fresh interactive
sign-in.

## Layout

```
Sources/TophhieCloudAuthentication/
├── TophhieCloudAuthentication.swift   TophhieAuth, AuthError, PromptType
├── TophhieNativeAuth.swift            TophhieNativeAuth, capabilities, password reset
├── TophhieNativeSignIn.swift          Native sign-in, MFA, strong auth registration
├── TophhieNativeSignUp.swift          Native sign-up, RequiredAttribute
├── Models.swift                       TophhieAuthResult, TophhieCloudUserProfile
├── Configuration.swift                Tenant, authority and Graph endpoint constants
└── SwiftUI/                           Account UI, guarded by #if canImport(SwiftUI)
```

## Endpoints and scopes

| | |
| --- | --- |
| Authority | `https://tophhiecustomers.ciamlogin.com` |
| Graph | `https://graph.microsoft.com/v1.0` |
| Default scopes | `User.Read` |
| Profile editing | `User.ReadWrite`, `Directory.AccessAsUser.All` |
| Sign-in history | `AuditLog.Read.All` |

The profile request uses an explicit `$select` rather than Graph's defaults, because the
address, job title and language fields are not returned otherwise.

## Testing

There is currently no test target.
