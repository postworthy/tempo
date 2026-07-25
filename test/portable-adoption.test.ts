import { execFileSync, spawnSync } from 'node:child_process';
import {
  chmodSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

const repositoryRoot = resolve(process.cwd());
const bootstrap = join(repositoryRoot, 'bootstrap');
const workspaces: string[] = [];

function fixture() {
  const root = mkdtempSync(join(tmpdir(), 'tempo-portable-test-'));
  workspaces.push(root);
  execFileSync('git', ['init', '-b', 'main'], { cwd: root });
  writeFileSync(join(root, 'app.py'), 'print("keep me")\n');
  writeFileSync(join(root, 'AGENTS.md'), '# Existing Rules\n\nPreserve this repository.\n');

  const wrappers = join(root, 'command-wrappers');
  mkdirSync(wrappers);
  for (const command of ['node', 'pnpm']) {
    const path = join(wrappers, command);
    writeFileSync(path, '#!/usr/bin/env bash\nexit 99\n');
    chmodSync(path, 0o755);
  }
  return { root, wrappers };
}

function adopt(root: string, wrappers: string) {
  return spawnSync(
    bootstrap,
    ['--mode', 'adopt-existing', '--target', root, '--verify-command', 'python3 -m pytest'],
    {
      cwd: repositoryRoot,
      encoding: 'utf8',
      env: { ...process.env, PATH: `${wrappers}:${process.env.PATH}` },
    },
  );
}

afterEach(() => {
  for (const workspace of workspaces.splice(0)) {
    rmSync(workspace, { recursive: true, force: true });
  }
});

describe('portable adopt-existing setup', () => {
  it('installs stack-neutral Tempo without invoking Node or pnpm', () => {
    const { root, wrappers } = fixture();
    const first = adopt(root, wrappers);

    expect(first.status).toBe(0);
    expect(first.stdout).toContain('Portable Tempo installation complete');
    expect(readFileSync(join(root, 'app.py'), 'utf8')).toBe('print("keep me")\n');
    expect(readFileSync(join(root, '.tempo/VERIFY_COMMAND'), 'utf8')).toBe('python3 -m pytest\n');
    const portableConstitution = readFileSync(join(root, '.tempo/CONSTITUTION.md'), 'utf8');
    expect(portableConstitution).toContain('Version: 2.1-portable');
    expect(portableConstitution).not.toMatch(/\b(?:pnpm|Node\.js|TypeScript)\b/);
    expect(readFileSync(join(root, '.tempo/backups/AGENTS.md.before-tempo'), 'utf8')).toBe(
      '# Existing Rules\n\nPreserve this repository.\n',
    );

    const agents = readFileSync(join(root, 'AGENTS.md'), 'utf8');
    expect(agents).toContain('# Existing Rules');
    expect(agents.match(/<!-- tempo-kernel:start -->/g)).toHaveLength(1);
    expect(readdirSync(join(root, '.agents/skills')).sort()).toEqual([
      'tempo-execute-goal',
      'tempo-onboard-project',
      'tempo-perform-rca',
      'tempo-plan-goal',
      'tempo-review-change',
    ]);

    for (const forbidden of [
      'package.json',
      'pnpm-lock.yaml',
      'node_modules',
      'src',
      'test',
      'tsconfig.json',
    ]) {
      expect(existsSync(join(root, forbidden))).toBe(false);
    }
  });

  it('is idempotent and does not duplicate AGENTS routing', () => {
    const { root, wrappers } = fixture();
    expect(adopt(root, wrappers).status).toBe(0);
    const agentsBefore = readFileSync(join(root, 'AGENTS.md'), 'utf8');
    const manifestBefore = readFileSync(join(root, '.tempo/install-manifest.txt'), 'utf8');

    const second = adopt(root, wrappers);

    expect(second.status).toBe(0);
    expect(second.stdout).toContain('unchanged AGENTS.md routing');
    expect(readFileSync(join(root, 'AGENTS.md'), 'utf8')).toBe(agentsBefore);
    expect(readFileSync(join(root, '.tempo/install-manifest.txt'), 'utf8')).toBe(manifestBefore);
  });

  it('refuses to overwrite a conflicting installed file', () => {
    const { root, wrappers } = fixture();
    expect(adopt(root, wrappers).status).toBe(0);
    writeFileSync(join(root, '.tempo/KERNEL.md'), 'user changed this\n');

    const conflict = adopt(root, wrappers);

    expect(conflict.status).toBe(1);
    expect(conflict.stdout).toContain('Conflict: existing file differs: .tempo/KERNEL.md');
    expect(readFileSync(join(root, '.tempo/KERNEL.md'), 'utf8')).toBe('user changed this\n');
  });
});
