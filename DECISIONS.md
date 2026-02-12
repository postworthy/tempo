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

## 2026-02-12 - CI Uses Canonical Verify

Decision:
GitHub Actions workflow runs `pnpm install` and `pnpm verify` on pull requests and pushes to `main`.

Rationale:
CI and local verification parity reduces merge-time surprises and governance drift.

Consequences:
Any verification regression blocks merges until resolved or explicitly approved through governance process.

## 2026-02-12 - Mandatory First-Run Intake for Novice Projects

Decision:
Require assistants to complete an intake interview and fill `PROJECT-BRIEF.md` before non-trivial implementation when using this template.

Rationale:
Novices need a predictable, low-friction start that captures intent before code is generated.

Consequences:
`BOOTSTRAP.md` and `PROJECT-BRIEF.md` become first-run mandatory artifacts; assistants must prompt users instead of assuming scope.
