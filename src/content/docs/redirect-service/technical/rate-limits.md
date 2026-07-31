---
title: Rate limits
description: How many requests you get, and what happens when you exceed them.
sidebar:
  order: 32
---

The redirect service allows **100 requests per 60 seconds**, counted per IP address.

Exceeding it returns **429** with:

```json
{ "error": "Too many requests." }
```

The limit is checked before anything else, so a rate-limited request never reaches the
database and never becomes a redirect.

## What counts

Everything. Following a link, loading the index, and requests that turn out to be
mistakes all count against the same allowance, because the check happens before the
service knows which is which. A script hammering the index with bad names will rate-limit
itself just as effectively as one following real links.

## Living within it

For people following links this is not a limit you can reach by hand. It exists for
scripts.

If you are building something against the [index](/redirect-service/using/the-index/),
fetch it once and cache the result rather than calling it per item. The whole list comes
back in a single response, so there is rarely a reason to make more than one request:
filtering client-side costs you nothing and keeps you well inside the limit.

If you do get a 429, wait for the window to pass rather than retrying immediately. Retries
count too, so a tight retry loop keeps the window full and extends the problem.

## Shared addresses

The count is per IP, so everyone behind one office connection or VPN egress shares an
allowance. It is generous enough that this rarely matters for people clicking links, but
it is worth knowing if you deploy something automated inside a network where others are
using the same links.
