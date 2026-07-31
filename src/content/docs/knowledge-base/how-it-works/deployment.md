---
title: Deployment
description: How the site gets published.
sidebar:
  order: 32
---

```bash
npm run deploy
```

That runs `astro build` then `wrangler deploy`, publishing `dist/` to Cloudflare Workers
static assets on the `docs.tophhie.cloud` custom domain declared in `wrangler.jsonc`.

The site is fully prerendered, so deploying is uploading files. There is no server to
restart and no cache to warm.

## What happens at build time

Four things worth knowing, because each has caught someone out:

- **Search is indexed.** Pagefind runs over the built HTML, so a page is searchable only
  after a deploy.
- **The API reference is generated** from the live OpenAPI schema. A build therefore
  depends on that schema being reachable, and changes to the API appear in the docs on the
  next build rather than immediately.
- **Images are optimised**, which is why an image can look wrong in the dev server and be
  correct in the build.
- **Contributors are read from git history**, so a fresh clone with no history produces
  pages with no contributors listed.

## Sitemap and redirects

A sitemap is generated at build and submitted to search engines from
`sitemap-index.xml`.

Redirects live in `public/_redirects`, which is a Cloudflare file copied to the output
untouched. It is where redirects for products documented on their own sites go, and where
to add one when a page moves.

## If the build fails

The build is strict on purpose: broken links, missing images, bad frontmatter and a sidebar
entry pointing at a missing folder all fail it rather than reaching the site.

That is the intended safety net, and it is why `npm run build` is worth running before
opening a pull request rather than after a review.
