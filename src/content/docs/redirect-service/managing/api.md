---
title: Admin API
description: The endpoints behind the portal.
sidebar:
  order: 24
---

The portal is a single-page app talking to a REST API on the same host. The endpoints are
documented here because they are the portal's real interface, and because scripting a bulk
change is easier than clicking through one.

:::note
Every `/api/*` endpoint needs a valid session cookie from
[signing in](/redirect-service/managing/signing-in/). There are no API keys and no service
accounts, so anything you script has to carry a session from a real sign-in.
:::

## Endpoints

| Method | Path | What it does |
| --- | --- | --- |
| `GET` | `/api/me` | The signed-in user, or `401` with `authenticated: false` |
| `GET` | `/api/redirects` | Every link, newest edit first |
| `POST` | `/api/redirects` | Create a link |
| `PATCH` | `/api/redirects/:id` | Update a link |
| `DELETE` | `/api/redirects/:id` | Delete a link |
| `POST` | `/api/redirects/:id/toggle-indexed` | Flip whether the link works |
| `POST` | `/api/redirects/:id/toggle-public` | Flip whether it is listed |

`/api/me` is the exception to the session rule in that it answers rather than rejecting:
it returns `authenticated: false` instead of an error, so the app can tell "signed out"
from "broken".

## Creating a link

```json
{
  "title": "Azure DevOps",
  "shortname": "devops",
  "redirect_url": "https://dev.azure.com/tophhie",
  "indexed": true,
  "public": true
}
```

`title`, `shortname` and `redirect_url` are required, and a missing one is a `400`.
`shortname` is validated against letters, numbers, hyphens and underscores, and is
lowercased before it is stored.

`indexed` and `public` are booleans. Remember that `indexed` governs whether the link
resolves at all, not just whether it is listed. See
[Link states](/redirect-service/managing/link-states/).

## Reading the list

`GET /api/redirects` returns every link, including ones that are switched off, under a
`data` key. Each carries its id, title, short name, destination, usage count, both
switches, and when it was last updated.

This is the only view that shows disabled links. The
[public index](/redirect-service/using/the-index/) shows published ones, so the two counts
will not match and are not meant to.

## The two toggles

Separate endpoints because they mean different things, and both flip the current value
rather than taking one:

```bash
curl -X POST https://redirect-admin.tophhie.cloud/api/redirects/42/toggle-indexed \
  -b "$COOKIE"
```

Flipping rather than setting means a retry is not safe: sending the same request twice
returns the link to where it started. If you are scripting against several links, read the
current state first with `GET /api/redirects` and use `PATCH` to set the value you want.
