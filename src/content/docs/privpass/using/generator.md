---
title: The generator
description: Making passwords, and what the strength rating actually measures.
sidebar:
  order: 22
---

## Generating

The generator produces passwords from lowercase letters plus whichever of uppercase, digits
and symbols you enable, with a minimum length of eight. You can also exclude specific
characters, which is useful for systems that reject particular symbols.

The symbol set is `!@#$%^&*()_-+=<>?`.

Randomness comes from the system's cryptographically secure generator, so output is not
predictable.

:::caution[Enabling a character type does not guarantee one appears]
The switches decide which characters are in the pool, not what ends up in the result. A
generated password can legitimately contain no digits even with digits enabled, especially
at short lengths.

If a site demands at least one of each type, check the output before saving rather than
assuming.
:::

Favour length over composition. Every extra character multiplies the search space, and with
[PrivPass's key derivation](/privpass/security/encryption/) that is the only thing standing
between your vault and an offline guessing attack.

## The strength rating

The rating scores two things: length, and how many character classes are present. Nothing
else.

| Rating | Roughly |
| --- | --- |
| Very Weak / Weak | Short, or little variety |
| Moderate | Eight or more characters with some variety |
| Strong / Very Strong | Twelve or more characters with most or all classes |

There is no dictionary check, no test against breached password lists, and no detection of
patterns or substitutions. That is a real limitation rather than a detail:

**`Password1!` is rated Strong.** It is ten characters with all four classes, and it is also
one of the first passwords any attacker will try.

Use the rating to catch something obviously too short. Do not use it as evidence that a
password you invented is a good one, because it cannot tell.

## The Secure Score widget

A Home Screen widget shows a **Secure Score** summarising the strength of what is in your
vault. It is built from the same scoring, so it inherits the same blind spot: a vault full
of memorable passwords with a digit and a symbol on the end will score well.
