---
title: Rate limits and errors
description: The Tophhie Cloud API rate limit, its error envelope, and what is safe to retry.
sidebar:
  order: 4
---

## The rate limit

**500 requests every 30 seconds, per IP address.** The window is fixed rather than
sliding, so it resets on a 30 second boundary rather than 30 seconds after your first
request.

Exceeding it returns `429`:

```json
{
  "success": false,
  "errors": [
    { "code": 4290, "message": "Too Many Requests - Rate limit exceeded. Please try again later." }
  ]
}
```

There are no `X-RateLimit-*` headers and no `Retry-After`, so you cannot see how much
budget you have left. Back off on `429` and retry rather than trying to track your
own usage.

:::tip
Because the window is fixed, waiting a full 30 seconds after a `429` always lands you
in a fresh window. Exponential backoff starting around one second is more than enough
in practice.
:::

The limit is generous for normal use. If you are hitting it, you are probably
requesting the same thing repeatedly and should cache instead.

## The error envelope

Errors share one shape:

```json
{
  "success": false,
  "errors": [
    { "code": 7000, "message": "Internal Server Error" }
  ]
}
```

`errors` is an array and may hold more than one entry, which is how validation
failures report several bad parameters at once. Read all of them rather than only the
first.

| Status | Code | Meaning |
| --- | --- | --- |
| 400 | varies | A parameter is missing or the wrong shape. The message names the field |
| 403 | | An internal endpoint was called without a valid API key. Returns plain text |
| 404 | | No such route, or the requested resource does not exist |
| 429 | 4290 | Rate limit exceeded |
| 500 | 7000 | Something failed inside the API or an upstream service it depends on |

## What to retry

| Status | Retry? |
| --- | --- |
| 429 | Yes, after a backoff |
| 500 | Yes, once or twice with backoff. Many are upstream hiccups that clear |
| 400 | No. The request is wrong and will stay wrong |
| 403 | No. See [Authentication](/tophhie-api/getting-started/authentication/) |
| 404 | No, unless you are polling for something expected to appear |

Several endpoints proxy upstream services such as Microsoft Graph, the Tophhie Cloud
blog or the Tophhie Social PDS. A `500` from those is often the upstream rather than
the API, which is why a retry is worth attempting before reporting it.

Always capture `X-TC-API-Trace-Id` when logging a failure. It is what makes a support
request answerable.
