# ROADMAP/COMMIT-PLAN

This plan decomposes work into atomic commits. Update as commits land.

## Current Next Commit

None; C022 is complete. Await an explicitly approved merge or publication
action.

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

### [TODO] C012 - docs(spec): define modern Tempo product contract

Goal:

- Define Tempo's first complete product contract and modernization execution goal.

Acceptance:

- `PROJECT-BRIEF.md` and `SPEC.md` include objective, users/workflows, constraints, non-goals, acceptance criteria, risk level, safety boundaries, and verification.
- The modernization goal is self-contained and resumable.
- The foundation-repair proposal satisfies Definition of Ready.

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

## Milestone M2 - Skills and Goal-Native Tempo

### [DONE] C016 - fix(governance): repair bootstrap and contract validation

Goal:

- Make clean primary-branch verification valid while preserving direct-commit protection, and add structural contract validation.

Acceptance:

- `pnpm verify` passes on clean `main`.
- The pre-commit hook rejects direct commits on `main`.
- Malformed contracts, active placeholders, and canonical-command drift fail focused tests.

Evidence:

- `pnpm verify` passed on the compliant feature branch and an isolated clean `main` at commit `8ef1f06` on 2026-07-24.
- Focused temporary-repository tests cover read-only `main` verification and hook rejection.
- `./bootstrap --no-verify` completed non-interactively with the frozen lockfile.

### [DONE] C017 - refactor(governance): create concise kernel and goal state

Goal:

- Reduce always-loaded guidance and add a canonical living execution-plan model.

Acceptance:

- `AGENTS.md` is no more than 120 lines unless an evidence-backed exception is recorded.
- A fresh-context agent can identify and resume the active goal.
- Authority, pause, evidence, retry, and completion rules are explicit.

Approval boundary:

- T2 proposal: `PROPOSALS/2026-07-24--concise-kernel-living-goals.md`
- Explicit human approval was recorded on 2026-07-24.

Evidence:

- Constitution 2.1: commit `b425fa2`.
- 113-line repository kernel: commit `ba97a34`.
- Living-goal lifecycle, validator, and fixtures: commit `729c304`.
- Resumption thin slice: `EVALS/2026-07-24--goal-resumption-thin-slice.md`.

### [DONE] C018 - feat(skills): add focused Tempo skill bundle

Goal:

- Ship focused repo-local Agent Skills for onboarding, goal planning and execution, review, and RCA.

Acceptance:

- All skills pass current schema and repository validation.
- Skills use progressive disclosure with resolved references.
- Positive and negative trigger cases exist.

Evidence:

- Skill bundle: commit `1291dfe`.
- Structural and trigger validation: `pnpm check:skills`.
- Trigger cases and audit: `EVALS/skill-trigger-cases.json` and
  `EVALS/2026-07-24--skill-trigger-audit.md`.

### [DONE] C019 - feat(bootstrap): add portable Tempo adoption

Goal:

- Preserve the batteries-included greenfield setup and support stack-neutral adoption.

Acceptance:

- One documented public setup command remains canonical.
- Repeated greenfield bootstrap succeeds.
- A non-Node fixture adopts Tempo without receiving the TypeScript starter stack.

Evidence:

- Portable installer: commit `13409a6`.
- Non-Node, repeat, and conflict fixtures: `test/portable-adoption.test.ts`.
- Two consecutive greenfield bootstrap runs completed non-interactively on
  2026-07-24.

### [DONE] C020 - test(evals): validate skills and fresh-context goals

Goal:

- Demonstrate that skills and living goals improve real workflows without unacceptable context or interruption cost.

Evidence:

- Harness: commit `8f67342`.
- Report: `EVALS/2026-07-24--evaluation-report.md`.
- Result: 7/7 scenarios, 59 assertions, 0 failures; `AGENTS.md` 238→116
  lines; focused skills 0→5.

Acceptance:

- The seven minimum scenarios in the modernization goal have evidence.
- Deterministic assertions cover mechanical outcomes.
- Failures and false triggers become regression cases.

### [DONE] C021 - docs(release): complete migration and review evidence

Goal:

- Align public documentation, migration guidance, decisions, status, and review evidence.

Acceptance:

- Canonical verification and manual evaluations pass.
- The repository is merge-safe and publication-ready.
- No remote, push, or publication action has occurred.

Evidence:

- Migration guidance: `MIGRATION.md`.
- Criterion, safety, rollback, and verification inventory:
  `REVIEWS/2026-07-24--tempo-skills-goals-modernization.md`.
- Result: 22 tests, 7/7 evaluation scenarios, 59 assertions, isolated clean
  bootstrap pass, and all 20 goal criteria complete.

### [DONE] C022 - fix(release): remediate production readiness blockers

Goal:

- Repair the public setup, initialization, portable-containment, dependency, and
  evidence failures found by the final production sweep.

Acceptance:

- Plain and initialized clean-main bootstrap paths pass.
- Portable adoption rejects symlinks and known conflicts before mutation.
- The frozen graph has no unapproved high/critical advisory.
- Regression and exact-tree evidence return the Review Record to approved.

Proposal:

- `PROPOSALS/2026-07-24--production-readiness-remediation.md`

Evidence:

- Plain and initialized bootstrap replays passed from isolated `main`
  repositories built from `acdfef0`; plain bootstrap left a clean worktree.
- Six portable fixtures prove symlink containment, conflict atomicity,
  stack-neutral operation, preservation, and idempotence.
- `pnpm verify` passes 27 tests and 7/7 evaluation scenarios with 59 assertions.
- `pnpm audit --audit-level=high` exits 0 with one low advisory.
- Final decision:
  `REVIEWS/2026-07-24--tempo-skills-goals-modernization.md`.
