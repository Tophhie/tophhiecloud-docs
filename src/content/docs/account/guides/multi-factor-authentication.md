---
title: Multi-factor authentication
description: Turn on a second step at sign-in for your Tophhie Cloud account.
sidebar:
  order: 14
---

Multi-factor authentication asks for a second thing at sign-in, on top of your password.
A code sent to you, usually. It means a stolen password on its own is not enough to get
into your account.

Turn it on from the **Security** page.

## Before you turn it on

You need a [sign-in method](/account/guides/password-and-sign-in-methods/#sign-in-methods)
that can receive a code, such as an email address. Add one first if you have not, because
turning MFA on without a way to receive the code locks you out of your own account.

## Turning it on

Use the **Multi-factor authentication** toggle on the Security page.

From then on, signing in asks for a code as well as your password. The code goes to your
registered method.

## Turning it off

The same toggle. Your account goes back to password only.

:::caution
Only turn it off if you have a reason to. A password on its own is the single most
common way accounts get taken over, and MFA is the one setting that reliably prevents
it.
:::

## If you cannot receive codes

If you have lost access to your registered method, sign in with a method you still have
and add a new one from the Security page.

If you cannot sign in at all, email
[help@tophhie.cloud](mailto:help@tophhie.cloud) from an address connected to the account
and explain what you have lost access to.

## What is not here yet

Only the on and off state is managed from the portal today, along with the sign-in
methods that receive codes. Authenticator apps and passkeys are not yet configurable
here.
