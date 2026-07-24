# Goal: Modernize Tempo for Skills and Agentic Goals

Status: active
Owner: Human Partner and Codex
Risk: T2
Updated: 2026-07-24
Proposal: `PROPOSALS/2026-07-24--concise-kernel-living-goals.md` (current unit; later units require their recorded proposals)
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
- [ ] AC2 — A clean primary-branch checkout runs the documented canonical bootstrap successfully.
  - Evidence: pending
- [x] AC3 — Canonical verification passes on a clean primary branch.
  - Evidence: isolated `main` verification at commit `8ef1f06` on 2026-07-24
- [x] AC4 — Direct development commits to the primary branch remain blocked.
  - Evidence: `test/governance.test.ts` pre-commit fixture
- [x] AC5 — `AGENTS.md` is concise and routes tasks without requiring all governance files.
  - Evidence: 113-line kernel, `scripts/check-docs.mjs`, commit `ba97a34`
- [x] AC6 — Durable policy, reusable workflow, active goal state, historical evidence, and executable enforcement have distinct documented owners.
  - Evidence: Constitution 2.1 Article IX responsibility map and commit `b425fa2`
- [ ] AC7 — Tempo provides a self-contained living goal format that supports fresh-context resumption.
  - Evidence: pending fresh-context resumption evaluation
- [ ] AC8 — The goal loop acts, observes evidence, evaluates, repairs, checkpoints, and continues until a defined stop condition.
  - Evidence: pending completed loop evaluation
- [x] AC9 — T0/T1 reversible work can continue inside an approved authority envelope without repeated approval prompts.
  - Evidence: Constitution 2.1 Articles II and XV-A
- [x] AC10 — T2/T3, destructive, production, privacy, compatibility, remote, and publication boundaries require explicit approval.
  - Evidence: Constitution 2.1 Article II and this goal's Authority Envelope
- [ ] AC11 — Focused Tempo skills exist, pass validation, use progressive disclosure, and have tested references or scripts.
  - Evidence: pending
- [ ] AC12 — Skill trigger behavior includes positive and negative evaluation coverage.
  - Evidence: pending
- [ ] AC13 — At least one fresh-context resume evaluation demonstrates correct continuation without premature completion.
  - Evidence: pending
- [ ] AC14 — Tempo retains one documented public setup command suitable for the GitHub README.
  - Evidence: pending final public-doc audit
- [ ] AC15 — Greenfield setup remains batteries included.
  - Evidence: pending isolated greenfield evaluation
- [ ] AC16 — Adopt-existing setup works without imposing the TypeScript starter stack.
  - Evidence: pending non-Node fixture
- [x] AC17 — Documentation validation detects structural defects and material command inconsistencies.
  - Evidence: `scripts/validate-contracts.mjs` and negative tests in `test/governance.test.ts`
- [ ] AC18 — Current behavior, migration guidance, rollback, decisions, roadmap, and review evidence agree.
  - Evidence: pending final review
- [ ] AC19 — Full canonical verification and the documented manual evaluation suite pass.
  - Evidence: pending final verification
- [ ] AC20 — No external push, publication, remote change, or production action occurred.
  - Evidence: pending final git and decision audit

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

| Unit                                      | Status      | Exit criteria                                                                | Verification                                                  |
| ----------------------------------------- | ----------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 0. Research and approved product contract | completed   | Definition of Ready established.                                             | Commit `dbff42b`; contract validation.                        |
| 1. Foundation repair                      | completed   | Clean-main verification and non-interactive setup boundaries are consistent. | Commit `8ef1f06`; isolated `main`; governance tests.          |
| 2. Constitution 2.1 and concise kernel    | completed   | Bounded authority is constitutional and `AGENTS.md` is at most 120 lines.    | Commits `b425fa2`, `ba97a34`; `pnpm verify`.                  |
| 3. Living goal execution                  | in progress | One active goal validates and resumes from fresh context.                    | `pnpm check:goal`; goal fixtures; manual resumption evidence. |
| 4. Focused skill bundle                   | pending     | Required skills validate and trigger precisely.                              | Skill validator, reference tests, trigger evals.              |
| 5. Portable setup                         | pending     | Greenfield and non-Node adopt-existing paths pass.                           | Isolated bootstrap fixtures.                                  |
| 6. Evaluation harness                     | pending     | Required scenarios and objective assertions pass.                            | `pnpm eval`; recorded manual evidence.                        |
| 7. Migration and review                   | pending     | Repository is merge-safe and publication-ready.                              | Clean checkout, full verify, Review Record, final audit.      |

## Progress

- 2026-07-24: Research refreshed and modern product contract approved in `dbff42b`.
- 2026-07-24: Foundation contradictions repaired in `8ef1f06`; the committed
  tree passed `pnpm verify` from isolated `main`.
- 2026-07-24: Human explicitly approved the C017 T2 proposal and Constitution
  2.1 amendment.
- 2026-07-24: Constitution 2.1 committed as `b425fa2`.
- 2026-07-24: `AGENTS.md` reduced from 238 to 113 lines and committed as
  `ba97a34`.
- 2026-07-24: Living-goal lifecycle, validator, and fixtures implemented; current
  unit passed canonical verification with 11 tests.

## Evidence

- AC1, AC3–AC6, AC9–AC10, and AC17 have criterion-level evidence above.
- `pnpm verify` passed after the constitutional and concise-kernel units.
- `pnpm verify` passed with the active goal, lifecycle validation, and 11 tests
  on 2026-07-24.
- `test/governance.test.ts` covers clean-main policy, direct-commit rejection,
  contract structure, project reset, and goal lifecycle boundaries.

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

- Record fresh-context resumption evidence against the committed living-goal thin slice, then consolidate duplicated active-state sections.

## Pause Conditions

- Pause at any boundary under “Must Pause for Approval.”
- Pause and create RCA after a user-reported failed change before another fix.
- Mark blocked only after the same condition prevents meaningful progress across
  the required repeated audits.
- Do not complete this goal until all 20 acceptance criteria have final evidence.

## Outcomes

- Foundation and concise-kernel outcomes are complete and verified.
- Living-goal execution is the current active unit.
- Skills, portability, evaluations, migration, and final review remain required.
