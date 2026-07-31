/**
 * Every product in the knowledge base, in the order they should appear.
 *
 * This is the single source of truth. `astro.config.mjs` builds the sidebar from it,
 * and the landing page builds its product index from it, so adding a product here is
 * enough for it to be navigable and discoverable. The previous arrangement kept those
 * two lists separately by hand and they drifted apart within a day.
 *
 * Products documented on their own site have an absolute `href` and no `directory`.
 * They get a card and a redirect, but no sidebar entry, because there are no pages
 * here to put in one. Redirects still live in `public/_redirects`, which is a
 * Cloudflare file rather than something Astro can generate.
 *
 * @typedef {object} Product
 * @property {string} name          Display name, used for the card and the sidebar group.
 * @property {string} href          Where the card links. Absolute URL for external docs.
 * @property {string} icon          A Starlight icon name.
 * @property {string} description   One or two sentences for the card.
 * @property {string} [directory]   Folder under src/content/docs/. Omit if hosted elsewhere.
 * @property {boolean} [reference]  True if the product also has a generated OpenAPI reference.
 * @property {string} [linkText]    Card link text. Defaults to "Read the docs".
 * @property {boolean} [internal]   True for products that are not open to public sign-up or
 *                                  use. Adds an "Internal" badge to the landing page card and
 *                                  groups the product separately in the header switcher, so
 *                                  nobody works through a guide for something they cannot get.
 *                                  Set it only where the whole product is internal: a public
 *                                  product with a staff-only admin area is not internal.
 */

/** @type {Product[]} */
export const products = [
	{
		name: 'Marvelist',
		href: '/marvelist/',
		directory: 'marvelist',
		icon: 'approve-check',
		description:
			'Tasks, notes, lists and event planning across iPhone, iPad, Apple Watch and the web, with Marvelist AI and Premium.',
		linkText: 'Read the Marvelist docs',
	},
	{
		name: 'Tophhie Social',
		href: '/tophhie-social/',
		directory: 'tophhie-social',
		icon: 'comment',
		description:
			'A UK-hosted AT Protocol server, the network Bluesky runs on. Sign up for a handle, bring an account across from Bluesky, or read how the server and its infrastructure work.',
		linkText: 'Read the Tophhie Social docs',
	},
	{
		name: 'Tophhie Cloud API',
		href: '/tophhie-api/',
		directory: 'tophhie-api',
		reference: true,
		icon: 'puzzle',
		description:
			'A public REST API covering Tophhie Cloud services, from domain records to Tophhie Social statistics. Most of it needs no authentication, and the full endpoint reference is generated from the API itself.',
		linkText: 'Read the API docs',
	},
	{
		name: 'MCP Server',
		href: '/mcp/',
		directory: 'mcp',
		icon: 'server',
		description:
			'A Model Context Protocol server at mcp.tophhie.cloud, giving AI assistants read-only tools for Tophhie Cloud domains, policies and Tophhie Social.',
		linkText: 'Read the MCP docs',
	},
	{
		name: 'Redirect Service',
		href: '/redirect-service/',
		directory: 'redirect-service',
		icon: 'random',
		description:
			'Short links on aka.tophhie.cloud, with a published index anyone can browse. Creating and managing links is internal to Tophhie Cloud.',
		linkText: 'Read the Redirect Service docs',
	},
	{
		name: 'Zero Trust Block Page',
		href: '/block-page/',
		directory: 'block-page',
		icon: 'seti:svelte',
		description:
			'An open-source replacement for the default Cloudflare Zero Trust block page. Clone it, change one config file, and it is your organisation’s.',
		linkText: 'Read the Block Page docs',
	},
	{
		name: 'Tophhie Cloud Account',
		href: '/account/',
		directory: 'account',
		icon: 'setting',
		description:
			'The self-service portal at myaccount.tophhie.cloud, where you manage your Tophhie Cloud profile, password, sign-in methods and account security.',
		linkText: 'Read the account docs',
	},
	{
		name: 'Authentication for Swift',
		href: '/authentication-swift/',
		directory: 'authentication-swift',
		internal: true,
		icon: 'padlock',
		description:
			'An internal Swift framework that signs iOS apps in to the Tophhie Cloud Entra External ID tenant. Used by Tophhie Cloud internally only.',
		linkText: 'Read the framework docs',
	},
	{
		name: 'Zero Trust Log Viewer',
		href: '/zt-log-viewer/',
		directory: 'zt-log-viewer',
		internal: true,
		icon: 'analytics',
		description:
			'An internal tool for querying Cloudflare Zero Trust Gateway logs, with dashboards and PDF export. Used by Tophhie Cloud internally only.',
		linkText: 'Read the log viewer docs',
	},
	{
		name: 'Sigil',
		href: 'https://docs.usesigil.app/',
		icon: 'external',
		description:
			'Centrally managed email signatures for Microsoft 365, applied automatically as people write. Sigil keeps its documentation on its own site.',
		linkText: 'Go to docs.usesigil.app',
	},
];

/**
 * Products documented on this site, which are the ones that need a sidebar.
 *
 * The cast narrows `directory` to a required string. TypeScript cannot infer that
 * through `.filter()`, and the sidebar config needs it to be defined.
 *
 * @type {(Product & { directory: string })[]}
 */
export const localProducts = /** @type {any} */ (
	products.filter((product) => product.directory)
);
