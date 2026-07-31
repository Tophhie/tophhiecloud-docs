---
title: How it works
description: Two Workers over one database.
sidebar:
  order: 31
---

```
                    ┌─ aka.tophhie.cloud ─┐
  visitor  ──────▶  │  Redirect Worker    │ ──▶ 302 to the destination
                    └──────────┬──────────┘
                               │ Hyperdrive
                               ▼
                          MySQL (links)
                               ▲
                               │ Hyperdrive
              ┌────────────────┴──────────────┐
  staff  ──▶  │  Admin Worker (Entra sign-in) │
              │  redirect-admin.tophhie.cloud │
              └───────────────────────────────┘
```

Two Cloudflare Workers, one database. They share no code and can be deployed
independently; the link table is the whole contract between them.

## The redirect Worker

Public, unauthenticated, and deliberately small. It rate-limits the caller, rejects
anything that is not `GET` or `HEAD`, validates the shape of the path, looks the name up,
and answers with a 302.

It reaches MySQL through **Hyperdrive**, which pools connections at the edge so each
request does not pay for a fresh database handshake. That matters here more than it would
elsewhere: a redirect is a single cheap query with a person waiting on it, so connection
setup would otherwise dominate the response.

Both `aka.tophhie.cloud` and `aka.tophhie.dev` are custom domains on the same Worker, which
is why the two hosts serve identical links. Generated short URLs always name
`aka.tophhie.cloud`, so it is the canonical one.

Work that does not need to block the redirect is deferred until after the response goes
out: incrementing the usage count, and writing the log row. The visitor is not kept waiting
for bookkeeping.

## The admin Worker

Serves a single-page app and the API behind it, on the same host, with sessions in
**Workers KV** on an 8-hour expiry. Sign-in is OpenID Connect against Microsoft Entra.

It reaches the same MySQL database through its own Hyperdrive binding. There is no
API between the two Workers: the admin writes rows, the redirect Worker reads them, and a
change is live as soon as it is saved.

## Why a redirect can 404 the moment it is switched off

Because the redirect Worker queries the live table on every request. There is no build
step, no cache to purge and no deploy involved in changing a link. It is also why the
`indexed` column can act as an on switch rather than merely a listing flag: the lookup
itself filters on it.

## Failure behaviour

If the database cannot be reached the service answers **503** with a JSON body rather than
hanging or returning a broken page, and logs the failure. A redirect that cannot be
resolved is better refused quickly than left waiting.
