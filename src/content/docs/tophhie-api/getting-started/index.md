---
title: Getting started
description: Conventions, authentication, rate limits and errors for the Tophhie Cloud API.
sidebar:
  label: Overview
  order: 1
---

Most of the API needs nothing more than a URL. This request works right now, from
anywhere, with no key and no account:

```bash
curl https://api.tophhie.cloud/health
```

Read the rest of this section before you build anything against it.

- [Making requests](/tophhie-api/getting-started/making-requests/) covers base URLs,
  response shapes, headers and CORS.
- [Authentication](/tophhie-api/getting-started/authentication/) explains which
  endpoints are public, which are internal, and why.
- [Rate limits and errors](/tophhie-api/getting-started/rate-limits-and-errors/)
  covers the limit, the error envelope and what to retry.
- [Logging and privacy](/tophhie-api/getting-started/logging-and-privacy/) sets out
  what is recorded about each request.

Then use the [endpoint reference](/tophhie-api/reference/) for the specifics of any
individual call.

## Getting help

Email [api-support@tophhie.cloud](mailto:api-support@tophhie.cloud) or use
[support.tophhie.cloud](https://support.tophhie.cloud). Include the
`X-TC-API-Trace-Id` from the response header if you are reporting a problem with a
specific request, since it identifies that exact call in the logs.
