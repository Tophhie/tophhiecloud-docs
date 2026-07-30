// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.tophhie.cloud',

  integrations: [
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

      // The repo is public and open to PRs, so every page gets an "Edit page"
      // link straight to its source file on GitHub. Branch is `master` — the
      // repo's default — not `main`.
      editLink: {
        baseUrl: 'https://github.com/Tophhie/tophhiecloud-docs/edit/master/',
      },

      // Shows when a page was last touched, from git history. Useful on a docs
      // site anyone can contribute to.
      lastUpdated: true,

      customCss: ['./src/styles/tophhie.css'],

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

      // One top-level group per product. `src/starlightRouteData.ts` keeps only
      // the group matching the current URL's first segment and promotes its
      // children to the top level, so a product's pages never show another
      // product's tree. Add a product by adding an entry here whose `directory`
      // matches its folder under src/content/docs/ — see PUBLISHING.md.
      //
      // Ordering inside each product comes from folder structure plus
      // `sidebar.order` in page frontmatter. A folder inherits the lowest
      // `order` of the pages it contains, so setting `sidebar.order` on a
      // subsection's index.md positions the whole subsection.
      sidebar: [
        {
          label: 'Tophhie Social',
          collapsed: true,
          items: [{ autogenerate: { directory: 'tophhie-social' } }],
        },
      ],
    }),
  ],

  adapter: cloudflare(),
});
