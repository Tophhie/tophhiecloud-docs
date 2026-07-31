---
title: Contributing
description: How to fix a page, propose a larger change, and what gets merged.
sidebar:
  label: Overview
  order: 10
---

The docs are open source and corrections are welcome from anyone. A typo fix and a new
product section are both pull requests; they differ only in how much you need set up first.

- [Editing a page](/knowledge-base/contributing/editing-a-page/) needs nothing but a GitHub
  account.
- [Local setup](/knowledge-base/contributing/local-setup/) covers running the site when a
  change is bigger than one page.

## Three levels of change

| You want to | Do this |
| --- | --- |
| Fix a typo or a wrong sentence | Use the **Edit page** link at the foot of the page |
| Add or restructure pages | Clone the repository and work locally |
| Add a whole product | Clone, create the folder, and register the product |

Most contributions are the first kind, and the edit link handles the whole flow in a
browser: it opens the source file on GitHub, and saving proposes a pull request.

## What gets merged

Anything that makes a page more accurate. Corrections, clarifications, missing steps and
fixed links need no discussion.

Two things worth knowing before a larger change:

- **Structure follows the existing pattern.** A new product section looks like the ones
  already there, for the reasons in [Authoring](/knowledge-base/authoring/).
- **Claims should be checkable.** This is documentation for real systems, and a page that
  describes behaviour nobody can verify is worse than no page. Where you can, cite the
  setting, the screen or the file that makes it true.

If you are unsure whether something is wanted, open an issue before writing it.

## Writing style

Match the surrounding pages. Briefly: plain sentences, British spelling, no marketing tone,
and no filler. Say what the thing does, then what it means for the reader.

Where a feature has a trap in it, document the trap. Half the value of these pages is in
sentences like "turning this off does not hide the link, it disables it", and those only
get written by whoever just found out.

## You get credited

Contributors are listed at the top of each page they have worked on, generated from the
commit history. There is nothing to sign up for.
