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

- [ ] AC1 — A machine-readable policy defines reset, archive, retain, and
      preserve categories.
  - Evidence: pending
- [ ] AC2 — Initialization resets project contracts and `DECISIONS.md` to
      neutral starter state with recoverable originals.
  - Evidence: pending
- [ ] AC3 — Tempo-only active records, roadmap documents, dated evaluation
      reports, and clean-release evidence are archived.
  - Evidence: pending
- [ ] AC4 — Reusable skills, validators, evaluation cases, starter tooling, and
      `TEMPLATE_HISTORY/` remain byte-identical.
  - Evidence: pending
- [ ] AC5 — Deterministic validation rejects residual development state in an
      unfilled project.
  - Evidence: pending
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

| Unit                           | Status      | Exit criteria                                               | Verification                         |
| ------------------------------ | ----------- | ----------------------------------------------------------- | ------------------------------------ |
| 1. Policy and regression scope | in_progress | Every residual-state class has an explicit policy category. | Goal validation and focused fixtures |
| 2. Initialization enforcement  | pending     | Initialized state matches policy and rejects drift.         | Focused tests and initialized verify |
| 3. Exact replay and review     | pending     | All criteria have evidence and review is approved.          | Full gate, audit, isolated commands  |

## Progress

- 2026-07-24: Human Partner approved the stronger initialization requirement
  with “do it.”
- 2026-07-24: Inspection confirmed residual Tempo development state in
  `DECISIONS.md`, dated `EVALS/` evidence, and the modernization roadmap.

## Evidence

- Pre-change `scripts/init-project.sh` resets four contracts and active record
  folders but does not reset decisions or archive roadmap/evaluation evidence.

## Discoveries

- Source-repository auditability and initialized-project cleanliness are
  separate valid states.
- `EVALS/scenarios.json` currently depends on clean-release evidence that the
  stronger boundary should archive.

## Decisions

- Keep `TEMPLATE_HISTORY/` as explicitly quarantined, non-active history.
- Reset project-owned decisions instead of letting Tempo product decisions
  govern the user's new product.
- Express the conversion contract as machine-readable policy.

## Retry State

- Current attempt: 0
- Maximum attempts per unchanged failure: 2
- Last failure: none

## Next Action

- Add the initialization policy and focused failing fixtures for every reset, archive, retain, and preserve category.

## Pause Conditions

- Pause at every boundary under “Must Pause for Approval.”
- Preserve failure evidence and change the intervention before retrying.
- Do not complete until an exact initialized release tree passes the full gate.

## Outcomes

- C023 is approved and active; policy and implementation remain.
