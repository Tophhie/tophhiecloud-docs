import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);

const VIRTUAL_ID = 'virtual:tophhie/contributors';
const RESOLVED_ID = '\0' + VIRTUAL_ID;

/**
 * Builds a map of `filePath -> contributors` from local git history, and resolves
 * each contributor to a GitHub profile so the page can show avatars.
 *
 * Two things shape the design:
 *
 * Git runs here, in an integration, rather than inside a component. Components are
 * bundled for the Cloudflare Worker, and `node:child_process` has no business being
 * in that bundle. The result is handed to components through a virtual module, so
 * they only ever see plain JSON.
 *
 * Profiles are resolved once per unique contributor rather than once per page. A
 * naive implementation costs one GitHub request per page and would exhaust the
 * unauthenticated limit of 60 per hour within a few builds. This costs one request
 * per person, and nothing at all for anyone committing with a GitHub noreply
 * address, since their user ID and login are already in the email.
 *
 * Everything degrades rather than fails. No git, a shallow clone, no network or a
 * rate-limited API all end with fewer contributors shown, never a broken build.
 */
export function contributors(options = {}) {
	const { docsDir = 'src/content/docs', ignore = [] } = options;

	return {
		name: 'tophhie-contributors',
		hooks: {
			'astro:config:setup'({ updateConfig, logger }) {
				updateConfig({
					vite: {
						plugins: [
							{
								name: 'tophhie-contributors-virtual',
								resolveId(id) {
									return id === VIRTUAL_ID ? RESOLVED_ID : undefined;
								},
								async load(id) {
									if (id !== RESOLVED_ID) return;
									const data = await collect({ docsDir, ignore, logger });
									return `export default ${JSON.stringify(data)};`;
								},
							},
						],
					},
				});
			},
		},
	};
}

async function git(args) {
	const { stdout } = await run('git', args, { maxBuffer: 32 * 1024 * 1024 });
	return stdout;
}

async function collect({ docsDir, ignore, logger }) {
	try {
		await git(['rev-parse', '--is-inside-work-tree']);
	} catch {
		logger.warn('Not a git repository. Contributor lists will be empty.');
		return {};
	}

	try {
		const shallow = (await git(['rev-parse', '--is-shallow-repository'])).trim();
		if (shallow === 'true') {
			logger.warn(
				'Shallow clone detected, so contributor lists will be incomplete. Fetch full history to fix it.'
			);
		}
	} catch {
		// Older git without --is-shallow-repository. Not worth failing over.
	}

	const files = (await git(['ls-files', '--', docsDir]))
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line.endsWith('.md') || line.endsWith('.mdx'));

	const ignored = new Set(ignore.map((entry) => entry.toLowerCase()));
	const byFile = {};
	const people = new Map();

	for (const file of files) {
		let log;
		try {
			// %an and %ae honour .mailmap, so an author who has committed under several
			// addresses can be collapsed into one entry without touching this code.
			log = await git(['log', '--follow', '--format=%an%x00%ae', '--', file]);
		} catch {
			continue;
		}

		const counts = new Map();
		for (const line of log.split('\n')) {
			if (!line) continue;
			const [name, email] = line.split('\0');
			if (!name || !email) continue;
			if (isBot(name, email) || ignored.has(name.toLowerCase()) || ignored.has(email.toLowerCase())) {
				continue;
			}
			const key = email.toLowerCase();
			const existing = counts.get(key);
			if (existing) existing.commits += 1;
			else counts.set(key, { name, email, commits: 1 });
			if (!people.has(key)) people.set(key, { name, email });
		}

		if (counts.size) {
			byFile[file] = [...counts.values()].sort((a, b) => b.commits - a.commits);
		}
	}

	const profiles = await resolveProfiles([...people.values()], logger);

	for (const list of Object.values(byFile)) {
		for (const person of list) {
			const profile = profiles.get(person.email.toLowerCase());
			if (profile) Object.assign(person, profile);
			delete person.email;
		}
	}

	return byFile;
}

function isBot(name, email) {
	return /\[bot\]$/i.test(name) || /(^|\+)(dependabot|github-actions|renovate)\[bot\]@/i.test(email);
}

/** `12345+octocat@users.noreply.github.com` carries both the ID and the login. */
function fromNoreply(email) {
	const withId = email.match(/^(\d+)\+([^@]+)@users\.noreply\.github\.com$/i);
	if (withId) {
		return {
			login: withId[2],
			avatar: `https://avatars.githubusercontent.com/u/${withId[1]}?s=96&v=4`,
			profile: `https://github.com/${withId[2]}`,
		};
	}
	const legacy = email.match(/^([^@+]+)@users\.noreply\.github\.com$/i);
	if (legacy) {
		return {
			login: legacy[1],
			avatar: `https://github.com/${legacy[1]}.png?size=96`,
			profile: `https://github.com/${legacy[1]}`,
		};
	}
	return null;
}

async function resolveProfiles(people, logger) {
	const resolved = new Map();
	const needsLookup = [];

	for (const person of people) {
		const local = fromNoreply(person.email);
		if (local) resolved.set(person.email.toLowerCase(), local);
		else needsLookup.push(person);
	}

	if (!needsLookup.length) return resolved;

	const repo = await originRepo();
	if (!repo) {
		logger.warn('No GitHub origin remote found, so contributors will show without avatars.');
		return resolved;
	}

	const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'tophhiecloud-docs' };
	const token = process.env.GITHUB_TOKEN;
	if (token) headers.Authorization = `Bearer ${token}`;

	for (const person of needsLookup) {
		try {
			const url = `https://api.github.com/repos/${repo}/commits?author=${encodeURIComponent(person.email)}&per_page=1`;
			const response = await fetch(url, { headers });
			if (!response.ok) {
				if (response.status === 403) {
					logger.warn(
						'GitHub API rate limit reached, so some contributors will show without avatars. Set GITHUB_TOKEN to raise the limit.'
					);
					break;
				}
				continue;
			}
			const [commit] = await response.json();
			const author = commit?.author;
			if (author?.login) {
				resolved.set(person.email.toLowerCase(), {
					login: author.login,
					avatar: `${author.avatar_url}${author.avatar_url.includes('?') ? '&' : '?'}s=96`,
					profile: author.html_url,
				});
			}
		} catch {
			// Offline builds still work; those contributors just render without avatars.
		}
	}

	return resolved;
}

async function originRepo() {
	try {
		const remote = (await git(['remote', 'get-url', 'origin'])).trim();
		const match = remote.match(/github\.com[/:]([^/]+\/[^/]+?)(?:\.git)?$/i);
		return match ? match[1] : null;
	} catch {
		return null;
	}
}
