import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const allowedStatuses = new Set([
  'draft',
  'approved',
  'active',
  'paused',
  'blocked',
  'completed',
  'abandoned',
]);

const requiredHeadings = [
  '## Outcome',
  '## Non-Goals',
  '## Acceptance Criteria',
  '## Authority Envelope',
  '### May Continue Without Asking',
  '### Must Pause for Approval',
  '## Work Units',
  '## Progress',
  '## Evidence',
  '## Discoveries',
  '## Decisions',
  '## Retry State',
  '## Next Action',
  '## Pause Conditions',
  '## Outcomes',
];

function field(content, name) {
  return content.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1]?.trim() ?? '';
}

function section(content, heading) {
  const start = content.indexOf(heading);
  if (start === -1) {
    return '';
  }
  const remainder = content.slice(start + heading.length);
  const next = remainder.search(/\n#{2,3}\s+/);
  return (next === -1 ? remainder : remainder.slice(0, next)).trim();
}

function criterionEvidence(content, criterionIndex) {
  const criteria = [...content.matchAll(/^- \[([ xX])\]\s+(.+)$/gm)];
  const current = criteria[criterionIndex];
  if (!current || current.index === undefined) {
    return '';
  }
  const next = criteria[criterionIndex + 1];
  const block = content.slice(current.index + current[0].length, next?.index ?? content.length);
  return block.match(/^\s+- Evidence:\s*(.+)$/m)?.[1]?.trim() ?? '';
}

function goalFiles(root) {
  const directory = join(root, 'GOALS');
  if (!existsSync(directory)) {
    return [];
  }
  return readdirSync(directory)
    .filter((name) => name.endsWith('.md') && !['README.md', 'TEMPLATE.md'].includes(name))
    .map((name) => join(directory, name));
}

export function validateGoals(root = process.cwd()) {
  const absoluteRoot = resolve(root);
  const problems = [];
  const active = [];

  for (const path of goalFiles(absoluteRoot)) {
    const name = relative(absoluteRoot, path);
    const content = readFileSync(path, 'utf8');
    const status = field(content, 'Status');

    if (!/^# Goal:\s+\S/m.test(content)) {
      problems.push(`${name}: missing non-empty "# Goal:" title`);
    }
    for (const requiredField of [
      'Status',
      'Owner',
      'Risk',
      'Updated',
      'Proposal',
      'Review Boundary',
    ]) {
      const value = field(content, requiredField);
      if (!value || /<[^>]+>|YYYY-MM-DD/.test(value)) {
        problems.push(`${name}: ${requiredField} must have a concrete value`);
      }
    }
    if (!allowedStatuses.has(status)) {
      problems.push(`${name}: Status must be one of ${[...allowedStatuses].join(', ')}`);
    }
    if (status === 'active') {
      active.push({ path: name, content });
    }

    for (const heading of requiredHeadings) {
      if (!content.includes(heading)) {
        problems.push(`${name}: missing required heading "${heading}"`);
      }
    }

    for (const heading of ['## Outcome', '## Non-Goals', '## Work Units', '## Pause Conditions']) {
      const value = section(content, heading);
      if (!value || /^(?:none|n\/a)$/i.test(value)) {
        problems.push(`${name}: ${heading.slice(3)} must not be empty`);
      }
    }

    const criteria = [...content.matchAll(/^- \[([ xX])\]\s+(.+)$/gm)];
    if (criteria.length === 0) {
      problems.push(`${name}: Acceptance Criteria must contain at least one checkbox`);
    }
    criteria.forEach((criterion, index) => {
      const evidence = criterionEvidence(content, index);
      if (!evidence) {
        problems.push(`${name}: criterion "${criterion[2]}" is missing Evidence`);
      }
      if (status === 'completed') {
        if (criterion[1].toLowerCase() !== 'x') {
          problems.push(`${name}: completed goal has unchecked criterion "${criterion[2]}"`);
        }
        if (!evidence || /^pending$/i.test(evidence)) {
          problems.push(`${name}: completed criterion "${criterion[2]}" lacks final evidence`);
        }
      }
    });

    const currentAttempt = Number(
      content.match(/^- Current attempt:\s*(\d+)$/m)?.[1] ?? Number.NaN,
    );
    const maximumAttempts = Number(
      content.match(/^- Maximum attempts per unchanged failure:\s*(\d+)$/m)?.[1] ?? Number.NaN,
    );
    if (
      !Number.isInteger(currentAttempt) ||
      !Number.isInteger(maximumAttempts) ||
      maximumAttempts < 1 ||
      currentAttempt > maximumAttempts
    ) {
      problems.push(`${name}: Retry State must contain a valid attempt within a positive bound`);
    }

    const nextAction = section(content, '## Next Action');
    const nextActionItems = nextAction.match(/^- .+$/gm) ?? [];
    if (
      !nextAction ||
      nextActionItems.length !== 1 ||
      (status === 'active' && /^-\s+(?:none|n\/a)$/i.test(nextAction))
    ) {
      problems.push(`${name}: active execution requires one concrete Next Action`);
    }
  }

  if (active.length > 1) {
    problems.push(`GOALS/: expected at most one active goal, found ${active.length}`);
  }

  const selected = active[0];
  return {
    problems,
    activeGoal: selected?.path ?? null,
    nextAction: selected ? section(selected.content, '## Next Action') : null,
  };
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : '';
if (invokedPath === fileURLToPath(import.meta.url)) {
  const result = validateGoals();
  if (result.problems.length > 0) {
    console.error('Living goal validation failed:');
    for (const problem of result.problems) {
      console.error(`- ${problem}`);
    }
    process.exit(1);
  }
  console.log('Living goal validation passed.');
  if (result.activeGoal) {
    console.log(`Active goal: ${result.activeGoal}`);
    console.log(`Next action: ${result.nextAction}`);
  } else {
    console.log('Active goal: none');
  }
}
