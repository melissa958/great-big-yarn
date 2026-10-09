import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('../site/', import.meta.url)));
const errors = [];
const fail = (file, message) => errors.push(`${path.relative(root, file)}: ${message}`);

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const file = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) fail(file, 'Symlinks cannot be published.');
    else if (entry.isDirectory()) files.push(...await filesIn(file));
    else files.push(file);
  }
  return files;
}

async function checkReference(file, reference) {
  if (/^(https?:|mailto:|tel:|data:)/i.test(reference)) return;
  if (!reference || reference === '#' || reference.startsWith('/')) {
    fail(file, `Empty or root-relative reference: ${reference}`);
    return;
  }
  const [rawPath, fragment] = reference.split('#');
  const localPath = decodeURIComponent(rawPath.split('?')[0]);
  let target = localPath ? path.resolve(path.dirname(file), localPath) : file;
  if (target !== root && !target.startsWith(root + path.sep)) {
    fail(file, `Reference escapes the published directory: ${reference}`);
    return;
  }
  try {
    if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
    assert((await stat(target)).size > 0);
    if (fragment && target.endsWith('.html')) {
      const html = await readFile(target, 'utf8');
      const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]);
      assert(ids.includes(decodeURIComponent(fragment)), 'Missing fragment target');
    }
  } catch {
    fail(file, `Missing, empty, or invalid target: ${reference}`);
  }
}

const files = await filesIn(root);
assert(files.includes(path.join(root, 'index.html')), 'site/index.html is required');
for (const file of files) {
  if (!(await stat(file)).size) fail(file, 'Empty file.');
  if (!/\.(html|css)$/.test(file)) continue;
  const text = await readFile(file, 'utf8');
  if (/figma\.com\/api\/mcp\/asset|localhost|127\.0\.0\.1|data-pending=/.test(text)) {
    fail(file, 'Temporary asset URL, local server URL, or unresolved implementation marker.');
  }
  if (file.endsWith('.html')) {
    if (!/<html\s+lang=["']en["']/.test(text)) fail(file, 'Declare the page language.');
    if (!/<meta\s+name=["']viewport["']/.test(text)) fail(file, 'Missing responsive viewport.');
    if ((text.match(/<h1\b/g) ?? []).length !== 1) fail(file, 'Use one primary heading.');
    if (!/<title>[^<]+<\/title>/.test(text)) fail(file, 'Missing title.');
    for (const [img] of text.matchAll(/<img\b[^>]*>/g)) {
      if (!/\balt=["'][^"']*["']/.test(img)) fail(file, 'An image is missing alt text.');
    }
    for (const match of text.matchAll(/\b(?:src|href)=["']([^"']*)["']/g)) {
      await checkReference(file, match[1]);
    }
  } else {
    for (const match of text.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
      await checkReference(file, match[1]);
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validated ${files.length} site files: local references, non-empty assets, and basic HTML requirements.`);
  console.log('Visual fidelity, responsive layout, and keyboard behavior still require browser review.');
}
