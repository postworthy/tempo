# Goal: Modernize Tempo for Skills and Agentic Goals

Status: completed
Owner: Human Partner and Codex
Risk: T2
Updated: 2026-07-24
Proposal: `PROPOSALS/2026-07-24--modernization-release-readiness.md` (current unit)
Review Boundary: merge from `docs/c012-tempo-modernization-goal` into `main` with `REVIEWS/2026-07-24--tempo-skills-goals-modernization.md`

## Outcome

Align Tempo with current Agent Skills and long-running goal guidance while
preserving its opinionated, batteries-included experience for non-engineers, its
public GitHub distribution model, and one-command setup. The completed repository
must use a concise policy kernel, focused progressive-disclosure skills, a
resumable evidence-driven goal loop, deterministic enforcement, realistic
evaluations, and stack-neutral adoption.

The detailed research and original phase contract are recorded in
`ROADMAP/TEMPO-SKILLS-GOALS-MODERNIZATION.md`.

## Non-Goals

- Do not build a hosted service or custom agent runtime.
- Do not push, publish, deploy, add or alter remotes, or mutate production.
- Do not require hosted review, cloud CI, telemetry, or one commercial agent host.
- Do not replace the focused skill bundle with one monolithic skill.
- Do not weaken destructive-action, secret, security/privacy, compatibility, or
  production boundaries to increase autonomy.

## Acceptance Criteria

- [x] AC1 — Tempo's product brief and specification describe the modernized product without placeholders.
  - Evidence: `PROJECT-BRIEF.md`, `SPEC.md`, commit `dbff42b`, and `pnpm check:contracts`
- [x] AC2 — A clean primary-branch checkout runs the documented canonical bootstrap successfully.
  - Evidence: isolated `main` at commit `acdfef0` completed plain `./bootstrap`, dependency installation, all 27 tests, seven evaluation scenarios, 59 assertions, and canonical verification with a clean worktree on 2026-07-24
- [x] AC3 — Canonical verification passes on a clean primary branch.
  - Evidence: isolated `main` verification at commit `8ef1f06` on 2026-07-24
- [x] AC4 — Direct development commits to the primary branch remain blocked.
  - Evidence: `test/governance.test.ts` pre-commit fixture
- [x] AC5 — `AGENTS.md` is concise and routes tasks without requiring all governance files.
  - Evidence: 116-line kernel, `scripts/check-docs.mjs`, commit `ba97a34`
- [x] AC6 — Durable policy, reusable workflow, active goal state, historical evidence, and executable enforcement have distinct documented owners.
  - Evidence: Constitution 2.1 Article IX responsibility map and commit `b425fa2`
- [x] AC7 — Tempo provides a self-contained living goal format that supports fresh-context resumption.
  - Evidence: `GOALS/TEMPLATE.md`, `GOALS/README.md`, `scripts/validate-goal.mjs`, and `EVALS/2026-07-24--goal-resumption-thin-slice.md`
- [x] AC8 — The goal loop acts, observes evidence, evaluates, repairs, checkpoints, and continues until a defined stop condition.
  - Evidence: C017 used this active goal to select work, repair focused check failures, observe `pnpm verify`, checkpoint evidence/next action, and continue through commits `b425fa2`, `ba97a34`, and `729c304`
- [x] AC9 — T0/T1 reversible work can continue inside an approved authority envelope without repeated approval prompts.
  - Evidence: Constitution 2.1 Articles II and XV-A
- [x] AC10 — T2/T3, destructive, production, privacy, compatibility, remote, and publication boundaries require explicit approval.
  - Evidence: Constitution 2.1 Article II and this goal's Authority Envelope
- [x] AC11 — Focused Tempo skills exist, pass validation, use progressive disclosure, and have tested references or scripts.
  - Evidence: five `.agents/skills/tempo-*` workflows, direct references, upstream `quick_validate.py`, `pnpm check:skills`, and negative reference/frontmatter tests
- [x] AC12 — Skill trigger behavior includes positive and negative evaluation coverage.
  - Evidence: `EVALS/skill-trigger-cases.json`, `EVALS/2026-07-24--skill-trigger-audit.md`, and trigger-coverage regression test
- [x] AC13 — At least one fresh-context resume evaluation demonstrates correct continuation without premature completion.
  - Evidence: `pnpm eval` creates isolated goal state, selects work unit 2, preserves AC1, completes AC2 with evidence, validates completed state, and rejects the premature-completion fixture
