---
title: Frontmatter
description: The YAML block at the top of every page.
sidebar:
  order: 21
---

Every page opens with a YAML block. Only `title` is required, but always write a
`description` too.

```markdown
---
title: Create an account
description: Sign up for an account on the Tophhie Social PDS.
sidebar:
  label: Sign up
  order: 2
---
```

## Fields

| Field | Required | What it does |
| --- | --- | --- |
| `title` | Yes | The `<h1>`, the browser tab title, and the default sidebar label |
| `description` | Recommended | The meta description, and the snippet shown in search results |
| `sidebar.label` | No | Overrides the sidebar text when the title is too long for the nav |
| `sidebar.order` | No | Position within its group |
| `sidebar.badge` | No | A small pill next to the link, such as `New` |
| `sidebar.hidden` | No | Keeps the page published and searchable but out of the sidebar |
| `tableOfContents` | No | `false` removes the right-hand "On this page" panel |
| `template` | No | `splash` gives a full-width page with no sidebar |
| `prev` / `next` | No | Overrides the footer pagination links |

## Always write a description

It is the snippet a reader sees in search results, and search is how most people arrive.
A page without one shows an arbitrary fragment of its first paragraph, which is rarely the
sentence that tells someone whether to click.

Write it as a statement of what the page covers, not a teaser. One line.

## Titles and sidebar labels

The `title` is the page heading, so write it for someone already on the page. If that makes
it too long for the sidebar, add a shorter `sidebar.label` rather than shortening the title.

Do not repeat the product name in every title. The sidebar is already scoped to one product,
so "Creating an account" beats "Creating a Marvelist account" on a page inside Marvelist.
