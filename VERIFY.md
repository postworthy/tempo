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

## If Verification Fails

1. Stop adding new features.
2. Identify whether the failure is caused by the current change.
3. Fix in-scope failures in the same change.
4. If broader work is required, create a follow-up proposal.
5. Re-run `pnpm verify` until green.

## Change Review Requirement

Before a Review Boundary merge into `main`, a Change Review must include:

- passing `pnpm verify` evidence,
- a Review Record at `REVIEWS/YYYY-MM-DD--short-title.md`,
- rollback readiness.

## Hosted CI (Optional Surface)

Hosted CI workflows (for example GitHub/GitLab pipelines) are optional review surfaces. They may mirror local checks but do not replace local-first Change Review requirements.

## Environment Notes

- Node.js 20+
- pnpm 9+
- Use `.env.example` as the source template for local environment setup.
