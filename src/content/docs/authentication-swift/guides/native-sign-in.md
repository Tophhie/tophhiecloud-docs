---
title: Native sign-in
description: Sign in without Microsoft's web UI, including MFA and strong authentication registration.
sidebar:
  order: 15
---

Native sign-in authenticates a user with email and password, or with an email one-time
passcode, without presenting Microsoft's web UI. Your app renders the password, code and
phone-number screens.

It needs native authentication enabled on the tenant and app registration. See
[Tenant and app setup](/authentication-swift/getting-started/tenant-and-app-setup/#native-authentication).

## Declare what your app can handle

Capabilities tell the service which steps your app is able to render. Set them at
configure time:

```swift
try TophhieNativeAuth.shared.configure(
    clientId: "00000000-0000-0000-0000-000000000000",
    capabilities: [.mfaRequired, .registrationRequired]
)
```

`.mfaRequired` says the app can complete an MFA challenge, which lets the tenant require
MFA. `.registrationRequired` says the app can register a new strong authentication
method just in time.

:::caution
Declaring a capability commits you to handling the matching branch. Setting
`.mfaRequired` without handling the `.mfaRequired` case leaves users stuck at a step
your UI never shows.
:::

## The shape of the flow

`signIn` returns a `NativeSignInStep` describing what happens next. The service decides
after the password whether the user is done, must complete MFA, or must first register a
method, so all three branches have to be handled:

```swift
switch try await TophhieNativeAuth.shared.signIn(email: email, password: password) {

case .completed(let result):
    // Signed in. Send result.idToken to your backend.
    finishSignIn(idToken: result.idToken)

case .mfaRequired(let mfa):
    // Request a challenge for one of the user's methods.
    switch try await mfa.requestChallenge(someMethod) {
    case .verificationRequired(let step):
        // Show OTP entry: step.sentTo, step.codeLength, step.channel.
        let result = try await step.submitCode(userEnteredCode)
        finishSignIn(idToken: result.idToken)
    case .selectionRequired(let methods, let selection):
        // The user has several registered methods and must pick one.
        let chosen = methods.first { $0.channel == .email }!
        if case .verificationRequired(let step) = try await selection.requestChallenge(chosen) {
            let result = try await step.submitCode(userEnteredCode)
            finishSignIn(idToken: result.idToken)
        }
    }

case .strongAuthRegistrationRequired(let registration):
    // The tenant wants a strong auth method added before sign-in completes.
    // registration.availableMethods lists what is on offer.
    if case .verificationRequired(let step) = try await registration.registerEmail() {
        let result = try await step.submitCode(userEnteredCode)
        finishSignIn(idToken: result.idToken)
    }

case .codeRequired(let step):
    // Passwordless. See below.
    let result = try await step.submitCode(userEnteredCode)
    finishSignIn(idToken: result.idToken)
}
```

`.selectionRequired` is easy to overlook. It appears when the user has more than one
registered method and the service will not choose for them, so you need a picker, not
just a code screen.

## Registering a strong authentication method

When sign-in returns `.strongAuthRegistrationRequired`, the user has to add a method
before they can continue. Email and SMS are both supported:

```swift
// Email
if case .verificationRequired(let step) = try await registration.registerEmail() {
    let result = try await step.submitCode(userEnteredCode)
    finishSignIn(idToken: result.idToken)
}

// SMS, with the number in E.164 form
if case .verificationRequired(let step) =
        try await registration.registerSMS(phoneNumber: "+441234567890") {
    let result = try await step.submitCode(userEnteredCode)
    finishSignIn(idToken: result.idToken)
}
```

`registerEmail(_:)` and `registerSMS(phoneNumber:)` are convenience helpers that pick the
matching method out of `registration.availableMethods`. For full control, call
`registration.register(_:verificationContact:)` with a specific `StrongAuthMethod`.

Check `availableMethods` before offering a choice. Offering SMS when the tenant only
allows email produces `.noMatchingAuthMethod` at the worst possible moment.

## Passwordless sign-in

Omit the password to sign in with an email one-time passcode. The first step is then
`.codeRequired`:

```swift
if case .codeRequired(let step) = try await TophhieNativeAuth.shared.signIn(email: email) {
    // Show OTP entry: step.sentTo, step.codeLength.
    let result = try await step.submitCode(userEnteredCode)   // or step.resendCode()
    finishSignIn(idToken: result.idToken)
}
```

## Errors

```swift
} catch let error as NativeAuthError {
    switch error {
    case .invalidCredentials:   showError("That email or password wasn't correct.")
    case .invalidCode:          showError("That code wasn't correct.")
    case .invalidInput:         showError("That phone number doesn't look right.")
    case .noMatchingAuthMethod: showError("That method isn't available to register.")
    default:                    showError(error.localizedDescription)
    }
}
```

Be careful how precise you are with `.invalidCredentials` and `.userNotFound` in the UI.
Distinguishing "no such account" from "wrong password" tells an attacker which emails are
registered. A single message covering both is the safer default on a sign-in screen.

## The ready-made view

`StrongAuthRegistrationView` implements the registration flow if you do not want to build
it:

```swift
if case .strongAuthRegistrationRequired(let registration) = signInStep {
    StrongAuthRegistrationView(registration: registration) { result in
        finishSignIn(idToken: result.idToken)
    }
}
```
