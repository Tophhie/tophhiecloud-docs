---
title: Password reset
description: Self-service password reset for local accounts, using native authentication.
sidebar:
  order: 14
---

Self-service password reset runs over native authentication, so it renders no Microsoft
UI. Your app supplies the code-entry and new-password screens, and the SDK drives the
protocol.

:::note
Password reset only applies to local accounts, meaning email and password. Users who
sign in with Apple, Google or Microsoft, or with an email one-time passcode, have no
password here to reset. Check before offering the option, or you will show a dead end
to federated users.
:::

It needs native authentication and SSPR enabled on the tenant. See
[Tenant and app setup](/authentication-swift/getting-started/tenant-and-app-setup/#native-authentication),
and configure `TophhieNativeAuth` as well as `TophhieAuth`.

## The flow

Three steps, each returning the object you use for the next:

```swift
do {
    // 1. Start. Sends a one-time passcode to the user.
    let codeStep = try await TophhieNativeAuth.shared.startPasswordReset(email: email)
    // Show OTP entry. codeStep.sentTo and codeStep.codeLength describe the code.

    // 2. Submit the code the user entered.
    let passwordStep = try await codeStep.submitCode(userEnteredCode)
    // or codeStep.resendCode() to send a fresh one

    // 3. Submit the new password, which completes the reset.
    try await passwordStep.submitPassword(newPassword)

    // Done. Prompt the user to sign in with their new password.
} catch let error as PasswordResetError {
    switch error {
    case .invalidCode:     showError("That code wasn't correct.")
    case .invalidPassword: showError("That password doesn't meet the requirements.")
    case .notSupported:    showError("This account can't reset a password here.")
    default:               showError(error.localizedDescription)
    }
}
```

The step objects carry the state, so you cannot call them out of order. `sentTo` and
`codeLength` let you write an honest prompt ("We sent a 6-digit code to j...@example.com")
rather than a vague one.

## Errors worth handling individually

| Case | What to show |
| --- | --- |
| `.invalidCode` | The code was wrong. Let them retry or resend |
| `.invalidPassword` | The new password failed tenant policy. Show the requirements |
| `.notSupported` | The account has no local password. Usually a federated user |
| `.browserRequired` | The service wants the web flow. Fall back to interactive sign-in |

`.notSupported` is the one to handle deliberately. It is not an error in the user's
sense; it means they signed up with Apple or Google and should be told that rather than
shown a failure.

Resetting does not sign the user in. Once it completes, send them to your sign-in
screen.

## The ready-made screen

If you do not want to build this yourself, `PasswordResetView` implements the whole
flow:

```swift
PasswordResetView(email: profile.userPrincipalName)
```

By default the email is locked to the address you pass, which is right for a
change-password action inside a signed-in account screen. Pass
`allowsEmailEntry: true` only for a pre-login "forgot password" screen where nobody is
signed in yet.

See [SwiftUI views](/authentication-swift/guides/swiftui-views/).
