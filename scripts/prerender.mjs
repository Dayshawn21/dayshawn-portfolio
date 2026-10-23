import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
import { Resvg } from '@resvg/resvg-js';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { render } = await server.ssrLoadModule('/src/entry-server.tsx');
  const path = new URL('../dist/index.html', import.meta.url);
  const html = await readFile(path, 'utf8');
  if (!html.includes('<div id="root"></div>')) throw new Error('The HTML shell is missing the root placeholder.');
  const rendered = html.replace('<div id="root"></div>', () => `<div id="root">${render()}</div>`);
  const siteOrigin = process.env.PORTFOLIO_SITE_ORIGIN?.replace(/\/$/, '');
  if (siteOrigin && !/^https:\/\/[a-z0-9.-]+(?::\d+)?$/i.test(siteOrigin)) {
    throw new Error('PORTFOLIO_SITE_ORIGIN must be an HTTPS origin without a path.');
  }
  // During private preview, social images point at the deployed preview origin.
  // Canonical URLs stay on the intended domain to avoid duplicate search results.
  await writeFile(path, siteOrigin ? rendered.replaceAll('https://www.dayshawnterry.com/social-card.png', `${siteOrigin}/social-card.png`) : rendered);
  const svg = await readFile(new URL('../public/social-card.svg', import.meta.url), 'utf8');
  // Static TTF instances of the page's faces (resvg cannot read woff2), so the card matches the site.
  const fontFiles = ['big-shoulders-display-latin-900-normal.ttf', 'big-shoulders-display-latin-700-normal.ttf', 'archivo-latin-400-normal.ttf']
    .map(file => new URL(`./fonts/${file}`, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
  const image = new Resvg(svg, { font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Archivo' }, fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  await writeFile(new URL('../dist/social-card.png', import.meta.url), image);
  console.log('Prerendered portfolio HTML and generated 1200 × 630 social image.');
} finally {
  await server.close();
}
