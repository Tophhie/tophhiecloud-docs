---
title: Import and export
description: Moving data in, and getting it out.
sidebar:
  order: 24
---

Given PrivPass is [no longer maintained](/privpass/), export is the page most people need.

## Exporting

Export produces a **CSV file** of your passwords, which every major password manager can
import.

:::danger[The export is not encrypted]
The file contains your passwords in the clear. Anything that can read the file can read
your vault.

Export directly into the app you are migrating to, then delete the file and empty the
deleted items. Do not leave it in Files, iCloud Drive, Downloads, or attached to an email
to yourself. Do not export "to have a backup".
:::

Cards and TOTP tokens are not part of the CSV export. Move those by hand: re-enrol each
one-time code from the service that issued it, which is safer than transferring the secrets
anyway, and re-enter cards in whatever you move to.

## Importing

PrivPass can import from **Apple Keychain** and **Keeper**, using each product's own CSV
export, and the app links to the relevant export instructions for both.

Only passwords come across. Treat an import as bringing your logins, not your whole vault.

## Moving off PrivPass

The order that leaves the smallest window of exposure:

1. Install and set up the manager you are moving to.
2. Export from PrivPass and import straight into it.
3. Check the count matches, and spot-check a few entries.
4. Re-enrol your one-time codes with each service.
5. Re-enter payment cards.
6. Delete the CSV and empty the trash.
7. Use **Destroy and Reset** in PrivPass, then remove the app.

Step 6 is the one people skip. A plaintext CSV of every password you own, sitting in a
sync-enabled folder, is a worse outcome than anything documented in
[Limitations](/privpass/security/limitations/).

## While you still have it

If you are staying on PrivPass for now, the highest-value change is a long random master
password, for the reasons in [Encryption](/privpass/security/encryption/). Changing it
re-encrypts the whole vault, so it is a real improvement rather than a cosmetic one.
