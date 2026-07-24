# Proposal: Create the Concise Kernel and Living Goal Model

Date: 2026-07-24
Owner: Codex
Risk Class: T2
Related Issue/Context: `ROADMAP/TEMPO-SKILLS-GOALS-MODERNIZATION.md`
Roadmap Item: C017
Planned Branch: `docs/c012-tempo-modernization-goal`
Expected Commit Count: 3

## Objective

Replace Tempo's large always-loaded operating manual with a concise repository kernel and add one canonical, resumable living-goal artifact without weakening safety, verification, rollback, review, or dirty-worktree controls.

## Scope

In scope:

- Reduce root `AGENTS.md` to always-applicable policy, source-of-truth routing, preflight, authority boundaries, and completion rules.
- Add a canonical `GOALS/` template, lifecycle, active-goal pointer, and structural validator.
- Define which artifact owns product intent, durable policy, proposed scope, active execution state, durable decisions, review evidence, failure analysis, and human-facing summary.
- Amend `CONSTITUTION.md` explicitly to recognize living goals and bounded T0/T1 autonomy.
- Update active docs and templates whose responsibilities overlap with goal state.
- Add focused tests and clean-context resumption fixtures before removing duplicated procedure.

Out of scope:

- Creating the Agent Skills bundle; that remains C018.
- Portable installation into a non-Node repository; that remains C019.
- Publishing, pushing, adding remotes, merging to `main`, or changing production.
- Weakening destructive-action, security/privacy, compatibility, remote-action, T2/T3, or release approval boundaries.
- Deleting historical records.

## Expected Files Touched

- `CONSTITUTION.md`
- `AGENTS.md`
- `PROMPTING.md`
- `VERIFY.md`
- `STATUS.md`
- `DECISIONS.md`
- `ROADMAP/COMMIT-PLAN.md`
- `GOALS/README.md`
- `GOALS/TEMPLATE.md`
- `scripts/validate-goal.mjs`
- `scripts/validate-contracts.mjs`
- `package.json`
- `test/governance.test.ts`
- `test/fixtures/goals/*`

If implementation reveals another active document that must change to prevent contradictory ownership, work pauses for scope review before editing it.

## Acceptance Criteria

- [ ] `AGENTS.md` is at most 120 lines and retains governing order, safety boundaries, dirty-worktree protection, verification, rollback, RCA, review, and completion routing.
- [ ] A responsibility map identifies exactly one authoritative artifact for each state category.
- [ ] `GOALS/TEMPLATE.md` contains outcome, non-goals, acceptance criteria, authority envelope, ordered work units, evidence, progress, discoveries, decisions, retry state, next action, pause conditions, and outcomes.
- [ ] The goal lifecycle defines draft, approved, active, paused, blocked, completed, and abandoned states without conflating an execution pause with a system goal status.
- [ ] A deterministic command identifies and validates at most one active goal.
- [ ] Invalid goal fixtures fail with field-specific errors.
- [ ] A fresh-context resumption fixture identifies the recorded next action, preserves completed work, and cannot satisfy completion without evidence for every criterion.
- [ ] Approved, reversible T0/T1 actions inside the recorded authority envelope do not require repeated confirmation.
- [ ] Scope expansion, destructive work, remote/publication action, security/privacy uncertainty, compatibility breaks, production effects, and T2/T3 work require explicit approval.
- [ ] Constitutional version, effective date, decision record, transition guidance, and active docs agree.
- [ ] `pnpm verify` passes on the feature branch and an isolated clean `main`.

## Verification Plan

Commands:

```bash
pnpm check:contracts
pnpm check:goal
pnpm test
pnpm verify
```

Focused evidence:

- structural positive and negative goal fixtures,
- a temporary repository with one valid active goal,
- fixtures with zero and multiple active goals,
- a clean-context manual resumption run recorded in the proposal or review record,
- an authority-boundary table reviewed against the amended constitution,
- a before/after line and responsibility inventory for `AGENTS.md`.

Pass means:

- Each acceptance criterion names observable evidence.
- The validator rejects premature completion and ambiguous active-goal ownership.
- The manual resumption run chooses the recorded next action without rereading every procedure.
- Full canonical verification exits 0.

## Change Review Plan

