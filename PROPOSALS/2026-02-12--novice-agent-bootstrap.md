# Proposal: Novice Agent Bootstrap Flow

Date: 2026-02-12
Owner: AI Agent
Risk Class: T1
Related Context: Make template first-run dead simple for absolute novices using AI coding assistants.

## Objective

Embed a mandatory, assistant-agnostic first-run onboarding flow in-repository so an AI agent can clone this repo, discover instructions, interview the user, and prepare project intent artifacts before implementation work starts.

## Scope

In scope:

- Add `BOOTSTRAP.md` with first-run operating contract and required intake questions.
- Add `PROJECT-BRIEF.md` template for novice-friendly project intake.
- Update governance docs (`AGENTS.md`, `CONSTITUTION.md`, `VERIFY.md`) to require intake before non-trivial implementation.
- Add assistant adapter entrypoints (`CLAUDE.md`, `CODEX.md`, `.cursor/rules/starter-pack.mdc`) that defer to canonical docs.
- Update `README.md` with one copy-paste prompt for users and a simpler first-run path.
- Add lightweight docs-consistency verification script and run it in canonical verify.
- Update `STATUS.md`, `DECISIONS.md`, and `ROADMAP/COMMIT-PLAN.md` to reflect completed work and next steps.

Out of scope:

- Completing product-specific project brief content for an actual product idea.
- Implementing first real vertical slice.
- Assistant vendor-specific advanced integrations beyond static adapter docs.

## Expected Files Touched

- `PROPOSALS/2026-02-12--novice-agent-bootstrap.md`
- `BOOTSTRAP.md`
- `PROJECT-BRIEF.md`
- `CLAUDE.md`
- `CODEX.md`
- `.cursor/rules/starter-pack.mdc`
- `README.md`
- `AGENTS.md`
- `CONSTITUTION.md`
- `VERIFY.md`
- `package.json`
- `scripts/check-docs.mjs`
- `STATUS.md`
- `DECISIONS.md`
- `ROADMAP/COMMIT-PLAN.md`

## Acceptance Criteria

- [ ] Repository contains explicit first-run instructions requiring an intake interview before implementation.
- [ ] A novice can issue one prompt to an assistant and trigger the intended onboarding workflow.
- [ ] Canonical governance docs consistently reference bootstrap/intake flow.
- [ ] `pnpm verify` enforces docs-consistency checks and passes.
- [ ] Roadmap/status/decisions are updated to reflect this onboarding capability.

## Verification Plan

Commands:

```bash
pnpm verify
```

Pass means:

- Formatting, lint, typecheck, docs-consistency checks, tests, and build all pass.
- Added onboarding docs are internally consistent and discoverable.

## Rollback Plan

If regressions occur:

1. Revert the commit introducing onboarding flow.
2. Remove bootstrap-specific docs and script changes.
3. Re-run `pnpm verify` to confirm repository returns to prior baseline.

## Risks and Mitigations

- Risk: Over-constraining agents may reduce flexibility for advanced users.
  Mitigation: Keep adapter docs thin and canonical source centralized.
- Risk: Docs-consistency checks become brittle.
  Mitigation: Restrict checks to high-signal invariants (required files/references), avoid semantic overreach.
- Risk: Governance ambiguity across assistant ecosystems.
  Mitigation: Use one canonical set (`AGENTS.md`, `BOOTSTRAP.md`) and adapter files that only redirect.

## Compatibility / Migration Notes

- API compatibility impact: none.
- Data/schema migration needed: no.
- Backward compatibility window: not applicable.

## Approval

- Requested from: repository owner/user
- Approval status: approved via direct instruction
- Approved at: 2026-02-12
