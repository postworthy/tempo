# Goal: Enforce a Clean Initialized-Project Boundary

Status: completed
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
- [x] AC6 — Source and initialized trees pass canonical verification and the
      high-threshold audit has no high/critical finding.
  - Evidence: source and exact initialized `9659908` trees pass 27 tests, 7/7 scenarios, 59 assertions, and build; audit exits 0 at high threshold with one low advisory
- [x] AC7 — Exact isolated plain and initialized public paths satisfy the final
      policy and documentation.
  - Evidence: isolated `./bootstrap` passes with an empty worktree diff; isolated `./bootstrap --init-project` reports 5 reset, 17 archived, 21 retained, and 1 preserved, then passes the full gate
- [x] AC8 — Review, roadmap, status, decisions, migration, and public guidance
      agree; no external action occurred.
  - Evidence: final document checks and Review Record pass; git, artifact, secret-pattern, and command audits show no unrelated, remote, merge, push, publication, tag, deploy, or production action

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
| 3. Exact replay and review     | completed | All criteria have evidence and review is approved.          | Full gate, audit, isolated commands  |

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
- 2026-07-24: Template-neutral fixture repair committed at `9659908`; repeated
  exact initialized replay passed the full canonical gate and policy audit.
- 2026-07-24: Scope, safety, compatibility, migration, rollback, artifact,
  secret, history, and prompt-language review found no blocking issue.

## Evidence

- Pre-change `scripts/init-project.sh` resets four contracts and active record
  folders but does not reset decisions or archive roadmap/evaluation evidence.
- `pnpm exec vitest run test/governance.test.ts test/release-paths.test.ts`
  passes 16 focused tests.
- `pnpm verify` and `pnpm audit --audit-level=high` pass after enforcement.
- Exact `9659908` plain bootstrap passes and leaves an empty worktree diff.
- Exact `9659908` initialized bootstrap passes; active record directories are
  template-only, roadmap is starter-only, dated/release evaluation evidence is
  absent, backup is complete, and `TEMPLATE_HISTORY/` has no diff.

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

- Current attempt: 0
- Maximum attempts per unchanged failure: 2
- Last failure: none

## Next Action

- Preserve this approved branch; merge, push, and publication require separate explicit approval.

## Pause Conditions

- Pause at every boundary under “Must Pause for Approval.”
- Preserve failure evidence and change the intervention before retrying.
- Do not complete until an exact initialized release tree passes the full gate.

## Outcomes

- C023 is complete: initialized projects retain reusable Tempo infrastructure
  and quarantined template history without active Tempo-development state.
- The branch is ready for the local Review Boundary; no merge or publication
  action occurred.
