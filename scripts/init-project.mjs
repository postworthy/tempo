#!/usr/bin/env node

import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { loadInitializationPolicy, starterDocuments } from './initialization-policy.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const policy = loadInitializationPolicy(root);

function safeRelativePath(path) {
  if (!path || isAbsolute(path) || path.split('/').includes('..')) {
    throw new Error(`Unsafe initialization policy path: ${String(path)}`);
  }
  return path;
}

function timestamp() {
  return new Date().toISOString().replace(/[-:]/g, '').replace('T', '-').slice(0, 15);
}

for (const path of policy.reset_files) {
  safeRelativePath(path);
  if (!Object.hasOwn(starterDocuments, path)) {
    throw new Error(`Initialization policy has no starter document for ${path}`);
  }
}
for (const path of [...policy.archive_files, ...policy.retain_paths]) {
  safeRelativePath(path);
}
for (const directory of policy.preserve_directories) {
  safeRelativePath(directory);
}

const backupRelative = `.template-init-backup/${timestamp()}`;
const backupRoot = join(root, backupRelative);
if (existsSync(backupRoot)) {
  throw new Error(`Initialization backup already exists: ${backupRelative}`);
}

const archivePaths = new Set();
for (const [directory, retainedNames] of Object.entries(policy.template_only_directories)) {
  safeRelativePath(directory);
  const absoluteDirectory = join(root, directory);
  if (!existsSync(absoluteDirectory)) {
    continue;
  }
  for (const name of readdirSync(absoluteDirectory)) {
    if (!retainedNames.includes(name)) {
      archivePaths.add(`${directory}/${name}`);
    }
  }
}
for (const path of policy.archive_files) {
  if (existsSync(join(root, path))) {
    archivePaths.add(path);
  }
}
for (const rule of policy.archive_patterns) {
  safeRelativePath(rule.directory);
  const absoluteDirectory = join(root, rule.directory);
  if (!existsSync(absoluteDirectory)) {
    continue;
  }
  const pattern = new RegExp(rule.pattern);
  for (const name of readdirSync(absoluteDirectory)) {
    if (pattern.test(name) && !rule.exclude.includes(name)) {
      archivePaths.add(`${rule.directory}/${name}`);
    }
  }
}

const resetState = [];
const movedPaths = [];
try {
  mkdirSync(backupRoot, { recursive: true });

  for (const path of policy.reset_files) {
    const source = join(root, path);
    const backup = join(backupRoot, path);
    const existed = existsSync(source);
    resetState.push({ source, backup, existed });
    if (existed) {
      mkdirSync(dirname(backup), { recursive: true });
      copyFileSync(source, backup);
    }
  }

  for (const path of [...archivePaths].sort()) {
    const source = join(root, safeRelativePath(path));
    if (!existsSync(source)) {
      continue;
    }
    const backup = join(backupRoot, path);
    mkdirSync(dirname(backup), { recursive: true });
    renameSync(source, backup);
    movedPaths.push({ source, backup });
  }

  for (const path of policy.reset_files) {
    const destination = join(root, path);
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, starterDocuments[path]);
  }
} catch (error) {
  for (const { source, backup } of movedPaths.reverse()) {
    if (existsSync(backup)) {
      mkdirSync(dirname(source), { recursive: true });
      renameSync(backup, source);
    }
  }
  for (const { source, backup, existed } of resetState) {
    if (existed && existsSync(backup)) {
      copyFileSync(backup, source);
    } else if (!existed) {
      rmSync(source, { force: true });
    }
  }
  rmSync(backupRoot, { recursive: true, force: true });
  throw error;
}

console.log('Project initialization complete.');
console.log(`Backups saved to: ${relative(root, backupRoot)}`);
console.log(
  `Policy applied: ${policy.reset_files.length} reset, ${archivePaths.size} archived, ` +
    `${policy.retain_paths.length} retained, ${policy.preserve_directories.length} preserved.`,
);
console.log(
  'Tempo development records were archived; reusable capabilities and TEMPLATE_HISTORY/ were preserved.',
);
