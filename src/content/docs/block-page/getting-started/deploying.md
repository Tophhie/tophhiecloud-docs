---
title: Deploying
description: Put the page on Cloudflare and point Zero Trust at it.
sidebar:
  order: 12
---

The repository ships a `wrangler.toml` that serves the built `dist/` directory as Workers
static assets. There is no Worker script: it is files on Cloudflare's edge.

## Deploy

```bash
npm run build
```

```bash
npx wrangler deploy
```

There is no `deploy` script in `package.json`, so call Wrangler directly. Deploying without
building first ships whatever was in `dist/` last time, which is the easiest mistake to
make here.

The Worker is named `cf-zero-trust-blockpage` in `wrangler.toml`. Change that if you are
deploying into an account that already has one, or if you would rather it were named for
your organisation.

## Give it a hostname

The config sets `workers_dev = false`, so the page is not published on a `workers.dev`
address. Add a custom domain or a route in the Cloudflare dashboard, or set one in
`wrangler.toml`, and use that hostname.

Pick something a blocked user will not find alarming. They are going to see it in the
address bar at a moment when they have just been stopped from doing something, and
`blocked.example.com` reads better than a string of hex.

## Point Zero Trust at it

In the Cloudflare dashboard, under **Zero Trust → Settings → Custom Pages**, set the block
page to your hostname. Cloudflare then appends its own query parameters when it sends
someone there, which is what the page reads.

Cloudflare decides which parameters to send. The page does not request them and cannot ask
for more, so what appears in the details panel depends on the policy that did the blocking.
See [Parameters](/block-page/reference/parameters/).

## Check it end to end

Trigger a real block rather than trusting the local preview. Two things only show up in a
real test:

- **Which parameters your policies actually send.** They vary by policy type, and the panel
  will only ever show what arrives.
- **Whether the mail button works from a managed device.** The button relies on a `mailto:`
  handler, so on a device with no mail client configured it does nothing visible. If your
  fleet is in that state, lead with the support website instead.

## Logging

`wrangler.toml` enables Workers logs with persistence. That gives you a record of block
page hits, which is useful for spotting a policy that is blocking far more than intended.

It also means the URLs are logged, and those URLs contain the blocked user's email address,
IP and device ID. Treat those logs as containing personal data, and set retention
accordingly.
