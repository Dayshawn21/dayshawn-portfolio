// Runs the taste-skill checks (copy-lint, layout consistency, perf) against the live site
// once a pushed commit has finished deploying on Vercel, and writes a short report.
//
//   node scripts/check-live.mjs [--sha <commit>] [--no-wait]
//
// Started in the background by .git/hooks/pre-push after a push to master; also runnable by hand
// (npm run check:live). Needs the design-taste-frontend skill on this machine (TASTE_SKILL_DIR or
// ~/.claude/skills/design-taste-frontend) and, to wait for the deploy, an authenticated `gh` CLI.
// Reports land in .taste-skill/live-checks/ (git-ignored): latest.md plus one log per run.
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const site = 'https://www.dayshawnterry.com/';
const repo = 'Dayshawn21/dayshawn-portfolio';
const skill = process.env.TASTE_SKILL_DIR || path.join(os.homedir(), '.claude', 'skills', 'design-taste-frontend');
const outDir = path.join(root, '.taste-skill', 'live-checks');
const profile = path.join(root, '.taste-skill', 'chrome-check');

const args = process.argv.slice(2);
const sha = args.includes('--sha') ? args[args.indexOf('--sha') + 1] : (await run('git', ['rev-parse', 'HEAD'], { cwd: root })).stdout.trim();
const wait = !args.includes('--no-wait');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const log = [];
const note = line => { log.push(line); console.log(line); };

await mkdir(outDir, { recursive: true });
if (!existsSync(path.join(skill, 'scripts', 'consistency.mjs'))) {
  note(`Taste skill not found at ${skill}; skipping live checks.`);
  process.exit(0);
}

// Wait for Vercel's GitHub status on this commit to report the finished deployment.
async function deployState() {
  const { stdout } = await run('gh', ['api', `repos/${repo}/commits/${sha}/statuses`, '--jq', '[.[] | select(.context == "Vercel")][0].state // ""'], { cwd: root });
  return stdout.trim();
}
if (wait) {
  note(`Waiting for the Vercel deployment of ${sha.slice(0, 7)}...`);
  const deadline = Date.now() + 15 * 60 * 1000;
  let state = '';
  while (Date.now() < deadline) {
    try { state = await deployState(); } catch { state = 'unknown'; }
    if (state === 'success' || state === 'failure' || state === 'error') break;
    await sleep(15000);
  }
  if (state !== 'success') {
    note(`Deployment state for ${sha.slice(0, 7)} is "${state || 'none'}"; not running live checks.`);
    await writeFile(path.join(outDir, 'latest.md'), `# Live checks: skipped\n\n${log.join('\n')}\n`);
    process.exit(0);
  }
  await sleep(20000); // let the CDN pick up the new build
}

async function tool(script, scriptArgs) {
  try {
    const { stdout, stderr } = await run('node', [path.join(skill, script), ...scriptArgs], { cwd: root, maxBuffer: 64 * 1024 * 1024, timeout: 10 * 60 * 1000 });
    return stdout + stderr;
  } catch (error) {
    return `${error.stdout ?? ''}${error.stderr ?? ''}`; // the checkers exit non-zero when they report a FAIL
  }
}

const html = await (await fetch(site, { cache: 'no-store' })).text();
const htmlFile = path.join(outDir, 'live.html');
await writeFile(htmlFile, html);

note('Running copy-lint...');
const copy = await tool('scripts/copy-lint.mjs', [htmlFile, '--kind', 'service']);
note('Running the layout consistency check...');
const consistency = await tool('scripts/consistency.mjs', [site, '--widths', '1440,1024,820,768,390', '--rhythm-widths', '1440,820,768,390', '--profile', profile, '--page', 'service', '--category', 'frontend software engineer for hire', '--primary', 'Download resume']);
note('Running the perf check...');
const perf = await tool('scripts/perf.mjs', [site, '--profile', profile]);

// Count findings per check so each run can be compared with the previous one.
const counts = {};
for (const match of consistency.matchAll(/^ {2}(FAIL|WARN) +(\S+)/gm)) counts[`${match[1]} ${match[2]}`] = (counts[`${match[1]} ${match[2]}`] ?? 0) + 1;
const countsFile = path.join(outDir, 'counts.json');
const previous = existsSync(countsFile) ? JSON.parse(await readFile(countsFile, 'utf8')) : null;
const changes = previous
  ? [...new Set([...Object.keys(previous.counts), ...Object.keys(counts)])].sort()
      .filter(key => (previous.counts[key] ?? 0) !== (counts[key] ?? 0))
      .map(key => `- ${key}: ${previous.counts[key] ?? 0} -> ${counts[key] ?? 0}`)
  : [];

const pick = (text, pattern) => text.match(pattern)?.[0]?.trim() ?? 'not found';
const report = [
  `# Live checks for ${sha.slice(0, 7)}`,
  '',
  `Site: ${site}  `,
  `Run: ${new Date().toLocaleString()}`,
  '',
  `- Copy-lint: ${pick(copy, /\(\d+ words\)\s+[^\n]+/)}`,
  `- Layout consistency: ${pick(consistency, /total +\d+ FAIL +\d+ WARN/)}`,
  `- Perf: ${pick(perf, /SUMMARY[^\n]+/)}`,
  '',
  previous ? `## Changes since ${previous.sha.slice(0, 7)}` : '## First run (nothing to compare with yet)',
  '',
  ...(previous ? (changes.length ? changes : ['- No change in findings.']) : []),
  '',
  '## Perf warnings and failures',
  '',
  ...perf.split('\n').filter(line => /^\s+(WARN|FAIL)\s/.test(line)).map(line => `- ${line.trim().replace(/\s{2,}/g, ' | ')}`),
  '',
  `Full output: live-checks/${stamp}.log`,
  '',
].join('\n');

await writeFile(path.join(outDir, `${stamp}.log`), [log.join('\n'), '\n== copy-lint ==\n', copy, '\n== consistency ==\n', consistency, '\n== perf ==\n', perf].join('\n'));
await writeFile(path.join(outDir, 'latest.md'), report);
await writeFile(countsFile, JSON.stringify({ sha, counts }, null, 2));
console.log(`\n${report}`);
