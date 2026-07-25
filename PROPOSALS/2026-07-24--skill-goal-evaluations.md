# Proposal: Validate Skills and Fresh-Context Goals

Date: 2026-07-24
Owner: Codex
Risk Class: T1
Related Issue/Context: active modernization goal
Roadmap Item: C020
Planned Branch: `docs/c012-tempo-modernization-goal`
Expected Commit Count: 3

## Objective

Add a reproducible evaluation harness and evidence suite that measures whether
Tempo's focused skills, living goals, authority envelope, setup paths, and
failure recovery satisfy the required scenarios without premature completion or
unnecessary interruption.

## Scope

In scope:

- Define structured evaluation cases for all seven required scenarios.
- Add deterministic assertions for expected skill, required/forbidden behavior,
  authority decision, evidence quality, completion status, and next action.
- Run cases in isolated temporary state without conversation memory.
- Compare current instruction load and capabilities with the recorded pre-skill,
  pre-goal Tempo baseline.
- Produce console/JSON results without committing generated workspaces.
- Record a human audit for subjective novice clarity and known limitations.
- Integrate `pnpm eval` into documented release verification.

Out of scope:

- Calling paid model APIs or relying on network access.
- Spawning independent subagents, which is unavailable under the current
  no-subagent instruction.
- Training a classifier or claiming that deterministic metadata assertions prove
  every host model's trigger behavior.
- Publishing evaluation output or changing external systems.

## Required Scenarios

1. Greenfield user with a vague idea.
2. Existing non-Node repository adopting Tempo.
3. Multi-session feature goal resumed from fresh state.
4. Reported failed fix requiring RCA.
5. Mid-goal scope change.
6. Unrelated prompt that must not trigger Tempo.
7. Clean primary-branch bootstrap.

## Expected Files Touched

- `EVALS/scenarios.json`
- `EVALS/baseline.json`
- `EVALS/README.md`
- `EVALS/2026-07-24--evaluation-report.md`
- `scripts/run-evals.mjs`
- `scripts/run-evals.d.mts`
- `test/evaluations.test.ts`
- `package.json`
- `VERIFY.md`
- `STATUS.md`
- `ROADMAP/COMMIT-PLAN.md`
- active goal

## Acceptance Criteria

- [ ] Every required scenario has a stable ID, grounded fixture/evidence source,
      expected skill or no-skill result, authority decision, and objective
      assertions.
- [ ] Positive, ambiguous, neighboring-skill, and unrelated trigger behavior is
      represented.
- [ ] Fresh-state resumption selects the recorded next action and preserves
      completed work.
- [ ] Premature completion fails when any criterion or evidence remains pending.
- [ ] Authority cases continue approved local T0/T1 work and pause all enumerated
      high-impact boundaries.
- [ ] Greenfield and non-Node setup cases use actual isolated execution evidence.
- [ ] RCA case requires reproduction, cause evidence, preventive control, and no
      immediate second fix.
- [ ] Current `AGENTS.md` line cost and new capability coverage are compared with
      the recorded baseline.
- [ ] Generated result files and workspaces are ignored or remain temporary.
- [ ] `pnpm eval` and `pnpm verify` pass.

## Verification Plan

Commands:

```bash
pnpm eval
pnpm test
pnpm verify
```

Pass means:

- Every scenario reports pass with zero failed assertions.
- Evaluation tests independently exercise invalid scenario schema and a
  deliberate failed assertion.
- Baseline comparison reports lower always-loaded lines and additive goal,
  skills, and portable-adoption capability.
- Canonical verification exits 0.

## Change Review Plan

- Review Boundary: merge from `docs/c012-tempo-modernization-goal` into `main`
- Planned Review Record: `REVIEWS/2026-07-24--tempo-skills-goals-modernization.md`
- Reviewer/approver expectation: confirm assertions correspond to the original
  requirements, limitations are candid, and broad claims do not rest on narrow
  checks.

## Git Plan

- Existing branch: `docs/c012-tempo-modernization-goal`
- Planned commits:
  - `docs(evals): approve skill and goal evaluation`
  - `test(evals): add deterministic scenario harness`
  - `docs(evals): record modernization evaluation`
- Required trailers:
  - `Roadmap: ROADMAP/COMMIT-PLAN.md#C020`
  - `Proposal: PROPOSALS/2026-07-24--skill-goal-evaluations.md`
- Planned merge method: `git merge --no-ff docs/c012-tempo-modernization-goal`

## Decomposition Plan

1. Define scenario schema, baseline, and evidence map — Verify by: review against
   the seven required scenarios and measures — Exit criteria: every broad claim
   names authoritative evidence — Risk: T1 — Dependencies: C017–C019.
2. Implement deterministic evaluator and negative tests — Verify by: `pnpm eval`
   and focused Vitest cases — Exit criteria: a clean process grades the complete
   suite and rejects invalid or deliberately failing cases — Risk: T1 —
   Dependencies: unit 1.
3. Run isolated setup and resumption evidence, then record the report — Verify
   by: actual commands, generated summary, and manual novice audit — Exit
   criteria: limitations and follow-ups are explicit, and every case passes —
   Risk: T1 — Dependencies: unit 2.
4. Integrate release verification and checkpoint the goal — Verify by:
   `pnpm verify` — Exit criteria: C020 is review-ready and C021 is the exact next
   action — Risk: T1 — Dependencies: all prior units.

Thin slice milestone:

- A clean evaluator process loads only `EVALS/scenarios.json` plus named
  repository evidence and proves the resumption and premature-completion cases.

Dependencies and unknowns:

- Deterministic assertions prove repository contracts and minimum behavior, not
  probabilistic behavior of every compatible model.
- Independent agent forward-testing requires a future user instruction allowing
  subagents; this suite must remain useful without it.
- Clean primary bootstrap and portable-adoption executions are already recorded
  and will be cross-linked rather than rerun inside every eval invocation.

Intentional deferrals:

- Paid model grading, cross-vendor benchmarks, performance telemetry, plugin
  marketplace testing, and external publication.

## Rollback Plan

1. Remove the `eval` script from canonical documentation.
2. Revert the harness and case files.
3. Retain the underlying unit/regression tests from C017–C019.
4. Run `pnpm verify` and document which behavioral claims no longer have
   evaluation evidence.

## Risks and Mitigations

- Risk: evaluator merely restates expected answers.
  Mitigation: bind assertions to actual source files, commands, validators, and
  isolated execution fixtures; include deliberate negative tests.
- Risk: deterministic pass is overstated as universal model behavior.
  Mitigation: label limitations and retain clean-agent forward-testing as a
  separate evidence class.
- Risk: generated evaluation artifacts pollute the repository.
  Mitigation: print results by default, use temporary workspaces, and ignore any
  optional result path.

## Compatibility / Migration Notes

- Evaluation adds no runtime dependency.
- JSON cases and Node evaluator use the existing default starter toolchain.
- Portable target repositories do not receive the evaluator.

## Observability / Debug Notes

- Each failed assertion must print scenario ID, evidence source, expected value,
  and observed value.
- Summary must report scenario count, assertion count, failures, and baseline
  comparison.

## Approval

- Requested from: Human Partner
- Approval status: approved through the original `/goal` directive and active
  goal Authority Envelope for scoped, reversible T1 work
- Approved at: 2026-07-24
