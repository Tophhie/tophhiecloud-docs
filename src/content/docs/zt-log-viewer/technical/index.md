---
title: How it works
description: Architecture, access control and deployment of the Zero Trust Log Viewer.
sidebar:
  label: How it works
  order: 30
---

One Cloudflare Worker serves both the interface and the API. There is no separate
frontend deployment and no database.

```
browser
   │
   ▼
Cloudflare Access ─────── challenges the request before the Worker sees it
   │
   ▼
Worker (zt-logs.tophhie.cloud)
   ├── /api/*  ──▶ Hono routes ──▶ Cloudflare Log Explorer
   └── /*      ──▶ static React UI, served from [assets]
```

## Access control

Cloudflare Access sits in front of the Worker with a single-user policy, so an
unauthorised request never reaches the application.

The Worker does not rely on that alone. It verifies the Access JWT itself on every
request: fetching the team's signing keys, checking the RSA signature, and confirming the
`aud` claim matches the application's AUD tag. A request with no token, a token signed by
someone else, or a valid token for a different Access application is rejected.

That belt-and-braces approach matters because the Worker is reachable at a public
hostname. Access is the front door, and JWT verification is what stops anyone who finds a
way around it.

Local development sets the AUD to a sentinel value that skips verification, which is
also why local development must never be pointed at production credentials.

## Data flow

The Worker holds a scoped Cloudflare API token and queries
[Log Explorer](https://developers.cloudflare.com/logs/log-explorer/) on your behalf. It
builds the SQL from your dataset, date range, filter and limit, runs it, and returns the
rows.

Nothing is cached and nothing is stored. Every result is fetched live, and closing the
tab leaves no copy behind. The only artefacts are the PDFs you
[export](/zt-log-viewer/guides/exporting/) deliberately.

Dashboard requests fan out into several aggregate queries, batched to stay inside Log
Explorer's concurrency limit, which is why they take longer than a single query over the
same range.

## The API token

The token needs three permissions:

| Permission | Why |
| --- | --- |
| Account, Logs, Write | Log Explorer queries are issued as writes |
| Account, Account Analytics, Read | Aggregate data behind the dashboard |
| Account, Zero Trust, PII Read | Resolves emails and device names rather than opaque IDs |

That third one is what makes this a privileged credential. Without it the logs are far
less useful; with it, the token can read the identities behind the traffic. It is stored
as a Worker secret, never in the repository.

## Stack

| Layer | What |
| --- | --- |
| Interface | React 18, built with Vite, served from Worker static assets |
| API | Hono on Cloudflare Workers |
| Validation | Zod on query input |
| Export | jsPDF with html2canvas |
| Data | Cloudflare Log Explorer |
| Auth | Cloudflare Access, with JWT verification in the Worker |

Observability logging is enabled on the Worker, including invocation logs.

## Deploying

`npm run deploy` builds the interface and deploys the Worker in one step. The account ID
lives in `wrangler.toml`; the API token and the Access AUD tag are Worker secrets set with
`wrangler secret put`.

If the Access application is recreated, its AUD tag changes and the secret has to be
updated, otherwise every request fails verification even though Access itself lets people
through.
