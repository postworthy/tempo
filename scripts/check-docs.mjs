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
  'discovery mode',
];

const requiredAgentsSnippets = [
  'BOOTSTRAP.md',
  'PROJECT-BRIEF.md',
  'at least 3 clarifying questions',
  'follow-up question',
  'Definition of Ready (Before Implementation)',
  'decompose work into small verifiable units',
];

const requiredBootstrapSnippets = [
  'Discovery Phase (Mandatory)',
  'Question minimums',
  'at least 3 clarifying questions',
  'Assumptions and unresolved questions list',
];

const requiredProjectBriefSnippets = [
  'Problem Statement (In User Words)',
  'Why Now / Motivation',
  'Alternatives Considered',
  'Chosen V1 Scope and Why',
  'Top Assumptions to Validate',
  'Biggest Unknowns / Open Questions',
];

const requiredVerifySnippets = ['pnpm verify', 'check:docs'];

const requiredConstitutionSnippets = [
  'Article V-A — Decomposition Before Development (Mandatory)',
  'Definition of Ready (Before Implementation)',
  'decompose the problem into a sequence of small, verifiable work units',
];

const requiredProposalTemplateSnippets = [
  '## Decomposition Plan (Required for T1/T2/T3)',
  'Thin slice milestone:',
  'Exit criteria:',
  'Verify by:',
];

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

if (existsSync('BOOTSTRAP.md')) {
  const content = readFileSync('BOOTSTRAP.md', 'utf8');
  for (const snippet of requiredBootstrapSnippets) {
    if (!content.includes(snippet)) {
      problems.push(`BOOTSTRAP.md missing required content: ${snippet}`);
    }
  }
}

if (existsSync('PROJECT-BRIEF.md')) {
  const content = readFileSync('PROJECT-BRIEF.md', 'utf8');
  for (const snippet of requiredProjectBriefSnippets) {
    if (!content.includes(snippet)) {
      problems.push(`PROJECT-BRIEF.md missing required content: ${snippet}`);
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

if (existsSync('CONSTITUTION.md')) {
  const content = readFileSync('CONSTITUTION.md', 'utf8');
  for (const snippet of requiredConstitutionSnippets) {
    if (!content.includes(snippet)) {
      problems.push(`CONSTITUTION.md missing required content: ${snippet}`);
    }
  }
}

if (existsSync('PROPOSALS/TEMPLATE.md')) {
  const content = readFileSync('PROPOSALS/TEMPLATE.md', 'utf8');
  for (const snippet of requiredProposalTemplateSnippets) {
    if (!content.includes(snippet)) {
      problems.push(`PROPOSALS/TEMPLATE.md missing required content: ${snippet}`);
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
