# VERIFY.md - Tempo Verification Contract

All changes must be verified before merge to `main`.

## Canonical Verification Gate (Required)

```bash
pnpm verify
```

This command runs complete repository checks:

- formatting check (`format:check`)
- lint (`lint`)
- type checks (`typecheck`)
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
- Automated tests pass for intended scope.
- Project compiles successfully.

## If Verification Fails

1. Stop adding new features.
2. Identify whether the failure is caused by the current change.
3. Fix in-scope failures in the same change.
4. If broader work is required, create a follow-up proposal.
5. Re-run `pnpm verify` until green.

## CI Requirement

CI must run `pnpm verify` on pull requests and block merge on failure.

## Environment Notes

- Node.js 20+
- pnpm 9+
- Use `.env.example` as the source template for local environment setup.
