---
title: TophhieNativeAuth
description: The native authentication stack, covering password reset, sign-in, sign-up and MFA.
sidebar:
  order: 22
---

The native stack, built on `MSALNativeAuthPublicClientApplication`. It renders no
Microsoft UI at all: your app supplies every screen and the SDK drives the protocol.

```swift
TophhieNativeAuth.shared
```

Configured separately from [`TophhieAuth`](/authentication-swift/reference/tophhie-auth/)
and sharing no state with it, so you can use either alone.

## Members

| Member | Description |
| --- | --- |
| `static let shared` | Singleton instance |
| `var isConfigured: Bool` | Whether `configure` has succeeded |
| `configure(clientId:tenantSubdomain:capabilities:) throws` | One-time setup |
| `startPasswordReset(email:) async throws -> PasswordResetCodeStep` | Begins password reset |
| `signIn(email:password:scopes:) async throws -> NativeSignInStep` | Native sign-in. Omitting `password` gives passwordless |
| `signUp(email:password:attributes:) async throws -> SignUpCodeStep` | Native account creation |

## TophhieNativeAuthCapabilities

An `OptionSet` mirroring MSAL's `MSALNativeAuthCapabilities`.

| Case | Meaning |
| --- | --- |
| `.mfaRequired` | The app can complete an MFA challenge |
| `.registrationRequired` | The app can register a strong auth method just in time |

## Password reset steps

| Type | Members |
| --- | --- |
| `PasswordResetCodeStep` | `sentTo`, `codeLength`; `submitCode(_:) async throws -> PasswordResetNewPasswordStep`, `resendCode() async throws -> PasswordResetCodeStep` |
| `PasswordResetNewPasswordStep` | `submitPassword(_:) async throws` |

See [Password reset](/authentication-swift/guides/password-reset/).

## Sign-in steps

```swift
public enum NativeSignInStep: Sendable {
    case completed(TophhieNativeSignInResult)
    case codeRequired(NativeSignInCodeStep)       // passwordless
    case mfaRequired(MFAStep)
    case strongAuthRegistrationRequired(StrongAuthRegistrationStep)
}
```

| Type | Key members |
| --- | --- |
| `NativeSignInCodeStep` | `sentTo`, `codeLength`, `channel`; `submitCode(_:)`, `resendCode()` |
| `MFAStep` | `requestChallenge(_ method:) async throws -> MFAChallengeResult` |
| `MFAChallengeResult` | `.verificationRequired(MFAVerificationStep)` · `.selectionRequired(methods:_:)` |
| `MFASelectionStep` | `requestChallenge(_ method:) async throws -> MFAChallengeResult` |
| `MFAVerificationStep` | `sentTo`, `codeLength`, `channel`; `submitCode(_:) async throws -> TophhieNativeSignInResult` |
| `StrongAuthRegistrationStep` | `availableMethods: [StrongAuthMethod]`; `registerEmail(_:)`, `registerSMS(phoneNumber:)`, `register(_:verificationContact:)` |
| `StrongAuthRegistrationResult` | `.verificationRequired(StrongAuthVerificationStep)` · `.completed(TophhieNativeSignInResult)` |
| `StrongAuthVerificationStep` | `sentTo`, `codeLength`, `channel`; `submitCode(_:) async throws -> TophhieNativeSignInResult` |
| `StrongAuthMethod` | `id`, `challengeType`, `loginHint`, `channel` (`.email`, `.phone`, `.other`) |

See [Native sign-in](/authentication-swift/guides/native-sign-in/).

## Sign-up steps

```swift
public enum SignUpNextStep: Sendable {
    case attributesRequired(attributes: [RequiredAttribute], SignUpAttributesStep)
    case passwordRequired(SignUpPasswordStep)
    case completed(SignInAfterSignUpStep)
}
```

| Type | Key members |
| --- | --- |
| `SignUpCodeStep` | `sentTo`, `codeLength`, `channel`; `submitCode(_:) async throws -> SignUpNextStep`, `resendCode()` |
| `SignUpPasswordStep` | `submitPassword(_:) async throws -> SignUpNextStep` |
| `SignUpAttributesStep` | `submitAttributes(_ [String: String]) async throws -> SignUpNextStep` |
| `SignInAfterSignUpStep` | `signIn(scopes:) async throws -> NativeSignInStep` |

See [Native sign-up](/authentication-swift/guides/native-sign-up/).
