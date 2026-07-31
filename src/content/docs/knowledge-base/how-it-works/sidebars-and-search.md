---
title: Sidebars and search
description: Why the sidebar shows one product and search covers them all.
sidebar:
  order: 31
---

## One sidebar per product

A reader inside Marvelist sees Marvelist's pages and nothing else. With ten products, a
single sidebar containing all of them would be unusable.

Starlight has no built-in notion of separate sidebars, so the site builds one full sidebar
from `products.mjs` and then scopes it per route in `src/starlightRouteData.ts`. That
middleware finds the group belonging to the product you are in and replaces the sidebar with
just its entries, recalculating the previous and next links so pagination stays inside the
product.

You should not need to touch it to add content. It reads the config and the folder
structure, so a new product is scoped correctly the moment it is registered.

:::note[One subtlety, if you are working on it]
Starlight caches one sidebar tree per locale and shares it across routes, so the middleware
copies the tree rather than mutating it. Mutating it leaks one product's scoped sidebar into
the next request.
:::

## Search covers everything

Search is deliberately the opposite. Pagefind indexes the whole built site as one corpus, so
one box searches every product at once.

That is the right way round. A reader with a question rarely knows which product owns the
answer, and making them pick a product before searching would mean guessing correctly to
find anything.

Search is built from the output at build time, so a page becomes searchable when the site is
deployed, and the box does nothing in the dev server. Use `npm run preview` to try it.

## The header switcher

The product switcher in the header is built from the same `products.mjs`, and groups
products into Public, Internal and Discontinued.

It is a native select, which cannot express groups on its own, so the groups are built in
the browser. The server-rendered labels carry a suffix such as `(Internal)` so the
distinction survives with JavaScript off, and the script strips that suffix once it has
grouped the option.

## Contributors

Each page lists the people who have worked on it, generated from the git history at build
time by an Astro integration rather than at runtime.

Git runs in the integration rather than in a component, so `node:child_process` stays out of
the Worker bundle. Profiles are resolved once per unique contributor rather than once per
page, which keeps the build inside GitHub's unauthenticated rate limit.
