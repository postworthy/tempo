import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import {
  evaluateTextAssertions,
  runEvaluations,
  validateScenarioSchema,
} from '../scripts/run-evals.mjs';

const repositoryRoot = resolve(process.cwd());

describe('Tempo evaluation harness', () => {
  it('passes all deterministic scenarios without subprocess duplication', () => {
    const result = runEvaluations(repositoryRoot, { runCommands: false });

    expect(result.passed).toBe(true);
    expect(result.summary.scenarios).toBe(7);
    expect(result.summary.failures).toBe(0);
  });

  it('rejects an incomplete scenario schema', () => {
    expect(validateScenarioSchema({ version: 1, scenarios: [] })).toContain(
      'EVALS/scenarios.json: missing required scenario "greenfield-vague-idea"',
    );
  });

  it('reports a deliberate evidence assertion failure', () => {
    expect(
      evaluateTextAssertions(repositoryRoot, [
        {
          path: 'AGENTS.md',
          includes: ['this text must never exist in the kernel'],
        },
      ]),
    ).toEqual(['AGENTS.md: missing expected evidence "this text must never exist in the kernel"']);
  });

  it('keeps the committed scenario document structurally valid', () => {
    const document = JSON.parse(
      readFileSync(resolve(repositoryRoot, 'EVALS/scenarios.json'), 'utf8'),
    ) as unknown;

    expect(validateScenarioSchema(document)).toEqual([]);
  });
});
