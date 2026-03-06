# ROADMAP/COMMIT-PLAN

This plan decomposes work into atomic commits. Update as commits land.

## Current Next Commit

### [NEXT] C012 - docs(spec): write v1 product contract

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

- Optional hosted CI surface runs `pnpm verify`.
- Local-first Change Review remains required at the Review Boundary.

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

### [DONE] C007 - docs(governance): enforce local-first review boundary model

Acceptance met:

- Hosted-platform-centric language replaced with local-first Change Review and Review Boundary terminology.
- Review Records required at `REVIEWS/YYYY-MM-DD--short-title.md` for non-trivial merges.
- Hosted external review surfaces marked optional and non-authoritative.

### [DONE] C008 - docs(onboarding): add bootstrap and toolchain provisioning baseline

Acceptance met:

- Canonical local bootstrap entrypoint `./bootstrap` added.
- `GETTING_STARTED.md` added for repo-already-cloned setup flow.
- Toolchain pin artifact (`.nvmrc`) added with runtime requirement.
- `CONSTITUTION.md`, `AGENTS.md`, and `VERIFY.md` updated with bootstrap policy and constraints.
- docs checks enforce required bootstrap artifacts and language.

### [DONE] C009 - docs(template): separate template history from active project records

Acceptance met:

- Existing dated template proposals moved to `TEMPLATE_HISTORY/PROPOSALS/`.
- Active `PROPOSALS/`, `REVIEWS/`, and `RCA/` remain template-only in fresh-template mode.
- `./bootstrap --init-project` added for one-time project baseline reset with backups.
- Docs checks enforce clean live record folders while `PROJECT-BRIEF.md` is unfilled.

### [DONE] C010 - chore(governance): enforce git execution controls and policy checks

Acceptance met:

- `CONSTITUTION.md`, `AGENTS.md`, `VERIFY.md`, and templates specify git preflight, branch naming, trailers, and merge method controls.
- Adapter files (`CODEX.md`, `CLAUDE.md`, Cursor rule) include compact git non-negotiables for context compression resilience.
- Added `pnpm check:git-policy` and integrated it into canonical verify.
- Added repository-local hooks (`.githooks/pre-commit`, `commit-msg`, `pre-push`) and bootstrap hook-path setup.
- `check:docs` now enforces presence of git policy artifacts and hook executability.

### [DONE] C011 - docs(bootstrap): support adopt-existing onboarding mode

Acceptance met:

- `BOOTSTRAP.md` now defines `greenfield` and `adopt-existing` onboarding modes with mode selection and delta-question intake guidance.
- `AGENTS.md` mandatory work loop now requires mode selection and repository discovery before intake in adopt-existing mode.
- Added repository discovery scanner (`scripts/intake-scan.mjs`) and npm script (`pnpm intake:scan`).
- `bootstrap` now supports `--mode` and auto-mode detection; it can run intake scan artifacts in adopt-existing mode.
- `PROJECT-BRIEF.md` now captures inferred-vs-confirmed facts for existing-codebase onboarding.
- `GETTING_STARTED.md` includes an explicit existing-repo adoption path.

### [TODO] C012 - docs(spec): write v1 product contract

Goal:

- Define first usable `SPEC.md` with project-specific scope and acceptance criteria.

Acceptance:

- `SPEC.md` includes objective, users/workflows, constraints, non-goals, acceptance criteria, risk level, and verification reference.

### [DONE] C015 - docs(prompting): align starter prompts with canonical prompt guidance

Acceptance met:

- `PROMPTING.md` defines instruction layers, output contracts, stop conditions, and scoped task updates.
- `README.md`, `BOOTSTRAP.md`, and adapter docs reference the prompt contract.
- Prompt-facing docs include few-shot examples and lightweight prompt review guidance.

## Milestone M1 - First Vertical Slice

### [TODO] C013 - feat(app): ship thin end-to-end slice

Goal:

- Deliver one minimal but complete user-visible workflow.

Acceptance:

- One workflow functions end-to-end.
- Behavior covered by tests appropriate to the stack.
- Verification passes.
- Docs updated (`STATUS.md`, `DECISIONS.md`, proposal notes).

### [TODO] C014 - harden(app): add guardrails from first slice learnings

Goal:

- Address reliability gaps discovered in M1.

Acceptance:

- RCA-driven improvements are implemented.
- Preventive controls added (tests, lint rules, assertions, or observability).
