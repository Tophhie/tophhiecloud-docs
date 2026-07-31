---
title: Ordering and links
description: Sidebar position, and linking between pages.
sidebar:
  order: 23
---

## Ordering

Sidebar position comes from `sidebar.order`, ascending, within each group. Overview pages
take `0` within a product and the lowest number within a subsection.

The convention across this site is to number in blocks of ten per subsection, so Marvelist's
lists section runs 10 to 22 and its events section 40 to 47. That leaves room to insert a
page without renumbering the rest.

:::caution[Duplicate orders are not an error]
Two pages with the same `order` build fine and then sort unpredictably, which usually shows
up as one page mysteriously above another after an unrelated change.

Check the numbers in a section after adding to it. The build will not tell you.
:::

Pages with no `order` sort after the numbered ones, alphabetically.

## Links

Link between pages with **root-relative paths ending in a slash**:

```markdown
See [Link states](/redirect-service/managing/link-states/).
```

Not relative paths, and not file names. The build checks these, so a link to a page that
does not exist fails the build rather than reaching the site.

Link to a heading with its anchor, which is the heading lowercased and hyphenated:

```markdown
See [exporting the list](/marvelist/events/guests-and-households/#exporting-the-list).
```

Anchors are checked too, so renaming a heading that others link to will be caught.

## Writing a good link

The link text should describe the destination, not the act of clicking. "See
[Link states](/redirect-service/managing/link-states/)" tells a reader what they will get;
"click [here](/redirect-service/managing/link-states/)" does not, and reads badly to anyone
using a screen reader who is listing the links on a page.

## Components

Starlight's components are available in `.mdx` files, and the ones used here are asides,
cards and badges:

```mdx
:::caution[Archiving does not free a slot]
Archiving leaves the event counting against your two.
:::
```

Use `:::note` for an aside, `:::caution` for something that will bite, and `:::danger` for
data loss or a security consequence. Keep them rare. A page where everything is a callout
has nothing emphasised at all.
