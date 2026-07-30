---
title: Guides
description: Working guides for each authentication flow the framework supports.
sidebar:
  label: Overview
  order: 10
---

Each guide covers one flow end to end. Start with sign-in; the rest can be read in any
order as you need them.

## Signing users in

- [Sign-in and tokens](/authentication-swift/guides/sign-in-and-tokens/) covers
  interactive sign-in, silent refresh, sign-out, and handing the ID token to a backend.
- [Native sign-in](/authentication-swift/guides/native-sign-in/) covers signing in
  without Microsoft's web UI, including MFA and just-in-time registration of a strong
  authentication method.
- [Native sign-up](/authentication-swift/guides/native-sign-up/) covers creating
  accounts in-app.
- [Password reset](/authentication-swift/guides/password-reset/) covers self-service
  password reset for local accounts.

## After sign-in

- [User profile](/authentication-swift/guides/user-profile/) covers reading and editing
  the signed-in user's profile through Microsoft Graph.
- [Sign-in history](/authentication-swift/guides/sign-in-history/) covers reading the
  user's own recent sign-ins.
- [SwiftUI views](/authentication-swift/guides/swiftui-views/) covers the drop-in
  account screen and the composable views behind it.

## Which sign-in should I use?

Interactive sign-in unless you have a specific reason not to. It needs the least tenant
configuration, and it is the only one that supports federated providers such as Apple,
Google and Microsoft.

Reach for native authentication when you need the sign-in experience to stay inside
your app, when you need in-app sign-up, or when you need self-service password reset.
The cost is that your app renders every screen in the flow and handles every branch the
service can return.
