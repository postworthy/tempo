import { existsSync, readFileSync, statSync } from 'node:fs';

const requiredFiles = [
  'AGENTS.md',
  'BOOTSTRAP.md',
  'PROJECT-BRIEF.md',
  'CONSTITUTION.md',
  'VERIFY.md',
  'ROADMAP/COMMIT-PLAN.md',
  'README.md',
  'PROPOSALS/TEMPLATE.md',
  'REVIEWS/TEMPLATE.md',
  'GETTING_STARTED.md',
  'bootstrap',
];

const requiredReadmeSnippets = [
  'Use this repo as my starter pack.',
  'BOOTSTRAP.md',
  'PROJECT-BRIEF.md',
];

const requiredAgentsSnippets = [
  'Definition of Ready (Before Implementation)',
  'decompose work into small verifiable units',
  'Review Boundary',
  'Review Record',
  'Do not add git remotes or execute external `push`/`publish` actions',
  'Canonical bootstrap command: `./bootstrap`',
  'Bootstrap Rules',
  'Installing or acquiring `git` is out of scope',
];

const requiredBootstrapSnippets = [
  'Discovery Phase (Mandatory)',
  'Question minimums',
  'at least 3 clarifying questions',
  'Assumptions and unresolved questions list',
];

const requiredGettingStartedSnippets = [
  'repository is already cloned locally',
  'Installing or acquiring `git` is out of scope',
  './bootstrap',
  'pnpm verify',
  'idempotent',
];

const requiredProjectBriefSnippets = [
  'Problem Statement (In User Words)',
  'Why Now / Motivation',
  'Alternatives Considered',
  'Chosen V1 Scope and Why',
  'Top Assumptions to Validate',
  'Biggest Unknowns / Open Questions',
];

const requiredVerifySnippets = [
  'pnpm verify',
  'check:docs',
  'Change Review Requirement',
  'Hosted CI (Optional Surface)',
  './bootstrap --no-verify',
];

const requiredConstitutionSnippets = [
  'Article I-A — Workflow Definitions',
  'Pull Request (PR): an optional hosted platform surface',
  'Article V-A — Decomposition Before Development (Mandatory)',
  'Article VII — Local-First Review and Merge Discipline',
  'Definition of Ready (Before Implementation)',
  'REVIEWS/*',
  'Review Record',
  'Article XII-A — Bootstrapping and Toolchain Provisioning (Mandatory)',
  'Installing or acquiring `git` is out of scope',
  './bootstrap',
];

const requiredProposalTemplateSnippets = [
  '## Decomposition Plan (Required for T1/T2/T3)',
  'Thin slice milestone:',
  'Exit criteria:',
  'Verify by:',
  '## Change Review Plan',
  'Planned Review Record: `REVIEWS/YYYY-MM-DD--short-title.md`',
];

const requiredReviewTemplateSnippets = [
  'Review Boundary: merge from `<feature-branch>` into `main`',
  '## Commits in Scope',
  '## Acceptance Checklist',
  '## Verification Evidence',
  '## Rollback Plan',
  '## Approvals',
  '## Follow-Ups',
];

const forbiddenPathSnippets = ['ROADMAP/commit-plan.md'];

const filesWherePRMustNotAppear = [
  'AGENTS.md',
  'VERIFY.md',
  'ROADMAP/COMMIT-PLAN.md',
  'STATUS.md',
  'DECISIONS.md',
  'PROPOSALS/TEMPLATE.md',
  'BOOTSTRAP.md',
  'README.md',
  'GETTING_STARTED.md',
];

const forbiddenPRPatterns = [/\bPR\b/, /pull request/i, /merge request/i];

const problems = [];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    problems.push(`Missing required file: ${file}`);
  }
}

const hasAllSnippets = (file, snippets) => {
  if (!existsSync(file)) {
    return;
  }

  const content = readFileSync(file, 'utf8');
  for (const snippet of snippets) {
    if (!content.includes(snippet)) {
      problems.push(`${file} missing required content: ${snippet}`);
    }
  }
};

hasAllSnippets('README.md', requiredReadmeSnippets);
hasAllSnippets('AGENTS.md', requiredAgentsSnippets);
hasAllSnippets('BOOTSTRAP.md', requiredBootstrapSnippets);
hasAllSnippets('GETTING_STARTED.md', requiredGettingStartedSnippets);
hasAllSnippets('PROJECT-BRIEF.md', requiredProjectBriefSnippets);
hasAllSnippets('VERIFY.md', requiredVerifySnippets);
hasAllSnippets('CONSTITUTION.md', requiredConstitutionSnippets);
hasAllSnippets('PROPOSALS/TEMPLATE.md', requiredProposalTemplateSnippets);
hasAllSnippets('REVIEWS/TEMPLATE.md', requiredReviewTemplateSnippets);

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

for (const file of filesWherePRMustNotAppear) {
  if (!existsSync(file)) {
    continue;
  }

  const content = readFileSync(file, 'utf8');
  for (const pattern of forbiddenPRPatterns) {
    if (pattern.test(content)) {
      problems.push(
        `${file} contains PR-centric term (${pattern.toString()}) outside Constitution definitions`,
      );
    }
  }
}

if (existsSync('.github/workflows/verify.yml')) {
  const content = readFileSync('.github/workflows/verify.yml', 'utf8');
  if (!content.includes('Optional hosted review surface.')) {
    problems.push('.github/workflows/verify.yml missing optional-hosted-surface marker comment');
  }
}

if (existsSync('bootstrap')) {
  const isExecutable = (statSync('bootstrap').mode & 0o111) !== 0;
  if (!isExecutable) {
    problems.push('bootstrap exists but is not executable');
  }
}

const hasPinnedToolchainManifest =
  existsSync('.nvmrc') ||
  existsSync('.tool-versions') ||
  existsSync('mise.toml') ||
  (() => {
    if (!existsSync('package.json')) {
      return false;
    }
    try {
      const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
      return Boolean(pkg.engines);
    } catch {
      return false;
    }
  })();

if (!hasPinnedToolchainManifest) {
  problems.push(
    'No pinned toolchain manifest found (.nvmrc/.tool-versions/mise.toml/package.json engines)',
  );
}

if (problems.length > 0) {
  console.error('Documentation consistency check failed:');
  for (const problem of problems) {
    console.error(`- ${problem}`);
  }
  process.exit(1);
}

console.log('Documentation consistency check passed.');
