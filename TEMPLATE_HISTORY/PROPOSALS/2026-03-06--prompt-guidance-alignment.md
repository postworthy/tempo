# Proposal: Align Tempo prompt documents with OpenAI prompt guidance

Date: 2026-03-06
Owner: Codex
Risk Class: T1
Related Issue/Context: Document review against OpenAI prompt guidance identified strong governance controls but weaker prompt-native instruction patterns.
Roadmap Item: C015
Planned Branch: docs/c012-prompt-guidance-alignment
Expected Commit Count: 2

## Objective

Improve Tempo's repository instructions so they not only govern agent behavior operationally, but also encode prompt-writing patterns that make behavior more reliable across assistants and model versions.

## Scope

In scope:

- Add a canonical prompt contract document for reusable instruction structure.
- Tighten starter prompts so they specify exact response order, stop conditions, and approval boundaries.
- Add a small set of few-shot examples for discovery, brief drafting, and spec drafting.
- Add lightweight prompt-eval guidance that complements existing repository verification guidance.
- Update adapter documents so prompt rules are easy to discover from compressed contexts.

Out of scope:

- Application feature implementation.
- Model-specific benchmarking across multiple hosted providers.
- A full automated prompt-eval harness unless explicitly approved as a follow-on.
- Changes to constitutional governance unrelated to prompting behavior.

## Expected Files Touched

- `README.md`
- `AGENTS.md`
- `BOOTSTRAP.md`
- `CODEX.md`
- `CLAUDE.md`
- `VERIFY.md`
- `ROADMAP/COMMIT-PLAN.md`
- `STATUS.md`
- `DECISIONS.md`
- `PROMPTING.md`
- `TEMPLATE_HISTORY/PROPOSALS/2026-03-06--prompt-guidance-alignment.md`

## Acceptance Criteria

- [ ] Repository includes one canonical prompt contract document that defines instruction priority, output contracts, scoped task updates, and approval-stop behavior.
- [ ] README starter prompt(s) clearly separate shell/setup actions from assistant instructions and specify the expected response structure.
- [ ] Repository includes at least 3 concise few-shot examples covering discovery, `PROJECT-BRIEF.md` drafting, and `SPEC.md` drafting.
- [ ] Verification guidance includes a lightweight prompt-eval/check process for future prompt changes.
- [ ] Adapter docs point to the canonical prompt contract so prompt behavior remains recoverable under context compression.

## Verification Plan

Commands:

```bash
pnpm verify
```

Optional focused checks:

```bash
pnpm check:docs
```

Pass means:

- Canonical verification exits 0.
- Docs checks pass after the new prompt-governance artifacts are added.
- Acceptance criteria are satisfied by the repository documents themselves.

## Change Review Plan

- Review Boundary: merge from `docs/c012-prompt-guidance-alignment` into `main`
- Planned Review Record: `TEMPLATE_HISTORY/REVIEWS/2026-03-06--prompt-guidance-alignment.md`
- Reviewer/approver expectation: human partner confirms the proposed prompt contract is clearer, more reusable, and still aligned with Tempo governance.

## Git Plan

- Branch command: `git switch -c docs/c012-prompt-guidance-alignment`
- Commit subject pattern: `docs(prompting): <summary>`
- Required commit trailers:
  - `Roadmap: ROADMAP/COMMIT-PLAN.md#C015`
  - `Proposal: TEMPLATE_HISTORY/PROPOSALS/2026-03-06--prompt-guidance-alignment.md`
- Planned merge method: `git merge --no-ff docs/c012-prompt-guidance-alignment`

## Decomposition Plan (Required for T1/T2/T3)

Work units (ordered):

1. Define the canonical prompt contract in a dedicated doc, including instruction layering, output contract patterns, and stop conditions. — Verify by: `pnpm check:docs` and manual review against proposal acceptance criteria — Exit criteria: prompt rules exist in one canonical place and are referenced by adapter docs — Risk: T1 — Dependencies: approval to proceed with prompt-contract approach
2. Rewrite starter prompts and onboarding docs to use the new contract, including exact response order and approval boundaries. — Verify by: `pnpm check:docs` and manual inspection of `README.md` / onboarding flow — Exit criteria: starter prompts are explicit, scoped, and action/tool boundaries are clearer — Risk: T1 — Dependencies: work unit 1
3. Add concise few-shot examples and lightweight prompt-eval guidance, then align status/decision/roadmap docs. — Verify by: `pnpm verify` — Exit criteria: examples exist, prompt changes have a documented review path, and project tracking docs reflect the new baseline — Risk: T1 — Dependencies: work units 1-2

Thin slice milestone:

- After work unit 2, a fresh user can issue a starter prompt that gives the assistant a structured response contract and a clear approval boundary before coding.

Dependencies and unknowns:

- Whether the canonical prompt contract should live in `PROMPTING.md` or another named artifact.
- Whether prompt examples should live inline in `BOOTSTRAP.md` or in a separate examples section/file.
- Whether `pnpm check:docs` currently needs rule updates to enforce the new prompt artifacts.

Intentional deferrals:

- Automated prompt regression tests driven by scripts or external eval tooling.
- Provider-specific prompt variants beyond the existing adapter files.

## Rollback Plan

If this change causes regressions:

1. Revert commit(s): revert the docs-only commit(s) from this proposal.
2. Restore prior behavior: remove the new prompt contract/examples and restore prior wording in starter and adapter docs.
3. Validate rollback with: `pnpm verify`

## Risks and Mitigations

- Risk: Additional prompt structure makes the starter pack feel heavier for novice users.
  Mitigation: keep the canonical contract concise and preserve a short copy-paste starter prompt in `README.md`.
- Risk: Prompt rules drift from actual agent behavior over time.
  Mitigation: centralize prompt guidance in one canonical doc and reference it from adapters instead of duplicating long rule sets.
- Risk: New prompt guidance overlaps awkwardly with existing governance docs.
  Mitigation: keep prompt rules focused on instruction design and leave workflow/safety rules in existing governance artifacts.

## Compatibility / Migration Notes

- API compatibility impact: none
- Data/schema migration needed: no
- Backward compatibility window: existing repositories can adopt the new docs without code changes

## Observability / Debug Notes (if relevant)

- New logs/metrics/traces: none
- How to detect failure quickly: starter prompts still produce ambiguous or prematurely action-oriented responses during manual review

## Approval

- Requested from: human partner
- Approval status: approved
- Approved at: 2026-03-06
