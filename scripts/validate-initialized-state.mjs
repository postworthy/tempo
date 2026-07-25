import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { loadInitializationPolicy, starterDocuments } from './initialization-policy.mjs';

export function validateInitializedState(root = process.cwd()) {
  const absoluteRoot = resolve(root);
  const briefPath = join(absoluteRoot, 'PROJECT-BRIEF.md');
  if (!existsSync(briefPath) || !readFileSync(briefPath, 'utf8').includes('Status: UNFILLED')) {
    return [];
  }

  const policy = loadInitializationPolicy(absoluteRoot);
  const problems = [];

  for (const path of policy.reset_files) {
    const absolutePath = join(absoluteRoot, path);
    if (!existsSync(absolutePath)) {
      problems.push(`${path}: missing required initialized starter document`);
    } else if (readFileSync(absolutePath, 'utf8') !== starterDocuments[path]) {
      problems.push(`${path}: does not match the initialized starter state`);
    }
  }

  for (const [directory, retainedNames] of Object.entries(policy.template_only_directories)) {
    const absoluteDirectory = join(absoluteRoot, directory);
    if (!existsSync(absoluteDirectory)) {
      problems.push(`${directory}/: missing initialized record directory`);
      continue;
    }
    const unexpected = readdirSync(absoluteDirectory).filter(
      (name) => !retainedNames.includes(name),
    );
    if (unexpected.length > 0) {
      problems.push(`${directory}/: residual development records: ${unexpected.join(', ')}`);
    }
  }

  for (const path of policy.archive_files) {
    if (existsSync(join(absoluteRoot, path))) {
      problems.push(`${path}: residual Tempo development evidence`);
    }
  }

  for (const rule of policy.archive_patterns) {
    const directory = join(absoluteRoot, rule.directory);
    if (!existsSync(directory)) {
      continue;
    }
    const pattern = new RegExp(rule.pattern);
    const residual = readdirSync(directory).filter(
      (name) => pattern.test(name) && !rule.exclude.includes(name),
    );
    if (residual.length > 0) {
      problems.push(
        `${rule.directory}/: residual Tempo development artifacts: ${residual.join(', ')}`,
      );
    }
  }

  for (const path of [...policy.retain_paths, ...policy.preserve_directories]) {
    if (!existsSync(join(absoluteRoot, path))) {
      problems.push(`${path}: reusable or preserved initialization path is missing`);
    }
  }

  return problems;
}

const isMain =
  process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));
if (isMain) {
  const problems = validateInitializedState();
  if (problems.length > 0) {
    console.error('Initialized-project validation failed:');
    for (const problem of problems) {
      console.error(`- ${problem}`);
    }
    process.exit(1);
  }
  console.log('Initialized-project validation passed.');
}
