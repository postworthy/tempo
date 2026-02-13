# Proposal: Decomposition Governance Gate

Date: 2026-02-13
Owner: AI Agent
Risk Class: T1
Related Context: Add mandatory decomposition planning for non-trivial work before implementation begins.

## Objective

Strengthen governance so T1/T2/T3 work must be decomposed into small, verifiable work units with explicit exit criteria before implementation.

## Scope

In scope:

- Add a decomposition article to `CONSTITUTION.md`.
- Add decomposition as a Definition of Ready gate in governance docs.
- Update proposal templates with required decomposition plan section.
- Update `AGENTS.md` operating loop and readiness/requirements.
- Update docs-check script to enforce decomposition artifacts in templates/constitution.
- Update roadmap/status/decisions to record the process enhancement.

Out of scope:

- Product-specific decomposition for future feature proposals.
- Changes to runtime code or CI runtime behavior.

## Expected Files Touched

- `PROPOSALS/2026-02-13--decomposition-governance-gate.md`
- `CONSTITUTION.md`
- `PROPOSALS/TEMPLATE.md`
- `AGENTS.md`
- `scripts/check-docs.mjs`
- `ROADMAP/COMMIT-PLAN.md`
- `STATUS.md`
- `DECISIONS.md`

## Acceptance Criteria

- [ ] Constitution includes decomposition-before-development rules for T1/T2/T3 work.
- [ ] Governance includes decomposition as a Definition of Ready gate.
- [ ] Proposal template includes decomposition work units with verification and exit criteria.
- [ ] `pnpm verify` passes and docs checks validate decomposition requirements.
- [ ] Status/roadmap/decisions reflect this governance update.

## Verification Plan

Commands:

```bash
pnpm verify
```

Pass means:

- Formatting, lint, typecheck, docs checks, tests, and build all pass.
- Decomposition requirements are present in canonical governance/template files.

## Rollback Plan

If regressions occur:

1. Revert this governance docs change commit.
2. Restore prior constitution/template wording.
3. Run `pnpm verify` to confirm baseline health.

## Risks and Mitigations

- Risk: Added process overhead slows simple work.
  Mitigation: Keep decomposition gate scoped to T1/T2/T3, not T0.
- Risk: Template/check wording drifts over time.
  Mitigation: Enforce key markers through `check:docs`.

## Compatibility / Migration Notes

- API compatibility impact: none.
- Data/schema migration needed: no.
- Backward compatibility window: not applicable.

## Approval

- Requested from: repository owner/user
- Approval status: approved via direct instruction
- Approved at: 2026-02-13
