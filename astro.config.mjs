// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import cloudflare from '@astrojs/cloudflare';
import { contributors } from './src/integrations/contributors.mjs';
import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi';
import { localProducts } from './src/data/products.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.tophhie.cloud',

  integrations: [
    // Builds the per-page contributor map from git history. See the file for why
    // this is an integration rather than something a component does directly.
    contributors(),

    starlight({
      title: 'Tophhie Cloud Docs',
      description:
        'Documentation and guides for Tophhie Cloud products.',

      logo: {
        light: './src/assets/brand/logo-colour-on-light.png',
        dark: './src/assets/brand/logo-white-on-dark.png',
        replacesTitle: true,
      },

      favicon: '/favicon.ico',

      head: [
        {
          tag: 'script',
          attrs: {
            async: true,
            src: 'https://www.googletagmanager.com/gtag/js?id=G-JPCMVH5TDL',
          },
        },
        {
          tag: 'script',
          content: [
            'window.dataLayer = window.dataLayer || [];',
            'function gtag(){dataLayer.push(arguments);}',
            "gtag('js', new Date());",
            "gtag('config', 'G-JPCMVH5TDL');",
          ].join('\n'),
        },
      ],

      // The repo is public and open to PRs, so every page gets an "Edit page"
      // link straight to its source file on GitHub. The branch is `master`, which
      // is this repo's default rather than `main`.
      editLink: {
        baseUrl: 'https://github.com/Tophhie/tophhiecloud-docs/edit/master/',
      },

      // Shows when a page was last touched, from git history. Useful on a docs
      // site anyone can contribute to.
      lastUpdated: true,

      customCss: ['./src/styles/tophhie.css'],

      // Appends the per-page contributor list under the page title.
      components: {
        PageTitle: './src/components/PageTitle.astro',
        // The product switcher takes the LanguageSelect slot, which puts it beside
        // the theme picker rather than crowding the logo. Starlight renders that
        // slot in both the desktop header and the mobile menu, and this site is not
        // multilingual so nothing is displaced.
        LanguageSelect: './src/components/ProductSwitch.astro',
      },

      // The Tophhie Cloud API reference is generated from the live OpenAPI
      // document rather than hand-written, so it cannot drift from the API and
      // cannot describe more than the API already publishes at /openapi.json.
      plugins: [
        starlightOpenAPI([
          {
            base: 'tophhie-api/reference',
            schema: 'https://api.tophhie.cloud/openapi.json',
            sidebar: {
              label: 'Endpoint reference',
              collapsed: false,
              // Method badges are omitted from the sidebar: with one badge per
              // entry they crowd the paths, which are the useful part. Each
              // operation page still shows its method beside the path.
              operations: { badges: false, labels: 'path' },
            },
          },
        ]),
      ],

      // Scopes the sidebar below to the current product. See the file for details.
      routeMiddleware: './src/starlightRouteData.ts',

      // Pagefind is on by default; named here so it is obvious the whole
      // knowledge base is indexed as one corpus rather than per product.
      pagefind: true,

      social: [
        {
          icon: 'github',
          label: 'Source on GitHub',
          href: 'https://github.com/Tophhie/tophhiecloud-docs',
        },
      ],

      // One top-level group per product, built from src/data/products.mjs so the
      // sidebar and the landing page's product index cannot disagree.
      // `src/starlightRouteData.ts` then keeps only the group matching the current
      // URL's first segment and promotes its children to the top level, so a
      // product's pages never show another product's tree.
      //
      // To add a product, add it to src/data/products.mjs. See PUBLISHING.md.
      //
      // Ordering inside each product comes from folder structure plus
      // `sidebar.order` in page frontmatter. A folder inherits the lowest
      // `order` of the pages it contains, so setting `sidebar.order` on a
      // subsection's index.md positions the whole subsection.
      sidebar: localProducts.map((product) => ({
        label: product.name,
        collapsed: true,
        items: [
          { autogenerate: { directory: product.directory } },
          // Replaced at build time by the generated reference groups.
          ...(product.reference ? openAPISidebarGroups : []),
        ],
      })),
    }),
  ],

  adapter: cloudflare({
    // Optimise images at build time with sharp rather than through Cloudflare's
    // runtime Images binding. The site is fully prerendered, so there is no reason
    // for images to depend on a `/_image` endpoint being served correctly in
    // production; this emits plain hashed assets under /_astro/ instead.
    imageService: 'compile',

    // Prerender in Node rather than workerd. starlight-openapi renders markdown
    // through satteri during prerender, and in workerd that resolves to satteri's
    // wasm build, which needs WASI support workerd does not implement. Every page
    // here is static, so nothing needs workerd semantics at build time.
    prerenderEnvironment: 'node',
  }),

});
