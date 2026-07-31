---
title: The index
description: The published list of short links, and how to search it.
sidebar:
  order: 12
---

[aka.tophhie.cloud/index](https://aka.tophhie.cloud/index) lists the short links that have
been published. It answers with JSON rather than a web page, so it is as useful to a script
as to a person.

```bash
curl -sS https://aka.tophhie.cloud/index
```

```json
{
  "links_count": 33,
  "root_url": "https://aka.tophhie.cloud",
  "links": [
    {
      "title": "Azure DevOps",
      "shortname": "devops",
      "redirect_url": "https://dev.azure.com/tophhie",
      "short_url": "https://aka.tophhie.cloud/devops"
    }
  ]
}
```

Each entry gives you the human-readable `title`, the `shortname` itself, the
`redirect_url` it points at, and a ready-made `short_url` you can copy. Entries come back
sorted by title.

## Looking one up

Add a `shortname` query to filter to a single link:

```bash
curl -sS "https://aka.tophhie.cloud/index?shortname=devops"
```

The response has the same shape, with `links_count` reflecting what matched. A name that
does not exist, or is not published, returns a count of zero and an empty list rather than
a 404. That is the difference between asking the index a question and following a link:
the index tells you nothing was found, where the redirect itself gives you a 404.

## The index is not everything

The index lists published links only. A link can be perfectly functional and deliberately
absent from it, because being listed is a separate decision from working. See
[Link states](/redirect-service/managing/link-states/).

So treat the index as a directory of what has been advertised, not an inventory. If
somebody sends you a short link that does not appear in the index, that is normal and does
not mean the link is suspect.

## Using it in a script

The response is stable and cheap to parse, so it is a reasonable thing to build on:

```bash
curl -sS https://aka.tophhie.cloud/index \
  | python3 -c "import sys,json;[print(l['shortname'],'->',l['redirect_url']) for l in json.load(sys.stdin)['links']]"
```

Two things to keep in mind. There is a
[rate limit](/redirect-service/technical/rate-limits/), so poll it sparingly rather than
on every page load. And the list changes when somebody edits a link, so cache it with an
expiry rather than treating a copy as permanent.
