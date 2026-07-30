# Publishing to the Tophhie Cloud knowledge base

Everything on <https://docs.tophhie.cloud> comes from Markdown files in
`src/content/docs/`. There is no CMS and no database — the folder layout *is* the
site structure, and the sidebar is generated from it.

Read this before adding, editing, or removing content.

---

## Contents

- [The three levels](#the-three-levels)
- [Local setup](#local-setup)
- [Frontmatter reference](#frontmatter-reference)
- [Sections (products)](#sections-products)
- [Subsections](#subsections)
- [Articles](#articles)
- [Controlling order](#controlling-order)
- [Links, images and components](#links-images-and-components)
- [Deleting content safely](#deleting-content-safely)
- [Checks before you open a PR](#checks-before-you-open-a-pr)
- [Deployment](#deployment)

---

## The three levels

| Level | On disk | On the site | Sidebar |
| --- | --- | --- | --- |
| **Section** (a product) | Top-level folder under `src/content/docs/` | `/<section>/` | Gets its own sidebar. Nothing from other sections appears in it. |
| **Subsection** | Folder inside a section | `/<section>/<subsection>/` | A collapsible group inside that section's sidebar |
| **Article** | `.md` / `.mdx` file | `/<section>/<subsection>/<article>/` | A link inside its group |

Current layout:

```
src/content/docs/
├── index.mdx                  ← site root: the product switcher
├── sigil/                     ← section
│   ├── index.md               ← section landing page
│   ├── getting-started/       ← subsection
│   │   ├── index.md           ← subsection landing page
│   │   ├── installation.md    ← article
│   │   └── first-steps.md
│   ├── configuration/
│   └── troubleshooting/
├── tophhie-social/
└── immich/
```

Two rules matter more than anything else in this document:

1. **Every folder needs an `index.md`.** Without one, the folder has no landing
   page and readers who trim the URL get a 404.
2. **Folder names become URLs.** Use lowercase kebab-case: `getting-started`, not
   `Getting Started` or `getting_started`. Renaming a folder changes a live URL.

---

## Local setup

```bash
npm install
```

Start the dev server (background mode, per this repo's convention):

```bash
npx astro dev --background
```

It serves on <http://localhost:4321> and reloads as you save. Manage it with:

```bash
npx astro dev status
```

```bash
npx astro dev logs
```

```bash
npx astro dev stop
```

---

## Frontmatter reference

Every page starts with a YAML block. Only `title` is required.

```markdown
---
title: Installation
description: Install Sigil on a supported platform.
sidebar:
  label: Install
  order: 2
  badge: New
---
```

| Field | Required | What it does |
| --- | --- | --- |
| `title` | **Yes** | The `<h1>`, the browser tab title, and the default sidebar label |
| `description` | Recommended | Meta description, and the snippet shown in search results |
| `sidebar.label` | No | Overrides the sidebar text when `title` is too long for the nav |
| `sidebar.order` | No | Position within its group — see [Controlling order](#controlling-order) |
| `sidebar.badge` | No | A small pill next to the link, e.g. `New` or `Deprecated` |
| `sidebar.hidden` | No | `true` keeps the page published and searchable but out of the sidebar |
| `tableOfContents` | No | `false` removes the right-hand "On this page" panel |
| `template` | No | `splash` gives a full-width page with no sidebar — used by the site root |
| `prev` / `next` | No | Overrides the footer pagination links |

Always write a `description`. It is what a reader sees in search results, and
search is how most people arrive.

---

## Sections (products)

A section is a product. Adding one is a two-step change: create the folder, then
register it in the config. **Both steps are required** — a folder with no config
entry produces pages with no sidebar.

### Add a section

1. **Create the folder and its landing page.**

   ```bash
   mkdir -p src/content/docs/my-product
   ```

   `src/content/docs/my-product/index.md`:

   ```markdown
   ---
   title: My Product
   description: Documentation for My Product.
   sidebar:
     label: Overview
     order: 0
   ---

   What this product is, and who these docs are for.

   ## What's here

   - **[Getting started](/my-product/getting-started/)** — install and first run.
   ```

   `sidebar.order: 0` keeps the landing page pinned above the subsections.

2. **Register it in `astro.config.mjs`.** Add one entry to the `sidebar` array:

   ```js
   sidebar: [
     // …existing products
     {
       label: 'My Product',
       collapsed: true,
       items: [{ autogenerate: { directory: 'my-product' } }],
     },
   ],
   ```

   The `label` is what readers see. The `directory` **must exactly match the
   folder name** — that string is how `src/starlightRouteData.ts` works out which
   sidebar belongs to which URL.

3. **Add it to the product switcher** at `src/content/docs/index.mdx` — both a
   `hero.actions` entry and a `<Card>`. Nothing does this automatically.

### Rename a section

Renaming the folder changes every URL beneath it. If the old URLs are public, add
redirects in `astro.config.mjs` in the same commit:

```js
export default defineConfig({
  redirects: {
    '/old-name': '/my-product',
    '/old-name/[...slug]': '/my-product/[...slug]',
  },
  // …
});
```

Then update the `directory` in the sidebar config and every internal link that
pointed at the old path.

---

## Subsections

Subsections need no config change at all — they are picked up from the folder
structure. This is the normal way to grow a section.

### Add a subsection

```bash
mkdir -p src/content/docs/sigil/backup-and-restore
```

Create `src/content/docs/sigil/backup-and-restore/index.md`:

```markdown
---
title: Backup and restore
description: Back up Sigil and restore from a backup.
sidebar:
  label: Overview
  order: 30
---

What this subsection covers, then links to its articles.
```

The sidebar group label comes from the folder name, converted to sentence case —
`backup-and-restore` renders as **Backup and restore**. You do not need to
configure the label; name the folder well and it follows.

### Nesting deeper

Subsections can nest as far as you like. Each level needs its own `index.md`:

```
sigil/configuration/advanced/index.md
sigil/configuration/advanced/tuning.md
```

In practice, three levels below a product is usually a sign the section wants
splitting rather than deepening.

---

## Articles

Create a `.md` file in the relevant folder. That is the whole process.

```markdown
---
title: Restoring from a backup
description: Restore a Sigil instance from an existing backup archive.
sidebar:
  order: 32
---

## Before you start

What the reader needs in place.

## Steps

1. First step.
2. Second step.

## Verifying it worked

How the reader confirms success.
```

House style, briefly:

- **Sentence case for headings.** "Restoring from a backup", not "Restoring From
  A Backup". ALL CAPS only ever appears in the logo.
- **Start `##` headings, not `#`.** The `title` frontmatter already produces the
  page's single `<h1>`.
- **Product names are exact:** `Tophhie Cloud`, `Tophhie Social`, `Sigil`.
- **Lead troubleshooting entries with the symptom**, not the cause. That is what
  readers search for.
- **Be specific.** Avoid "seamlessly", "powerful", "simply".
- **Never commit secrets.** Document the variable name and what it does; keep the
  value in the deployment's secret store.

Use `.mdx` instead of `.md` only when you need components (cards, tabs, steps).

---

## Controlling order

Autogenerated sidebars sort by `sidebar.order` ascending, then alphabetically by
slug for ties. Pages without an `order` sort last.

**A folder inherits the lowest `order` of any page inside it.** This is the one
non-obvious rule, and it is how subsections get positioned: you order a whole
subsection by setting `order` on its `index.md`.

The convention in this repo is to leave gaps of 10 between subsections so a new
one can be slotted in without renumbering:

| Page | `order` |
| --- | --- |
| `sigil/index.md` | `0` |
| `sigil/getting-started/index.md` | `1` |
| `sigil/getting-started/installation.md` | `2` |
| `sigil/getting-started/first-steps.md` | `3` |
| `sigil/configuration/index.md` | `10` |
| `sigil/configuration/environment-variables.md` | `11` |
| `sigil/troubleshooting/index.md` | `20` |
| `sigil/troubleshooting/common-issues.md` | `21` |

To move a subsection, change the `order` on its `index.md` and leave its articles
alone — as long as no article in it has a *lower* order than the index page.

---

## Links, images and components

**Internal links** use absolute, trailing-slash paths:

```markdown
See [Installation](/sigil/getting-started/installation/).
```

Root-relative paths survive page moves better than relative ones, and the
trailing slash matches what the site actually serves.

**Images** go next to the article, or in `src/assets/` if shared. Reference them
relatively so Astro optimises and hashes them:

```markdown
![The Sigil dashboard](./dashboard.png)
```

Never link a brand asset from `src/assets/brand/` in body copy — those belong to
the header and the design system.

**Components** need an `.mdx` file and an import:

```mdx
import { Aside, Steps, Tabs, TabItem } from '@astrojs/starlight/components';
```

Plain Markdown gets callouts without any import:

```markdown
:::note
Useful context.
:::

:::tip
A shortcut worth knowing.
:::

:::caution
Something that will bite.
:::

:::danger
Something destructive or irreversible.
:::
```

These pick up the design system's semantic colours automatically. Don't hand-roll
coloured boxes.

---

## Deleting content safely

Deleting a file removes a live URL. Anyone who bookmarked it, and every search
engine that indexed it, gets a 404.

**Deleting an article.** Delete the file, then:

1. Search the repo for inbound links and fix them:

   ```bash
   grep -rn "sigil/getting-started/installation" src/
   ```

2. If the content moved rather than vanished, add a redirect in
   `astro.config.mjs`:

   ```js
   redirects: {
     '/sigil/getting-started/installation': '/sigil/installing/',
   },
   ```

3. If it was genuinely retired with no replacement, prefer marking it deprecated
   over deleting — a page explaining that something is gone is more use than a
   404:

   ```markdown
   ---
   title: Installation
   sidebar:
     badge:
       text: Deprecated
       variant: caution
   ---

   :::caution[Deprecated]
   Sigil is now installed via the platform installer. See
   [Installing](/sigil/installing/).
   :::
   ```

**Deleting a subsection.** Delete the folder, then run the `grep` above for the
subsection path. Nothing in `astro.config.mjs` needs changing — subsections are
never named there.

**Deleting a section.** Delete the folder, **and**:

1. Remove its entry from the `sidebar` array in `astro.config.mjs`. A stale entry
   pointing at a missing directory will fail the build.
2. Remove its `hero.actions` entry and its `<Card>` from
   `src/content/docs/index.mdx`.
3. Add redirects for the section's URLs if they were public.

---

## Checks before you open a PR

```bash
npm run build
```

The build is the test suite. It fails on broken content — a bad frontmatter
field, a sidebar entry pointing at a directory that does not exist, an image that
is not there. It also rebuilds the Pagefind search index; the log line reporting
how many HTML files were indexed should match the page count.

Then read your work in a browser:

```bash
npx astro dev --background
```

Check:

- [ ] The page appears in the sidebar, in the position you intended.
- [ ] Only its own product's tree is in the sidebar — no other product's pages.
- [ ] The prev/next links at the foot of the page stay inside the product.
- [ ] Search finds the page by a phrase from its body, not just its title.
- [ ] It reads correctly in **both** light and dark themes (use the header
      toggle). Never hardcode a colour that only works in one.
- [ ] It reads correctly at mobile width.

---

## Deployment

The site is a fully prerendered Astro + Starlight build deployed to Cloudflare
Workers Static Assets at **docs.tophhie.cloud**.

```bash
npm run deploy
```

That runs `astro build` then `wrangler deploy`, publishing `dist/` and attaching
the `docs.tophhie.cloud` custom domain declared in `wrangler.jsonc`.

Notes:

- **Search is built at deploy time.** Pagefind indexes the built HTML, so a page
  is only searchable after a deploy. It indexes every product as one corpus — a
  single search box covers the whole knowledge base regardless of which product's
  sidebar the reader is looking at.
- **Design comes from the Tophhie Cloud Design System.** Tokens live in
  `src/styles/tophhie.css`, mirrored from the design system's
  `colors_and_type.css`. Brand assets are in `src/assets/brand/`. If the design
  system changes upstream, update that one file rather than styling pages
  individually.
- **The sidebar-scoping logic** lives in `src/starlightRouteData.ts`. You should
  not need to touch it to add content; it reads the config and folder structure.
