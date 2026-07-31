---
title: Authoring
description: Writing pages, adding sections, and keeping the structure consistent.
sidebar:
  label: Overview
  order: 20
---

- [Frontmatter](/knowledge-base/authoring/frontmatter/) covers the block at the top of every
  page.
- [Adding content](/knowledge-base/authoring/adding-content/) covers new articles,
  subsections and whole products.
- [Ordering and links](/knowledge-base/authoring/ordering-and-links/) covers sidebar
  position and linking between pages.

## The shape of a section

Every product follows the same pattern, which is what lets a reader move between products
without relearning the layout:

```
src/content/docs/<product>/
├── index.mdx            the product overview, sidebar order 0
├── <subsection>/
│   ├── index.md         the subsection overview
│   └── <article>.md
└── <subsection>/
    └── ...
```

An overview page at every level. A reader who lands on a folder should get an orientation
and a list of what is inside, not a redirect to the first article.

## Three levels, no more

Product, subsection, article. Nesting deeper is possible and is almost always a sign the
subsection is doing too much: split it into two rather than burying pages three clicks down.
