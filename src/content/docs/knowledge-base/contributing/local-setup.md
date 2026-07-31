---
title: Local setup
description: Running the site on your own machine.
sidebar:
  order: 12
---

```bash
git clone https://github.com/Tophhie/tophhiecloud-docs.git
```

```bash
cd tophhiecloud-docs && npm install && npx astro dev --background
```

That serves the site at `localhost:4321` and reloads as you write.

## Commands

| Command | What it does |
| --- | --- |
| `npx astro dev --background` | Dev server, in the background |
| `npm run dev` | Dev server in the foreground |
| `npm run build` | Build to `dist/`, and the closest thing this repo has to a test suite |
| `npm run preview` | Build, then serve the built output |
| `npm run deploy` | Build and deploy to Cloudflare |

## Build is the test suite

`npm run build` fails on broken content: bad frontmatter, a sidebar entry pointing at a
directory that does not exist, a missing image, a link to a page that is not there.

Run it before opening a pull request. It is faster than waiting for a review to tell you the
same thing.

## Two things that only work in a build

**Search.** Pagefind indexes the built HTML, so the search box does nothing in `astro dev`.
Use `npm run preview` to try it.

**Images.** Images are optimised at build time, so an image can appear broken in the dev
server and be perfectly correct in the built site. Check with `npm run preview` before
concluding anything is wrong.

## Checks before a pull request

1. `npm run build` passes.
2. The pages you touched look right in `npm run preview`.
3. New pages appear in the sidebar where you expected.
4. Internal links go where they should.
