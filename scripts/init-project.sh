#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR=".template-init-backup/$STAMP"
mkdir -p "$BACKUP_DIR"

for f in PROJECT-BRIEF.md STATUS.md ROADMAP/COMMIT-PLAN.md; do
  if [[ -f "$f" ]]; then
    mkdir -p "$BACKUP_DIR/$(dirname "$f")"
    cp "$f" "$BACKUP_DIR/$f"
  fi
done

cat > PROJECT-BRIEF.md <<'BRIEF'
# PROJECT-BRIEF

Status: UNFILLED
Last updated: YYYY-MM-DD

This brief is intentionally novice-friendly. Fill this file before non-trivial implementation.

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
BRIEF

cat > STATUS.md <<'STATUS'
## Current Milestone

M0 - Foundation and Governance

## Current Next Commit

docs(spec): write first project-specific spec from template

## Done (High-Level)

- Initialized project from Tempo template.

## In Progress

- Defining project-specific product scope in `SPEC.md`.

## Blockers / Risks

- `SPEC.md` is not yet project-specific.

## Recent Changes

- Ran project initialization to start with clean project governance records.

## Next Planned Changes

- Finalize `PROJECT-BRIEF.md` and `SPEC.md`.
- Create first implementation proposal.

## Notes

- Update this file at least once per merged commit sequence.
- Keep entries concise and factual.
- If a failure occurs, include RCA summary and preventive action.
STATUS

cat > ROADMAP/COMMIT-PLAN.md <<'ROADMAP'
# ROADMAP/COMMIT-PLAN

This plan decomposes work into atomic commits. Update as commits land.

## Current Next Commit

### [NEXT] C001 - docs(spec): write v1 product contract

Goal:

- Define first usable `SPEC.md` with project-specific scope and acceptance criteria.

Acceptance:

- `SPEC.md` includes objective, users/workflows, constraints, non-goals, acceptance criteria, risk level, and verification reference.

## Milestone M1 - First Vertical Slice

### [TODO] C002 - feat(app): ship thin end-to-end slice

Goal:

- Deliver one minimal but complete user-visible workflow.

Acceptance:

- One workflow functions end-to-end.
- Behavior covered by tests appropriate to the stack.
- Verification passes.
- Docs updated (`STATUS.md`, `DECISIONS.md`, proposal notes).

### [TODO] C003 - harden(app): add guardrails from first slice learnings

Goal:

- Address reliability gaps discovered in M1.

Acceptance:

- RCA-driven improvements are implemented.
- Preventive controls added (tests, lint rules, assertions, or observability).
ROADMAP

echo "Project initialization complete."
echo "Backups saved to: $BACKUP_DIR"
