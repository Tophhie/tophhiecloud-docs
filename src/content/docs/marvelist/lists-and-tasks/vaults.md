---
title: Vaults
description: Encrypt a list's contents, with a recovery code you must keep.
sidebar:
  order: 21
---

Vault protection gives a list's contents an extra layer of encryption. It is for the
lists where it is not enough that other people cannot easily open them.

This is a different feature from [locking a list](/marvelist/lists-and-tasks/locked-lists/).
Locking controls whether the app will open a list on a device. Vault protection changes how
the contents are stored. You can use either, or both.

## Protecting a list

Choose **Protect with Vault** on the list. Marvelist encrypts its contents and gives you a
**recovery code**.

:::caution[Save the recovery code]
Write it down or put it in a password manager before you continue. The setup asks you to
confirm you have saved it, and that confirmation is not a formality.

The recovery code is how encrypted contents are recovered. Losing it means losing access to
what is in that list.
:::

## Recovery

If you need to recover a Vault-protected list you are asked to verify your recovery code.

Recovering issues a new code, and **the previous code stops working** at that point. Replace
the copy you saved rather than keeping the old one.

## Removing protection

Vault protection can be removed from a list, and can be applied again later. Removing it
returns the list to being stored like any other.

## How many you get

Every account can protect **one list for free**. Protecting more is a
[Premium](/marvelist/premium/) feature, so if you want most of your sensitive lists
encrypted rather than your single worst one, that is the reason to upgrade.

## Kept from the assistant

A Vault-protected list is also private from [Marvelist AI](/marvelist/marvelist-ai/). The
assistant cannot read it, cannot answer questions about it, and its contents stay out of
[change history](/marvelist/lists-and-tasks/change-history/).

Worth knowing before you protect a list you were relying on the assistant to help with.
The protection is not selective: encrypted means encrypted, including from the features you
like.

## Managing your recovery code

**Profile → Vault** holds two actions: **New recovery code** generates a replacement, and
**Verify recovery code** checks the one you have is the one Marvelist expects.

Verifying is worth doing once a year. A recovery code you have never tested is a recovery
code you are assuming works.

## Choosing between locking and Vault

| You want | Use |
| --- | --- |
| Nobody who picks up my phone can read this list | [Lock](/marvelist/lists-and-tasks/locked-lists/) |
| The contents themselves should be encrypted | Vault |
| Both | Both, on the same list |

A lock is quick to set up, costs nothing if you forget it, and protects against the most
likely everyday risk. A Vault is stronger and carries a real obligation: keep the recovery
code safe.
