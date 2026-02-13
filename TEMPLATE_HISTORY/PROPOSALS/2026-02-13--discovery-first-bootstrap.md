# Proposal: Discovery-First Bootstrap Flow

Date: 2026-02-13
Owner: AI Agent
Risk Class: T1
Related Context: Strengthen early-stage idea clarification for novice users during starter-pack onboarding.

## Objective

Add a mandatory discovery/rubberduck phase to onboarding so agents actively help users expand and clarify ideas before `PROJECT-BRIEF.md` and `SPEC.md` are finalized.

## Scope

In scope:

- Update `BOOTSTRAP.md` with a required discovery phase and clarifying-question minimums.
- Expand `PROJECT-BRIEF.md` to capture motivation, alternatives, chosen scope rationale, assumptions, and unknowns.
- Update `AGENTS.md` to enforce discovery and ambiguity handling before non-trivial implementation.
- Add a README prompt variant for discovery mode.
- Extend `scripts/check-docs.mjs` to enforce required discovery onboarding content.
- Update `STATUS.md`, `DECISIONS.md`, and `ROADMAP/COMMIT-PLAN.md` to reflect this process enhancement.

Out of scope:

- Product-specific brief completion for a concrete app.
- Implementation of the first product feature slice.

## Expected Files Touched

- `PROPOSALS/2026-02-13--discovery-first-bootstrap.md`
- `BOOTSTRAP.md`
- `PROJECT-BRIEF.md`
- `AGENTS.md`
- `README.md`
- `scripts/check-docs.mjs`
- `STATUS.md`
- `DECISIONS.md`
- `ROADMAP/COMMIT-PLAN.md`

## Acceptance Criteria

- [ ] Onboarding docs require a discovery/rubberduck phase before brief finalization.
- [ ] Agents are required to ask clarifying questions instead of assuming missing requirements.
- [ ] `PROJECT-BRIEF.md` captures motivation, alternatives, assumptions, and unknowns.
- [ ] `pnpm verify` enforces discovery-doc invariants via `check:docs` and passes.
- [ ] Status/decisions/roadmap reflect the discovery-first enhancement.

## Verification Plan

Commands:

```bash
pnpm verify
```

Pass means:

- Formatting, lint, typecheck, docs checks, tests, and build pass.
- Required onboarding/discovery sections are present in canonical files.

## Rollback Plan

If regressions occur:

1. Revert the discovery-first docs commit.
2. Restore prior onboarding brief/check-docs behavior.
3. Run `pnpm verify` to confirm baseline state.

## Risks and Mitigations

- Risk: Discovery requirements become overly verbose for experienced users.
  Mitigation: Keep question minimums concise and bounded.
- Risk: Checks become brittle against wording changes.
  Mitigation: Validate stable headings/markers rather than full prose.
- Risk: Agents over-ideate and drift scope.
  Mitigation: Include explicit scope-confirmation checkpoint before implementation proposal.

## Compatibility / Migration Notes

- API compatibility impact: none.
- Data/schema migration needed: no.
- Backward compatibility window: not applicable.

## Approval

- Requested from: repository owner/user
- Approval status: approved via direct instruction
- Approved at: 2026-02-13
