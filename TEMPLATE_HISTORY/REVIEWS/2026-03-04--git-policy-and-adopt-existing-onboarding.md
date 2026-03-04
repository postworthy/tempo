# Review Record: git-policy-and-adopt-existing-onboarding

Date: 2026-03-04
Review Boundary: merge from `chore/c010-git-policy-hardening` into `main`
Merge Method: `git merge --no-ff <feature-branch>`
Risk Class: T1
Related Proposal(s): PROPOSALS/TEMPLATE.md

## Branch

- Source branch: `chore/c010-git-policy-hardening`
- Target branch: `main`

## Commits in Scope

- 21cf50b chore(governance): enforce git policy controls
- e440e9b feat(onboarding): add adopt-existing intake mode

## Git Conformance Checklist

- [x] Source branch matches naming policy
- [x] No direct commit to `main`
- [x] Commit subjects are conventional
- [x] Commit trailers include `Roadmap` and `Proposal`
- [x] Commits in scope match approved proposal/decomposition

## Change Summary

- Added enforceable git policy controls (preflight language, check script, hooks, bootstrap integration).
- Added dual onboarding mode with existing-repo intake scan and delta-question guidance.
- Updated governance documentation, templates, roadmap/status/decisions, and docs checks for both capabilities.

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

- Pass: formatting, lint, typecheck, docs checks, git policy checks, tests, and build succeeded.
- No additional blockers detected before review boundary merge.

## Rollback Plan

1. If post-merge issues appear, revert merge commit on `main`.
2. Re-run `pnpm verify` to confirm rollback restores green state.
3. Re-open a narrower corrective proposal/branch if needed.

## Approvals

- Reviewer: Human Partner
- Approval status: approved
- Timestamp: 2026-03-04 15:55 CST

## Follow-Ups

- Complete C012 (`SPEC.md` product contract) before non-trivial product implementation.
- Consider adding integration tests for intake mode auto-detection edge cases.
