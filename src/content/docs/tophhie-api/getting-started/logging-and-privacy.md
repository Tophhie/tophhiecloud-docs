---
title: Logging and privacy
description: What the Tophhie Cloud API records about each request.
sidebar:
  order: 5
---

Every request to the API is logged for operational and analytics purposes. This is
stated in the API's own OpenAPI document, and is repeated here because it is the sort
of thing you should know before pointing a service at someone else's API.

## What is recorded

| Recorded | Detail |
| --- | --- |
| Trace ID | The unique ID also returned to you as `X-TC-API-Trace-Id` |
| Request | Method, path, query string and scheme |
| Host | The API hostname you called |
| Response | Status code and response time in milliseconds |
| API key present | Whether an `x-tc-api-key` header was sent. The key itself is not logged |
| IP address | From `CF-Connecting-IP` |
| Country | ISO 3166-1 alpha-2, from Cloudflare |
| User-Agent | As sent |
| Referrer | The `Referer` header, or the `ref` query parameter |
| Cloudflare Ray ID | For correlation with Cloudflare's own logs |

Note that the **query string is recorded in full**. Do not put anything sensitive in
a query parameter when calling this API, which is good practice against any API but
worth stating plainly.

Requests to `/`, `/docs` and `/openapi.json` are not logged, and neither are `404`
responses.

## Retention

Logged data is retained in accordance with the
[Tophhie Cloud privacy policy](https://trust.tophhie.cloud/policy/privacy). This page describes
what is collected, not how long it is kept.

## Rate limiting data

Rate limiting counts requests per IP address in a short-lived key that expires
shortly after its window closes. It is a counter rather than a request history.
