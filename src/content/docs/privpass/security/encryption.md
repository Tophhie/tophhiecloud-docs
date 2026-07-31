---
title: Encryption
description: The algorithms PrivPass uses, and how keys are derived.
sidebar:
  order: 11
---

## The cipher

**AES-GCM**, through Apple's CryptoKit. Each encrypted value is stored as four pieces: the
ciphertext, the nonce, the authentication tag and the salt.

AES-GCM is authenticated encryption, so tampering with a stored value causes decryption to
fail rather than to produce wrong data quietly. PrivPass stores and verifies the tag, which
is the part that makes that guarantee real.

A fresh random nonce is generated for every encryption, which is what AES-GCM requires. The
cipher usage here is correct.

## Key derivation

This is where PrivPass departs from current practice, and it is worth being precise.

A 16-byte random salt is generated for each item. The key is then:

```
key = HMAC-SHA256(message: salt, key: masterPassword)
```

One pass. There is no iteration count, no memory cost and no work factor of any kind.

That is not a password-based key derivation function. PBKDF2, scrypt and Argon2 exist
because a master password is low-entropy compared to a key, so the derivation is made
deliberately slow to raise the cost of guessing. A single HMAC is fast by design, which is
exactly the opposite of what is wanted here.

What it means concretely: an attacker holding a copy of your vault can test candidate
master passwords at the speed of one HMAC-SHA256 each. On commodity hardware that is
billions of attempts per second, where a properly tuned KDF would allow a few thousand.

The per-item salt does its job of preventing precomputed tables and stopping two identical
passwords from producing identical ciphertext. It does nothing to slow down guessing, which
is a separate problem.

See [Limitations](/privpass/security/limitations/) for what follows from this.

## Where the key comes from

The master password is read from the iOS Keychain each time a key is derived. The Keychain
item is a generic password in the app's access group, shared with the AutoFill extension,
the widget and the App Intents extension so those can decrypt without a prompt.

The item is explicitly marked non-synchronising, so it stays on the device it was set on.
It is stored as the password itself, not a hash of it.

## Changing the master password

Changing it re-encrypts the vault rather than just replacing the stored secret. PrivPass
decrypts every password and TOTP secret with the old master password, re-encrypts each with
the new one and a fresh salt, and shows progress as it goes.

That is the correct behaviour, and it means a change genuinely rotates the keys. It also
means the operation has to complete: interrupting it leaves some items on the old key.
Complete it in one go, on a charged device.

## Randomness

Salts and nonces come from `SecRandomCopyBytes` and CryptoKit's nonce generator, both
cryptographically secure.

The [password generator](/privpass/using/generator/) uses Swift's system random number
generator, which on Apple platforms is also cryptographically secure. Generated passwords
are not predictable.
