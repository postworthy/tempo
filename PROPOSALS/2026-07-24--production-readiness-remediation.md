# Proposal: Remediate Production-Readiness Blockers

Date: 2026-07-24
Owner: Human Partner and Codex
Risk Class: T2
Related Issue/Context: production-readiness findings in
`REVIEWS/2026-07-24--tempo-skills-goals-modernization.md`
Roadmap Item: C022
Planned Branch: `docs/c012-tempo-modernization-goal`
Expected Commit Count: 6

## Objective

Make the modernization branch safe and reliable for public GitHub distribution
by repairing every blocking production-review finding and proving the exact
public setup, initialization, portable-adoption, dependency, and review paths
against the final committed tree.

## Scope

In scope:

- Make plain `./bootstrap` deterministic and successful from a clean Tempo
  checkout.
- Make the one-command new-project path initialize a valid, verifiable,
  reversible project state.
- Back up and clear inherited active project records during explicit project
  initialization without deleting template history.
- Prevent portable adoption from traversing symlinked managed paths or modifying
  files outside the selected target.
- Preflight known portable conflicts before mutation so a rejected first install
  leaves the target unchanged.
- Preserve successful, idempotent, stack-neutral portable adoption.
- Refresh the frozen development dependency graph until high and critical audit
  findings are eliminated or a narrower explicitly approved exception is
  recorded.
- Add regression coverage for every reproduced release-path failure.
- Reconcile current product, status, roadmap, evaluation, migration, and review
  evidence.

Out of scope:

- Merge, push, publication, release tags, deployment, remote mutation, or
  production action.
- A new application framework, plugin package, hosted service, or additional
  language starter.
- Weakening the direct-main, destructive-action, secret, compatibility, or
  publication boundaries.
- Following symlinks intentionally during portable installation.

## Expected Files Touched

- `bootstrap`
- `scripts/init-project.sh`
- `scripts/install-portable.sh`
- `scripts/intake-scan.mjs`
- `scripts/check-docs.mjs`
- `scripts/run-evals.mjs`
- `test/governance.test.ts`
- `test/portable-adoption.test.ts`
- new release-path tests or fixtures as needed
- `package.json`
- `pnpm-lock.yaml`
- `.gitignore`
- `README.md`
- `GETTING_STARTED.md`
- `BOOTSTRAP.md`
- `MIGRATION.md`
- `VERIFY.md`
- `DECISIONS.md`
- `ROADMAP/COMMIT-PLAN.md`
- `STATUS.md`
- active remediation goal
- modernization Review Record

## Acceptance Criteria

- [x] Plain `./bootstrap` exits 0 from an isolated clean `main` fixture and
      leaves no untracked or modified project file.
- [x] The documented one-command new-project path produces unfilled project
      contracts, template-only active record folders, and a passing
      `pnpm verify`.
- [x] Explicit project initialization backs up every replaced or retired active
      record and never removes `TEMPLATE_HISTORY/`.
- [x] Portable adoption rejects a symlink at `AGENTS.md` or any managed ancestor
      before mutation and does not change the symlink target.
- [x] A first-run managed-file or manifest conflict leaves the target's tracked
      and untracked content byte-for-byte unchanged.
- [x] Normal and repeated portable adoption remain stack-neutral, preserve
      unrelated files, and pass without invoking Node or pnpm.
- [x] `pnpm audit --audit-level=high` reports no high or critical finding, unless
      an explicit approved exception identifies the package, exposure, and
      compensating control.
- [x] Regression tests cover the public command, initialized-template
      verification, symlink containment, and first-install conflict atomicity.
- [x] Public instructions describe one primary new-project command, contributor
      setup, target adoption, and rollback without contradiction.
- [x] Final feature-branch and isolated-clean verification pass, the Review
      Record is approved, and no external action has occurred.

## Verification Plan

Focused commands:

```bash
bash -n bootstrap scripts/init-project.sh scripts/install-portable.sh
pnpm exec vitest run test/governance.test.ts test/portable-adoption.test.ts
pnpm audit --audit-level=high
pnpm check:contracts
pnpm check:docs
```

Canonical and isolated checks:

```bash
pnpm verify
./bootstrap
./bootstrap --init-project
./bootstrap --mode adopt-existing --target <fixture> --verify-command "python3 -m pytest"
git status --short
git diff --check
```

Pass means:

- Every acceptance criterion has direct environmental evidence.
- Both public greenfield commands work from exact isolated `main` fixtures.
- Portable negative fixtures observe no mutation.
- The dependency audit has no unapproved high/critical result.
- The final committed tree, documentation, and Review Record agree.

## Change Review Plan

- Review Boundary: merge from `docs/c012-tempo-modernization-goal` into `main`
- Planned Review Record:
  `REVIEWS/2026-07-24--tempo-skills-goals-modernization.md`
