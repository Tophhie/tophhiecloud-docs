---
title: The private index
description: The internal listing that includes unlisted links.
sidebar:
  order: 25
---

`aka.tophhie.cloud/private-index` returns the same JSON as the
[public index](/redirect-service/using/the-index/), without the filter that hides unlisted
links.

:::note[Behind Cloudflare Access]
It sits behind Cloudflare Access as its own application, **Redirect Service Private
Index**, and signs in with Azure AD against the Tophhie Cloud tenant. Reaching it from an
unenrolled device gives you the Access sign-in page rather than the data.

This is separate from the [admin portal's](/redirect-service/managing/signing-in/) own
Entra sign-in. They protect different things and are configured independently.
:::

## What it is for

Seeing every working link in one response, including the ones deliberately kept out of the
public listing. Useful when you are auditing what exists, or trying to find out whether a
short name is already taken before you use it.

```bash
curl -sS https://aka.tophhie.cloud/private-index
```

The shape is identical to the public index, so anything that parses one parses the other.

## What it does not include

Links that are switched off. The `indexed` filter still applies, so a retired link is
absent here as well.

If you want genuinely everything, including disabled links, that is
`GET /api/redirects` on the [admin API](/redirect-service/managing/api/). The three views
answer three different questions:

| | Shows |
| --- | --- |
| [Public index](/redirect-service/using/the-index/) | Working and published |
| Private index | Working, published or not |
| [Admin API](/redirect-service/managing/api/) | Everything, including switched off |

## Do not put the URL in public material

It is protected, so exposing the path is not a breach on its own. But it is an internal
listing, and there is no reason for it to appear in a public README, a support article or
a screenshot. Treat it the way you would any other internal endpoint.
