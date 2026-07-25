# Review Record: Tempo Skills and Goals Modernization

Date: 2026-07-24
Review Boundary: merge from `docs/c012-tempo-modernization-goal` into `main`
Merge Method: `git merge --no-ff docs/c012-tempo-modernization-goal`
Risk Class: T2
Related Proposals:

- `PROPOSALS/2026-07-24--foundation-repair.md`
- `PROPOSALS/2026-07-24--concise-kernel-living-goals.md`
- `PROPOSALS/2026-07-24--focused-tempo-skills.md`
- `PROPOSALS/2026-07-24--portable-tempo-adoption.md`
- `PROPOSALS/2026-07-24--skill-goal-evaluations.md`
- `PROPOSALS/2026-07-24--modernization-release-readiness.md`

## Branch

- Source branch: `docs/c012-tempo-modernization-goal`
- Target branch: `main`
- Boundary status: not ready; merge and publication must not proceed

## Commits in Scope

- `dbff42b` docs(spec): define modern Tempo product contract
- `8ef1f06` fix(governance): repair bootstrap and contract validation
- `0f408f7` docs(governance): propose concise kernel and living goals
- `b425fa2` docs(governance): approve living-goal amendment
- `ba97a34` refactor(governance): reduce repository kernel
- `729c304` feat(goals): add resumable goal state
- `3b39b9a` docs(goals): consolidate active execution state
- `df2b815` docs(skills): approve focused skill bundle
- `1291dfe` feat(skills): add focused Tempo workflows
- `c028eec` test(skills): enforce structure and trigger cases
- `6f6436e` docs(bootstrap): approve portable adoption
- `13409a6` feat(bootstrap): add stack-neutral target install
- `ff9efd3` test(bootstrap): verify portable and repeated setup
- `308805c` docs(evals): approve skill and goal evaluation
- `8f67342` test(evals): add deterministic scenario harness
- `e46c199` docs(evals): record modernization evaluation
- `9146caa` docs(release): approve modernization readiness review
- `c58d1dd` docs(release): add migration and draft review
- `0018819` docs(release): complete modernization review

The final administrative review/evidence commit is part of the exact branch
history under review, although it does not change runtime behavior.

## Git Conformance Checklist

- [x] Source branch matches naming policy.
- [x] No direct commit to `main`.
- [x] Commit subjects are conventional.
- [x] Commits include required `Roadmap` and `Proposal` trailers.
- [x] Commits match approved proposal decomposition.
- [x] No remote, push, publication, tag, deploy, or production action occurred.

## Change Summary

- Repaired clean-main bootstrap and structural validation.
- Adopted Constitution 2.1 bounded authority and responsibility ownership.
- Reduced `AGENTS.md` from 238 to 116 lines.
- Added validated living goals with criterion evidence, retries, and resumption.
- Added five focused progressive-disclosure Agent Skills.
- Added stack-neutral target adoption through the same `./bootstrap` entry point.
- Added seven-scenario deterministic evaluation with a recorded baseline.
- Added migration and rollback guidance for old and adopted repositories.

## Acceptance Evidence

| Criterion                        | Evidence                                                          | Review |
| -------------------------------- | ----------------------------------------------------------------- | ------ |
| Modern product contracts         | `PROJECT-BRIEF.md`, `SPEC.md`, `dbff42b`, contract validator      | pass   |
| Clean primary bootstrap          | plain public `./bootstrap` replay at `0018819`                    | fail   |
| Clean-main verification          | isolated `main` verification and bootstrap output                 | pass   |
| Direct-main commit block         | pre-commit temporary-repository regression                        | pass   |
| Concise routing kernel           | 116 lines; `scripts/check-docs.mjs` limit                         | pass   |
| Distinct state owners            | Constitution 2.1 responsibility map                               | pass   |
| Living-goal format               | `GOALS/`, validator, positive/negative fixtures                   | pass   |
| Evidence-driven loop             | active goal history and `pnpm eval` transition                    | pass   |
| Bounded T0/T1 autonomy           | Constitution, kernel, authority matrix                            | pass   |
| High-impact approvals            | T2 user approval and seven pause categories                       | pass   |
| Focused skill bundle             | five upstream-valid skills and `pnpm check:skills`                | pass   |
| Trigger coverage                 | 16 metadata cases and trigger audit                               | pass   |
| Fresh-state resumption           | isolated transition preserves AC1 and completes AC2               | pass   |
| One public setup command         | README command auto-detects `adopt-existing` and fails formatting | fail   |
| Batteries-included greenfield    | repeated local runs and clean-main full run                       | pass   |
| Stack-neutral adoption           | normal fixtures pass; symlink containment and atomicity fail      | fail   |
| Structural validation            | contract/goal/skill/doc negative regressions                      | pass   |
| Migration and evidence agreement | stale readiness claims and active template-development records    | fail   |
| Canonical and eval gates         | 22 tests; 7 scenarios; 59 assertions                              | pass   |
| No external action               | git/decision audit; no external command executed                  | pass   |

