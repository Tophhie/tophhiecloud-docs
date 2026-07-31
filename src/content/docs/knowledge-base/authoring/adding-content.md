---
title: Adding content
description: New articles, new subsections, and new products.
sidebar:
  order: 22
---

## An article

Create a Markdown file in the subsection folder, with `title`, `description` and a
`sidebar.order`. That is the whole job: the sidebar is generated from the folder, so there
is no index to register it in.

## A subsection

Create a folder inside the product, and give it an `index.md` with
`sidebar.label: Overview` and an `order`. Then add the articles.

The overview page is not optional. A subsection whose folder has no `index.md` produces a
sidebar group a reader can expand but not click, which is a dead end.

## A product

Two steps, and both are required.

**1. Create the folder** under `src/content/docs/`, with an `index.mdx` overview at
`sidebar.order: 0`.

**2. Register it** in `src/data/products.mjs`:

```js
{
  name: 'Redirect Service',
  href: '/redirect-service/',
  directory: 'redirect-service',
  icon: 'random',
  description: 'One or two sentences for the landing page card.',
  linkText: 'Read the Redirect Service docs',
},
```

`directory` must match the folder name exactly. That entry is what puts the product in the
sidebar, the header switcher and the landing page at once.

### Optional flags

| Field | Use it for |
| --- | --- |
| `reference: true` | A product with a generated OpenAPI reference |
| `internal: true` | A product not open to public sign-up or use |
| `discontinued: true` | A product no longer maintained |

`internal` and `discontinued` add a badge to the landing page card and group the product
separately in the header switcher, so nobody works through a guide for something they
cannot get or should not adopt.

Set `internal` only where the whole product is internal. A public product with a staff-only
admin area is not internal, and badging it as such tells people they cannot use something
they can.

### Products documented elsewhere

A product whose docs live on its own site gets an entry with an absolute `href` and **no**
`directory`. It appears on the landing page and in the switcher, but has no sidebar, because
there are no pages here to put in one.

Add a redirect in `public/_redirects` so the path on this site sends people to the real
docs. That file is a Cloudflare one rather than something Astro generates.

## Deleting

Deleting a page is safe: nothing references it by ID. Deleting a **product** means removing
its folder and its entry in `products.mjs`, and both are required, because an entry pointing
at a folder that does not exist fails the build.

Before deleting anything with traffic, add a redirect to whatever replaces it. A 404 on a
link somebody has bookmarked is worse than a page that says "this moved".
