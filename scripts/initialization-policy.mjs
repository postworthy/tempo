import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const starterDocuments = {
  'PROJECT-BRIEF.md': `# PROJECT-BRIEF

Status: UNFILLED
Last updated: YYYY-MM-DD

This brief is intentionally novice-friendly. Fill this file before non-trivial implementation.

## 0. Onboarding Mode

- Mode: <greenfield or adopt-existing>
- Why this mode was selected: <reason>

## 1. One-Sentence Project Goal

- <What are we building?>

## 2. Problem Statement (In User Words)

- <What problem does this solve?>

## 3. Why Now / Motivation

- <Why this matters now>

## 4. Target Users

- Primary user: <who>
- Secondary users (optional): <who>

## 5. First Version Outcomes (Must Have)

- <outcome 1>
- <outcome 2>
- <outcome 3>

## 6. Out of Scope (Must Not Build Yet)

- <non-goal 1>
- <non-goal 2>

## 7. Platform and Delivery Shape

- Platform(s): <web/backend/mobile/desktop>
- Deployment expectation (optional): <local only/cloud/other>

## 8. Constraints

- Timeline: <constraint>
- Budget: <constraint>
- Legal/compliance: <constraint>
- Security/privacy requirements: <constraint>

## 9. Technical Preferences

- Preferred languages/frameworks: <list>
- Tools to avoid: <list>

## 10. Alternatives Considered

- Option A: <description>
- Option B: <description>
- Why chosen option wins for v1: <reason>

## 11. Chosen V1 Scope and Why

- Chosen scope: <summary>
- Why this scope is right now: <reason>

## 12. Top Assumptions to Validate

- <assumption 1>
- <assumption 2>

## 13. Biggest Unknowns / Open Questions

- <unknown 1>
- <unknown 2>

## 14. V1 Done Criteria

- [ ] <observable success criterion 1>
- [ ] <observable success criterion 2>
- [ ] <observable success criterion 3>

## 15. Inferred from Codebase (Hypotheses, Adopt-Existing Mode)

- <hypothesis or not applicable>

## 16. Confirmed Facts vs Corrected Inferences

- Confirmed: <fact>
- Corrected: <inference or none>
`,
  'SPEC.md': `# SPEC - Project Name

Version: 0.1
Last updated: YYYY-MM-DD
Status: Draft

## 1. Product Objective

- <What outcome will this product create?>

## 2. Users and Core Workflows

- Primary user: <who>
- Core workflow: <observable end-to-end workflow>

## 3. Functional Requirements

- FR1: <required behavior>

## 4. Constraints

- Platform: <constraint>
- Security/privacy: <constraint>
- Compatibility: <constraint>

## 5. Risk Model

- Risk class: <T0, T1, T2, or T3>
- Main risks: <list>

## 6. Acceptance Criteria

- [ ] <observable acceptance criterion>

## 7. Canonical Verification

Setup:

\`\`\`bash
./bootstrap
\`\`\`

Run:

\`\`\`bash
pnpm verify
\`\`\`

## 8. Safety and Capability Boundaries

- Must not: <prohibited behavior>
- Must pause when: <approval boundary>

## 9. Compatibility and Migration

- <compatibility or migration requirement>

## 10. Non-Goals

- <explicit non-goal>

## 11. Open Questions

- <unresolved question>
`,
  'STATUS.md': `## Current Milestone

M0 - Foundation and Governance

## Current Next Commit

docs(spec): write first project-specific spec from template

## Done (High-Level)

- Initialized project from Tempo template.

## In Progress

- Defining project-specific product scope in \`SPEC.md\`.

## Blockers / Risks

- \`SPEC.md\` is not yet project-specific.

## Recent Changes

- Ran project initialization to start with clean project governance records.

## Next Planned Changes

- Finalize \`PROJECT-BRIEF.md\` and \`SPEC.md\`.
- Create first implementation proposal.

## Notes

- Update this file at least once per merged commit sequence.
- Keep entries concise and factual.
- If a failure occurs, include RCA summary and preventive action.
`,
  'DECISIONS.md': `# DECISIONS - Project Name

Status: UNFILLED

Record durable project decisions and why they were made.

Format:
\`YYYY-MM-DD - Title - Decision - Rationale - Consequences\`

No project-specific decisions have been recorded.
`,
  'ROADMAP/COMMIT-PLAN.md': `# ROADMAP/COMMIT-PLAN

This plan decomposes work into atomic commits. Update as commits land.

## Current Next Commit

### [NEXT] C001 - docs(spec): write v1 product contract

Goal:

- Define first usable \`SPEC.md\` with project-specific scope and acceptance criteria.

Acceptance:

- \`SPEC.md\` includes objective, users/workflows, constraints, non-goals, acceptance criteria, risk level, and verification reference.

## Milestone M1 - First Vertical Slice

### [TODO] C002 - feat(app): ship thin end-to-end slice

Goal:

- Deliver one minimal but complete user-visible workflow.

Acceptance:

- One workflow functions end-to-end.
- Verification passes.
`,
};

export function loadInitializationPolicy(root) {
  const policy = JSON.parse(readFileSync(join(root, 'INITIALIZATION-POLICY.json'), 'utf8'));
  if (policy.version !== 1) {
    throw new Error(`Unsupported initialization policy version: ${String(policy.version)}`);
  }
  return policy;
}