- Reviewer/approver expectation: Codex replays all release paths and returns the
  record to approved only with complete evidence; the Human Partner approved
  this T2 implementation with “make it so” on 2026-07-24.

## Git Plan

- Existing branch: `docs/c012-tempo-modernization-goal`
- Planned commits:
  1. `test(release): capture production readiness failures`
  2. `fix(bootstrap): make project initialization release safe`
  3. `fix(bootstrap): contain portable adoption`
  4. `chore(deps): refresh verified toolchain`
  5. `fix(evals): make initialized checks template neutral`
  6. `docs(review): approve remediated release`
- Required trailers:
  - `Roadmap: ROADMAP/COMMIT-PLAN.md#C022`
  - `Proposal: PROPOSALS/2026-07-24--production-readiness-remediation.md`
- Planned future merge method:
  `git merge --no-ff docs/c012-tempo-modernization-goal`

## Decomposition Plan

1. Encode reproduced failures — Verify by: focused negative fixtures — Exit
   criteria: every blocker fails for the expected reason on the pre-fix
   implementation — Risk: T1 — Dependencies: production review.
2. Repair public bootstrap and project initialization — Verify by: isolated
   plain and initialized clean-main fixtures — Exit criteria: both documented
   paths pass and initialization is backed up and reversible — Risk: T2 —
   Dependencies: unit 1.
3. Contain and preflight portable adoption — Verify by: symlink, first-conflict,
   normal, and repeat fixtures — Exit criteria: rejected paths make no mutation
   and valid paths remain stack-neutral — Risk: T2 — Dependencies: unit 1.
4. Refresh and audit the toolchain — Verify by: high-threshold audit, focused
   tests, and canonical verification — Exit criteria: no unapproved
   high/critical finding — Risk: T1 — Dependencies: units 2–3.
5. Replay and reconcile release evidence — Verify by: exact staged-tree
   checkouts, canonical gate, artifact/secret audit, and Review Record — Exit
   criteria: all criteria have evidence and the boundary decision is approved —
   Risk: T1 — Dependencies: units 1–4.

Thin slice milestone:

- Regression fixtures deterministically reproduce the public bootstrap,
  initialization, symlink, and first-conflict failures before repair.

Dependencies and unknowns:

- Major toolchain updates may require a Node engine or lint-configuration
  compatibility adjustment; prefer the smallest supported upgrade set.
- File-system behavior must be tested using real symlinks on the local platform.

Intentional deferrals:

- Probabilistic cross-host skill testing remains a documented post-publication
  limitation.
- Actual merge and all GitHub publication actions remain separate.

## Rollback Plan

1. Revert each C022 commit independently before the Review Boundary.
2. Restore the prior lockfile and manifest together if a toolchain upgrade
   regresses supported Node versions.
3. Restore prior bootstrap scripts if isolated public-path fixtures regress,
   while keeping the new failing tests as evidence.
4. For an initialized project, restore the timestamped
   `.template-init-backup/` snapshot.
5. Run `pnpm verify` and all isolated release fixtures after rollback.

## Risks and Mitigations

- Risk: initialization removes project history unexpectedly.
  Mitigation: act only under explicit `--init-project`, back up every affected
  path, ignore the local backup directory, and test restoration inputs.
- Risk: symlink checks miss a parent component.
  Mitigation: walk every managed path component before any mutation and test
  destination and ancestor symlinks.
- Risk: conflict preflight and installation diverge.
  Mitigation: generate one managed-path inventory used by both phases and test
  first-install conflicts at early and late paths.
- Risk: dependency upgrades change supported engines or behavior.
  Mitigation: inspect peer/engine constraints, upgrade coherently, retain frozen
  installation, and replay Node 20-compatible verification.
- Risk: a narrow green test masks the public command.
  Mitigation: run commands from exact isolated `main` fixtures and require clean
  resulting worktrees.

## Compatibility / Migration Notes

- Plain `./bootstrap` remains valid for Tempo contributors and verification.
- The primary new-project command may include the explicit initialization flag
  so mutation is intentional and reversible.
- Existing explicit `--mode adopt-existing --target ...` usage remains valid.
- Symlinked managed paths change from being followed to being rejected with an
  actionable error.
- Existing active project records are moved only during explicit initialization
  and remain available in the timestamped backup.

## Observability / Debug Notes

- Negative fixtures must capture exit code, output, target inventory, and hashes
  of any out-of-target sentinel.
- Isolated bootstrap evidence must record the exact tree, command, selected
  mode, verification result, and final git status.

## Approval

- Requested from: Human Partner
- Approval status: explicitly approved
- Approved at: 2026-07-24, via “make it so”