- Review Boundary: merge from `docs/c012-tempo-modernization-goal` into `main`
- Planned Review Record: `REVIEWS/2026-07-24--tempo-skills-goals-modernization.md`
- Reviewer/approver expectation: confirm constitutional amendment fidelity, safety-boundary preservation, resumption evidence, rollback readiness, and no unapproved external action.

## Git Plan

- Existing branch: `docs/c012-tempo-modernization-goal`
- Planned commits:
  - `docs(governance): approve living-goal amendment`
  - `refactor(governance): reduce repository kernel`
  - `feat(goals): add resumable goal state`
- Required trailers:
  - `Roadmap: ROADMAP/COMMIT-PLAN.md#C017`
  - `Proposal: PROPOSALS/2026-07-24--concise-kernel-living-goals.md`
- Planned merge method: `git merge --no-ff docs/c012-tempo-modernization-goal`

The governance and goal commits remain separate so either capability can be reverted independently. Any commit above the normal line or file targets must be justified in this proposal before it is created.

## Decomposition Plan

Work units (ordered):

1. Approve and apply the constitutional amendment — Verify by: exact-text review, version/date check, decision entry, and `pnpm check:contracts` — Exit criteria: bounded authority and living-goal precedence are constitutional rather than inferred — Risk: T2 — Dependencies: explicit human approval of this proposal.
2. Add responsibility-map and routing tests — Verify by: a machine-readable or deterministically checked ownership table and contradiction fixtures — Exit criteria: every active state category has one owner — Risk: T1 — Dependencies: unit 1.
3. Reduce `AGENTS.md` — Verify by: line count, invariant checklist, prompt-routing scenarios, and `pnpm verify` — Exit criteria: the always-loaded kernel is at most 120 lines and every removed procedure has a valid destination or is obsolete — Risk: T2 — Dependencies: units 1 and 2.
4. Add the minimal living-goal template and validator — Verify by: positive and negative fixtures plus `pnpm check:goal` — Exit criteria: one valid active goal can be found and resumed deterministically — Risk: T1 — Dependencies: units 1 and 2.
5. Consolidate overlapping active-state docs — Verify by: responsibility-map audit and fresh-context resumption run — Exit criteria: roadmap, proposal, status, and goal roles do not conflict — Risk: T2 — Dependencies: units 3 and 4.
6. Update evidence and complete review — Verify by: full `pnpm verify`, isolated clean-main verification, diff audit, and Review Record — Exit criteria: C017 is review-ready and C018 has an accurate next action — Risk: T1 — Dependencies: all prior units.

Thin slice milestone:

- After unit 4, a fresh-context agent can locate one active goal, validate it, read its next action and authority envelope, and refuse premature completion.

Dependencies and unknowns:

- Host-native `/goal` state cannot be assumed portable; the repository artifact remains canonical and host goal state is an adapter.
- Whether `STATUS.md` becomes generated or remains a small human summary will be decided in unit 5 using resumption evidence.
- Skills do not yet exist, so the concise kernel must route future procedures by stable responsibility rather than by uncreated paths.

Intentional deferrals:

- Skill authoring and trigger evaluations.
- Stack-neutral installer behavior.
- Optional plugin packaging.
- External publication and hosted integration.

## Proposed Constitutional Amendment

Version transition: 2.0 to 2.1.

Effective date: the implementation date after explicit human approval.

Proposed text changes:

1. Article I-A adds:
   - “Living Goal: the canonical repository artifact under `GOALS/` that records an approved outcome, authority envelope, current execution state, evidence, and next action.”
   - “Authority Envelope: the approved set of local, reversible actions an agent may execute without repeated confirmation.”
2. Article I places active `GOALS/*` below approved `PROPOSALS/*` and above `STATUS.md`; a goal may operationalize but never weaken a higher-precedence contract.
3. Article II adds:
   - Approved T0/T1 work inside an authority envelope may continue without repeated human confirmation.
   - Explicit approval remains mandatory for scope expansion, destructive/irreversible action, remote or publication action, production effect, security/privacy uncertainty, compatibility breaks, and all T2/T3 implementation.
