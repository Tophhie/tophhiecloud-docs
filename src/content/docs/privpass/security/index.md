---
title: Security model
description: What PrivPass encrypts, how, and what it does not cover.
sidebar:
  label: Overview
  order: 10
---

Everything on these pages is taken from the source, not from marketing copy. Where PrivPass
is weaker than a current password manager, it is said plainly.

- [Encryption](/privpass/security/encryption/) covers the algorithms and how keys are made.
- [Limitations](/privpass/security/limitations/) covers what that design does not protect
  against.

## In one table

| | |
| --- | --- |
| Cipher | AES-GCM, from Apple's CryptoKit |
| Key derivation | One HMAC-SHA256 pass over a per-item salt |
| Salt | 16 random bytes, generated per item |
| Nonce | Random per encryption, stored with the item |
| Integrity | The GCM authentication tag is stored and verified |
| Master password at rest | Held in the iOS Keychain, not synced |
| Vault at rest | SwiftData store on device |
| Sync | Your own iCloud private database, via CloudKit |

## What is encrypted

Only the secrets:

| Encrypted | Stored in plain text |
| --- | --- |
| The password value | The item's name |
| A TOTP token's secret | The username |
| A payment card's number, holder, expiry and CVC | The website address |
| | Notes |
| | Folder names, card titles, TOTP service names |

That split is the single most important thing to understand about PrivPass. A stolen copy
of the vault does not hand over your passwords, but it does reveal every account you hold,
under what username, on which site, plus whatever you wrote in the notes field.

## Where the master password lives

In the iOS Keychain, as an ordinary generic password item, marked non-synchronising so it
never leaves the device.

It is not stored as a hash. The app reads the actual master password back out of the
Keychain when it needs to derive a key, which is what lets AutoFill and the widget work
without prompting you each time.

The practical consequence: your vault is protected by the Keychain and by your device
passcode, more than by the master password being a secret only you know. See
[Limitations](/privpass/security/limitations/).

## Biometrics

Face ID and Touch ID gate the app's user interface. PrivPass asks iOS to authenticate the
device owner, and on success it shows the vault.

The biometric check does not release a key. The key material is derivable regardless,
because the master password is already in the Keychain. Treat biometrics here as a lock on
the door of the app, not as part of the encryption.

There is an auto-lock, defaulting to **30 seconds** in the background and configurable in
settings.
