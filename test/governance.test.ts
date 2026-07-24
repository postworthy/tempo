import { execFileSync, spawnSync } from 'node:child_process';
import {
  chmodSync,
  copyFileSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { validateContracts } from '../scripts/validate-contracts.mjs';
import { validateGoals } from '../scripts/validate-goal.mjs';

const repositoryRoot = resolve(process.cwd());
const gitPolicyScript = join(repositoryRoot, 'scripts/check-git-policy.mjs');
const preCommitHook = join(repositoryRoot, '.githooks/pre-commit');

function createGitRepository() {
  const root = mkdtempSync(join(tmpdir(), 'tempo-git-policy-'));
  execFileSync('git', ['init', '-b', 'main'], { cwd: root });
  execFileSync('git', ['config', 'user.name', 'Tempo Test'], { cwd: root });
  execFileSync('git', ['config', 'user.email', 'tempo@example.invalid'], { cwd: root });
  writeFileSync(join(root, 'README.md'), '# fixture\n');
  execFileSync('git', ['add', 'README.md'], { cwd: root });
  execFileSync('git', ['commit', '-m', 'chore(test): create fixture'], { cwd: root });
  return root;
}

function run(path: string, args: string[], cwd: string) {
  return spawnSync(path, args, {
    cwd,
    encoding: 'utf8',
    env: { ...process.env, CI: '0', TEMPO_ENFORCE_COMMIT_META: '0' },
  });
}

function createContractFixture() {
  const root = mkdtempSync(join(tmpdir(), 'tempo-contracts-'));
  for (const file of [
    'AGENTS.md',
    'BOOTSTRAP.md',
    'GETTING_STARTED.md',
    'PROJECT-BRIEF.md',
    'README.md',
    'SPEC.md',
    'VERIFY.md',
    'bootstrap',
  ]) {
    copyFileSync(join(repositoryRoot, file), join(root, file));
  }
  chmodSync(join(root, 'bootstrap'), 0o755);
  return root;
}

describe('git policy boundaries', () => {
  it('allows verification on main but rejects active-development mode', () => {
    const root = createGitRepository();

    const verification = run(process.execPath, [gitPolicyScript], root);
    expect(verification.status).toBe(0);
    expect(verification.stdout).toContain('allowed for read-only verification');

    const development = run(process.execPath, [gitPolicyScript, '--require-feature-branch'], root);
    expect(development.status).toBe(1);
    expect(development.stderr).toContain("Current branch is 'main'");
  });

  it('keeps the pre-commit hook as the direct-main enforcement boundary', () => {
    const root = createGitRepository();
    const result = run('bash', [preCommitHook], root);

    expect(result.status).toBe(1);
    expect(result.stdout).toContain("Direct commits to 'main' are prohibited");
  });
});

describe('contract validation', () => {
  it('accepts the repository contracts', () => {
    expect(validateContracts(repositoryRoot)).toEqual([]);
  });

  it('reports malformed Markdown with a file-specific error', () => {
    const root = createContractFixture();
    mkdirSync(join(root, 'notes'));
    writeFileSync(join(root, 'notes', 'broken.md'), '# Broken\n\n```bash\ncommand\n');

    expect(validateContracts(root)).toContain(
      'notes/broken.md has an unbalanced Markdown code fence',
    );
  });

  it('rejects placeholders in an approved product contract', () => {
    const root = createContractFixture();
    const specPath = join(root, 'SPEC.md');
    writeFileSync(specPath, `${readFileSync(specPath, 'utf8')}\n- <unfinished>\n`);

    expect(validateContracts(root)).toContain(
      'SPEC.md is approved but still contains an angle-bracket placeholder',
    );
  });
});

describe('project initialization', () => {
  it('resets both product contracts and preserves backups', () => {
    const root = mkdtempSync(join(tmpdir(), 'tempo-init-'));
    mkdirSync(join(root, 'scripts'));
    mkdirSync(join(root, 'ROADMAP'));
    copyFileSync(
      join(repositoryRoot, 'scripts/init-project.sh'),
      join(root, 'scripts/init-project.sh'),
    );
    chmodSync(join(root, 'scripts/init-project.sh'), 0o755);

    for (const file of ['PROJECT-BRIEF.md', 'SPEC.md', 'STATUS.md']) {
      writeFileSync(join(root, file), `original ${file}\n`);
    }
    writeFileSync(join(root, 'ROADMAP/COMMIT-PLAN.md'), 'original roadmap\n');

    const result = run('bash', [join(root, 'scripts/init-project.sh')], root);

    expect(result.status).toBe(0);
    expect(readFileSync(join(root, 'PROJECT-BRIEF.md'), 'utf8')).toContain('Status: UNFILLED');
    expect(readFileSync(join(root, 'SPEC.md'), 'utf8')).toContain('Status: Draft');
    expect(result.stdout).toContain('Backups saved to: .template-init-backup/');
  });
});

describe('living goal validation', () => {
  function goalRoot(...fixtures: string[]) {
    const root = mkdtempSync(join(tmpdir(), 'tempo-goals-'));
    mkdirSync(join(root, 'GOALS'));
    fixtures.forEach((fixture, index) => {
      copyFileSync(
        join(repositoryRoot, 'test/fixtures/goals', fixture),
        join(root, 'GOALS', `${index + 1}-${fixture}`),
      );
    });
    return root;
  }

  it('selects one active goal and its recorded next action', () => {
    const result = validateGoals(goalRoot('valid-active.md'));

    expect(result.problems).toEqual([]);
    expect(result.activeGoal).toBe('GOALS/1-valid-active.md');
    expect(result.nextAction).toContain('without repeating work unit 1');
  });

  it('rejects multiple active goals', () => {
    const result = validateGoals(goalRoot('valid-active.md', 'valid-active.md'));

    expect(result.problems).toContain('GOALS/: expected at most one active goal, found 2');
  });

  it('rejects a goal with an incomplete authority envelope', () => {
    const root = goalRoot('valid-active.md');
    const path = join(root, 'GOALS/1-valid-active.md');
    writeFileSync(
      path,
      readFileSync(path, 'utf8').replace('### May Continue Without Asking', '### Missing'),
    );

    expect(validateGoals(root).problems).toContain(
      'GOALS/1-valid-active.md: missing required heading "### May Continue Without Asking"',
    );
  });

  it('rejects premature completion without checked criteria and final evidence', () => {
    const result = validateGoals(goalRoot('invalid-completed.md'));

    expect(result.problems).toContain(
      'GOALS/1-invalid-completed.md: completed goal has unchecked criterion "AC1 — This remains incomplete."',
    );
    expect(result.problems).toContain(
      'GOALS/1-invalid-completed.md: completed criterion "AC1 — This remains incomplete." lacks final evidence',
    );
  });
});
