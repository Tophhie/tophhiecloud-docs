---
title: Authentication
description: Which Tophhie Cloud API endpoints are public, which are internal, and how internal ones are authorised.
sidebar:
  order: 3
---

Most of the API is public and needs no authentication. Send the request and you get
the response.

## Public endpoints

Everything under `/appleosversion`, `/blog`, `/bookings`, `/domains`,
`/entra/convertid`, `/entra/tenantinfo`, `/generate`, `/health`, `/ipcheck`, `/pds`
and `/policies` is open. No key, no account, no sign-up. They are still subject to
[rate limiting](/tophhie-api/getting-started/rate-limits-and-errors/).

These endpoints only ever return information that is already public elsewhere, such
as DNS records, published blog content, or aggregate statistics about Tophhie Social.

## Internal endpoints

Three endpoints exist for Tophhie Cloud's own automation:

| Endpoint | What it does |
| --- | --- |
| `POST /entra/ipupdate` | Updates an IP address in a Microsoft Entra named location |
| `POST /m365/messagecenter/publish` | Publishes Microsoft 365 Message Center posts to the Tophhie Cloud blog |
| `POST /m365/messagecenter/deduplicate` | Removes duplicate Message Center posts from the blog |

Each requires an `x-tc-api-key` header holding a key that is issued only to Tophhie
Cloud's own automation. **Keys are not available to third parties**, and there is no
process to request one. Without a valid key these endpoints return `403` with the
body `Invalid API key.`

They are documented rather than hidden for two reasons. The API already lists them in
its own [OpenAPI document](https://api.tophhie.cloud/openapi.json), so concealing
them here would achieve nothing beyond making this documentation less accurate. And a
reader who stumbles across a `403` deserves to know it is by design rather than a
fault.

:::note
Being documented does not make them usable. If you are building against this API, the
public endpoints are the whole surface available to you.
:::

## Reporting a problem

If you believe you have found a way to reach an internal endpoint without a valid
key, or any other security issue, email
[api-support@tophhie.cloud](mailto:api-support@tophhie.cloud) rather than opening a
public issue. Include the `X-TC-API-Trace-Id` from the response.
