# Goal: Remediate Tempo Production Readiness

Status: active
Owner: Human Partner and Codex
Risk: T2
Updated: 2026-07-24
Proposal: `PROPOSALS/2026-07-24--production-readiness-remediation.md`
Review Boundary: merge from `docs/c012-tempo-modernization-goal` into `main` with `REVIEWS/2026-07-24--tempo-skills-goals-modernization.md`

## Outcome

Tempo is safe and reliable for public GitHub distribution: its exact documented
new-project and contributor bootstrap commands work from a clean checkout,
explicit initialization produces a valid reversible project baseline, portable
adoption cannot escape or partially mutate its target on known conflicts, the
frozen toolchain has no unapproved high/critical advisory, and the final Review
Record is evidence-backed and approved.

## Non-Goals

- Do not merge, push, publish, tag, deploy, change remotes, or mutate production.
- Do not add a hosted service, plugin package, application framework, or language
  starter.
- Do not follow target symlinks or weaken safety boundaries for convenience.
- Do not erase Tempo or user history without an explicit initialization command
  and a recoverable backup.

## Acceptance Criteria

- [ ] AC1 — Plain `./bootstrap` passes from isolated clean `main` and leaves a clean worktree.
  - Evidence: pending
- [ ] AC2 — The documented one-command new-project path creates a valid unfilled project state and passes canonical verification.
  - Evidence: pending
- [ ] AC3 — Explicit initialization backs up affected contracts and active records while preserving `TEMPLATE_HISTORY/`.
  - Evidence: pending
- [ ] AC4 — Portable adoption rejects destination and managed-parent symlinks before mutation without changing out-of-target data.
  - Evidence: pending
- [ ] AC5 — A first-run portable conflict leaves the target byte-for-byte unchanged.
  - Evidence: pending
- [ ] AC6 — Normal and repeated portable adoption remain stack-neutral, idempotent, and preserving.
  - Evidence: pending
- [ ] AC7 — The frozen dependency graph has no unapproved high or critical audit result.
  - Evidence: pending
- [ ] AC8 — Regression coverage exercises all reproduced release blockers and meaningful negative paths.
  - Evidence: pending
- [ ] AC9 — Public, migration, verification, status, roadmap, goal, and decision documentation agree with behavior.
  - Evidence: pending
- [ ] AC10 — The final exact tree passes all feature and isolated release gates, the Review Record is approved, and no external action occurred.
  - Evidence: pending

## Authority Envelope

### May Continue Without Asking

- Implement the explicitly approved C022 T2 remediation within its proposal.
- Perform local reversible edits, dependency refreshes, tests, audits, builds,
  temporary fixtures, and exact-tree isolated checkouts.
- Add regression coverage, update current documentation, and create atomic
  commits on the existing compliant feature branch.
- Repair in-scope failures while the cause changes or the retry bound remains.

### Must Pause for Approval

- Scope expansion beyond the C022 proposal.
- Any destructive action against the current repository or a real user target.
- An unresolved high/critical advisory requiring a security exception.
- A compatibility break outside the approved bootstrap, initialization,
  symlink-rejection, or supported-toolchain adjustments.
- Remote, push, publication, deployment, tag, or production action.
- Secrets, privileged installation, or unclear security/privacy impact not
  resolved by the approved containment work.

## Work Units

| Unit                                   | Status      | Exit criteria                                                        | Verification                                       |
| -------------------------------------- | ----------- | -------------------------------------------------------------------- | -------------------------------------------------- |
| 1. Release-path regressions            | completed   | Four reproduced blocker classes have deterministic fixtures.         | Focused Vitest failures on the pre-fix behavior.   |
| 2. Public bootstrap and initialization | in_progress | Plain and initialized clean-main paths pass and are reversible.      | Isolated bootstrap, docs, goal, and status checks. |
| 3. Portable containment and preflight  | in_progress | Symlinks and known conflicts are rejected before target mutation.    | Hash/inventory negative tests plus normal repeat.  |
| 4. Dependency remediation              | pending     | No unapproved high/critical audit and supported verification passes. | `pnpm audit`; focused and canonical gates.         |
| 5. Final replay and review             | pending     | All criteria have exact-tree evidence and review is approved.        | `pnpm verify`; isolated commands; final audit.     |

## Progress

- 2026-07-24: Production re-review at `c884f93` rejected the boundary with seven
  findings.
- 2026-07-24: Human Partner explicitly approved the T2 remediation with “make it
  so.”
- 2026-07-24: C022 proposal and resumable execution state drafted.
- 2026-07-24: Eight focused release tests produced five expected pre-fix
  failures: default bootstrap, initialized SPEC, symlinked AGENTS, symlinked
  managed parent, and first-install partial mutation.
- 2026-07-24: Default bootstrap now selects greenfield deterministically;
  explicit initialization archives active records, preserves template history,
  and produces contracts accepted by the repository validators.
- 2026-07-24: Focused release-path and portable-adoption suites pass eight tests
  after the first repairs.

## Evidence

- Reproductions and severity are recorded in
  `REVIEWS/2026-07-24--tempo-skills-goals-modernization.md`.
- Pre-remediation `pnpm verify` passes 22 tests and seven evaluation scenarios,
  demonstrating why broader release fixtures are required.
- Pre-remediation audit reports 1 critical and 20 high development-toolchain
  advisories; production-only audit reports none.
- `pnpm exec vitest run test/release-paths.test.ts
test/portable-adoption.test.ts` passes eight focused tests.

## Discoveries

- Passing the internal gate does not prove the exact public README path.
- Portable destination checks must include every existing parent component, not
  only the final file.
- Explicit project initialization is the correct boundary for retiring inherited
  active records because it is intentional and can be backed up.
- A failing-test-only commit would violate Tempo's per-commit completion rules,
  so regression fixtures ship atomically with the corresponding repairs.

## Decisions

- Keep plain `./bootstrap` for contributor/setup verification and document one
  explicit initialization form as the primary new-project command.
- Reject managed-path symlinks instead of resolving or following them.
- Require conflict preflight before any portable target mutation.
- Treat high/critical development-toolchain advisories as release blockers
  because every Tempo user installs and runs that toolchain.

## Retry State

- Current attempt: 0
- Maximum attempts per unchanged failure: 2
- Last failure: none

## Next Action

- Finish the portable containment checkpoint, then refresh the audited dependency graph.

## Pause Conditions

- Pause at every boundary under “Must Pause for Approval.”
- Preserve exact failure output before each changed-cause retry.
- Do not accept a security exception or compatibility expansion without explicit
  approval.
- Do not complete until every criterion has final environmental evidence.

## Outcomes

- Production-readiness remediation is approved and active.
- No implementation unit is complete yet.
