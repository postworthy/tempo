# Review Record: prompt-guidance-alignment

Date: 2026-03-06
Review Boundary: merge from `docs/c012-prompt-guidance-alignment` into `main`
Merge Method: `git merge --no-ff docs/c012-prompt-guidance-alignment`
Risk Class: T1
Related Proposal(s): `TEMPLATE_HISTORY/PROPOSALS/2026-03-06--prompt-guidance-alignment.md`

## Branch

- Source branch: `docs/c012-prompt-guidance-alignment`
- Target branch: `main`

## Commits in Scope

- Pending local commit(s)

## Git Conformance Checklist

- [x] Source branch matches naming policy
- [x] No direct commit to `main`
- [ ] Commit subjects are conventional
- [ ] Commit trailers include `Roadmap` and `Proposal`
- [x] Commits in scope match approved proposal/decomposition

## Change Summary

- Add `PROMPTING.md` as a canonical prompt contract.
- Update starter, onboarding, adapter, and verification docs to use explicit output contracts and prompt review checks.

## Acceptance Checklist

- [x] Scope matches approved proposal/decomposition
- [x] Acceptance criteria are satisfied
- [x] Docs updated where required
- [x] Rollback path is clear

## Verification Evidence

Commands run:

```bash
pnpm verify
```

Results:

- `pnpm verify` passed
- `pnpm check:docs` passed, git policy passed, tests passed, and build passed on branch `docs/c012-prompt-guidance-alignment`

## Rollback Plan

1. Revert the docs-only commit(s) from this change.
2. Remove `PROMPTING.md` and restore previous wording in the prompt-facing docs.

## Approvals

- Reviewer: human partner
- Approval status: pending
- Timestamp: pending

## Follow-Ups

- Update commits-in-scope and verification result after commit and local verification.
