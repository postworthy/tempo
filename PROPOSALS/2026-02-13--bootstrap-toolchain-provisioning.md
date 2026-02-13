# Proposal: Bootstrap and Toolchain Provisioning Baseline

Date: 2026-02-13
Owner: AI Agent
Risk Class: T1
Related Context: Improve novice onboarding by making local environment provisioning deterministic after repository clone.

## Objective

Add a canonical local bootstrap entrypoint and supporting governance/docs so a non-developer user can reach a verified local state with minimal manual tooling steps.

## Scope

In scope:

- Add canonical bootstrap command `./bootstrap`.
- Add bootstrap preflight checker for runtime/tooling requirements.
- Add `GETTING_STARTED.md` with repo-already-cloned setup flow.
- Add an explicit tool pin artifact (`.nvmrc`) to complement existing package manager/runtime pins.
- Update constitution and agent docs with mandatory bootstrap/toolchain provisioning policy.
- Update `VERIFY.md`, roadmap/status/decisions, and docs checks to enforce bootstrap artifacts.

Out of scope:

- Installing or acquiring `git`.
- OS-specific package manager automation requiring privileged escalation.
- Hosted CI workflow redesign.

## Expected Files Touched

- `PROPOSALS/2026-02-13--bootstrap-toolchain-provisioning.md`
- `bootstrap`
- `GETTING_STARTED.md`
- `.nvmrc`
- `scripts/bootstrap-check.mjs`
- `package.json`
- `CONSTITUTION.md`
- `AGENTS.md`
- `VERIFY.md`
- `README.md`
- `scripts/check-docs.mjs`
- `ROADMAP/COMMIT-PLAN.md`
- `STATUS.md`
- `DECISIONS.md`

## Acceptance Criteria

- [ ] Repository includes a canonical bootstrap entrypoint (`./bootstrap`).
- [ ] Bootstrap checks required toolchain, installs pnpm via safe supported path when possible, and is idempotent.
- [ ] `GETTING_STARTED.md` provides novice-friendly setup from already-cloned repository.
- [ ] Constitution and agent docs define mandatory bootstrap/toolchain provisioning behavior and constraints.
- [ ] `pnpm verify` passes and docs checks enforce required bootstrap artifacts.

## Verification Plan

Commands:

```bash
./bootstrap --no-verify
pnpm verify
```

Pass means:

- Bootstrap preflight succeeds or reports actionable instructions.
- Canonical verification exits 0.

## Rollback Plan

If regressions occur:

1. Revert this bootstrap-governance change set.
2. Remove introduced bootstrap-specific docs/scripts.
3. Run `pnpm verify` to confirm previous baseline.

## Risks and Mitigations

- Risk: Bootstrap script behavior varies by platform/shell environment.
  Mitigation: Keep bootstrap logic minimal and explicit; provide fallback install instructions.
- Risk: Users expect automatic privileged package installs.
  Mitigation: Require explicit approval for privileged operations; default to non-destructive instructions.

## Compatibility / Migration Notes

- API compatibility impact: none.
- Data/schema migration needed: no.
- Backward compatibility window: not applicable.

## Approval

- Requested from: repository owner/user
- Approval status: approved via direct instruction
- Approved at: 2026-02-13
