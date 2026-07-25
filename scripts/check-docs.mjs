import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { validateContracts } from './validate-contracts.mjs';

const requiredFiles = [
  'AGENTS.md',
  'BOOTSTRAP.md',
  'PROJECT-BRIEF.md',
  'CONSTITUTION.md',
  'PROMPTING.md',
  'VERIFY.md',
  'ROADMAP/COMMIT-PLAN.md',
  'README.md',
  'PROPOSALS/TEMPLATE.md',
  'REVIEWS/TEMPLATE.md',
  'GETTING_STARTED.md',
  'bootstrap',
  '.githooks/pre-commit',
  '.githooks/commit-msg',
  '.githooks/pre-push',
  'scripts/check-git-policy.mjs',
  'scripts/install-portable.sh',
  'scripts/intake-scan.mjs',
  'DISCOVERY/TEMPLATE.md',
  'GOALS/README.md',
  'GOALS/TEMPLATE.md',
  'portable/KERNEL.md',
  'portable/CONSTITUTION.md',
  'portable/VERIFY.md',
  'portable/PROJECT-BRIEF.md',
  'portable/SPEC.md',
  '.agents/skills/tempo-onboard-project/SKILL.md',
  '.agents/skills/tempo-plan-goal/SKILL.md',
  '.agents/skills/tempo-execute-goal/SKILL.md',
  '.agents/skills/tempo-review-change/SKILL.md',
  '.agents/skills/tempo-perform-rca/SKILL.md',
  'TEMPLATE_HISTORY/README.md',
];

const requiredReadmeSnippets = [
  'Use this repo as my starter pack.',
  'BOOTSTRAP.md',
  'PROJECT-BRIEF.md',
];

const requiredAgentsSnippets = [
  '## Preflight',
  '## Authority and Work Loop',
  'Approved, local, reversible T0/T1 work',
  'one active `GOALS/*`',
  'Review boundary',
  'required review records',
  'External push/publish or remote changes require explicit',
  'Canonical setup: `./bootstrap`',
  'Canonical verification: `pnpm verify`',
  'Installing or acquiring `git` is out of scope.',
  'Roadmap: ROADMAP/COMMIT-PLAN.md#Cxxx',
  'Proposal: N/A (T0)',
  '`TEMPLATE_HISTORY/`',
  'If a requested fix failed, perform RCA',
];

const requiredBootstrapSnippets = [
  'Onboarding Modes',
  'adopt-existing',
  'Discovery Phase (Mandatory)',
  'Repository Discovery for Adopt-Existing Mode',
  'pnpm intake:scan',
  'Question minimums',
  'at least 3 clarifying questions',
  'Assumptions and unresolved questions list',
  'Few-Shot Examples',
];

const requiredPromptingSnippets = [
  'Instruction Layers',
  'Output Contract Pattern',
  'Starter Prompt Pattern',
  'Few-Shot Example Guidance',
  'Scoped Task Updates',
  'Lightweight Prompt Eval',
];

const requiredGettingStartedSnippets = [
  'repository is already cloned locally',
  'Installing or acquiring `git` is out of scope',
  './bootstrap',
  'pnpm verify',
  'Onboarding Modes',
  'Adopt Tempo in an Existing Repository',
  '--mode adopt-existing',
  '--target /path/to/existing-repo',
  '--verify-command "make verify"',
  '.githooks',
  'idempotent',
  'Template History vs Your Project History',
];

const requiredProjectBriefSnippets = [
  'Onboarding Mode',
  'Problem Statement (In User Words)',
  'Why Now / Motivation',
  'Inferred from Codebase (Hypotheses, Adopt-Existing Mode)',
  'Confirmed Facts vs Corrected Inferences',
  'Alternatives Considered',
  'Chosen V1 Scope and Why',
  'Top Assumptions to Validate',
  'Biggest Unknowns / Open Questions',
];

const requiredVerifySnippets = [
  'pnpm verify',
  'check:docs',
  'check:git-policy',
  'Git Policy Gate (Required)',
  'Change Review Requirement',
  'Hosted CI (Optional Surface)',
  './bootstrap --no-verify',
  'Prompt Change Review',
];

const requiredConstitutionSnippets = [
  'Version: 2.1',
  'Article I-A — Workflow Definitions',
  'Living Goal:',
  'Authority Envelope:',
  '### Responsibility Map',
  'Active execution state and next action',
  'Pull Request (PR): an optional hosted platform surface',
  'Article V-A — Decomposition Before Development (Mandatory)',
  'Article VII — Local-First Review and Merge Discipline',
  'Article VII-A — Git Execution Controls',
  'Roadmap: ROADMAP/COMMIT-PLAN.md#Cxxx',
  'Definition of Ready (Before Implementation)',
  'REVIEWS/*',
  'Review Record',
  'Article XII-A — Bootstrapping and Toolchain Provisioning (Mandatory)',
  'Installing or acquiring `git` is out of scope',
  './bootstrap',
];

