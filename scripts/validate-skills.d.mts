export const requiredSkills: string[];

export interface SkillValidationResult {
  problems: string[];
  skills: string[];
}

export function validateSkills(root?: string): SkillValidationResult;
