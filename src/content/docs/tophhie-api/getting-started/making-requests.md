---
title: Making requests
description: Base URLs, response shapes, headers and CORS for the Tophhie Cloud API.
sidebar:
  order: 2
---

## Base URLs

| Server | Use it for |
| --- | --- |
| `https://api.tophhie.cloud` | Everything. This is the one to build against |
| `https://api.tophhie.dev` | The development environment. Expect it to change or break without warning |

There is no version prefix in the path. The version lives in the OpenAPI document,
currently 1.1.0.

## Requests

Endpoints are plain REST over HTTPS. Almost everything is a `GET`, and parameters go
in the path or the query string rather than in a body:

```bash
curl "https://api.tophhie.cloud/pds/verifyHandle?handle=alice.tophhie.social"
```

The exceptions are the internal endpoints, which use `POST`. See
[Authentication](/tophhie-api/getting-started/authentication/).

## Responses

Successful responses are JSON, shaped to whatever the endpoint returns. A few return
plain text instead, which the reference notes per endpoint.

Failures use a consistent envelope:

```json
{
  "success": false,
  "errors": [
    { "code": 4290, "message": "Too Many Requests - Rate limit exceeded. Please try again later." }
  ]
}
```

`errors` is always an array, so handle more than one entry. See
[Rate limits and errors](/tophhie-api/getting-started/rate-limits-and-errors/).

## Response headers

Every response carries these:

| Header | What it is |
| --- | --- |
| `X-TC-API-Trace-Id` | A unique ID for this request. Quote it when reporting problems |
| `X-Powered-By` | `Tophhie Cloud` |
| `X-TC-Contact-Email` | Where to email about the API |
| `X-TC-Contact-Url` | The support site |

The trace ID is the useful one. It ties your request to its log entry, which turns a
vague report into something diagnosable.

## CORS

Browser requests are accepted from `tophhie.social`, `tophhie.cloud`, `tophhie.co.uk`
and `tophhie.dev`, including their subdomains, over both HTTP and HTTPS. Credentials
are allowed, and preflight results are cached for 24 hours.

:::caution
Any other origin is refused, so you cannot call this API directly from a browser on
your own domain. Call it from your own server instead, or from a Worker or function
you control.
:::

Permitted methods are `GET`, `POST`, `PUT`, `PATCH`, `DELETE` and `OPTIONS`, with
`Content-Type` and `Authorization` as permitted headers.
