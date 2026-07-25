export interface EvaluationFailure {
  scenario: string;
  message: string;
}

export interface EvaluationResult {
  passed: boolean;
  summary: {
    scenarios: number;
    scenarios_passed: number;
    assertions: number;
    failures: number;
  };
  measures: Record<string, number>;
  failures: EvaluationFailure[];
}

export function validateScenarioSchema(document: unknown): string[];
export function evaluateTextAssertions(
  root: string,
  assertions: Array<{ path: string; includes?: string[]; excludes?: string[] }>,
): string[];
export function runEvaluations(
  root?: string,
  options?: { runCommands?: boolean },
): EvaluationResult;
