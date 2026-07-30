---
title: Errors
description: AuthError, PasswordResetError and NativeAuthError.
sidebar:
  order: 24
---

Raw MSAL `NSError`s are mapped to typed enums, so callers can `switch` rather than
inspect error codes. All three conform to `LocalizedError`, so
`error.localizedDescription` is always presentable.

## AuthError

Thrown by [`TophhieAuth`](/authentication-swift/reference/tophhie-auth/).

| Case | Meaning |
| --- | --- |
| `.notConfigured` | `configure` was not called |
| `.noAccount` | No account for a silent operation |
| `.userCancelled` | User dismissed the interactive flow |
| `.interactionRequired` | Silent token failed; interactive sign-in needed |
| `.invalidConfiguration(String)` | Bad `configure` values |
| `.profileFetch(status: Int)` | Graph `/me` returned a non-success status |
| `.profileUpdate(status: Int)` | Graph `PATCH /me` returned a non-success status |
| `.signInHistoryFetch(status: Int)` | Graph `auditLogs/signIns` returned a non-success status |
| `.underlying(Error)` | Wrapped MSAL or network error |
| `.unknown` | MSAL returned neither result nor error |

Two are worth handling explicitly rather than falling through to a generic message.
`.userCancelled` is a normal outcome and should show nothing at all. `.interactionRequired`
means retry interactively, not that something failed.

The `status:` cases carry the HTTP status, which is what separates a permissions problem
from an outage. A `403` from `.profileUpdate` almost always means
`Directory.AccessAsUser.All` has not been admin-consented; see
[User profile](/authentication-swift/guides/user-profile/).

## PasswordResetError

Thrown by the password reset flow.

`.notConfigured` · `.notSupported` · `.invalidCode` · `.invalidPassword` ·
`.browserRequired` · `.underlying(Error)` · `.unknown`

`.notSupported` means the account has no local password, which is the case for anyone
signing in through Apple, Google or Microsoft, or with an email one-time passcode. It is
not a failure so much as the wrong option being offered, and it reads better as an
explanation than as an error.

## NativeAuthError

Thrown by native sign-in, sign-up, MFA and strong auth registration.

`.notConfigured` · `.invalidCredentials` · `.invalidCode` · `.invalidInput` ·
`.invalidPassword` · `.userNotFound` · `.userAlreadyExists` ·
`.invalidAttributes([String])` · `.browserRequired` · `.noMatchingAuthMethod` ·
`.underlying(Error)` · `.unknown`

`.invalidAttributes` carries the field names that failed, so you can mark those fields
rather than showing one message across the whole form.

`.browserRequired` means the service wants the web flow for this account. Fall back to
[interactive sign-in](/authentication-swift/guides/sign-in-and-tokens/) rather than
treating it as a dead end.

:::caution
Be careful how precisely you surface `.invalidCredentials`, `.userNotFound` and
`.userAlreadyExists` on a sign-in screen. Distinguishing "no such account" from "wrong
password" tells anyone which email addresses are registered. On sign-up,
`.userAlreadyExists` is genuinely useful and the trade is usually worth it. On sign-in,
one message covering both is the safer default.
:::