- [x] AC14 — Tempo retains one documented public setup command suitable for the GitHub README.
  - Evidence: README and `GETTING_STARTED.md` use `./bootstrap`; target adoption is expressed only through flags on the same command
- [x] AC15 — Greenfield setup remains batteries included.
  - Evidence: two consecutive `./bootstrap --mode greenfield --no-verify` runs completed non-interactively with the pinned TypeScript profile on 2026-07-24
- [x] AC16 — Adopt-existing setup works without imposing the TypeScript starter stack.
  - Evidence: `test/portable-adoption.test.ts` proves target install, repeat install, collision refusal, Node/pnpm non-invocation, and absence of starter-stack files
- [x] AC17 — Documentation validation detects structural defects and material command inconsistencies.
  - Evidence: `scripts/validate-contracts.mjs` and negative tests in `test/governance.test.ts`
- [x] AC18 — Current behavior, migration guidance, rollback, decisions, roadmap, and review evidence agree.
  - Evidence: `MIGRATION.md`, all six modernization proposals, `ROADMAP/COMMIT-PLAN.md`, `STATUS.md`, `DECISIONS.md`, and `REVIEWS/2026-07-24--tempo-skills-goals-modernization.md` agree with the final committed-tree replay
- [x] AC19 — Full canonical verification and the documented manual evaluation suite pass.
  - Evidence: `pnpm verify` and `pnpm eval` pass after C022 with 27 tests, seven scenarios, 59 assertions, and the human audit in `EVALS/2026-07-24--evaluation-report.md`
- [x] AC20 — No external push, publication, remote change, or production action occurred.
  - Evidence: final git, tracked-artifact, secret-pattern, decision, and remote audits found no external action or remote mutation; the pre-existing `origin` remained unchanged and unused

## Authority Envelope

### May Continue Without Asking

- Execute the approved C017 T2 units and later approved local T0/T1 proposals.
- Read and edit files in this repository within recorded scope.
- Run local bootstrap, validation, tests, builds, isolated fixtures, and
  clean-context evaluations.
- Create atomic commits on the current compliant feature branch with required
  trailers.
- Repair in-scope failures while the cause changes or the recorded retry bound
  has not been reached.

### Must Pause for Approval

- Scope expansion beyond the approved proposal or this goal.
- Any new T2/T3 implementation not explicitly approved.
- Destructive or irreversible actions.
- Remote, push, publication, deployment, or production actions.
- Compatibility-breaking behavior or unclear security/privacy impact.
- Privileged installation, secrets, or external coordination not already
  authorized.

## Work Units

| Unit                                      | Status    | Exit criteria                                                                | Verification                                             |
| ----------------------------------------- | --------- | ---------------------------------------------------------------------------- | -------------------------------------------------------- |
| 0. Research and approved product contract | completed | Definition of Ready established.                                             | Commit `dbff42b`; contract validation.                   |
| 1. Foundation repair                      | completed | Clean-main verification and non-interactive setup boundaries are consistent. | Commit `8ef1f06`; isolated `main`; governance tests.     |
| 2. Constitution 2.1 and concise kernel    | completed | Bounded authority is constitutional and `AGENTS.md` is at most 120 lines.    | Commits `b425fa2`, `ba97a34`; `pnpm verify`.             |
| 3. Living goal execution                  | completed | One active goal validates and resumes from fresh state.                      | `pnpm check:goal`; goal fixtures; thin-slice evaluation. |
| 4. Focused skill bundle                   | completed | Required skills validate and trigger precisely.                              | Skill validator, reference tests, trigger audit.         |
| 5. Portable setup                         | completed | Greenfield and non-Node adopt-existing paths pass.                           | Isolated bootstrap fixtures and repeated setup.          |
| 6. Evaluation harness                     | completed | Required scenarios and objective assertions pass.                            | `pnpm eval`; recorded manual evidence.                   |
| 7. Migration and review                   | completed | Repository is merge-safe and publication-ready.                              | Clean checkout, full verify, Review Record, final audit. |

## Progress

- 2026-07-24: Research refreshed and modern product contract approved in `dbff42b`.
- 2026-07-24: Foundation contradictions repaired in `8ef1f06`; the committed
  tree passed `pnpm verify` from isolated `main`.
- 2026-07-24: Human explicitly approved the C017 T2 proposal and Constitution
  2.1 amendment.
- 2026-07-24: Constitution 2.1 committed as `b425fa2`.
- 2026-07-24: `AGENTS.md` reduced from 238 to 113 lines at `ba97a34` and
  settled at 116 after final routing additions; the 120-line limit passes.
