import { execFileSync, spawnSync } from 'node:child_process';
import {
  chmodSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import { validateContracts } from '../scripts/validate-contracts.mjs';
import { validateGoals } from '../scripts/validate-goal.mjs';

const repositoryRoot = resolve(process.cwd());
const workspaces: string[] = [];

function copyTrackedRepository() {
  const root = mkdtempSync(join(tmpdir(), 'tempo-release-path-'));
  workspaces.push(root);
  const output = execFileSync('git', ['ls-files', '-z'], {
    cwd: repositoryRoot,
    encoding: 'buffer',
  });
  for (const relative of output.toString('utf8').split('\0').filter(Boolean)) {
    const source = join(repositoryRoot, relative);
    const destination = join(root, relative);
    mkdirSync(dirname(destination), { recursive: true });
    copyFileSync(source, destination);
  }
  chmodSync(join(root, 'bootstrap'), 0o755);
  chmodSync(join(root, 'scripts/init-project.sh'), 0o755);
  return root;
}

afterEach(() => {
  for (const workspace of workspaces.splice(0)) {
    rmSync(workspace, { recursive: true, force: true });
  }
});

describe('public release paths', () => {
  it('defaults plain bootstrap to greenfield without running intake discovery', () => {
    const root = copyTrackedRepository();
    execFileSync('git', ['init', '-b', 'main'], { cwd: root });
    const wrappers = join(root, 'command-wrappers');
    mkdirSync(wrappers);
    const pnpm = join(wrappers, 'pnpm');
    writeFileSync(
      pnpm,
      '#!/usr/bin/env bash\nif [[ "${1:-}" == "--version" ]]; then echo "9.0.0"; fi\nexit 0\n',
    );
    chmodSync(pnpm, 0o755);

    const result = spawnSync(join(root, 'bootstrap'), ['--no-verify'], {
      cwd: root,
      encoding: 'utf8',
      env: { ...process.env, PATH: `${wrappers}:${process.env.PATH}` },
    });

    expect(result.status).toBe(0);
    expect(result.stdout).toContain('Onboarding mode: greenfield');
    expect(result.stdout).not.toContain('Running repository intake scan');
    expect(existsSync(join(root, 'DISCOVERY/PROJECT-INVENTORY.md'))).toBe(false);
  });

  it('initializes a canonically valid project and backs up inherited active records', () => {
    const root = copyTrackedRepository();
    const historyPath = 'TEMPLATE_HISTORY/PROPOSALS/2026-02-12--public-template-readiness.md';
    const historyBefore = readFileSync(join(root, historyPath), 'utf8');

    const initialization = spawnSync('bash', ['scripts/init-project.sh'], {
      cwd: root,
      encoding: 'utf8',
    });

    expect(initialization.status).toBe(0);
    expect(readFileSync(join(root, 'PROJECT-BRIEF.md'), 'utf8')).toContain('Status: UNFILLED');
    expect(readFileSync(join(root, 'SPEC.md'), 'utf8')).toContain('./bootstrap');
    expect(readdirSync(join(root, 'PROPOSALS')).sort()).toEqual(['TEMPLATE.md']);
    expect(readdirSync(join(root, 'REVIEWS')).sort()).toEqual(['TEMPLATE.md']);
    expect(readdirSync(join(root, 'RCA')).sort()).toEqual(['TEMPLATE.md']);
    expect(readdirSync(join(root, 'GOALS')).sort()).toEqual(['README.md', 'TEMPLATE.md']);
    expect(readFileSync(join(root, historyPath), 'utf8')).toBe(historyBefore);
    expect(validateContracts(root)).toEqual([]);
    expect(validateGoals(root).problems).toEqual([]);

    const backupRoot = join(root, '.template-init-backup');
    const backup = readdirSync(backupRoot);
    expect(backup).toHaveLength(1);
    expect(
      existsSync(
        join(backupRoot, backup[0], 'PROPOSALS/2026-07-24--production-readiness-remediation.md'),
      ),
    ).toBe(true);
    expect(
      existsSync(
        join(backupRoot, backup[0], 'GOALS/2026-07-24--tempo-production-readiness-remediation.md'),
      ),
    ).toBe(true);

    const docs = spawnSync(process.execPath, ['scripts/check-docs.mjs'], {
      cwd: root,
      encoding: 'utf8',
    });
    expect(docs.status, docs.stderr || docs.stdout).toBe(0);
  });
});