## Verification Evidence

Commands run during final review:

```bash
pnpm verify
git diff --check
git status --short
git diff main...HEAD --stat
git log --reverse --format=fuller main..HEAD
```

Isolated executions:

```bash
./bootstrap --mode greenfield
./bootstrap --mode adopt-existing --target <fixture> --verify-command "python3 -m pytest"
```

Results:

- `pnpm verify`: pass; 22 tests, 7/7 eval scenarios, 59 assertions.
- clean isolated `main` bootstrap at `c58d1dd`: pass; 22 tests, seven
  evaluation scenarios, and 59 assertions.
- portable non-Node, repeat, and conflict fixtures: pass.
- final staged-tree feature verification and isolated `main` bootstrap replay:
  pass before the administrative completion commit.
- exact public command `./bootstrap` from a clean `main` fixture at `0018819`:
  fail; mode auto-detected as `adopt-existing`, generated
  `DISCOVERY/PROJECT-INVENTORY.md`, and failed `format:check`.
- documented `./bootstrap --init-project --no-verify` followed by
  `pnpm check:docs`: fail; the generated `SPEC.md` omits `./bootstrap`, and
  modernization proposals and review remain in active project folders.
- first-run portable conflict fixture: fail; `.tempo/KERNEL.md` was created
  before a conflicting `.tempo/VERIFY.md` stopped installation.
- symlinked target `AGENTS.md` fixture: fail; installation returned success and
  modified the symlink target outside the selected repository.
- `pnpm audit --prod --audit-level=high`: pass; no runtime dependencies or known
  production-dependency vulnerabilities.
- `pnpm audit --audit-level=high`: fail; frozen development graph contains 30
  advisories (1 critical, 20 high, 8 moderate, 1 low).

## Safety and Compatibility Review

- Destructive action: none.
- Secrets or sensitive data: none found in changed source or status inventory.
- Hidden telemetry/network behavior: none added.
- Remote/push/publication/deployment/production action: none.
- Authentication/authorization weakening: none.
- Default starter compatibility: retained and replayed.
- Non-Node compatibility: isolated fixture passes without Node/pnpm invocation.
- Existing regular target files: preserved, backed up, or rejected on conflict.
- Target containment: fail; `AGENTS.md` and ancestor-directory symlinks are not
  rejected before mutation.
- Transactionality: fail; first-run conflicts can leave a partial installation.
- Generated evaluation workspaces: temporary and removed.
- Template history: remains under `TEMPLATE_HISTORY/`.

## Findings

Blocking:

1. High — Portable adoption can write outside the selected repository through a
   symlinked `AGENTS.md`; parent symlinks under `.tempo/`, `.agents/`, or
   `GOALS/` are likewise not preflighted. Evidence: disposable fixture changed
   the hash of an out-of-target file while the installer exited 0.
2. High — The exact public README command fails from a clean clone. Auto mode
   selects `adopt-existing`, writes an unformatted discovery artifact, and
   causes canonical verification to exit 1.
3. High — The frozen development toolchain has 1 critical and 20 high
   advisories, including the installed Vitest 3.2.4 vulnerability fixed in
   3.2.6 or later. The production-only audit is clean because Tempo has no
   runtime dependencies.
4. Medium — The documented project-initialization path cannot produce a valid
   fresh template. Its generated `SPEC.md` fails the canonical-command contract,
   and Tempo's modernization proposals/review remain in active project folders.
5. Medium — Portable installation is not atomic: a first-run conflict can leave
   files created before the conflicting path was encountered.
6. Medium — Current tests exercise an explicit greenfield mode and an
   already-installed conflict, but not the plain public command, initialized
   template verification, first-install atomicity, or symlink containment.
7. Low — Historical evidence documents disagree on the kernel line count and
   prior bootstrap commit. This re-review corrects the current boundary state,
   but the stale evidence should be reconciled during remediation.

Known limitation after remediation:

- Deterministic trigger evaluation cannot prove behavior for every probabilistic
  model/host. Future cross-host false triggers should become regression cases.

## Rollback Plan

1. Before merge, abandon the source branch or revert atomic commits.
2. After a future merge, revert the no-fast-forward merge.
3. For portable targets, use the installation manifest and AGENTS backup under
   explicit removal approval.
4. Re-run the applicable canonical verification after rollback.

## Approvals

- T2 constitutional implementation: explicitly approved by Human Partner on
  2026-07-24.
- Reviewer: Codex
- Approval status: rejected pending remediation and a new full replay
- Timestamp: 2026-07-24 22:02 CDT

## Follow-Ups

- Do not merge or publish until every blocking finding is fixed and this Review
  Record returns to an approved state.
- Actual local merge and external GitHub publication remain intentionally
  unexecuted.
- Optional plugin packaging and independent cross-host forward tests may be
  proposed after publication.
