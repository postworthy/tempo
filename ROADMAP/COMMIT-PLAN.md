# ROADMAP/COMMIT-PLAN

This plan decomposes work into atomic commits. Update as commits land.

## Current Next Commit

### [NEXT] C007 - docs(spec): write v1 product contract

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

### [DONE] C004 - docs(onboarding): enforce novice-first bootstrap flow

Acceptance met:

- `BOOTSTRAP.md` defines first-run contract and mandatory intake questions.
- `PROJECT-BRIEF.md` exists for user-intent capture.
- `AGENTS.md`, `README.md`, and `VERIFY.md` align on onboarding + verification behavior.
- Assistant adapter files (`CLAUDE.md`, `CODEX.md`, Cursor rule) route to canonical instructions.

### [DONE] C005 - docs(onboarding): add discovery-first idea shaping flow

Acceptance met:

- `BOOTSTRAP.md` requires discovery/rubberduck conversation before brief finalization.
- `PROJECT-BRIEF.md` captures motivation, alternatives, assumptions, and unknowns.
- `AGENTS.md` enforces clarifying-question minimums during bootstrap.
- `check:docs` validates discovery-specific onboarding sections.

### [DONE] C006 - docs(governance): require decomposition before implementation

Acceptance met:

- `CONSTITUTION.md` includes decomposition-before-development requirements for T1/T2/T3 work.
- Definition of Ready gate added for non-trivial work.
- `PROPOSALS/TEMPLATE.md` includes decomposition plan section with per-unit verify/exit criteria.
- `AGENTS.md` and docs checks enforce decomposition requirements.

## Milestone M1 - First Vertical Slice

### [TODO] C008 - feat(app): ship thin end-to-end slice

Goal:

- Deliver one minimal but complete user-visible workflow.

Acceptance:

- One workflow functions end-to-end.
- Behavior covered by tests appropriate to the stack.
- Verification passes.
- Docs updated (`STATUS.md`, `DECISIONS.md`, proposal notes).

### [TODO] C009 - harden(app): add guardrails from first slice learnings

Goal:

- Address reliability gaps discovered in M1.

Acceptance:

- RCA-driven improvements are implemented.
- Preventive controls added (tests, lint rules, assertions, or observability).
