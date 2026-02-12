import { existsSync, readFileSync } from 'node:fs';

const requiredFiles = [
  'AGENTS.md',
  'BOOTSTRAP.md',
  'PROJECT-BRIEF.md',
  'CONSTITUTION.md',
  'VERIFY.md',
  'ROADMAP/COMMIT-PLAN.md',
  'README.md',
];

const requiredReadmeSnippets = [
  'Use this repo as my starter pack.',
  'BOOTSTRAP.md',
  'PROJECT-BRIEF.md',
];

const requiredAgentsSnippets = ['BOOTSTRAP.md', 'PROJECT-BRIEF.md'];

const requiredVerifySnippets = ['pnpm verify', 'check:docs'];

const forbiddenPathSnippets = ['ROADMAP/commit-plan.md'];

const problems = [];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    problems.push(`Missing required file: ${file}`);
  }
}

if (existsSync('README.md')) {
  const content = readFileSync('README.md', 'utf8');
  for (const snippet of requiredReadmeSnippets) {
    if (!content.includes(snippet)) {
      problems.push(`README.md missing required content: ${snippet}`);
    }
  }
}

if (existsSync('AGENTS.md')) {
  const content = readFileSync('AGENTS.md', 'utf8');
  for (const snippet of requiredAgentsSnippets) {
    if (!content.includes(snippet)) {
      problems.push(`AGENTS.md missing required content: ${snippet}`);
    }
  }
}

if (existsSync('VERIFY.md')) {
  const content = readFileSync('VERIFY.md', 'utf8');
  for (const snippet of requiredVerifySnippets) {
    if (!content.includes(snippet)) {
      problems.push(`VERIFY.md missing required content: ${snippet}`);
    }
  }
}

for (const file of ['AGENTS.md', 'CONSTITUTION.md', 'README.md', 'VERIFY.md']) {
  if (!existsSync(file)) {
    continue;
  }

  const content = readFileSync(file, 'utf8');
  for (const forbidden of forbiddenPathSnippets) {
    if (content.includes(forbidden)) {
      problems.push(`${file} contains forbidden path variant: ${forbidden}`);
    }
  }
}

if (problems.length > 0) {
  console.error('Documentation consistency check failed:');
  for (const problem of problems) {
    console.error(`- ${problem}`);
  }
  process.exit(1);
}

console.log('Documentation consistency check passed.');
