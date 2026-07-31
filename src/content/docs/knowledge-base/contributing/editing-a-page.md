---
title: Editing a page
description: Fixing something without cloning anything.
sidebar:
  order: 11
---

Every page has an **Edit page** link at the bottom. It opens that page's Markdown source in
the GitHub editor, already on a branch you can propose.

The flow is:

1. Click **Edit page** at the foot of the page.
2. Make the change. GitHub forks the repository for you if you do not have write access.
3. Describe what you changed in a sentence.
4. Open the pull request.

No clone, no Node, no build. This is the right route for anything up to about a page of
prose.

## What you are editing

Markdown, with a YAML block at the top called frontmatter. Leave the frontmatter alone
unless you mean to change the title or the sidebar; everything below it is ordinary
Markdown.

If you are adding a heading, use `##` and below. The page's `title` is already the `<h1>`,
so a second one throws the "On this page" panel out.

See [Frontmatter](/knowledge-base/authoring/frontmatter/) if you do need to touch it.

## When to stop and clone instead

Move to [local setup](/knowledge-base/contributing/local-setup/) if you are:

- adding or deleting pages, rather than editing one
- moving pages between sections
- adding a product
- changing anything with an image in it

The browser editor cannot run the build, and the build is what catches broken links and bad
frontmatter before they reach the site.
