---
title: AutoFill and extensions
description: Filling credentials, Siri, and the Home Screen widget.
sidebar:
  order: 23
---

## AutoFill

PrivPass registers as an iOS **AutoFill Credential Provider**, so saved logins are offered
above the keyboard in Safari and in apps.

Turn it on in iOS Settings under Passwords, then AutoFill, and enable PrivPass. iOS allows
more than one provider at a time, so it can sit alongside another manager while you migrate.

The extension reads the master password from the shared Keychain group and decrypts the
entry as it fills. That is what makes filling immediate, and it is also why the
[master password's storage](/privpass/security/) matters more here than the biometric
prompt does: the extension can decrypt without asking you.

The same auto-lock timeout applies to the extension as to the app.

## Siri and Shortcuts

There is an App Intent for **Create New Password Entry**, so a password can be generated and
saved without opening the app, and it is available to the Shortcuts app for automation.

## The widget

A **Secure Score** widget for the Home Screen, summarising how strong the passwords in your
vault are. See [the generator](/privpass/using/generator/) for what that score does and does
not measure.

## What the extensions share

The app, the AutoFill extension, the widget and the App Intents extension all belong to one
Keychain access group and one app group, which is how each can reach the vault and the
master password.

Practical consequence: these are not independently protected. Anything that can run as one
of them, on an unlocked device, has the same access as the app itself.
