import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Bundle the already-built page into one locally reviewable HTML file.
// The production files remain unchanged. No files are uploaded.
const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
let html = await readFile(path.join(dist, 'index.html'), 'utf8');
const scriptTag = html.match(/<script\b[^>]*\bsrc="([^\"]+\.js)"[^>]*><\/script>/);
const styleTag = html.match(/<link\b[^>]*\brel="stylesheet"[^>]*\bhref="([^\"]+)"[^>]*>/);
if (!scriptTag || !styleTag) throw new Error('Build the Vite application before generating an offline preview.');

function assetPath(url) {
  const file = path.resolve(dist, `.${url}`);
  if (!file.startsWith(`${dist}${path.sep}`)) throw new Error(`Asset is outside the build: ${url}`);
  return file;
}

const pdf = await readFile(path.join(dist, 'Dayshawn_Terry_Resume.pdf'));
const resume = `data:application/pdf;base64,${pdf.toString('base64')}`;
let script = await readFile(assetPath(scriptTag[1]), 'utf8');
const originalResume = JSON.stringify('/Dayshawn_Terry_Resume.pdf');
if (!script.includes(originalResume)) throw new Error('The offline resume reference could not be located in the build.');
// Update both rendered HTML and the client constant so hydration agrees.
script = script.replaceAll(originalResume, JSON.stringify(resume));
html = html.replaceAll('href="/Dayshawn_Terry_Resume.pdf"', `href="${resume}"`);

// Same treatment for the project screenshots, which content.ts references by path.
for (const file of ['lineform-how-it-works.png', 'lineform-how-it-works-mobile.png', 'sports-analyst-agent.jpg']) {
  const screenshotPath = `/${file}`;
  const screenshot = `data:image/${file.endsWith('.jpg') ? 'jpeg' : 'png'};base64,${(await readFile(path.join(dist, file))).toString('base64')}`;
  if (!script.includes(JSON.stringify(screenshotPath))) throw new Error(`The offline reference to ${file} could not be located in the build.`);
  script = script.replaceAll(JSON.stringify(screenshotPath), JSON.stringify(screenshot));
  html = html.replaceAll(`src="${screenshotPath}"`, `src="${screenshot}"`).replaceAll(`srcSet="${screenshotPath}"`, `srcSet="${screenshot}"`).replaceAll(`srcset="${screenshotPath}"`, `srcset="${screenshot}"`);
}

let css = await readFile(assetPath(styleTag[1]), 'utf8');
for (const match of [...css.matchAll(/url\(([^)]+)\)/g)]) {
  const url = match[1].replace(/^['"]|['"]$/g, '');
  if (!url.startsWith('/assets/')) continue;
  const font = await readFile(assetPath(url));
  css = css.replaceAll(match[0], `url(data:font/woff2;base64,${font.toString('base64')})`);
}
const icon = await readFile(path.join(dist, 'favicon.svg'));
html = html.replace('href="/favicon.svg"', `href="data:image/svg+xml;base64,${icon.toString('base64')}"`);
html = html.replace(styleTag[0], () => `<style>${css}</style>`);
html = html.replace(scriptTag[0], () => `<script type="module">${script.replaceAll('</script', '<\\/script')}</script>`);

const previewDirectory = path.join(root, '.preview');
await mkdir(previewDirectory, { recursive: true });
await writeFile(path.join(previewDirectory, 'index.html'), html);
console.log('Offline preview ready: .preview/index.html (HTML, fonts, application, and original resume embedded).');
