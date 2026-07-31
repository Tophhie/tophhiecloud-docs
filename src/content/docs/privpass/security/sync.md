---
title: Sync
description: How the vault moves between your devices.
sidebar:
  order: 13
---

PrivPass syncs through **your own iCloud account**, using CloudKit's private database. There
is no Tophhie Cloud server in the path: the data goes from your device to your iCloud and
back down to your other devices.

Sync is handled by SwiftData against the app's iCloud container. Every device signed in to
the same Apple Account gets the same vault.

## What travels

The whole vault store, which means both halves of what it holds:

| | |
| --- | --- |
| Encrypted | Password values, TOTP secrets, card details, each with its nonce, tag and salt |
| Plain text | Item names, usernames, website addresses, notes, folder names |

The encrypted values are useless without the master password. The plain-text fields are
not, and they are in iCloud too. See [Limitations](/privpass/security/limitations/).

## What does not travel

**The master password.** Its Keychain item is explicitly marked non-synchronising, so it
never leaves the device it was set on.

This is a deliberate and good decision. It means the key material and the encrypted data do
not travel together, so your iCloud account alone does not hand over your vault.

## Setting up a second device

Install PrivPass, sign in to the same Apple Account, and enter your master password when
asked. The vault arrives from iCloud, and your master password is stored locally on that
device too.

The reason this works is that key derivation is deterministic: the same master password and
the same stored per-item salt produce the same key on any device. Nothing has to be
transferred for decryption to succeed.

The reverse is the thing to be careful about. **If you forget your master password, no
device and no amount of iCloud data can recover it.** There is no reset, no recovery code,
and no server-side copy. The vault becomes ciphertext with the plain-text fields still
readable.

## If sync is not working

PrivPass checks your iCloud account status and warns you in the app when it is unavailable,
signed out or restricted.

Sync needs iCloud Drive enabled and the device signed in. Because it uses CloudKit rather
than a service Tophhie Cloud runs, an outage or a sync delay is between your device and
Apple, and there is no operator who can intervene.

## Backups

The vault is included in an iCloud or encrypted local device backup like any other app
data. Since the master password lives in the Keychain, an encrypted backup carries it too,
which is what allows a restored device to keep working.

An unencrypted local backup does not carry Keychain contents, so a vault restored that way
will need the master password entering again. Which is another way of saying: know your
master password, rather than relying on it having been saved somewhere.
