# Proposal: Public Template Readiness

Date: 2026-02-12
Owner: AI Agent
Risk Class: T1
Related Context: Prepare `tempo` for public clone-and-start release.

## Objective

Make this repository release-ready as a project template for human + AI collaboration, with working local verification, CI verification, and clear starter documentation/governance.

## Scope

In scope:

- Add baseline execution toolchain and scripts (`verify`, `verify:fast`, `format`, `format:check`, `lint`, `typecheck`, `test`, `build`).
- Add minimal TypeScript source and one passing test.
- Add template essentials (`README.md`, `LICENSE`, `.env.example`, `.gitignore`, `.editorconfig`).
- Add optional hosted CI workflow running `pnpm install` and `pnpm verify`.
- Normalize governance and verification docs so paths and commands are internally consistent.
- Update `STATUS.md`, `DECISIONS.md`, and `ROADMAP/COMMIT-PLAN.md` to reflect completed work and next steps.

Out of scope:

- Product-specific feature implementation beyond a minimal starter function/test.
- Production deployment configuration.
- Advanced CI optimizations (caching matrices, artifact publishing).

## Expected Files Touched

- `PROPOSALS/2026-02-12--public-template-readiness.md`
- `package.json`
- `pnpm-lock.yaml`
- `tsconfig.json`
- `vitest.config.ts`
- `eslint.config.mjs`
- `.prettierrc`
- `src/index.ts`
- `test/index.test.ts`
- `.gitignore`
- `.editorconfig`
- `README.md`
- `LICENSE`
- `.env.example`
- `.github/workflows/verify.yml`
- `VERIFY.md`
- `CONSTITUTION.md`
- `AGENTS.md`
- `STATUS.md`
- `DECISIONS.md`
- `ROADMAP/COMMIT-PLAN.md`

## Acceptance Criteria

- [ ] A fresh clone can run `pnpm install` and `pnpm verify` successfully.
- [ ] Repository contains required baseline scripts/config and at least one passing real test.
- [ ] Optional hosted CI workflow exists and runs `pnpm verify`.
- [ ] Governance and verification docs reference `ROADMAP/COMMIT-PLAN.md` consistently.
- [ ] README explains quickstart, governance model, template usage, and first proposal workflow.
- [ ] No generated artifacts/logs/caches are committed.

## Verification Plan

Commands:

```bash
pnpm install
pnpm verify
```

Pass means:

- Commands exit successfully.
- Formatting, lint, typecheck, tests, and build gates pass under `pnpm verify`.
- CI config parses and targets required events.

## Rollback Plan

If this change causes regressions:

1. Revert the template-readiness commit.
2. Restore previous governance/tooling files from git history.
3. Validate rollback by running `pnpm verify` (or expected pre-change baseline command if lockfile/toolchain was not present before).

## Risks and Mitigations

- Risk: Tooling script mismatch causes failed verification.
  Mitigation: Align scripts with `VERIFY.md`, run canonical verification locally before completion.
- Risk: Governance docs drift from constitutional requirements.
  Mitigation: Update references/wording together and cross-check key files.
- Risk: CI parity issues vs local environment.
  Mitigation: Use same package manager and canonical verify command in workflow.

## Compatibility / Migration Notes

- API compatibility impact: none.
- Data/schema migration needed: no.
- Backward compatibility window: not applicable; this is template baseline work.

## Approval

- Requested from: repository owner/user
- Approval status: approved via task request
- Approved at: 2026-02-12
