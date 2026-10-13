import { createHash } from 'node:crypto';
import { cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';

// Publish only site/, with content-based CSS and script URLs on every page.
// Preview pages receive the same cache versioning as the homepage.
const source = new URL('../site/', import.meta.url);
const output = new URL('../dist/', import.meta.url);
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });

async function versionPages(directory, relative = '') {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relativePath = relative + entry.name;
    if (entry.isDirectory()) {
      await versionPages(new URL(entry.name + '/', directory), relativePath + '/');
    } else if (entry.name.endsWith('.html')) {
      const page = new URL(entry.name, directory);
      let html = await readFile(page, 'utf8');
      const references = [...html.matchAll(/\b(?:href|src)="([^"?]+\.(?:css|js))"/g)];
      for (const [attribute, reference] of references) {
        const asset = new URL(reference, page);
        if (!asset.href.startsWith(source.href)) throw new Error('Only local site assets may be versioned.');
        const version = createHash('sha256').update(await readFile(asset)).digest('hex').slice(0, 16);
        html = html.replace(attribute, attribute.replace(reference, `${reference}?v=${version}`));
      }
      await writeFile(new URL(relativePath, output), html);
    }
  }
}
await versionPages(source);
console.log('Prepared dist/ with versioned stylesheets and scripts on every page.');
