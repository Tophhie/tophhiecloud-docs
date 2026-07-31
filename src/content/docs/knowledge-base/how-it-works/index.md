---
title: How it works
description: The mechanics behind the site.
sidebar:
  label: Overview
  order: 30
---

- [Sidebars and search](/knowledge-base/how-it-works/sidebars-and-search/) covers the
  per-product navigation and the single search index.
- [Deployment](/knowledge-base/how-it-works/deployment/) covers how the site gets published.

## The stack

| | |
| --- | --- |
| Framework | Astro, with the Starlight documentation theme |
| Content | Markdown and MDX under `src/content/docs/` |
| Search | Pagefind, built from the output at build time |
| API reference | `starlight-openapi`, generated from the live OpenAPI schema |
| Hosting | Cloudflare Workers static assets |
| Styling | Tokens from the Tophhie Cloud Design System, in `src/styles/tophhie.css` |

Everything is prerendered. There is no server, no database and no runtime rendering: the
build produces HTML and Cloudflare serves it.

## Design

Colours and type come from the design system, mapped onto Starlight's own variables in one
stylesheet. If the design system changes upstream, that file is the only thing to update.

Styling individual pages is the thing to avoid. A page with its own colours stops matching
the rest of the site the next time the tokens move.
