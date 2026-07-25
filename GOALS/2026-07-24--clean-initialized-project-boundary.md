# Goal: Enforce a Clean Initialized-Project Boundary

Status: active
Owner: Human Partner and Codex
Risk: T2
Updated: 2026-07-24
Proposal: `PROPOSALS/2026-07-24--clean-initialized-project-boundary.md`
Review Boundary: merge from `docs/c012-tempo-modernization-goal` into `main`

## Outcome

An initialized Tempo clone is a fresh user project: reusable Tempo
infrastructure and quarantined template history remain, while Tempo's active
development decisions, plans, goals, and release evidence are recoverably
archived and cannot influence the user's project.

## Non-Goals

- Do not rewrite Git history or make the source repository unauditable.
- Do not remove reusable skills, governance, validators, tests, or starter
  tooling.
- Do not remove explicitly non-active `TEMPLATE_HISTORY/`.
- Do not merge, push, publish, tag, deploy, mutate remotes, or affect production.

## Acceptance Criteria

- [x] AC1 — A machine-readable policy defines reset, archive, retain, and
      preserve categories.
  - Evidence: `INITIALIZATION-POLICY.json` version 1 is loaded by initialization and validation
- [x] AC2 — Initialization resets project contracts and `DECISIONS.md` to
      neutral starter state with recoverable originals.
  - Evidence: focused fixtures compare generated brief, specification, status, decisions, and commit plan with starter documents and find originals in the timestamped backup
- [x] AC3 — Tempo-only active records, roadmap documents, dated evaluation
      reports, and clean-release evidence are archived.
  - Evidence: release-path fixture observes template-only active folders, only `COMMIT-PLAN.md` under `ROADMAP/`, no dated evaluation report or clean-release artifact, and all corresponding backup files
- [x] AC4 — Reusable skills, validators, evaluation cases, starter tooling, and
      `TEMPLATE_HISTORY/` remain byte-identical.
  - Evidence: SHA-256 recursive snapshots for every retain and preserve policy path are identical before and after fixture initialization
- [x] AC5 — Deterministic validation rejects residual development state in an
      unfilled project.
  - Evidence: `validateInitializedState` accepts the clean fixture and rejects a newly introduced dated evaluation report by exact path
- [ ] AC6 — Source and initialized trees pass canonical verification and the
      high-threshold audit has no high/critical finding.
  - Evidence: pending
- [ ] AC7 — Exact isolated plain and initialized public paths satisfy the final
      policy and documentation.
  - Evidence: pending
- [ ] AC8 — Review, roadmap, status, decisions, migration, and public guidance
      agree; no external action occurred.
  - Evidence: pending

## Authority Envelope

### May Continue Without Asking

- Implement the explicitly approved C023 T2 change within its proposal.
- Perform local reversible edits, tests, validation, backups in disposable
  fixtures, dependency-free policy parsing, and exact-tree replays.
- Update repository records and create atomic local commits on the current
  compliant feature branch.

### Must Pause for Approval

- Scope expansion beyond C023.
- Destructive action against the current repository or a real user project.
- Removal of `TEMPLATE_HISTORY/` or reusable Tempo capability.
- Any compatibility break beyond the explicit initialization boundary.
- Remote, merge, push, publication, tag, deployment, or production action.
- Unclear security/privacy impact or unapproved T2/T3 implementation.

## Work Units

| Unit                           | Status    | Exit criteria                                               | Verification                         |
| ------------------------------ | --------- | ----------------------------------------------------------- | ------------------------------------ |
| 1. Policy and regression scope | completed | Every residual-state class has an explicit policy category. | Goal validation and focused fixtures |
| 2. Initialization enforcement  | completed | Initialized state matches policy and rejects drift.         | Focused tests and initialized verify |
| 3. Exact replay and review     | pending   | All criteria have evidence and review is approved.          | Full gate, audit, isolated commands  |

## Progress

- 2026-07-24: Human Partner approved the stronger initialization requirement
  with “do it.”
- 2026-07-24: Inspection confirmed residual Tempo development state in
  `DECISIONS.md`, dated `EVALS/` evidence, and the modernization roadmap.
- 2026-07-24: Versioned policy, transactional initializer, starter documents,
  initialized-state validator, canonical gate, and reset/archive/retain/preserve
  regressions implemented.
- 2026-07-24: Source `pnpm verify` passes 27 tests and 7/7 evaluation scenarios
  with 59 assertions; high-threshold audit exits 0 with one low advisory.
- 2026-07-24: First exact initialized replay passed contracts, docs, goals, and
  initialized-state validation, then exposed a repository-specific nested test
  expectation after the roadmap was correctly archived.

## Evidence

- Pre-change `scripts/init-project.sh` resets four contracts and active record
  folders but does not reset decisions or archive roadmap/evaluation evidence.
- `pnpm exec vitest run test/governance.test.ts test/release-paths.test.ts`
  passes 16 focused tests.
- `pnpm verify` and `pnpm audit --audit-level=high` pass after enforcement.

## Discoveries

- Source-repository auditability and initialized-project cleanliness are
  separate valid states.
- `EVALS/scenarios.json` currently depends on clean-release evidence that the
  stronger boundary should archive.
- Clean-bootstrap evaluation now depends on the reusable release-path regression
  rather than the archived release evidence.

## Decisions

- Keep `TEMPLATE_HISTORY/` as explicitly quarantined, non-active history.
- Reset project-owned decisions instead of letting Tempo product decisions
  govern the user's new product.
- Express the conversion contract as machine-readable policy.
- Roll back partially applied initialization if an unexpected file operation
  fails.

## Retry State

- Current attempt: 1
- Maximum attempts per unchanged failure: 2
- Last failure: release-path fixture expected Tempo's named modernization
  roadmap even when running inside an already initialized source tree.

## Next Action

- Commit the template-neutral regression repair, then repeat the exact initialized bootstrap replay.

## Pause Conditions

- Pause at every boundary under “Must Pause for Approval.”
- Preserve failure evidence and change the intervention before retrying.
- Do not complete until an exact initialized release tree passes the full gate.

## Outcomes

- Policy and enforcement units are implemented and locally verified; exact-tree
  replay and final review remain.
