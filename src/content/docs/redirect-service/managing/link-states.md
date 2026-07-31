---
title: Link states
description: The two switches on a link, and why one of them turns it off entirely.
sidebar:
  order: 23
---

Every link carries two independent switches, **Indexed** and **Public**. Between them they
give three meaningful states, and the naming is the trap.

| Indexed | Public | What the link does |
| --- | --- | --- |
| On | On | Works, and appears in the [public index](/redirect-service/using/the-index/) |
| On | Off | Works, but is not listed anywhere |
| Off | either | Does not work at all. Returns 404 |

## Indexed is really "enabled"

This is the part to internalise. **Turning Indexed off does not merely hide a link, it
switches it off.** The redirect lookup itself requires Indexed, so a link with it off
returns a 404 to anyone following it, exactly as though it had never existed.

If you want a link that works but is not advertised, that is Indexed **on** and Public
**off**. Reaching for Indexed because you want a link kept quiet will break it for
everyone already using it.

## Public controls listing only

With Indexed on, Public decides whether the link is included in the published index.
Turning it off removes the link from that listing and changes nothing about whether the
link works.

Use it for links that are legitimately in circulation but do not belong in a directory: a
link handed to one supplier, something tied to an event that has not been announced, a
destination that is uninteresting to everyone else.

:::caution[Unlisted is not secret]
Public off keeps a link out of the index. It does nothing to stop someone following the
link if they have it, and short names are guessable by design.

Never treat an unlisted link as an access control. If a destination needs protecting, it
has to protect itself. A short link is a convenience, not a lock.
:::

## Retiring a link

Turning Indexed off is how you retire one, and it is reversible: the row keeps its
destination and its usage count, so turning it back on restores the link exactly as it was.
Deleting removes it outright.

Prefer turning it off. A short link that has been printed somewhere will keep being opened
for years, and an off switch you can reverse is worth more than a tidy table.

Whichever you choose, someone following the retired link gets an ordinary 404 with no hint
that it once worked. That is deliberate, and it is why retiring a link quietly is safe.
