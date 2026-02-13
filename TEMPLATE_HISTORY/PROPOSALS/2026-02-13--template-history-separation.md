# Proposal: Template History Separation

Date: 2026-02-13
Owner: AI Agent
Risk Class: T1
Related Context: Prevent new template consumers from inheriting active dated governance records.

## Objective

Separate template-development governance history from active project records so fresh users start with clean proposal/review/RCA folders while retaining evidence of template process rigor.

## Scope

In scope:

- Move existing dated proposal records into `TEMPLATE_HISTORY/PROPOSALS/`.
- Add `TEMPLATE_HISTORY/README.md` explaining active vs historical record boundaries.
- Add one-time initialization flow (`./bootstrap --init-project`) that resets core planning docs with backup.
- Update `GETTING_STARTED.md`, `AGENTS.md`, and governance tracking docs to describe the model.
- Extend docs checks to enforce template-only live record folders in fresh-template mode.

Out of scope:

- Deleting template history.
- Runtime application behavior changes.

## Expected Files Touched

- `PROPOSALS/2026-02-13--template-history-separation.md`
- `TEMPLATE_HISTORY/README.md`
- `TEMPLATE_HISTORY/PROPOSALS/*` (moved files)
- `scripts/init-project.sh`
- `bootstrap`
- `GETTING_STARTED.md`
- `AGENTS.md`
- `scripts/check-docs.mjs`
- `ROADMAP/COMMIT-PLAN.md`
- `STATUS.md`
- `DECISIONS.md`

## Acceptance Criteria

- [ ] Active `PROPOSALS/`, `REVIEWS/`, and `RCA/` folders are template-only in fresh-template mode.
- [ ] Template-development proposal records are preserved in `TEMPLATE_HISTORY/PROPOSALS/`.
- [ ] One-time initialization command exists and creates backups before resetting project baseline docs.
- [ ] Governance/docs explain that `TEMPLATE_HISTORY/` is non-active reference material.
- [ ] `pnpm verify` passes.

## Verification Plan

Commands:

```bash
pnpm verify
./bootstrap --init-project --no-verify
pnpm verify
```

Pass means:

- checks pass before and after init-project flow,
- docs checks enforce fresh-template constraints correctly.

## Rollback Plan

If regressions occur:

1. Revert this change set.
2. Restore moved proposal files to original locations from git history.
3. Run `pnpm verify`.

## Risks and Mitigations

- Risk: Users mistake template-history records for active records.
  Mitigation: explicit `TEMPLATE_HISTORY/README.md` and AGENTS guidance.
- Risk: Init-project reset overwrites user in-progress docs.
  Mitigation: backup creation at `.template-init-backup/<timestamp>/` before modifications.

## Compatibility / Migration Notes

- API compatibility impact: none.
- Data/schema migration needed: no.
- Backward compatibility window: not applicable.

## Approval

- Requested from: repository owner/user
- Approval status: approved via direct instruction
- Approved at: 2026-02-13
