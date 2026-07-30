---
title: Native sign-up
description: Create accounts in-app over native authentication.
sidebar:
  order: 16
---

Native sign-up creates an account without any web UI. It sends a verification code
first, then depending on tenant configuration may ask for a password and attributes, and
finally completes into a sign-in step that yields tokens.

It needs native authentication enabled on the tenant and app registration. See
[Tenant and app setup](/authentication-swift/getting-started/tenant-and-app-setup/#native-authentication).

## The flow

The tenant decides which steps apply, so the flow is a loop rather than a fixed
sequence:

```swift
do {
    // 1. Start. Sends a one-time passcode to the email.
    let codeStep = try await TophhieNativeAuth.shared.signUp(
        email: email,
        password: password,                 // omit for an email-OTP-only account
        attributes: ["displayName": name]   // optional
    )
    // Show OTP entry: codeStep.sentTo, codeStep.codeLength.

    // 2. Submit the code.
    var next = try await codeStep.submitCode(userEnteredCode)

    // 3. Drive whatever the tenant asks for next.
    loop: while true {
        switch next {
        case .passwordRequired(let step):
            next = try await step.submitPassword(password)

        case .attributesRequired(let required, let step):
            // `required` describes each field: name, type, required, regex.
            next = try await step.submitAttributes(collect(required))

        case .completed(let signInStep):
            // 4. Sign the new user straight in to get tokens.
            if case .completed(let result) = try await signInStep.signIn() {
                finishSignIn(idToken: result.idToken)
            }
            break loop
        }
    }
} catch let error as NativeAuthError {
    switch error {
    case .userAlreadyExists:  showError("An account already exists for that email.")
    case .invalidPassword:    showError("That password doesn't meet the requirements.")
    case .invalidCode:        showError("That code wasn't correct.")
    case .invalidAttributes(let names):
        showError("These details weren't valid: \(names.joined(separator: ", ")).")
    default:                  showError(error.localizedDescription)
    }
}
```

Write it as a loop rather than assuming an order. Which steps appear, and in which
sequence, is tenant configuration, so hard-coding "code then password then done" breaks
the moment someone changes a setting in Entra.

## Attributes

`signUp`'s `attributes` parameter and `submitAttributes` both take `[String: String]`.
The `.attributesRequired` case hands you `[RequiredAttribute]` describing exactly what
the tenant wants:

```swift
public struct RequiredAttribute: Sendable {
    public let name: String
    public let type: String
    public let required: Bool
    public let regex: String?
}
```

Build the form from that array rather than hard-coding fields. `regex` lets you validate
before submitting, which is a better experience than a round trip to be told the value
was rejected.

`.invalidAttributes` carries the names that failed, so you can mark the specific fields
rather than showing one message over the whole form.

## Signing in afterwards

Sign-up does not produce tokens on its own. The `.completed` case gives you a
`SignInAfterSignUpStep`, and calling `signIn()` on it returns a normal
`NativeSignInStep`.

In the common case that is `.completed` with a result, but it is the same type returned
by [native sign-in](/authentication-swift/guides/native-sign-in/), so a tenant requiring
MFA on first sign-in can hand you `.mfaRequired` here too. Route it through the same
handler rather than assuming completion.

## Account enumeration

`.userAlreadyExists` is genuinely useful on a sign-up form, where a user needs to know
they already have an account. Bear in mind it also confirms to anyone that a given email
is registered. That is usually an acceptable trade on sign-up, but it is a reason not to
mirror the same precision on your sign-in screen.
