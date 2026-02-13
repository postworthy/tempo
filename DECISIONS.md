# DECISIONS - Tempo

Record durable decisions and why they were made.

Format:
`YYYY-MM-DD - Title - Decision - Rationale - Consequences`

## 2026-02-12 - Constitutional Governance Baseline

Decision:
Adopt `CONSTITUTION.md` as the highest-precedence governance document for this repository.

Rationale:
Human + AI collaboration needs explicit, enforceable process controls to keep delivery reliable and reversible.

Consequences:
All workflow/process docs must align with `CONSTITUTION.md`; conflicts resolve in favor of the constitution.

## 2026-02-12 - Canonical Verification Gate

Decision:
Use `pnpm verify` as the single required pre-merge verification command.

Rationale:
A single canonical gate reduces ambiguity and ensures consistent local + CI health checks.

Consequences:
No merge to `main` without a passing `pnpm verify`; fast checks are optional but not sufficient.

## 2026-02-12 - Public Template Toolchain Baseline

Decision:
Standardize on Node.js 20+, pnpm 9, TypeScript, ESLint (flat config), Prettier, and Vitest for template baseline execution.

Rationale:
These tools are widely adopted, lightweight for fresh projects, and provide meaningful verification from day one.

Consequences:
Template consumers inherit this baseline and can tighten or replace it later through explicit proposal-driven changes.

## 2026-02-12 - Hosted CI as Optional Verification Surface

Decision:
Use a hosted CI workflow that runs `pnpm install` and `pnpm verify` as an optional review surface.

Rationale:
Hosted automation provides additional signal, but local-first governance should not depend on external platforms.

Consequences:
Hosted CI may aid confidence; authoritative merge readiness remains in local Change Review evidence.

## 2026-02-12 - Mandatory First-Run Intake for Novice Projects

Decision:
Require assistants to complete an intake interview and fill `PROJECT-BRIEF.md` before non-trivial implementation when using this template.

Rationale:
Novices need a predictable, low-friction start that captures intent before code is generated.

Consequences:
`BOOTSTRAP.md` and `PROJECT-BRIEF.md` become first-run mandatory artifacts; assistants must prompt users instead of assuming scope.

## 2026-02-13 - Discovery-First Ideation During Bootstrap

Decision:
Require assistants to run a short discovery/rubberduck phase with clarifying questions and scoped option trade-offs before finalizing the project brief.

Rationale:
Early idea expansion reduces ambiguity, improves spec quality, and helps novice users articulate a buildable v1 scope.

Consequences:
Bootstrap now includes minimum clarifying-question expectations, explicit assumption handling, and additional brief structure for alternatives, assumptions, and unknowns.

## 2026-02-13 - Decomposition Gate Before Implementation

Decision:
Require decomposition planning for T1/T2/T3 work before implementation, including ordered work units with per-unit verification notes and exit criteria.

Rationale:
Decomposition improves reviewability, reduces big-bang changes, and makes progress measurable for human + AI collaboration.

Consequences:
Definition of Ready now includes decomposition approval; proposal template and governance checks enforce decomposition artifacts.

## 2026-02-13 - Local-First Review Boundary and Review Records

Decision:
Define Change Review as local-first and require Review Records at `REVIEWS/YYYY-MM-DD--short-title.md` for non-trivial merges into `main`.

Rationale:
Local-first governance must be executable without hosted platforms while preserving auditable review evidence.

Consequences:
Hosted external review surfaces are optional only; remotes/push/publish actions require explicit approval and `DECISIONS.md` recording.

## 2026-02-13 - Canonical Bootstrap for Non-Git Toolchain Provisioning

Decision:
Require a canonical local bootstrap command (`./bootstrap`) and a repo-already-cloned onboarding guide (`GETTING_STARTED.md`) to provision non-git tooling safely.

Rationale:
Non-developer users need a deterministic setup path that does not assume preinstalled runtimes or package managers.

Consequences:
Bootstrap now validates tooling, provides safe install paths or explicit instructions, and aligns with canonical verification without managing `git` acquisition.
