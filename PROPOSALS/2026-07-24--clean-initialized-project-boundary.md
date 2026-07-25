# Proposal: Enforce a Clean Initialized-Project Boundary

Date: 2026-07-24
Owner: Human Partner and Codex
Risk Class: T2
Related Issue/Context: public clones must become fresh user projects without
active Tempo-development state
Roadmap Item: C023
Planned Branch: `docs/c012-tempo-modernization-goal`
Expected Commit Count: 4

## Objective

Make `./bootstrap --init-project` a deterministic conversion boundary from the
auditable Tempo source repository to a fresh user project that retains reusable
Tempo capabilities but no active Tempo-development decisions, plans, goals, or
release evidence.

## Scope

In scope:

- Define a machine-readable initialization policy for reset, archive, retain,
  and preserve behavior.
- Reset project-owned contracts, including `DECISIONS.md`, to starter state.
- Archive Tempo-specific roadmap documents, dated evaluation reports, and
  clean-release evidence into the recoverable ignored backup.
- Retain reusable evaluation cases, validators, skills, governance, starter
  tooling, and explicitly quarantined `TEMPLATE_HISTORY/`.
- Validate the initialized state deterministically during canonical
  verification.
- Update public, migration, verification, status, roadmap, and review records.

Out of scope:

- Rewriting or removing Git history.
- Removing reusable Tempo governance, skills, tests, or starter tooling.
- Removing `TEMPLATE_HISTORY/`, which remains explicitly non-active.
- Merge, push, publication, tag, deployment, remote, or production action.

## Expected Files Touched

- `INITIALIZATION-POLICY.json`
- starter contract templates
- `scripts/init-project.sh`
- new initialization-policy validator
- `scripts/check-docs.mjs`
- `scripts/run-evals.mjs`
- `EVALS/scenarios.json`
- initialization and release-path tests
- `package.json`
- `README.md`
- `GETTING_STARTED.md`
- `MIGRATION.md`
- `VERIFY.md`
- `DECISIONS.md`
- `ROADMAP/COMMIT-PLAN.md`
- `STATUS.md`
- active goal and Review Record

## Acceptance Criteria

- [ ] Initialization resets `DECISIONS.md` and every project-owned contract to
      a neutral starter state.
- [ ] Tempo-specific roadmap files, dated evaluation reports, clean-release
      evidence, and active governance records move into one recoverable backup.
- [ ] `TEMPLATE_HISTORY/`, reusable skills, validators, evaluation cases, and
      starter tooling remain unchanged.
- [ ] A deterministic validator rejects residual Tempo-development state in an
      unfilled initialized project.
- [ ] The initialized tree passes `pnpm verify` and the dependency audit.
- [ ] Exact isolated plain and initialized public paths pass; plain remains
      clean and initialization matches the policy.
- [ ] Documentation and the Review Record describe the source-to-project
      boundary without implying that cloning alone performs initialization.

## Verification Plan

Commands:

```bash
pnpm verify
pnpm audit:high
```

Focused checks:

```bash
pnpm exec vitest run test/governance.test.ts test/release-paths.test.ts
./bootstrap
./bootstrap --init-project
```

Pass means:

- Every policy category has observable before/after evidence.
- No forbidden Tempo-development state remains active after initialization.
- Canonical verification passes in the source and initialized forms.

## Change Review Plan

- Review Boundary: merge from `docs/c012-tempo-modernization-goal` into `main`
- Planned Review Record:
  `REVIEWS/2026-07-24--tempo-skills-goals-modernization.md`
- Reviewer/approver expectation: Codex performs exact-tree replay and approves
  only with no blocking initialization-cleanliness finding; the Human Partner
  approved this T2 implementation with “do it” on 2026-07-24.

## Git Plan

- Existing branch: `docs/c012-tempo-modernization-goal`
- Planned commits:
  1. `docs(release): approve clean initialization boundary`
  2. `fix(bootstrap): remove template development state`
  3. `fix(test): keep initialization regression template neutral`
  4. `docs(review): approve clean initialized release`
- Required commit trailers:
  - `Roadmap: ROADMAP/COMMIT-PLAN.md#C023`
  - `Proposal: PROPOSALS/2026-07-24--clean-initialized-project-boundary.md`
- Planned merge method:
  `git merge --no-ff docs/c012-tempo-modernization-goal`

## Decomposition Plan (Required for T1/T2/T3)

1. Record policy and regressions — Verify by: goal and focused fixture checks —
   Exit criteria: each residual-state class is represented — Risk: T1 —
   Dependencies: explicit approval.
2. Enforce the boundary — Verify by: initialized fixture and policy validator —
   Exit criteria: reset/archive/retain/preserve behavior matches the manifest —
   Risk: T2 — Dependencies: unit 1.
3. Replay and review — Verify by: canonical gate, audit, exact isolated public
   commands, artifact and status audit — Exit criteria: all criteria have
   evidence and the review is approved — Risk: T1 — Dependencies: unit 2.

Thin slice milestone:

- A disposable initialized repository resets decisions and archives Tempo-only
  roadmap/evaluation artifacts while still passing focused checks.

Dependencies and unknowns:

- Evaluation scenarios must not depend on release evidence that initialization
  correctly archives.
- The policy must remain readable without adding a new runtime dependency.

Intentional deferrals:

- Release packaging separate from Git clone plus initialization.
- Removal of explicitly quarantined `TEMPLATE_HISTORY/`.

## Rollback Plan

1. Revert C023 commits before the Review Boundary.
2. For an initialized project, restore the complete timestamped
   `.template-init-backup/` snapshot.
3. Run `pnpm verify` and both isolated public paths after rollback.

## Risks and Mitigations

- Risk: useful reusable tooling is mistaken for development history.
  Mitigation: explicit policy categories and preservation assertions.
- Risk: initialization and validation drift.
  Mitigation: one machine-readable policy consumed by both behavior and checks.
- Risk: reset hides needed governance decisions.
  Mitigation: keep durable policy in Constitution/verification/templates and
  reset only project-specific decision state.

## Compatibility / Migration Notes

- API compatibility impact: explicit initialization archives additional
  Tempo-development artifacts.
- Data/schema migration needed: no; all affected data is copied or moved into
  the recoverable local backup.
- Backward compatibility window: plain contributor bootstrap is unchanged.

## Observability / Debug Notes

- Initialization prints the backup path and policy summary.
- Focused failures name the residual file or mismatched policy category.

## Approval

- Requested from: Human Partner
- Approval status: approved
- Approved at: 2026-07-24
