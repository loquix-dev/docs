// Every version this site prints for a Loquix package must match the version it
// actually depends on. The two drifted once already: a commit moved the pinned
// dependency from 0.4.1 to 0.5.0 and left every version string in the content
// behind, so the install command told readers to fetch a release the rest of
// the site no longer described. Nothing caught it, because nothing was looking.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf-8'));

// The site depends on core directly. The adapter is documented but not
// installed — nothing on the site imports it — so its expected version is
// declared here instead of being read from the dependency tree.
const expected = {
  '@loquix/core': pkg.dependencies['@loquix/core'],
  '@loquix/adapter-http': '0.1.0',
};

for (const [name, version] of Object.entries(expected)) {
  if (!version || !/^\d+\.\d+\.\d+$/.test(version)) {
    console.error(`check-versions: no exact version known for ${name} (got ${version})`);
    process.exit(1);
  }
}

const files = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === 'dist' || entry.startsWith('.')) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.(mdx?|mjs|js|ts|astro)$/.test(entry)) files.push(full);
  }
})(join(root, 'src'));
files.push(join(root, 'astro.config.mjs'));

// Matches a version attached to a package name (`@loquix/core@1.2.3`,
// `"@loquix/core": "1.2.3"`, `@loquix/core` 1.2.3) and the bare `vX.Y.Z`
// badges, which only ever refer to core.
const problems = [];

for (const file of files) {
  const text = readFileSync(file, 'utf-8');
  text.split('\n').forEach((line, index) => {
    for (const [name, want] of Object.entries(expected)) {
      const escaped = name.replace('/', '\\/');
      const attached = new RegExp(`${escaped}(?:@|["'\`:\\s]+v?)(\\d+\\.\\d+\\.\\d+)`, 'g');
      for (const match of line.matchAll(attached)) {
        if (match[1] !== want) {
          problems.push({ file, line: index + 1, found: match[0], want: `${name} ${want}` });
        }
      }
    }
    for (const match of line.matchAll(/(?<![\w.])v(\d+\.\d+\.\d+)(?![\w.])/g)) {
      if (match[1] !== expected['@loquix/core']) {
        problems.push({
          file,
          line: index + 1,
          found: match[0],
          want: `v${expected['@loquix/core']}`,
        });
      }
    }
  });
}

if (problems.length > 0) {
  console.error(
    `check-versions: ${problems.length} version string(s) disagree with what this site depends on\n`,
  );
  for (const { file, line, found, want } of problems) {
    console.error(`  ${relative(root, file)}:${line}  found ${found}, expected ${want}`);
  }
  console.error('\nUpdate the content, or the pinned dependency, so the two agree.');
  process.exit(1);
}

const summary = Object.entries(expected)
  .map(([name, version]) => `${name} ${version}`)
  .join(', ');
console.log(`check-versions: every version string agrees (${summary}), ${files.length} files.`);
