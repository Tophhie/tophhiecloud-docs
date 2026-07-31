---
title: Your vault
description: Passwords, payment cards, one-time codes and folders.
sidebar:
  order: 21
---

## Passwords

An entry holds a name, username, password, website address and notes, and can be filed in a
folder, marked a favourite, and linked to a one-time-code token.

Only the password itself is encrypted. The name, username, address and notes are stored and
synced as plain text, so keep secondary secrets out of the notes field and put them in an
entry of their own. See [Limitations](/privpass/security/limitations/).

## One-time codes

PrivPass can hold TOTP tokens, either alongside a password entry or on their own. Add one by
scanning a QR code or pasting an `otpauth://` link.

The token's secret is encrypted. The service name and username are not.

:::note[It shows three codes]
The `otpauth://` link can specify which hash algorithm a service uses, but PrivPass does not
read that field. Instead it generates the code for **SHA-1, SHA-256 and SHA-512** and shows
all three.

In practice almost every service uses SHA-1, which is the default and normally the one you
want. If a code is rejected, try the others before assuming the token is wrong.

PrivPass also ignores the digits and period fields, so a service using anything other than
the usual six digits on a thirty-second cycle will not work.
:::

## Payment cards

A card entry holds the cardholder name, number, expiry month and year, and CVC. All of that
is encrypted together as a single block, so a card is better covered than a password entry:
only the card's title is in plain text.

## Folders

Folders group entries and can be given a colour. Folder names are plain text.

## Deleting everything

**Destroy and Reset** in settings wipes the vault and the stored master password, returning
the app to its first-run state.

It is immediate and there is no undo. If the device is signed in to iCloud, treat the
deletion as propagating to your other devices, because the vault is
[synced](/privpass/security/sync/) rather than local. Export first if you want anything
kept.
