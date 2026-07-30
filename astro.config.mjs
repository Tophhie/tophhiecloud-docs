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
        'Documentation and guides for every Tophhie Cloud product — Sigil, Tophhie Social, Immich and more.',

      logo: {
        light: './src/assets/brand/logo-colour-on-light.png',
        dark: './src/assets/brand/logo-white-on-dark.png',
        replacesTitle: true,
      },

      favicon: '/favicon.ico',

      customCss: ['./src/styles/tophhie.css'],

      // Scopes the sidebar below to the current product. See the file for details.
      routeMiddleware: './src/starlightRouteData.ts',

      // Pagefind is on by default; named here so it is obvious the whole
      // knowledge base is indexed as one corpus rather than per product.
      pagefind: true,

      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/tophhie',
        },
      ],

      // One top-level group per product. `src/starlightRouteData.ts` keeps only
      // the group matching the current URL's first segment and promotes its
      // children to the top level, so /sigil/* never shows Immich's tree.
      //
      // Ordering inside each product comes from folder structure plus
      // `sidebar.order` in page frontmatter. A folder inherits the lowest
      // `order` of the pages it contains, so setting `sidebar.order` on a
      // subsection's index.md positions the whole subsection.
      sidebar: [
        {
          label: 'Sigil',
          collapsed: true,
          items: [{ autogenerate: { directory: 'sigil' } }],
        },
        {
          label: 'Tophhie Social',
          collapsed: true,
          items: [{ autogenerate: { directory: 'tophhie-social' } }],
        },
        {
          label: 'Immich',
          collapsed: true,
          items: [{ autogenerate: { directory: 'immich' } }],
        },
      ],
    }),
  ],

  adapter: cloudflare(),
});
