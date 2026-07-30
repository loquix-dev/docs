import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const docsDirectory = path.join(root, 'src/content/docs');
const publicDirectory = path.join(root, 'public');

async function walk(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = await Promise.all(
		entries.map((entry) => {
			const target = path.join(directory, entry.name);
			return entry.isDirectory() ? walk(target) : target;
		}),
	);
	return files.flat();
}

function routeFor(file) {
	const relative = path
		.relative(docsDirectory, file)
		.replaceAll(path.sep, '/')
		.replace(/\.(md|mdx)$/, '');

	if (relative === 'index') return '/';
	if (relative.endsWith('/index')) return `/${relative.slice(0, -'/index'.length)}/`;
	return `/${relative}/`;
}

function normalizeRoute(url) {
	const pathname = decodeURIComponent(url.split(/[?#]/, 1)[0]);
	if (pathname === '/') return pathname;
	return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

const docsFiles = (await walk(docsDirectory)).filter((file) => /\.(md|mdx)$/.test(file));
const publicFiles = await walk(publicDirectory);
const routes = new Set(docsFiles.map(routeFor));
const assets = new Set(
	publicFiles.map((file) => `/${path.relative(publicDirectory, file).replaceAll(path.sep, '/')}`),
);
const failures = [];

for (const file of docsFiles) {
	const source = await readFile(file, 'utf8');
	const links = new Set();
	const patterns = [
		/\]\((\/[^)\s]+)\)/g,
		/(?:href|link)=["'](\/[^"']+)["']/g,
		/^\s*link:\s*["']?(\/[^'"\s]+)["']?\s*$/gm,
	];

	for (const pattern of patterns) {
		for (const match of source.matchAll(pattern)) links.add(match[1]);
	}

	for (const link of links) {
		const pathname = decodeURIComponent(link.split(/[?#]/, 1)[0]);
		const hasExtension = /\.[a-z0-9]+$/i.test(pathname);
		const exists = hasExtension ? assets.has(pathname) : routes.has(normalizeRoute(pathname));

		if (!exists) {
			failures.push(`${path.relative(root, file)} → ${link}`);
		}
	}
}

if (failures.length > 0) {
	console.error('Broken internal links:\n');
	console.error(failures.map((failure) => `- ${failure}`).join('\n'));
	process.exit(1);
}

console.log(`Checked ${docsFiles.length} pages and ${routes.size} internal routes.`);
