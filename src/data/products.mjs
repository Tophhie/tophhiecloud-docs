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
 */

/** @type {Product[]} */
export const products = [
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
		icon: 'padlock',
		description:
			'An internal Swift framework that signs iOS apps in to the Tophhie Cloud Entra External ID tenant. Used by Tophhie Cloud internally only.',
		linkText: 'Read the framework docs',
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
