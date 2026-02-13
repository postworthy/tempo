# Proposal: Local-First Review Discipline

Date: 2026-02-13
Owner: AI Agent
Risk Class: T1
Related Context: Remove hosted review-surface assumptions and make review workflow explicitly local-first with in-repo review records.

## Objective

Establish local-first review and merge governance so merge readiness is proven by in-repo change review records, not by assumed hosted review flows.

## Scope

In scope:

- Add definitions for Change Review, Review Boundary, and Review Record.
- Replace hosted-platform-centric merge language with local-first review discipline.
- Add hard rule preventing remote addition/push/publish unless explicitly approved and logged in `DECISIONS.md`.
- Add `REVIEWS/TEMPLATE.md` with required review fields.
- Update governance/docs/checklists/templates to reference review records and avoid hosted-review assumptions.
- Mark hosted review surfaces as optional where relevant (e.g., hosted CI workflows).
- Update docs checks to enforce local-first review terminology and presence of review template.

Out of scope:

- Disabling optional hosted CI workflow files.
- Changing runtime code or application behavior.

## Expected Files Touched

- `PROPOSALS/2026-02-13--local-first-review-discipline.md`
- `CONSTITUTION.md`
- `AGENTS.md`
- `VERIFY.md`
- `DECISIONS.md`
- `STATUS.md`
- `ROADMAP/COMMIT-PLAN.md`
- `PROPOSALS/TEMPLATE.md`
- `REVIEWS/TEMPLATE.md`
- `.github/workflows/verify.yml`
- `scripts/check-docs.mjs`
- existing proposal/status docs with hosted-language updates as needed

## Acceptance Criteria

- [ ] Governance defines local-first review terms and review record requirements.
- [ ] Hosted review wording is local-first across governance docs.
- [ ] Rule exists preventing remote/push/publish actions without explicit approval and decision log.
- [ ] `REVIEWS/TEMPLATE.md` exists with required fields.
- [ ] `pnpm verify` passes with updated docs checks.

## Verification Plan

Commands:

```bash
pnpm verify
```

Pass means:

- Canonical verification exits 0.
- Docs checks confirm local-first review artifacts/terminology requirements.

## Rollback Plan

If regressions occur:

1. Revert this governance/docs change commit.
2. Restore prior review-language baselines.
3. Run `pnpm verify` to confirm baseline health.

## Risks and Mitigations

- Risk: Over-constraining contributors used to hosted review-surface conventions.
  Mitigation: Keep hosted review surfaces allowed but explicitly optional.
- Risk: Docs-check rules too brittle.
  Mitigation: Validate key markers/terms only.

## Compatibility / Migration Notes

- API compatibility impact: none.
- Data/schema migration needed: no.
- Backward compatibility window: not applicable.

## Approval

- Requested from: repository owner/user
- Approval status: approved via direct instruction
- Approved at: 2026-02-13
