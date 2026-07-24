# Proposal: Establish the Modern Tempo Contract and Repair Foundation Defects

Date: 2026-07-24
Owner: Codex
Risk Class: T1
Related Issue/Context: `ROADMAP/TEMPO-SKILLS-GOALS-MODERNIZATION.md`
Roadmap Items: C012 and C016
Planned Branch: `docs/c012-tempo-modernization-goal`
Expected Commit Count: 2

## Objective

Establish Tempo's approved modern product contract and repair the bootstrap, primary-branch verification, malformed Markdown, and shallow contract-validation defects that block later skill and goal work.

## Scope

In scope:

- Complete Tempo's own `PROJECT-BRIEF.md` and `SPEC.md`.
- Record the modernization goal, roadmap decomposition, status, and durable foundation decisions.
- Make canonical verification valid on a clean primary branch while preserving commit protection.
- Add structural and semantic validation for active contracts and canonical commands.
- Add focused regression tests for branch-policy and documentation validation.
- Update bootstrap and verification documentation to match behavior.

Out of scope:

- Reducing `AGENTS.md` or broadly amending `CONSTITUTION.md`.
- Adding the living-goal model or Agent Skills.
- Stack-neutral installation and skill evaluations.
- Pushing, publishing, remote changes, or production actions.

## Expected Files Touched

- `ROADMAP/TEMPO-SKILLS-GOALS-MODERNIZATION.md`
- `PROJECT-BRIEF.md`
- `SPEC.md`
- `ROADMAP/COMMIT-PLAN.md`
- `STATUS.md`
- `DECISIONS.md`
- `scripts/check-docs.mjs`
- `scripts/check-git-policy.mjs`
- `test/*.test.ts`
- `VERIFY.md`
- `GETTING_STARTED.md`
- `bootstrap`

## Acceptance Criteria

- [ ] Tempo's active brief and specification have no placeholders and satisfy constitutional minimums.
- [ ] The modernization roadmap is decomposed into independently verifiable commits.
- [ ] `pnpm verify` succeeds on a clean primary branch and a compliant feature branch.
- [ ] Direct commits to the primary branch remain blocked.
- [ ] Active Markdown structure and required sections are validated deterministically.
- [ ] Canonical bootstrap and verification commands agree across active documents.
- [ ] Focused regression tests cover the corrected failure modes.
- [ ] Canonical verification passes.

## Verification Plan

Commands:

```bash
pnpm test
pnpm check:docs
pnpm check:git-policy
pnpm verify
```

Focused checks will exercise validation scripts against isolated temporary fixtures and run git-policy checks with explicit verification and mutation modes.

Pass means:

- All commands exit 0 in their intended states.
- Negative fixtures fail for the expected reason.
- A clean primary branch is valid for verification, while the pre-commit hook still rejects direct commits.

## Change Review Plan

- Review Boundary: merge from `docs/c012-tempo-modernization-goal` into `main`
- Planned Review Record: `REVIEWS/2026-07-24--tempo-skills-goals-modernization.md`
- Reviewer/approver expectation: verify scope alignment, evidence, rollback, safety-boundary preservation, and no external actions.

## Git Plan

- Existing branch: `docs/c012-tempo-modernization-goal`
- Planned commits:
  - `docs(spec): define modern Tempo product contract`
  - `fix(governance): repair bootstrap and contract validation`
- Required trailers:
  - `Roadmap: ROADMAP/COMMIT-PLAN.md#C012` or `#C016`
  - `Proposal: PROPOSALS/2026-07-24--foundation-repair.md`
- Planned merge method: `git merge --no-ff docs/c012-tempo-modernization-goal`

The goal document is larger than the usual line target because it is a self-contained execution contract designed to survive fresh contexts. Implementation commits remain narrowly scoped.

## Decomposition Plan

1. Complete product intent, goal, proposal, roadmap, status, and decisions — Verify by Markdown formatting, contract inspection, `pnpm check:docs`, and `pnpm verify` — Exit criteria: Definition of Ready is met for foundation repair — Risk: T1 — Dependencies: user-approved goal.
2. Separate repository verification from active-development branch mutation policy — Verify by focused positive and negative tests plus full verification — Exit criteria: clean `main` verifies and direct commit protection remains — Risk: T1 — Dependencies: unit 1.
3. Add structural contract and command-consistency validation — Verify with valid and invalid temporary fixtures — Exit criteria: the known malformed specification and command drift are mechanically detectable — Risk: T1 — Dependencies: unit 1.
4. Align bootstrap and verification docs, update evidence, and run canonical verification — Verify by clean-checkout simulation where practical and `pnpm verify` — Exit criteria: foundation repair is review-ready — Risk: T1 — Dependencies: units 2 and 3.

Thin slice milestone:

- After unit 2, a clean primary-branch checkout can verify without weakening the protected-branch commit hook.

Dependencies and unknowns:

- Git hook execution must be tested without creating a commit on `main`.
- A true fresh clone may require an isolated local copy because external remote actions are prohibited.

Intentional deferrals:

- Broad governance compression and constitutional amendments.
- Agent Skills, goal runtime, stack-neutral adoption, and full skill evals.

## Rollback Plan

1. Revert only the foundation-repair commits through an approved non-destructive git revert.
2. Restore the prior validation scripts and documentation.
3. Run `pnpm verify` on a compliant feature branch and document the original primary-branch limitation.

## Risks and Mitigations

- Risk: allowing verification on `main` accidentally permits direct commits.
  Mitigation: separate read-only repository verification from mutation-time pre-commit enforcement and test both.
- Risk: structural validation becomes brittle or validates prose wording.
  Mitigation: validate headings, fences, placeholders, paths, and canonical values; leave qualitative content to review.
- Risk: completing Tempo's own brief breaks fresh-template history rules.
  Mitigation: update the rule so template maintainers can have an approved product contract while project initialization still resets user-facing records safely.

## Compatibility / Migration Notes

- API compatibility impact: none.
- Data/schema migration needed: no.
- Existing feature branches remain valid.
- Fresh project initialization must continue to produce unfilled user project contracts after the Tempo template's own contract becomes approved.

## Observability / Debug Notes

- Validation scripts must emit file-specific, actionable errors.
- Focused tests must name the failed invariant.

## Approval

- Requested from: Human Partner
- Approval status: approved for this T1 scope through the `/goal` invocation
- Approved at: 2026-07-24
