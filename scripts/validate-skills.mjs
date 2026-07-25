import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const requiredSkills = [
  'tempo-onboard-project',
  'tempo-plan-goal',
  'tempo-execute-goal',
  'tempo-review-change',
  'tempo-perform-rca',
];

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    return { fields: {}, keys: [], body: content };
  }
  const fields = {};
  const keys = [];
  for (const line of match[1].split('\n')) {
    const field = line.match(/^([a-zA-Z0-9_-]+):\s*(.+)$/);
    if (field) {
      keys.push(field[1]);
      fields[field[1]] = field[2].trim();
    }
  }
  return { fields, keys, body: content.slice(match[0].length) };
}

function localLinks(content) {
  return [...content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)]
    .map((match) => match[1].split('#')[0])
    .filter((target) => target && !/^[a-z]+:\/\//i.test(target) && !target.startsWith('#'));
}

export function validateSkills(root = process.cwd()) {
  const absoluteRoot = resolve(root);
  const skillsRoot = join(absoluteRoot, '.agents/skills');
  const problems = [];

  if (!existsSync(skillsRoot)) {
    return { problems: ['.agents/skills: required skill directory is missing'], skills: [] };
  }

  const discovered = readdirSync(skillsRoot)
    .filter((name) => statSync(join(skillsRoot, name)).isDirectory())
    .sort();

  for (const skill of requiredSkills) {
    if (!discovered.includes(skill)) {
      problems.push(`.agents/skills: missing required skill "${skill}"`);
    }
  }
  for (const skill of discovered) {
    if (!requiredSkills.includes(skill)) {
      problems.push(`.agents/skills: unexpected skill "${skill}"`);
    }
  }

  for (const skill of discovered.filter((name) => requiredSkills.includes(name))) {
    const directory = join(skillsRoot, skill);
    const skillPath = join(directory, 'SKILL.md');
    if (!existsSync(skillPath)) {
      problems.push(`${relative(absoluteRoot, skillPath)}: missing`);
      continue;
    }

    const content = readFileSync(skillPath, 'utf8');
    const { fields, keys, body } = parseFrontmatter(content);
    const frontmatterKeys = [...new Set(keys)].sort();
    if (frontmatterKeys.join(',') !== 'description,name') {
      problems.push(
        `${relative(absoluteRoot, skillPath)}: frontmatter must contain only name and description`,
      );
    }
    if (fields.name !== skill) {
      problems.push(`${relative(absoluteRoot, skillPath)}: name must match directory "${skill}"`);
    }
    if (!fields.description || fields.description.length < 100) {
      problems.push(
        `${relative(absoluteRoot, skillPath)}: description must be at least 100 characters`,
      );
    }
    if (!fields.description?.includes('Use when')) {
      problems.push(
        `${relative(absoluteRoot, skillPath)}: description must state "Use when" triggers`,
      );
    }
    if (/TODO|\[TODO/i.test(content)) {
      problems.push(`${relative(absoluteRoot, skillPath)}: unresolved TODO placeholder`);
    }
    const bodyLines = body.split('\n').length;
    if (bodyLines > 500) {
      problems.push(`${relative(absoluteRoot, skillPath)}: body exceeds 500 lines (${bodyLines})`);
    }

    const directReferences = new Set();
    for (const target of localLinks(body)) {
      const resolved = resolve(dirname(skillPath), target);
      if (!resolved.startsWith(`${directory}/`) || !existsSync(resolved)) {
        problems.push(`${relative(absoluteRoot, skillPath)}: broken local reference "${target}"`);
      } else if (target.startsWith('references/')) {
        directReferences.add(relative(directory, resolved));
      }
    }

    const referencesPath = join(directory, 'references');
    if (existsSync(referencesPath)) {
      for (const name of readdirSync(referencesPath).filter((entry) => entry.endsWith('.md'))) {
        const reference = join(referencesPath, name);
        const relativeReference = relative(directory, reference);
        if (!directReferences.has(relativeReference)) {
          problems.push(
            `${relative(absoluteRoot, reference)}: orphaned reference not linked from SKILL.md`,
          );
        }
        for (const nested of localLinks(readFileSync(reference, 'utf8'))) {
          problems.push(
            `${relative(absoluteRoot, reference)}: references must not create another local link hop ("${nested}")`,
          );
        }
      }
    }

    const interfacePath = join(directory, 'agents/openai.yaml');
    if (!existsSync(interfacePath)) {
      problems.push(
        `${relative(absoluteRoot, interfacePath)}: missing optional interface metadata required by Tempo`,
      );
    } else {
      const metadata = readFileSync(interfacePath, 'utf8');
      const shortDescription =
        metadata.match(/^\s+short_description:\s+["']([^"']+)["']$/m)?.[1] ?? '';
      const defaultPrompt = metadata.match(/^\s+default_prompt:\s+["']([^"']+)["']$/m)?.[1] ?? '';
      if (shortDescription.length < 25 || shortDescription.length > 64) {
        problems.push(
          `${relative(absoluteRoot, interfacePath)}: short_description must be 25-64 characters`,
        );
      }
      if (!defaultPrompt.includes(`$${skill}`)) {
        problems.push(
          `${relative(absoluteRoot, interfacePath)}: default_prompt must mention $${skill}`,
        );
      }
    }
  }

  const casesPath = join(absoluteRoot, 'EVALS/skill-trigger-cases.json');
  if (!existsSync(casesPath)) {
    problems.push('EVALS/skill-trigger-cases.json: missing');
  } else {
    try {
      const cases = JSON.parse(readFileSync(casesPath, 'utf8'));
      const ids = new Set();
      for (const item of cases) {
        if (!item.id || ids.has(item.id)) {
          problems.push('EVALS/skill-trigger-cases.json: every case needs a unique id');
        }
        ids.add(item.id);
        if (!requiredSkills.includes(item.target_skill)) {
          problems.push(`EVALS/skill-trigger-cases.json: invalid target_skill in "${item.id}"`);
        }
        if (!['positive', 'ambiguous', 'negative'].includes(item.kind)) {
          problems.push(`EVALS/skill-trigger-cases.json: invalid kind in "${item.id}"`);
        }
        if (item.expected_skill !== null && !requiredSkills.includes(item.expected_skill)) {
          problems.push(`EVALS/skill-trigger-cases.json: invalid expected_skill in "${item.id}"`);
        }
        if (!item.prompt || !item.rationale) {
          problems.push(`EVALS/skill-trigger-cases.json: "${item.id}" needs prompt and rationale`);
        }
      }
      for (const skill of requiredSkills) {
        for (const kind of ['positive', 'ambiguous', 'negative']) {
          if (!cases.some((item) => item.target_skill === skill && item.kind === kind)) {
            problems.push(`EVALS/skill-trigger-cases.json: ${skill} needs a ${kind} case`);
          }
        }
      }
    } catch {
      problems.push('EVALS/skill-trigger-cases.json: invalid JSON');
    }
  }

  return { problems, skills: discovered };
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : '';
if (invokedPath === fileURLToPath(import.meta.url)) {
  const result = validateSkills();
  if (result.problems.length > 0) {
    console.error('Skill validation failed:');
    for (const problem of result.problems) {
      console.error(`- ${problem}`);
    }
    process.exit(1);
  }
  console.log(`Skill validation passed: ${result.skills.join(', ')}`);
}
