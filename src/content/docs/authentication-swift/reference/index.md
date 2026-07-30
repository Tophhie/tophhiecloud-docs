---
title: API reference
description: Every public type, method and error in TophhieCloudAuthentication.
sidebar:
  label: Overview
  order: 20
---

The complete public surface. For worked examples see the
[guides](/authentication-swift/guides/).

- [TophhieAuth](/authentication-swift/reference/tophhie-auth/) is the interactive stack:
  sign-in, silent tokens, sign-out, profile and sign-in history.
- [TophhieNativeAuth](/authentication-swift/reference/tophhie-native-auth/) is the
  native stack: password reset, sign-in, sign-up, MFA and strong auth registration.
- [Types](/authentication-swift/reference/types/) covers the result, profile and step
  types both stacks return.
- [Errors](/authentication-swift/reference/errors/) covers all three error enums.
- [Architecture](/authentication-swift/reference/architecture/) covers how the two
  stacks are built and why.

## Concurrency

Both `TophhieAuth` and `TophhieNativeAuth` are thread-safe singletons, with internal
state guarded by a lock.

Methods that present UI, meaning `signIn`, `acquireToken` and `signOut`, are annotated
`@MainActor` and take a presenting `UIViewController`. Call them from the main actor.

Every public async method is safe to `await` from structured concurrency.
