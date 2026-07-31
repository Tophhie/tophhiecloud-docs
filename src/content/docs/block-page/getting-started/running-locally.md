---
title: Running it locally
description: Clone the repository and get the page on screen.
sidebar:
  order: 11
---

```bash
git clone https://github.com/Tophhie/cf-zero-trust-blockpage.git
```

```bash
cd cf-zero-trust-blockpage && npm install && npm run dev
```

That serves the page on the address Vite prints, usually `http://localhost:5173`.

## Seeing it with real detail

Opening the dev server plainly shows the page in its no-metadata state, because there are
no parameters on the URL. That is a legitimate state to look at, but it is not the one most
people will see.

To see the full version, append some parameters:

```
http://localhost:5173/?cf_user_email=someone@example.com&cf_site_uri=https://example.com/blocked&cf_rule_id=abc123&cf_source_ip=203.0.113.10
```

Now the details panel has something in it, and the **Request access** button produces a
useful email. Test with the parameters your own Zero Trust policies actually send, since
that is what your users will get.

## Building

```bash
npm run build
```

The build writes a static site to `dist/`. There is no server component: the page reads
everything it needs from the URL in the browser, which is why it can be hosted as plain
files.

Other scripts in the repository, if you are working on it rather than just branding it:

| Command | What it does |
| --- | --- |
| `npm run preview` | Serves the built output, to check the real build rather than dev |
| `npm run check` | Type-checks the Svelte and TypeScript |
| `npm run lint` | Prettier and ESLint |
| `npm run format` | Rewrites files with Prettier |

Worth running `npm run preview` at least once before you deploy. It is the closest thing to
what Cloudflare will actually serve.