- 2026-07-24: Living-goal lifecycle, validator, and fixtures implemented; current
  unit passed canonical verification with 11 tests.
- 2026-07-24: Active execution ownership consolidated into this file; the
  original roadmap goal retains the approved contract and points here for state.
- 2026-07-24: C018 focused-skill proposal approved under the original `/goal`
  authority for scoped, reversible T1 work.
- 2026-07-24: Five focused skills initialized with the current skill creator,
  filled with direct-reference workflows, and validated by both upstream and
  repository checks.
- 2026-07-24: C019 portable-adoption proposal approved under the active goal's
  scoped, reversible T1 authority.
- 2026-07-24: Target adoption implemented before toolchain checks; isolated
  non-Node install, repeat install, collision refusal, and two repeated
  greenfield bootstrap runs passed.
- 2026-07-24: Clean isolated `main` completed the full greenfield bootstrap and
  canonical verification at commit `ff9efd3`.
- 2026-07-24: C020 evaluation proposal approved under scoped, reversible T1
  goal authority.
- 2026-07-24: `pnpm eval` passed seven scenarios and 59 assertions; canonical
  verification passed with 22 tests and the human evidence audit was recorded.
- 2026-07-24: C021 migration and final-review proposal approved under scoped,
  reversible T1 goal authority.
- 2026-07-24: Final feature-branch verification passed with 27 tests, seven
  evaluation scenarios, and 59 assertions after C022; all five skills also
  passed the upstream skill validator.
- 2026-07-24: Isolated `main` at `acdfef0` completed plain and initialized
  public bootstrap paths; the plain path left a clean worktree.
- 2026-07-24: Migration, safety, artifact, secret-pattern, remote, commit,
  rollback, and criterion audits completed with no blocking finding.

## Evidence

- AC1, AC3–AC6, AC9–AC10, and AC17 have criterion-level evidence above.
- `pnpm verify` passed after the constitutional and concise-kernel units.
- `pnpm verify` passed with the active goal, lifecycle validation, and 11 tests
  on 2026-07-24.
- `test/governance.test.ts` covers clean-main policy, direct-commit rejection,
  contract structure, project reset, and goal lifecycle boundaries.
- Final review evidence is recorded in
  `REVIEWS/2026-07-24--tempo-skills-goals-modernization.md`; the exact final
  staged tree was replayed once more before its completion commit.

## Discoveries

- Repo-local `.agents/skills` and a small `AGENTS.md` match current Codex
  progressive-disclosure guidance.
- The open Agent Skills specification permits more metadata than the current
  local skill creator; Tempo will use only `name` and `description`.
- `CI=1 pnpm install --frozen-lockfile` is non-interactive, but portable
  adopt-existing setup must not assume Node or pnpm.
- Tempo's template product contract and a user's unfilled project contracts are
  different valid structural states.
- The old 238-line `AGENTS.md` duplicated conditional procedure that now has
  explicit authoritative routes.
- The full starter Constitution contains bootstrap-artifact assumptions that are
  inappropriate in arbitrary targets; the portable profile preserves authority,
  evidence, safety, and recovery rules without choosing a toolchain.

## Decisions

- Preserve `./bootstrap` as the canonical in-repository setup command.
- Provide a focused open-format skill bundle, not one monolithic skill.
- Keep the batteries-included TypeScript starter separate from the portable
  governance and skills kernel.
- Separate read-only primary-branch verification from mutation-time enforcement.
- Treat `AGENTS.md` as a concise invariant and routing kernel.
- Treat this file as the canonical active execution state; host goal state is an
  adapter.

## Retry State

- Current attempt: 0
- Maximum attempts per unchanged failure: 2
- Last failure: none

## Next Action

- Preserve this review-ready branch; any local merge or external publication is a separate approved action.

## Pause Conditions

- Pause at any boundary under “Must Pause for Approval.”
- Pause and create RCA after a user-reported failed change before another fix.
- Mark blocked only after the same condition prevents meaningful progress across
  the required repeated audits.
- Do not complete this goal until all 20 acceptance criteria have final evidence.

## Outcomes

- Foundation and concise-kernel outcomes are complete and verified.
- Living-goal execution and active-state consolidation are complete.
- Skills and their deterministic trigger coverage are complete.
- Portable greenfield and adopt-existing setup are complete.
- Full clean-process evaluations are complete.
- Migration and final review are complete; all 20 acceptance criteria have
  requirement-matched evidence.
- The feature branch is ready for the documented local Review Boundary.
- Local merge and external publication remain intentionally unexecuted.
