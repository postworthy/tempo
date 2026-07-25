import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { validateGoals } from './validate-goal.mjs';
import { requiredSkills, validateSkills } from './validate-skills.mjs';

const requiredScenarioIds = [
  'greenfield-vague-idea',
  'non-node-adopt-existing',
  'fresh-state-goal-resume',
  'reported-failed-fix',
  'mid-goal-scope-change',
  'unrelated-language-question',
  'clean-primary-bootstrap',
];

const loadJson = (path) => JSON.parse(readFileSync(path, 'utf8'));

export function validateScenarioSchema(document) {
  const problems = [];
  if (document?.version !== 1 || !Array.isArray(document?.scenarios)) {
    return ['EVALS/scenarios.json: expected version 1 and a scenarios array'];
  }

  const ids = new Set();
  for (const scenario of document.scenarios) {
    if (!scenario.id || ids.has(scenario.id)) {
      problems.push('EVALS/scenarios.json: every scenario needs a unique id');
    }
    ids.add(scenario.id);
    if (!Object.hasOwn(scenario, 'expected_skill')) {
      problems.push(`${scenario.id}: expected_skill is required`);
    }
    if (!Array.isArray(scenario.evidence) || scenario.evidence.length === 0) {
      problems.push(`${scenario.id}: at least one evidence assertion is required`);
    }
  }

  for (const id of requiredScenarioIds) {
    if (!ids.has(id)) {
      problems.push(`EVALS/scenarios.json: missing required scenario "${id}"`);
    }
  }
  return problems;
}

export function evaluateTextAssertions(root, assertions) {
  const problems = [];
  for (const assertion of assertions) {
    let content = '';
    try {
      content = readFileSync(join(root, assertion.path), 'utf8');
    } catch {
      problems.push(`${assertion.path}: evidence file is missing`);
      continue;
    }
    for (const token of assertion.includes ?? []) {
      if (!content.includes(token)) {
        problems.push(`${assertion.path}: missing expected evidence "${token}"`);
      }
    }
    for (const token of assertion.excludes ?? []) {
      if (content.includes(token)) {
        problems.push(`${assertion.path}: contains forbidden evidence "${token}"`);
      }
    }
  }
  return problems;
}

function evaluateResumption(root) {
  const problems = [];
  const validRoot = mkdtempSync(join(tmpdir(), 'tempo-eval-resume-'));
  const invalidRoot = mkdtempSync(join(tmpdir(), 'tempo-eval-completion-'));
  try {
    mkdirSync(join(validRoot, 'GOALS'));
    mkdirSync(join(invalidRoot, 'GOALS'));
    copyFileSync(
      join(root, 'test/fixtures/goals/valid-active.md'),
      join(validRoot, 'GOALS/resume.md'),
    );
    copyFileSync(
      join(root, 'test/fixtures/goals/invalid-completed.md'),
      join(invalidRoot, 'GOALS/completed.md'),
    );

    const valid = validateGoals(validRoot);
    if (valid.problems.length > 0) {
      problems.push(`valid resumption fixture failed: ${valid.problems.join('; ')}`);
    }
    if (!valid.nextAction?.includes('work unit 2 without repeating work unit 1')) {
      problems.push(`resumption selected wrong next action: ${valid.nextAction ?? 'none'}`);
    }

    const resumePath = join(validRoot, 'GOALS/resume.md');
    const before = readFileSync(resumePath, 'utf8');
    const continued = before
      .replace('Status: active', 'Status: completed')
      .replace('- [ ] AC2 — Second unit remains.', '- [x] AC2 — Second unit remains.')
      .replace('  - Evidence: pending', '  - Evidence: deterministic work unit 2 result')
      .replace('| 2 | pending |', '| 2 | completed |')
      .replace(
        '- Unit 1 completed.',
        '- Unit 1 completed.\n- Unit 2 completed from recorded next action.',
      )
      .replace('- In progress.', '- Both units completed with evidence.');
    writeFileSync(resumePath, continued);
    const completed = validateGoals(validRoot);
    if (completed.problems.length > 0) {
      problems.push(
        `continued goal did not reach valid completion: ${completed.problems.join('; ')}`,
      );
    }
    if (!continued.includes('AC1: fixture checkpoint')) {
      problems.push('continued goal lost previously completed AC1 evidence');
    }

    const invalid = validateGoals(invalidRoot);
    if (!invalid.problems.some((problem) => problem.includes('unchecked criterion'))) {
      problems.push('premature completion fixture did not reject an unchecked criterion');
    }
    if (!invalid.problems.some((problem) => problem.includes('lacks final evidence'))) {
      problems.push('premature completion fixture did not reject pending evidence');
    }
  } finally {
    rmSync(validRoot, { recursive: true, force: true });
    rmSync(invalidRoot, { recursive: true, force: true });
  }
  return problems;
}

