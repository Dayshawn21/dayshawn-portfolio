// PreToolUse: the resume in public/ must stay byte-for-byte identical to the supplied original.
// Blocks edits, writes, and shell commands that would delete, move, or overwrite it. Reading is allowed.
let input = '';
for await (const chunk of process.stdin) input += chunk;
const { tool_name: tool, tool_input: args = {} } = JSON.parse(input || '{}');
const resume = /public[\\/]+Dayshawn_Terry_Resume\.pdf/i;

let blocked = false;
if (tool === 'Edit' || tool === 'Write' || tool === 'NotebookEdit') {
  blocked = resume.test(args.file_path ?? '');
} else if (tool === 'Bash' || tool === 'PowerShell') {
  const command = args.command ?? '';
  if (resume.test(command)) {
    const mutates = /\b(rm|mv|del|erase|truncate|shred|Remove-Item|Move-Item|Rename-Item|Set-Content|Add-Content|Clear-Content|Out-File)\b/i.test(command);
    // Redirected into, or the last argument of a copy/tee (its destination).
    const target = `["']?[^\\s"'|;&]*${resume.source}["']?`;
    const isDestination = new RegExp(`>>?\\s*${target}`, 'i').test(command)
      || new RegExp(`\\b(cp|copy|Copy-Item|tee)\\b[^|;&]*\\s${target}\\s*($|[|;&])`, 'i').test(command);
    blocked = mutates || isDestination;
  }
}

if (blocked) {
  process.stderr.write('Blocked: public/Dayshawn_Terry_Resume.pdf must stay identical to the original. Ask the user to replace it themselves.');
  process.exit(2);
}
