# Goal: Remediate Tempo Production Readiness

Status: completed
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

- [x] AC1 — Plain `./bootstrap` passes from isolated clean `main` and leaves a clean worktree.
  - Evidence: exact committed tree `acdfef0`, initialized as `main`, completed plain `./bootstrap`, 27 tests, 7/7 evaluation scenarios, 59 assertions, build, and empty status/diff checks
- [x] AC2 — The documented one-command new-project path creates a valid unfilled project state and passes canonical verification.
  - Evidence: exact committed tree `acdfef0`, initialized as `main`, completed `./bootstrap --init-project`; validators reported an unfilled project with no active goal and the full gate passed
- [x] AC3 — Explicit initialization backs up affected contracts and active records while preserving `TEMPLATE_HISTORY/`.
  - Evidence: isolated initialization created a timestamped `.template-init-backup/`, left only templates in active record folders, and produced no `TEMPLATE_HISTORY/` diff
- [x] AC4 — Portable adoption rejects destination and managed-parent symlinks before mutation without changing out-of-target data.
  - Evidence: `test/portable-adoption.test.ts` hashes a symlink target, snapshots the repository, and proves both remain unchanged after AGENTS and managed-parent rejection
- [x] AC5 — A first-run portable conflict leaves the target byte-for-byte unchanged.
  - Evidence: the first-install conflict fixture snapshots every non-git path before and after a conflicting `.tempo/VERIFY.md` and observes exact equality
- [x] AC6 — Normal and repeated portable adoption remain stack-neutral, idempotent, and preserving.
  - Evidence: six focused portable fixtures pass with Node/pnpm failure wrappers, unchanged application content, stable manifest, and one routing block
- [x] AC7 — The frozen dependency graph has no unapproved high or critical audit result.
  - Evidence: `pnpm audit --audit-level=high` exits 0 with one low advisory after the coherent ESLint 10, Vitest 4, Node 20.19, and patched-transitive refresh
- [x] AC8 — Regression coverage exercises all reproduced release blockers and meaningful negative paths.
  - Evidence: canonical verification passes 27 tests across public bootstrap, initialization, symlink containment, first-conflict atomicity, normal/repeat adoption, governance, goals, skills, and evaluations
- [x] AC9 — Public, migration, verification, status, roadmap, goal, and decision documentation agree with behavior.
  - Evidence: `pnpm check:contracts` and `pnpm check:docs` pass after final reconciliation; README, getting started, bootstrap, migration, verification, status, roadmap, decisions, proposal, goal, evaluation artifact, and review state agree
- [x] AC10 — The final exact tree passes all feature and isolated release gates, the Review Record is approved, and no external action occurred.
  - Evidence: feature branch and both isolated committed-tree public paths pass; the Review Record has no blocking finding and approves the local boundary; no merge, push, publish, tag, deploy, remote, or production command occurred

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

| Unit                                   | Status    | Exit criteria                                                        | Verification                                       |
| -------------------------------------- | --------- | -------------------------------------------------------------------- | -------------------------------------------------- |
| 1. Release-path regressions            | completed | Four reproduced blocker classes have deterministic fixtures.         | Focused Vitest failures on the pre-fix behavior.   |
| 2. Public bootstrap and initialization | completed | Plain and initialized clean-main paths pass and are reversible.      | Isolated bootstrap, docs, goal, and status checks. |
| 3. Portable containment and preflight  | completed | Symlinks and known conflicts are rejected before target mutation.    | Hash/inventory negative tests plus normal repeat.  |
| 4. Dependency remediation              | completed | No unapproved high/critical audit and supported verification passes. | `pnpm audit`; focused and canonical gates.         |
| 5. Final replay and review             | completed | All criteria have exact-tree evidence and review is approved.        | `pnpm verify`; isolated commands; final audit.     |

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
- 2026-07-24: Portable content is staged outside the target, every managed path
  component and conflict is preflighted before mutation, malformed AGENTS
  routing is rejected, and unexpected failures restore changed AGENTS content
  and remove created files.
- 2026-07-24: Development dependencies were refreshed coherently; high-threshold
  audit now exits 0 with one low advisory, and canonical verification passes 27
  tests under Vitest 4 and ESLint 10.
- 2026-07-24: The first exact-tree initialization replay reached canonical
  verification and exposed template-specific evaluation and test fixtures; the
  plain bootstrap replay passed and left a clean worktree.
- 2026-07-24: Template-neutral checks passed canonical verification, then exact
  committed-tree plain and initialized `main` replays both completed the full
  gate; the plain tree stayed clean and initialization preserved reversible
  backups and template history.
- 2026-07-24: Final scope, history, safety, compatibility, rollback,
  documentation, secret, artifact, audit, and evidence review found no blocking
  issue and approved the local Review Boundary.

## Evidence

- Reproductions and severity are recorded in
  `REVIEWS/2026-07-24--tempo-skills-goals-modernization.md`.
- Pre-remediation `pnpm verify` passes 22 tests and seven evaluation scenarios,
  demonstrating why broader release fixtures are required.
- Pre-remediation audit reports 1 critical and 20 high development-toolchain
  advisories; production-only audit reports none.
- `pnpm exec vitest run test/release-paths.test.ts
test/portable-adoption.test.ts` passes eight focused tests.
- `bash -n scripts/install-portable.sh` passes after the containment rewrite.
- `pnpm audit --audit-level=high` exits 0 with one low advisory.
- `pnpm verify` passes after the dependency refresh with 27 tests, seven
  evaluation scenarios, 59 assertions, and a successful build.
- Exact committed tree `acdfef0` passes plain `./bootstrap` and remains clean.
- Exact committed tree `acdfef0` passes `./bootstrap --init-project`, including
  27 tests, 7/7 evaluation scenarios, 59 assertions, and the build.
- Initialized state has unfilled contracts, template-only active record folders,
  a timestamped complete backup, and no `TEMPLATE_HISTORY/` diff.
- Final review records no blocking findings; `git diff --check`, trailer audit,
  secret-pattern scan, and high-threshold dependency audit pass.

## Discoveries

- Passing the internal gate does not prove the exact public README path.
- Portable destination checks must include every existing parent component, not
  only the final file.
- Explicit project initialization is the correct boundary for retiring inherited
  active records because it is intentional and can be backed up.
- A failing-test-only commit would violate Tempo's per-commit completion rules,
  so regression fixtures ship atomically with the corresponding repairs.
- Current ESLint requires Node 20.19 or later; enforcing that coherent minimum is
  safer than retaining a nominal Node 20.0 claim that the installed toolchain
  cannot satisfy.
- Release checks must remain valid after initialization archives every active
  Tempo record; reusable checks may depend on templates and synthetic fixtures,
  but not on a dated repository-development goal.

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

- Preserve this approved branch; merge, push, and publication require separate explicit approval.

## Pause Conditions

- Pause at every boundary under “Must Pause for Approval.”
- Preserve exact failure output before each changed-cause retry.
- Do not accept a security exception or compatibility expansion without explicit
  approval.
- Do not complete until every criterion has final environmental evidence.

## Outcomes

- Production-readiness remediation is complete.
- Public bootstrap, reversible initialization, portable containment and
  atomicity, dependency remediation, release regressions, documentation, and
  exact-tree integration evidence are complete.
- The branch is ready for the approved local Review Boundary; no merge or
  publication action has occurred.
