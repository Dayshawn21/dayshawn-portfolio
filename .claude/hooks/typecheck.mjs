// PostToolUse: type-check the project after Claude edits a TypeScript file in src/.
// Exit code 2 feeds the compiler errors back to Claude so it can fix them.
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

let input = '';
for await (const chunk of process.stdin) input += chunk;
const filePath = JSON.parse(input || '{}').tool_input?.file_path ?? '';
if (!/[\\/]src[\\/].+\.tsx?$/.test(filePath)) process.exit(0);

const root = fileURLToPath(new URL('../../', import.meta.url));
const tsc = fileURLToPath(new URL('../../node_modules/typescript/bin/tsc', import.meta.url));
const result = spawnSync(process.execPath, [tsc, '--noEmit', '--pretty', 'false'], { cwd: root, encoding: 'utf8' });
if (result.status !== 0) {
  process.stderr.write(`Type check failed after editing ${filePath}:\n${result.stdout}${result.stderr}`);
  process.exit(2);
}
