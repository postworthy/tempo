# VERIFY.md - Tempo Verification Contract

All changes must be verified before crossing the Review Boundary into `main`.

## Bootstrap Precondition

For fresh machines or missing tooling, run canonical bootstrap first:

```bash
./bootstrap --no-verify
```

Bootstrap assumes repository is already cloned locally and does not manage `git` installation.

## Canonical Verification Gate (Required)

```bash
pnpm verify
```

This command runs complete repository checks:

- formatting check (`format:check`)
- lint (`lint`)
- type checks (`typecheck`)
- docs consistency checks (`check:docs`)
- git policy checks (`check:git-policy`)
- tests (`test`)
- build (`build`)

## Fast Verification (Optional, Pre-commit)

```bash
pnpm verify:fast
```

Use this for local iteration only. It does not replace `pnpm verify` before merge.

## Preferred Logging Pattern

```bash
pnpm verify > .verify.log 2>&1
```

Review `.verify.log` on failure. Do not commit verification logs.

## What Passing Proves

- Formatting policy is satisfied.
- Static analysis and lint rules pass.
- Type contracts hold.
- Governance docs preserve required starter-pack invariants.
- Automated tests pass for intended scope.
- Project compiles successfully.

## Prompt Change Review (Required for Prompt-Facing Docs)

When changing `PROMPTING.md`, `README.md`, onboarding prompts, or adapter prompt docs, include a lightweight prompt review.

Minimum manual eval scenarios:

1. Fresh greenfield onboarding request.
2. Adopt-existing onboarding request.
3. Mid-task scope change after discovery.

Pass means:

- the response follows the requested output order,
- the assistant does not skip directly to coding,
- approval boundaries are explicit,
- repository context is treated as grounded input rather than guessed requirements.

## If Verification Fails

1. Stop adding new features.
2. Identify whether the failure is caused by the current change.
3. Fix in-scope failures in the same change.
4. If broader work is required, create a follow-up proposal.
5. Re-run `pnpm verify` until green.

## Git Policy Gate (Required)

```bash
pnpm check:git-policy
```

This check enforces:

- local branch is not `main` during active development,
- feature branch naming policy,
- conventional commit subjects,
- required commit trailers (`Roadmap`, `Proposal`) for commits in scope.

## Change Review Requirement

Before a Review Boundary merge into `main`, a Change Review must include:

- passing `pnpm verify` evidence,
- passing `pnpm check:git-policy` evidence,
- a Review Record at `REVIEWS/YYYY-MM-DD--short-title.md`,
- rollback readiness.

## Hosted CI (Optional Surface)

Hosted CI workflows (for example GitHub/GitLab pipelines) are optional review surfaces. They may mirror local checks but do not replace local-first Change Review requirements.

## Environment Notes

- Node.js 20+
- pnpm 9+
- Use `.env.example` as the source template for local environment setup.