const requiredProposalTemplateSnippets = [
  'Roadmap Item: Cxxx',
  'Planned Branch:',
  '## Decomposition Plan (Required for T1/T2/T3)',
  'Thin slice milestone:',
  'Exit criteria:',
  'Verify by:',
  '## Change Review Plan',
  '## Git Plan',
  'Planned Review Record: `REVIEWS/YYYY-MM-DD--short-title.md`',
];

const requiredReviewTemplateSnippets = [
  'Review Boundary: merge from `<feature-branch>` into `main`',
  'Merge Method: `git merge --no-ff <feature-branch>`',
  '## Commits in Scope',
  '## Git Conformance Checklist',
  '## Acceptance Checklist',
  '## Verification Evidence',
  '## Rollback Plan',
  '## Approvals',
  '## Follow-Ups',
];

const requiredTemplateHistorySnippets = [
  'TEMPLATE_HISTORY',
  'not active project records',
  'PROPOSALS/',
  'REVIEWS/',
  'RCA/',
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
problems.push(...validateContracts());

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
hasAllSnippets('PROMPTING.md', requiredPromptingSnippets);
hasAllSnippets('GETTING_STARTED.md', requiredGettingStartedSnippets);
hasAllSnippets('PROJECT-BRIEF.md', requiredProjectBriefSnippets);
hasAllSnippets('VERIFY.md', requiredVerifySnippets);
hasAllSnippets('CONSTITUTION.md', requiredConstitutionSnippets);
hasAllSnippets('PROPOSALS/TEMPLATE.md', requiredProposalTemplateSnippets);
hasAllSnippets('REVIEWS/TEMPLATE.md', requiredReviewTemplateSnippets);
hasAllSnippets('TEMPLATE_HISTORY/README.md', requiredTemplateHistorySnippets);
hasAllSnippets('DISCOVERY/TEMPLATE.md', ['PROJECT-INVENTORY', 'Delta Intake Questions']);
hasAllSnippets('GOALS/README.md', ['## Lifecycle', '## Ownership', '## Execution Loop']);
hasAllSnippets('GOALS/TEMPLATE.md', [
  '## Acceptance Criteria',
  '## Authority Envelope',
  '## Retry State',
  '## Next Action',
]);

if (existsSync('AGENTS.md')) {
  const lineCount = readFileSync('AGENTS.md', 'utf8').split('\n').length;
  if (lineCount > 120) {
    problems.push(`AGENTS.md exceeds the 120-line repository-kernel limit (${lineCount} lines)`);
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

for (const hook of ['.githooks/pre-commit', '.githooks/commit-msg', '.githooks/pre-push']) {
  if (!existsSync(hook)) {
    continue;
  }
  const isExecutable = (statSync(hook).mode & 0o111) !== 0;
  if (!isExecutable) {
    problems.push(`${hook} exists but is not executable`);
  }
}

if (existsSync('scripts/install-portable.sh')) {
  const isExecutable = (statSync('scripts/install-portable.sh').mode & 0o111) !== 0;
  if (!isExecutable) {
    problems.push('scripts/install-portable.sh exists but is not executable');
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

if (existsSync('package.json')) {
  try {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    if (!pkg.scripts || !pkg.scripts['intake:scan']) {
      problems.push('package.json missing required script: intake:scan');
    }
    if (!pkg.scripts || !pkg.scripts['check:goal']) {
      problems.push('package.json missing required script: check:goal');
    }
    if (!pkg.scripts || !pkg.scripts['check:skills']) {
      problems.push('package.json missing required script: check:skills');
    }
  } catch {
    problems.push('package.json is invalid JSON');
  }
}

const projectBriefIsUnfilled =
  existsSync('PROJECT-BRIEF.md') &&
  readFileSync('PROJECT-BRIEF.md', 'utf8').includes('Status: UNFILLED');

if (projectBriefIsUnfilled) {
  const liveRecordFolders = [
    ['PROPOSALS', 'TEMPLATE.md'],
    ['REVIEWS', 'TEMPLATE.md'],
    ['RCA', 'TEMPLATE.md'],
  ];

  for (const [folder, templateFile] of liveRecordFolders) {
    if (!existsSync(folder)) {
      continue;
    }

    const files = readdirSync(folder).filter((name) => name.endsWith('.md'));
    const nonTemplate = files.filter((name) => name !== templateFile);
    if (nonTemplate.length > 0) {
      problems.push(
        `${folder}/ contains non-template records in fresh-template mode: ${nonTemplate.join(', ')}`,
      );
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
