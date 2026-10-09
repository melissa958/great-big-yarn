import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';

// Publish a static copy with a content-based stylesheet URL so an existing
// browser session sees new CSS immediately after each GitHub Pages deployment.
const source = new URL('../site/', import.meta.url);
const output = new URL('../dist/', import.meta.url);
const css = await readFile(new URL('styles/main.css', source));
const version = createHash('sha256').update(css).digest('hex').slice(0, 16);
const html = await readFile(new URL('index.html', source), 'utf8');
const stylesheet = 'href="./styles/main.css"';
if (!html.includes(stylesheet)) throw new Error('Expected homepage stylesheet link is missing.');
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });
await writeFile(new URL('index.html', output), html.replace(stylesheet, `href="./styles/main.css?v=${version}"`));
console.log(`Prepared dist/ with stylesheet version ${version}.`);
