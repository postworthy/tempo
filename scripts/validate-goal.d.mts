export interface GoalValidationResult {
  problems: string[];
  activeGoal: string | null;
  nextAction: string | null;
}

export function validateGoals(root?: string): GoalValidationResult;
