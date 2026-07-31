---
title: Creating and editing links
description: The fields on a link and the rules they have to satisfy.
sidebar:
  order: 22
---

## The fields

| Field | Required | What it is |
| --- | --- | --- |
| Title | Yes | The human-readable name, shown in the index and used to sort it |
| Short name | Yes | The bit after the slash, such as `devops` |
| Destination | Yes | The full URL to send people to |
| Indexed | | Whether the link works at all. See [Link states](/redirect-service/managing/link-states/) |
| Public | | Whether it appears in the published index |

The list also shows each link's **usage count** and when it was **last updated**, both
maintained for you. Links are ordered by last updated, so whatever you have just touched is
at the top.

## Short name rules

Letters, numbers, hyphens and underscores only. Anything else is rejected when you save.

Short names are **stored in lowercase** whatever you type, so `DevOps` and `devops` are the
same link and you cannot have both.

### Choosing one

The name is the whole product as far as anyone else is concerned. Some things that help:

- **Short enough to say out loud.** If it needs spelling out, it is too long.
- **Avoid characters that survive speech badly.** Hyphens and underscores sound identical
  when read aloud, and nobody hears the difference between `team-docs` and `team_docs`.
- **Avoid names that look like typos of other names**, because the failure mode is silent:
  a wrong guess is an ordinary 404 rather than a helpful suggestion.

## The destination

Store a complete URL, including the scheme. The service checks the destination is a usable
URL at the moment somebody follows the link, and returns a 400 if it is not, so a malformed
address fails for your users rather than for you at save time.

Point at something stable. The whole value of a short link is that it can be printed on
something you cannot reissue, and a destination that moves every few months undoes that.
Where the real URL is likely to change, point the short link at a page you control and let
that page do the moving.

## Editing an existing link

Any field can be changed, including the destination, and it takes effect immediately.
Repointing an existing link is the intended way to handle a destination that has moved:
everyone holding the short link keeps working, which is the reason to have used one.

Changing the **short name** is a different matter. The old name stops working the moment
you save, and anyone holding it gets a 404. Treat it as retiring one link and creating
another rather than as a rename.

## Deleting

Deleting removes the link and its usage count outright.

Turning **Indexed** off is almost always better. It has the same effect for anyone
following the link, keeps the row and its history, and can be reversed. See
[Link states](/redirect-service/managing/link-states/).
