# Publishing to the Tophhie Cloud knowledge base

> **This guide is now published on the site itself, at
> <https://docs.tophhie.cloud/knowledge-base/>.**
>
> Prefer it: it is searchable alongside everything else, it is navigable rather than
> being one long file, and it is the copy that gets kept current.
>
> | Looking for | Go to |
> | --- | --- |
> | Fixing a page, local setup | <https://docs.tophhie.cloud/knowledge-base/contributing/> |
> | Frontmatter, adding content, ordering | <https://docs.tophhie.cloud/knowledge-base/authoring/> |
> | Sidebars, search, deployment | <https://docs.tophhie.cloud/knowledge-base/how-it-works/> |
>
> What follows is retained for reference and for anyone working offline. Where the two
> disagree, the site is right.

Everything on <https://docs.tophhie.cloud> comes from Markdown files in
`src/content/docs/`. There is no CMS and no database. The folder layout is the site
structure, and the sidebar is generated from it.

Anyone can contribute. This repository is public and pull requests are welcome from
outside the Tophhie Cloud org, and [Contributing](#contributing) has the quickest
route in.

---

## Contents

- [Contributing](#contributing)
- [The three levels](#the-three-levels)
- [Local setup](#local-setup)
- [Frontmatter reference](#frontmatter-reference)
- [Sections (products)](#sections-products)
- [Products documented elsewhere](#products-documented-elsewhere)
- [Subsections](#subsections)
- [Articles](#articles)
- [Controlling order](#controlling-order)
- [Links, images and components](#links-images-and-components)
- [Deleting content safely](#deleting-content-safely)
- [Checks before you open a PR](#checks-before-you-open-a-pr)
- [Deployment](#deployment)

---

## Contributing

The repository is <https://github.com/Tophhie/tophhiecloud-docs> and its default
branch is **`master`**, not `main`.

### Fixing one page

You do not need to clone anything. Every page on the site has an **Edit page** link
at the foot that opens that page's Markdown file in the GitHub editor. GitHub forks
the repo for you, and the "Propose changes" button opens the pull request.

That is the right route for typos, broken links, stale version numbers and
clarifications, which is most contributions.

### Larger changes

Clone (or fork) and work locally, so you can see the result before proposing it:

```bash
git clone https://github.com/Tophhie/tophhiecloud-docs.git
```

```bash
cd tophhiecloud-docs && npm install
```

Then follow [Local setup](#local-setup). Work on a branch, not `master`:

```bash
git switch -c docs/what-you-are-changing
```

Before opening the PR, run through [Checks before you open a
PR](#checks-before-you-open-a-pr). The important one is `npm run build`, which is the
test suite here. A PR that fails it cannot be merged.

### What gets merged

Corrections are always welcome: wrong commands, dead links, changed behaviour. So are
clarifications, where a step assumed knowledge a reader does not have. New articles in
an existing section are fine too, following the house style under
[Articles](#articles).

For a new section, meaning a whole product, open an issue first. Those need a config
change and a decision about whether the product belongs here.

Two things that will be sent back:

- **Secrets in a diff.** Document the variable name and what it does; never the
  value. See [Frontmatter reference](#frontmatter-reference) and the caution under
  [Articles](#articles).
- **Invented specifics.** If you do not know the real port, path, or flag, say so
  in the PR rather than guessing. A `TODO` is more useful than a plausible wrong
  answer.

Not sure a change is wanted? [Open an
issue](https://github.com/Tophhie/tophhiecloud-docs/issues/new) and ask before
writing it.

### You get credited

Every page lists the people who have edited it, under the title, with avatars linking
to their GitHub profiles. It is built from the git history of that specific file, so
once your pull request is merged your name appears on the pages you touched at the
next deploy. Nothing to sign up for and nothing to add to a list.

If you have committed under more than one email address and want them collapsed into
one entry, add yourself to a `.mailmap` in the repository root.

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
├── index.mdx                        ← site root: the product switcher
└── tophhie-social/                  ← section
    ├── index.mdx                    ← section landing page
    ├── getting-started/             ← subsection
    │   ├── index.md                 ← subsection landing page
    │   ├── create-an-account.mdx    ← article
    │   └── choose-a-client.md
    └── technical/
        ├── index.md
        ├── how-it-works/            ← subsections can nest
        └── infrastructure/
```

Tophhie Social is the only section so far. The site is built to hold several
products side by side, each with its own sidebar, so adding the next one is the
routine described under [Sections (products)](#sections-products).

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
title: Create an account
description: Sign up for an account on the Tophhie Social PDS.
sidebar:
  label: Sign up
  order: 2
  badge: New
---
```

| Field | Required | What it does |
| --- | --- | --- |
| `title` | **Yes** | The `<h1>`, the browser tab title, and the default sidebar label |
| `description` | Recommended | Meta description, and the snippet shown in search results |
| `sidebar.label` | No | Overrides the sidebar text when `title` is too long for the nav |
| `sidebar.order` | No | Position within its group. See [Controlling order](#controlling-order) |
| `sidebar.badge` | No | A small pill next to the link, e.g. `New` or `Deprecated` |
| `sidebar.hidden` | No | `true` keeps the page published and searchable but out of the sidebar |
| `tableOfContents` | No | `false` removes the right-hand "On this page" panel |
| `template` | No | `splash` gives a full-width page with no sidebar, used by the site root |
| `prev` / `next` | No | Overrides the footer pagination links |

Always write a `description`. It is what a reader sees in search results, and
search is how most people arrive.

---

## Sections (products)

A section is a product. Adding one is a two-step change: create the folder, then
register the product. Both steps are required, because a folder that is not
registered produces pages with no sidebar and no way to find them.

Registration happens in one place, `src/data/products.mjs`. Both the sidebar and the
landing page's product index are built from it, so a product cannot end up navigable
but undiscoverable, or listed but unreachable.

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

   - [Getting started](/my-product/getting-started/), covering install and first run.
   ```

   `sidebar.order: 0` keeps the landing page pinned above the subsections.

2. **Register it in `src/data/products.mjs`.** Add one entry to the `products`
   array, in the position you want it to appear:

   ```js
   {
     name: 'My Product',
     href: '/my-product/',
     directory: 'my-product',
     icon: 'rocket',
     description: 'One or two sentences for the card on the landing page.',
     linkText: 'Read the My Product docs',
   },
   ```

   `directory` **must exactly match the folder name**, because that string is how
   `src/starlightRouteData.ts` works out which sidebar belongs to which URL. `icon`
   is any [Starlight icon name](https://starlight.astro.build/reference/icons/).

   That is the whole registration. The sidebar group and the landing page card are
   both generated from this entry, so there is no third step and nothing else to keep
   in sync.

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

### Products documented elsewhere

Some products already have their own documentation site. Those are not duplicated
here. They are listed on the landing page and redirected, which means no folder under
`src/content/docs/` and no entry in the `sidebar` array.

Sigil is the worked example. To add another product like it:

1. **Add a redirect** in `public/_redirects`, covering both the bare path and
   anything beneath it:

   ```
   /my-product    https://docs.example.com/  302
   /my-product/*  https://docs.example.com/  302
   ```

   Both rules point at the destination's home page rather than mapping deep paths
   with `:splat`. The two sites' path structures are not guaranteed to match, and a
   mismatch would land readers on a 404 on a site you do not control.

   Use 302 unless the arrangement is settled, because browsers cache 301s hard and a
   wrong one is awkward to undo.

2. **Add it to `src/data/products.mjs`** with an absolute `href` and **no
   `directory`**:

   ```js
   {
     name: 'My Product',
     href: 'https://docs.example.com/',
     icon: 'external',
     description: 'What it is, and a note that its docs live on their own site.',
     linkText: 'Go to docs.example.com',
   },
   ```

   Omitting `directory` is what marks it as hosted elsewhere: it gets a card on the
   landing page but no sidebar group, because there are no pages here to put in one.
   Without this entry the redirect only helps people who already guess the URL.

Redirect rules are a Cloudflare feature rather than an Astro one, so they do nothing
under `astro dev` or `astro preview`. Test them with `npm run build` followed by
`npx wrangler dev`, then request the path:

```bash
curl -sI http://localhost:8788/my-product | head -2
```

### Products with a generated reference

The Tophhie Cloud API section mixes both kinds of page. The guides under
`src/content/docs/tophhie-api/` are hand-written and edited like any other page. The
endpoint reference under `/tophhie-api/reference/` is generated at build time from the
API's own OpenAPI document and has no source files in this repository.

Do not try to edit a reference page. To change what it says, change the API's OpenAPI
document, which for the Tophhie Cloud API means changing the endpoint's schema in the
API repository. The next build here picks it up.

If a product needs the same treatment, add a `starlightOpenAPI` entry in
`astro.config.mjs` pointing at its schema, and spread `openAPISidebarGroups` into that
product's sidebar group alongside its `autogenerate` entry.

---

## Subsections

Subsections need no config change at all, because they are picked up from the folder
structure. This is the normal way to grow a section.

### Add a subsection

```bash
mkdir -p src/content/docs/tophhie-social/moderation
```

Create `src/content/docs/tophhie-social/moderation/index.md`:

```markdown
---
title: Moderation
description: Reporting, labels and takedowns on Tophhie Social.
sidebar:
  label: Overview
  order: 30
---

What this subsection covers, then links to its articles.
```

The sidebar group label comes from the folder name, converted to sentence case, so
`accounts-and-handles` renders as "Accounts and handles". You do not need to configure
the label. Name the folder well and it follows.

### Nesting deeper

Subsections can nest as far as you like. Each level needs its own `index.md`:

```
tophhie-social/accounts-and-handles/migration/index.md
tophhie-social/accounts-and-handles/migration/from-bluesky.md
```

In practice, three levels below a product is usually a sign the section wants
splitting rather than deepening.

---

## Articles

Create a `.md` file in the relevant folder. That is the whole process.

```markdown
---
title: Reporting a post
description: Report a post or account to the Tophhie Social moderators.
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

- **Sentence case for headings.** "Reporting a post", not "Reporting A Post". ALL
  CAPS only ever appears in the logo.
- **Start `##` headings, not `#`.** The `title` frontmatter already produces the
  page's single `<h1>`.
- **Product names are exact:** `Tophhie Cloud`, `Tophhie Social`. Never
  lowercase or all-caps them in body copy.
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
| `tophhie-social/index.md` | `0` |
| `tophhie-social/getting-started/index.md` | `1` |
| `tophhie-social/getting-started/create-an-account.md` | `2` |
| `tophhie-social/getting-started/choose-a-client.md` | `3` |
| `tophhie-social/accounts-and-handles/index.md` | `10` |
| `tophhie-social/accounts-and-handles/custom-handles.md` | `11` |
| `tophhie-social/troubleshooting/index.md` | `20` |
| `tophhie-social/troubleshooting/common-issues.md` | `21` |

To move a subsection, change the `order` on its `index.md` and leave its articles
alone, as long as no article in it has a lower order than the index page.

---

## Links, images and components

**Internal links** use absolute, trailing-slash paths:

```markdown
See [Create an account](/tophhie-social/getting-started/create-an-account/).
```

Root-relative paths survive page moves better than relative ones, and the
trailing slash matches what the site actually serves.

**Images** go next to the article, or in `src/assets/` if shared. Reference them
relatively so Astro optimises and hashes them:

```markdown
![The handle settings screen](./handle-settings.png)
```

Never link a brand asset from `src/assets/brand/` in body copy. Those belong to the
header and the design system.

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
   grep -rn "getting-started/choose-a-client" src/
   ```

2. If the content moved rather than vanished, add a redirect in
   `astro.config.mjs`:

   ```js
   redirects: {
     '/tophhie-social/getting-started/choose-a-client':
       '/tophhie-social/clients/',
   },
   ```

3. If it was genuinely retired with no replacement, prefer marking it deprecated
   over deleting, because a page explaining that something is gone is more use than
   a 404:

   ```markdown
   ---
   title: Choose a client
   sidebar:
     badge:
       text: Deprecated
       variant: caution
   ---

   :::caution[Deprecated]
   This page has moved. See [Clients](/tophhie-social/clients/).
   :::
   ```

**Deleting a subsection.** Delete the folder, then run the `grep` above for the
subsection path. Nothing in `astro.config.mjs` needs changing, because subsections are
never named there.

**Deleting a section.** Delete the folder, **and**:

1. Remove its entry from `src/data/products.mjs`. A stale entry pointing at a missing
   directory will fail the build. Removing it also takes the card off the landing
   page, since both come from that one entry.
2. Add redirects for the section's URLs if they were public.

---

## Checks before you open a PR

```bash
npm run build
```

The build is the test suite here. It fails on broken content: a bad frontmatter field,
a sidebar entry pointing at a directory that does not exist, an image that is not
there. It also rebuilds the Pagefind search index, and the log line reporting
how many HTML files were indexed should match the page count.

Then read your work in a browser:

```bash
npx astro dev --background
```

Check:

- [ ] The page appears in the sidebar, in the position you intended.
- [ ] Only its own product's tree is in the sidebar, with no other product's pages.
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
  is only searchable after a deploy. It indexes every product as one corpus, so a
  single search box covers the whole knowledge base regardless of which product's
  sidebar the reader is looking at.
- **Design comes from the Tophhie Cloud Design System.** Tokens live in
  `src/styles/tophhie.css`, mirrored from the design system's
  `colors_and_type.css`. Brand assets are in `src/assets/brand/`. If the design
  system changes upstream, update that one file rather than styling pages
  individually.
- **The sidebar-scoping logic** lives in `src/starlightRouteData.ts`. You should
  not need to touch it to add content; it reads the config and folder structure.
