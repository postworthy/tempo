import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ignoredDirectories = new Set([
  '.git',
  '.template-init-backup',
  'dist',
  'node_modules',
  'TEMPLATE_HISTORY',
]);

const requiredHeadings = {
  'PROJECT-BRIEF.md': [
    '# PROJECT-BRIEF',
    'Onboarding Mode',
    'One-Sentence Project Goal',
    'Problem Statement (In User Words)',
    'First Version Outcomes (Must Have)',
    'Out of Scope (Must Not Build Yet)',
    'V1 Done Criteria',
  ],
  'SPEC.md': [
    '# SPEC -',
    'Product Objective',
    'Functional Requirements',
    'Constraints',
    'Acceptance Criteria',
    'Canonical Verification',
    'Safety and Capability Boundaries',
    'Non-Goals',
  ],
  'VERIFY.md': [
    '# VERIFY.md - Tempo Verification Contract',
    '## Canonical Verification Gate (Required)',
    '## Git Policy Gate (Required)',
  ],
};

const canonicalCommandFiles = [
  'AGENTS.md',
  'BOOTSTRAP.md',
  'GETTING_STARTED.md',
  'README.md',
  'SPEC.md',
  'VERIFY.md',
];

function markdownFiles(root) {
  const files = [];
  const visit = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!ignoredDirectories.has(entry.name)) {
          visit(join(directory, entry.name));
        }
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(join(directory, entry.name));
      }
    }
  };
  visit(root);
  return files;
}

function validateFenceBalance(root, problems) {
  for (const file of markdownFiles(root)) {
    const content = readFileSync(file, 'utf8');
    const fences = content.match(/^\s*(```|~~~)/gm) ?? [];
    if (fences.length % 2 !== 0) {
      problems.push(`${relative(root, file)} has an unbalanced Markdown code fence`);
    }
  }
}

export function validateContracts(root = process.cwd()) {
  const absoluteRoot = resolve(root);
  const problems = [];

  validateFenceBalance(absoluteRoot, problems);

  for (const [file, headings] of Object.entries(requiredHeadings)) {
    const path = join(absoluteRoot, file);
    if (!existsSync(path)) {
      problems.push(`${file} is missing`);
      continue;
    }
    const content = readFileSync(path, 'utf8');
    for (const heading of headings) {
      if (!content.includes(heading)) {
        problems.push(`${file} is missing required heading: ${heading}`);
      }
    }
  }

  for (const file of ['PROJECT-BRIEF.md', 'SPEC.md']) {
    const path = join(absoluteRoot, file);
    if (!existsSync(path)) {
      continue;
    }
    const content = readFileSync(path, 'utf8');
    if (/Status:\s+(?:APPROVED|Approved)/.test(content) && /<[^>\n]+>/.test(content)) {
      problems.push(`${file} is approved but still contains an angle-bracket placeholder`);
    }
  }

  for (const file of canonicalCommandFiles) {
    const path = join(absoluteRoot, file);
    if (!existsSync(path)) {
      continue;
    }
    const content = readFileSync(path, 'utf8');
    for (const command of ['./bootstrap', 'pnpm verify']) {
      if (!content.includes(command)) {
        problems.push(`${file} does not name canonical command: ${command}`);
      }
    }
  }

  const bootstrapPath = join(absoluteRoot, 'bootstrap');
  if (existsSync(bootstrapPath) && (statSync(bootstrapPath).mode & 0o111) === 0) {
    problems.push('bootstrap exists but is not executable');
  }

  return problems;
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : '';
if (invokedPath === fileURLToPath(import.meta.url)) {
  const problems = validateContracts();
  if (problems.length > 0) {
    console.error('Contract validation failed:');
    for (const problem of problems) {
      console.error(`- ${problem}`);
    }
    process.exit(1);
  }
  console.log('Contract validation passed.');
}
