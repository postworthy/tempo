# ROADMAP/COMMIT-PLAN

This plan decomposes work into atomic commits. Update as commits land.

## Current Next Commit

### [NEXT] C004 - docs(spec): write v1 product contract

Goal:

- Define first usable `SPEC.md` with project-specific scope and acceptance criteria.

Acceptance:

- `SPEC.md` includes objective, users/workflows, constraints, non-goals, acceptance criteria, risk level, and verification reference.

## Milestone M0 - Foundation and Governance

### [DONE] C001 - docs(repo): establish constitutional workflow baseline

Acceptance met:

- `AGENTS.md` states constitutional precedence.
- `PROPOSALS/` directory exists.
- `ROADMAP/COMMIT-PLAN.md` initialized.

### [DONE] C002 - chore(repo): initialize toolchain and package baseline

Acceptance met:

- Repo installs cleanly.
- `pnpm verify` and `pnpm verify:fast` scripts exist and run.
- TypeScript, linting, formatting, and test baseline added.

### [DONE] C003 - ci(repo): enforce canonical verification gate

Acceptance met:

- CI runs `pnpm verify`.
- Pull requests and pushes to `main` execute verification workflow.

## Milestone M1 - First Vertical Slice

### [TODO] C005 - feat(app): ship thin end-to-end slice

Goal:

- Deliver one minimal but complete user-visible workflow.

Acceptance:

- One workflow functions end-to-end.
- Behavior covered by tests appropriate to the stack.
- Verification passes.
- Docs updated (`STATUS.md`, `DECISIONS.md`, proposal notes).

### [TODO] C006 - harden(app): add guardrails from first slice learnings

Goal:

- Address reliability gaps discovered in M1.

Acceptance:

- RCA-driven improvements are implemented.
- Preventive controls added (tests, lint rules, assertions, or observability).
