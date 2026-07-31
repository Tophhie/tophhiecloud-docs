---
title: Limitations
description: What the design does not protect against.
sidebar:
  order: 12
---

None of this is hypothetical. Each item below is a property of the code as it stands, and
none of it will be fixed, because PrivPass is [no longer maintained](/privpass/).

## Key derivation is fast, and it should be slow

PrivPass derives its encryption key with a single HMAC-SHA256, as described in
[Encryption](/privpass/security/encryption/). There is no work factor.

**What it means.** Anyone who obtains a copy of your vault can attempt master passwords
offline at enormous speed. The protection you have is only the entropy of the master
password itself, with none of the multiplier a real KDF provides.

**What to do about it.** Use a long, random master password, generated rather than chosen.
Length is doing all of the work here, so a five-word random passphrase or twenty random
characters is a different proposition from a memorable phrase with substitutions. If your
master password is short or reused, change it.

## Only the secrets are encrypted

Item names, usernames, website addresses, notes, folder names and TOTP service names are
stored in plain text, and they sync in plain text.

**What it means.** A copy of the vault is a complete inventory of your accounts even
without breaking any encryption: which services you use, under which usernames, at which
addresses.

**What to do about it.** Do not put secrets in the notes field. This is the trap, because
notes is exactly where people keep recovery codes, PINs, security answers and
"temporary" passwords. Anything of that kind belongs in the password field of its own
entry, which is encrypted.

## The master password is stored, not remembered

It sits in the Keychain in recoverable form so that AutoFill, the widget and Siri can work.
The app reads it back whenever it needs a key.

**What it means.** Your vault is protected by the device's Keychain and passcode rather
than by a secret that exists only in your head. Someone who can run code as the app on an
unlocked device can read the master password and decrypt everything. A zero-knowledge design,
where the key is only ever derived from something you type, gives a stronger guarantee.

**What to do about it.** Keep a device passcode set, keep the OS updated, and do not use
PrivPass on a jailbroken device. Those were always the real boundary.

## Biometrics gate the app, not the key

Face ID and Touch ID control whether the interface opens. They do not release the key,
because the key material is already retrievable.

**What it means.** The biometric prompt is a deterrent against casual access to an unlocked
phone. It is not a cryptographic barrier, and it should not be counted as one.

## The strength meter is crude

Strength is scored on length and character variety alone. There is no dictionary, no
check against known-breached passwords, and no pattern detection.

**What it means.** `Password1!` scores as **Strong**, because it is ten characters with
four character classes. It is also among the first passwords any attacker tries.

**What to do about it.** Treat the meter as a check that you have not typed something
trivially short, and use the [generator](/privpass/using/generator/) instead of relying
on the rating.

## Export is plain text

The export is an unencrypted CSV, which is the normal interchange format and is genuinely
useful for [getting your data out](/privpass/using/import-and-export/). It is also your
entire vault in the clear.

**What to do about it.** Export only when you are moving to another manager, import it
promptly, and delete the file and empty the trash afterwards. Never leave it in Files,
iCloud Drive or a Downloads folder.

## What is not wrong

For balance, several things are done correctly and should not be on this list:

- AES-GCM is used properly, with random nonces and verified authentication tags.
- Salts and nonces come from cryptographically secure sources, per item.
- Generated passwords are unpredictable.
- Changing the master password genuinely re-encrypts the vault.
- The master password is deliberately kept out of iCloud.

The weaknesses above are about key derivation, metadata coverage and where the master
password lives, not about the cipher.