4. Article V permits an approved proposal to initialize a living goal but does not allow a goal to replace proposal approval for non-trivial work.
5. Article VIII requires completion evidence to be recorded against each living-goal acceptance criterion when a goal exists.
6. Article IX assigns active execution state to one living goal and limits `STATUS.md` to a human-facing summary that must not override it.
7. Article XV requires a living goal to reach `completed` only after every acceptance criterion has evidence, required verification passes, docs agree, and no required work remains.
8. Article XV-A requires the active goal's authority envelope, next action, pause conditions, and review boundary before execution begins.

Rationale:

- Current governance has strong controls but duplicates procedure and execution state across always-loaded documents.
- A living goal needs explicit precedence and completion semantics to be safe across context resets.
- Bounded authority is necessary for durable agentic loops, while high-impact boundaries must remain human-controlled.

Expected impacts:

- Agents load less unconditional prose and can resume from repository state.
- Routine approved local work incurs fewer unnecessary interruptions.
- Maintainers gain deterministic active-goal and completion validation.
- Existing proposals, reviews, RCA records, git controls, and public setup remain compatible.

Transition plan:

1. Add new definitions and rules before reducing `AGENTS.md`.
2. Add the goal template and validator additively.
3. Migrate only the current modernization execution state into the first active goal.
4. Validate resumption and responsibility ownership.
5. Remove duplicate procedure only after its replacement is proven.
6. Preserve historical documents and provide migration notes for existing Tempo clones.

## Rollout and Abort Criteria

Rollout:

1. Apply the amendment and responsibility map.
2. Introduce concise routing and goal state in separate commits.
3. Run focused fixtures after each unit.
4. Run a clean-context resumption evaluation before consolidating old state.
5. Complete full verification and review before any merge.

Abort and pause if:

- any removed rule lacks an authoritative destination,
- a fixture permits two active goals,
- goal completion can pass without criterion-level evidence,
- bounded authority can be read to authorize a T2/T3 or external action,
- the concise kernel cannot route an unfamiliar agent correctly,
- compatibility impact expands beyond this proposal.

## Rollback Plan

If this change causes regressions:

1. Revert the goal-state commit while retaining the approved amendment only if its rules remain internally consistent.
2. Revert the concise-kernel commit to restore the prior `AGENTS.md`.
3. If needed, revert the constitutional amendment and its decision entry together, restoring version 2.0.
4. Run `pnpm verify` and the prior prompt-review scenarios.
5. Record the observed regression and corrective decision before another attempt.

## Risks and Mitigations

- Risk: compressing instructions silently drops a safety or quality invariant.
  Mitigation: build an invariant/responsibility map first and require an explicit destination for every removed rule.
- Risk: the living goal duplicates proposal, roadmap, and status state.
  Mitigation: define ownership by information type and validate one active execution owner.
- Risk: bounded autonomy is interpreted too broadly.
  Mitigation: encode positive and negative authority examples and retain enumerated approval boundaries in both constitution and kernel.
- Risk: a repository-native goal diverges from host `/goal` state.
  Mitigation: define host goal state as an adapter; checkpoint repository state before pausing or handing off.
- Risk: the combined change is too large to review safely.
  Mitigation: use separate amendment, kernel, goal, and consolidation units with independent exit criteria.

## Compatibility / Migration Notes

- API compatibility impact: no application API change.
- Data/schema migration needed: no.
- Governance migration: additive first; existing clones may retain the prior manual while adopting the new goal structure.
- Host compatibility: open Markdown is canonical; host-native goals are optional adapters.
- Historical records remain in place and are not rewritten.

## Observability / Debug Notes

- Validation errors must name the goal file, missing field, and corrective action.
- The active-goal check must print the selected goal and next action.
- Manual resumption evidence must record what the fresh-context agent read and selected.

## Open Questions Needing Approval

- Approve the proposed constitutional amendment from version 2.0 to 2.1.
- Approve the bounded T0/T1 authority rule and enumerated pause boundaries.
- Approve consolidation of active execution state into `GOALS/`, with `STATUS.md` retained only as a concise human summary unless evaluation supports generating it.

## Approval

- Requested from: Human Partner
- Approval status: approved
- Approved at: 2026-07-24
- Approval evidence: user stated, “I explicitly approve the C017 T2 proposal and its Constitution 2.1 amendment for implementation.”
