# Proposal: Complete Migration and Modernization Review

Date: 2026-07-24
Owner: Codex
Risk Class: T1
Related Issue/Context: active modernization goal
Roadmap Item: C021
Planned Branch: `docs/c012-tempo-modernization-goal`
Expected Commit Count: 2

## Objective

Make the completed modernization migration-ready, reviewable, and
publication-ready by documenting the transition, auditing every goal criterion
against current evidence, replaying clean setup and verification, and producing
the required Review Record—without merging, pushing, or publishing externally.

## Scope

In scope:

- Add migration guidance for old Tempo clones and existing repositories.
- Audit public setup commands and next actions from a novice perspective.
- Map all 20 active-goal criteria to authoritative current evidence.
- Re-run canonical, evaluation, clean-main bootstrap, and portable-adoption
  checks against the final committed tree.
- Audit security, privacy, compatibility, rollback, template history, generated
  artifacts, and external-action absence.
- Complete `STATUS.md`, `DECISIONS.md`, roadmap, active goal, proposals, and
  Review Record.
- Mark the living goal complete only after every criterion has final evidence.

Out of scope:

- Local merge into `main`; the result must be ready for that Review Boundary.
- Push, publication, deployment, remote changes, release tags, or hosted change
  requests.
- New skill/plugin features, new application profiles, or unrelated cleanup.

## Expected Files Touched

- `MIGRATION.md`
- `README.md`
- `GETTING_STARTED.md`
- `VERIFY.md`
- `REVIEWS/2026-07-24--tempo-skills-goals-modernization.md`
- `ROADMAP/COMMIT-PLAN.md`
- `STATUS.md`
- `DECISIONS.md`
- all modernization proposals as evidence status requires
- active goal

## Acceptance Criteria

- [ ] Migration guidance covers fresh users, old Tempo clones, target adoption,
      active-state migration, compatibility, and rollback.
- [ ] README and guide retain one obvious primary command and plain-language next
      action.
- [ ] Review Record lists exact commits, scope, risk, criterion evidence,
      verification, safety audit, rollback, findings, and boundary decision.
- [ ] Every active-goal criterion has final, requirement-matched evidence.
- [ ] Final committed tree passes `pnpm verify`.
- [ ] Final committed tree completes `./bootstrap --mode greenfield` from an
      isolated clean `main`.
- [ ] Final committed tree passes the isolated non-Node target path.
- [ ] Worktree contains no secrets, logs, caches, generated eval workspaces, or
      unrelated changes.
- [ ] No external push, publication, remote mutation, deployment, or production
      action occurred.
- [ ] Goal status changes to `completed` only after all checks pass.

## Verification Plan

Commands:

```bash
pnpm verify
git diff --check
git status --short
git diff main...HEAD --stat
git log --reverse --format=fuller main..HEAD
```

Final isolated checks:

```bash
./bootstrap --mode greenfield
./bootstrap --mode adopt-existing --target <non-node-fixture> --verify-command "python3 -m pytest"
```

Pass means:

- Every command exits 0 in its intended state.
- The clean-main bootstrap runs the full canonical gate.
- Portable setup remains idempotent and stack-neutral.
- Review finds no unresolved blocking issue.

## Change Review Plan

- Review Boundary: merge from `docs/c012-tempo-modernization-goal` into `main`
- Planned Review Record: `REVIEWS/2026-07-24--tempo-skills-goals-modernization.md`
- Reviewer/approver expectation: Codex performs evidence and safety review;
  human's explicit C017 T2 approval remains recorded; actual local merge remains
  a separate boundary action.

## Git Plan

- Existing branch: `docs/c012-tempo-modernization-goal`
- Planned commits:
  - `docs(release): approve modernization readiness review`
  - `docs(release): complete modernization review`
- Required trailers:
  - `Roadmap: ROADMAP/COMMIT-PLAN.md#C021`
  - `Proposal: PROPOSALS/2026-07-24--modernization-release-readiness.md`
- Planned future merge method: `git merge --no-ff
docs/c012-tempo-modernization-goal`

## Decomposition Plan

1. Add migration and public-command guidance — Verify by: link/command
   consistency checks and novice audit — Exit criteria: old and new users have a
   reversible transition — Risk: T1 — Dependencies: C016–C020.
2. Build the exact commit and criterion evidence inventory — Verify by: git log,
   active-goal audit, and source inspection — Exit criteria: no criterion relies
   on indirect or missing evidence — Risk: T1 — Dependencies: unit 1.
3. Run final feature-branch and isolated-clean checks — Verify by: commands in
   the Verification Plan — Exit criteria: current committed tree, not remembered
   prior output, passes — Risk: T1 — Dependencies: unit 2.
4. Complete Review Record and living goal — Verify by: structural validators,
   clean worktree, and final diff/safety audit — Exit criteria: goal is complete
   and branch is ready for the local Review Boundary — Risk: T1 — Dependencies:
   units 1–3.

Thin slice milestone:

- Migration guidance and the draft Review Record map every remaining criterion
  before the final replay.

Dependencies and unknowns:

- The working branch contains the complete modernization sequence; `main`
  intentionally remains unchanged until a later local Review Boundary.
- Hosted publication state is out of scope and must remain untouched.

Intentional deferrals:

- Actual merge, push, GitHub publication, plugin packaging, release tags, and
  post-publication host testing.

## Rollback Plan

1. Before merge, abandon the feature branch or revert individual atomic commits.
2. After a future merge, revert the no-fast-forward merge to restore the
   pre-modernization tree.
3. For target installations, use `.tempo/install-manifest.txt` and AGENTS backup
   under explicit removal approval.
4. Validate rollback with the pre-modernization `pnpm verify` path and document
   any capability intentionally lost.

## Risks and Mitigations

- Risk: final status overstates evidence.
  Mitigation: map every criterion to exact commands/artifacts and leave uncertain
  items incomplete.
- Risk: reviewing a dirty or stale tree.
  Mitigation: commit the review inputs, run checks against that commit, then make
  only the evidence-completion commit.
- Risk: publication wording implies an external action occurred.
  Mitigation: use “publication-ready” and explicitly record no external action.

## Compatibility / Migration Notes

- Migration is additive-first and preserves template history.
- Default starter users retain the TypeScript profile.
- Existing repositories can adopt only the portable profile.
- Existing active work moves to one living goal without deleting historical
  proposal, roadmap, review, or RCA evidence.

## Observability / Debug Notes

- Review Record must include timestamps/commit IDs for final clean checks.
- Any final failure reopens the relevant criterion and records its exact next
  action.

## Approval

- Requested from: Human Partner
- Approval status: approved through the original `/goal` directive and active
  goal Authority Envelope for scoped, reversible T1 work
- Approved at: 2026-07-24
