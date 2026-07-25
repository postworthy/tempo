# Living Goals

A living goal is Tempo's canonical active execution state. It turns an approved
outcome into resumable work without replacing `SPEC.md`, an approved proposal,
or the roadmap.

## Lifecycle

Each goal has exactly one status:

- `draft`: being prepared; execution is not authorized.
- `approved`: scope is approved but execution has not started.
- `active`: the one goal currently being executed.
- `paused`: intentionally waiting at a named approval or external boundary.
- `blocked`: repeated evidence proves no meaningful progress is possible without
  a state change.
- `completed`: every acceptance criterion has evidence and all completion gates
  pass.
- `abandoned`: intentionally ended without satisfying the outcome; rationale is
  recorded.

At most one file may be `active`. Pausing work does not automatically mean the
goal is `blocked`; record a pause when its condition is expected and resumable.

## Ownership

The goal owns current progress, execution discoveries, work-unit evidence, retry
state, and the exact next action. Other artifacts retain their constitutional
responsibilities:

- `SPEC.md`: product intent and product-level acceptance.
- `PROPOSALS/*`: approved non-trivial change scope and risk controls.
- `ROADMAP/COMMIT-PLAN.md`: milestone and commit sequencing.
- `DECISIONS.md`: durable decisions and rationale.
- `STATUS.md`: concise human-facing summary only.
- `REVIEWS/*`: review evidence and boundary decision.
- `RCA/*`: failure analysis and preventive controls.

## Execution Loop

For an active goal:

1. Orient from repository state and this goal.
2. Select the smallest valuable unmet criterion or recorded next action.
3. Check the Authority Envelope and current risk.
4. Act within approved scope.
5. Observe actual environmental behavior.
6. Evaluate evidence against the criterion and exit condition.
7. Repair within the retry bound or perform RCA when required.
8. Checkpoint progress, evidence, discoveries, decisions, retry state, and next
   action.
9. Continue until a pause condition or evidence-backed completion.

Host-native goal features may mirror this file, but this repository artifact is
authoritative and must be checkpointed before handoff or context reset.

## Commands

```bash
pnpm check:goal
pnpm goal:status
```

Both commands validate all goal files. They print the active goal and its next
action when one exists.

Create goals from `GOALS/TEMPLATE.md`. Do not use `TEMPLATE.md` or this README as
active state.