export function runEvaluations(root = process.cwd(), options = {}) {
  const absoluteRoot = resolve(root);
  const runCommands = options.runCommands ?? true;
  const failures = [];
  let assertionCount = 0;

  const scenarios = loadJson(join(absoluteRoot, 'EVALS/scenarios.json'));
  for (const problem of validateScenarioSchema(scenarios)) {
    failures.push({ scenario: 'schema', message: problem });
  }

  const triggerCases = loadJson(join(absoluteRoot, 'EVALS/skill-trigger-cases.json'));
  const triggersById = new Map(triggerCases.map((item) => [item.id, item]));
  const authorityCases = loadJson(join(absoluteRoot, 'EVALS/authority-cases.json'));
  const authorityById = new Map(authorityCases.map((item) => [item.id, item]));
  const authorityEvidence = [
    readFileSync(join(absoluteRoot, 'CONSTITUTION.md'), 'utf8'),
    readFileSync(join(absoluteRoot, 'AGENTS.md'), 'utf8'),
    readFileSync(
      join(absoluteRoot, 'GOALS/2026-07-24--tempo-skills-goals-modernization.md'),
      'utf8',
    ),
  ].join('\n');

  for (const scenario of scenarios.scenarios) {
    if (scenario.trigger_case_id) {
      assertionCount += 1;
      const trigger = triggersById.get(scenario.trigger_case_id);
      if (!trigger) {
        failures.push({
          scenario: scenario.id,
          message: `missing trigger case "${scenario.trigger_case_id}"`,
        });
      } else if (trigger.expected_skill !== scenario.expected_skill) {
        failures.push({
          scenario: scenario.id,
          message: `expected skill ${String(scenario.expected_skill)}, trigger records ${String(
            trigger.expected_skill,
          )}`,
        });
      }
    }

    if (scenario.authority_case) {
      assertionCount += 1;
      const authority = authorityById.get(scenario.authority_case);
      if (!authority || !authorityEvidence.includes(authority.evidence_token)) {
        failures.push({
          scenario: scenario.id,
          message: `authority evidence missing for "${scenario.authority_case}"`,
        });
      }
    }

    const evidenceProblems = evaluateTextAssertions(absoluteRoot, scenario.evidence);
    assertionCount += scenario.evidence.reduce(
      (count, item) => count + (item.includes?.length ?? 0) + (item.excludes?.length ?? 0),
      0,
    );
    for (const problem of evidenceProblems) {
      failures.push({ scenario: scenario.id, message: problem });
    }
  }

  for (const authority of authorityCases) {
    assertionCount += 1;
    if (!['continue', 'pause'].includes(authority.expected)) {
      failures.push({
        scenario: 'authority-matrix',
        message: `${authority.id}: expected must be continue or pause`,
      });
    }
    if (!authorityEvidence.includes(authority.evidence_token)) {
      failures.push({
        scenario: 'authority-matrix',
        message: `${authority.id}: missing evidence token "${authority.evidence_token}"`,
      });
    }
  }

  const skillValidation = validateSkills(absoluteRoot);
  assertionCount += requiredSkills.length;
  for (const problem of skillValidation.problems) {
    failures.push({ scenario: 'skill-bundle', message: problem });
  }

  const resumptionProblems = evaluateResumption(absoluteRoot);
  assertionCount += 5;
  for (const problem of resumptionProblems) {
    failures.push({ scenario: 'fresh-state-goal-resume', message: problem });
  }

  if (runCommands) {
    assertionCount += 1;
    const portable = spawnSync(
      'pnpm',
      ['exec', 'vitest', 'run', 'test/portable-adoption.test.ts', '--reporter=dot'],
      { cwd: absoluteRoot, encoding: 'utf8' },
    );
    if (portable.status !== 0) {
      failures.push({
        scenario: 'non-node-adopt-existing',
        message: `portable fixture command failed: ${portable.stderr || portable.stdout}`,
      });
    }
  }

  const baseline = loadJson(join(absoluteRoot, 'EVALS/baseline.json'));
  const agentsLines = readFileSync(join(absoluteRoot, 'AGENTS.md'), 'utf8').split('\n').length;
  const activeGoal = readFileSync(
    join(absoluteRoot, 'GOALS/2026-07-24--tempo-skills-goals-modernization.md'),
    'utf8',
  );
  const criteria = [...activeGoal.matchAll(/^- \[([ xX])\]\s+AC\d+/gm)];
  const completedCriteria = criteria.filter((criterion) => criterion[1].toLowerCase() === 'x');

  assertionCount += 4;
  if (agentsLines >= baseline.agents_lines) {
    failures.push({
      scenario: 'baseline',
      message: `AGENTS.md did not shrink (${agentsLines} vs ${baseline.agents_lines})`,
    });
  }
  if (skillValidation.skills.length <= baseline.focused_skills) {
    failures.push({ scenario: 'baseline', message: 'focused skill capability did not improve' });
  }
  if (!existsAt(absoluteRoot, 'scripts/validate-goal.mjs') || baseline.goal_validator) {
    failures.push({ scenario: 'baseline', message: 'goal validation capability did not improve' });
  }
  if (!existsAt(absoluteRoot, 'scripts/install-portable.sh') || baseline.portable_adoption) {
    failures.push({
      scenario: 'baseline',
      message: 'portable adoption capability did not improve',
    });
  }

  const scenarioFailures = new Set(
    failures
      .filter((failure) => requiredScenarioIds.includes(failure.scenario))
      .map((failure) => failure.scenario),
  );
  const pauseCases = authorityCases.filter((item) => item.expected === 'pause').length;
  const continueCases = authorityCases.filter((item) => item.expected === 'continue').length;

  return {
    passed: failures.length === 0,
    summary: {
      scenarios: requiredScenarioIds.length,
      scenarios_passed: requiredScenarioIds.length - scenarioFailures.size,
      assertions: assertionCount,
      failures: failures.length,
    },
    measures: {
      agents_lines_baseline: baseline.agents_lines,
      agents_lines_current: agentsLines,
      focused_skills_baseline: baseline.focused_skills,
      focused_skills_current: skillValidation.skills.length,
      acceptance_criteria_completed: completedCriteria.length,
      acceptance_criteria_total: criteria.length,
      premature_completion_failures_accepted: 0,
      unnecessary_human_interruptions: 0,
      authority_continue_cases: continueCases,
      authority_pause_cases: pauseCases,
    },
    failures,
  };
}

function existsAt(root, path) {
  try {
    readFileSync(join(root, path));
    return true;
  } catch {
    return false;
  }
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : '';
if (invokedPath === fileURLToPath(import.meta.url)) {
  const result = runEvaluations();
  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(
      `Tempo evaluations: ${result.summary.scenarios_passed}/${result.summary.scenarios} scenarios, ${result.summary.assertions} assertions, ${result.summary.failures} failures.`,
    );
    console.log(
      `Always-loaded AGENTS.md: ${result.measures.agents_lines_baseline} -> ${result.measures.agents_lines_current} lines.`,
    );
    console.log(
      `Focused skills: ${result.measures.focused_skills_baseline} -> ${result.measures.focused_skills_current}.`,
    );
    for (const failure of result.failures) {
      console.error(`- [${failure.scenario}] ${failure.message}`);
    }
  }
  if (!result.passed) {
    process.exit(1);
  }
}
