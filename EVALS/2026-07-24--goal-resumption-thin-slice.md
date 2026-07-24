# Goal Resumption Thin-Slice Evaluation

Date: 2026-07-24
Scope: C017 deterministic fresh-state evaluation

## Scenario

A runner receives a temporary repository containing only one living-goal fixture
as execution state. The fixture records work unit 1 as complete and work unit 2
as the next action. No conversation or process memory is provided.

## Evidence

Command:

```bash
pnpm test
```

Assertions in `test/governance.test.ts` prove:

- the isolated runner selects `GOALS/1-valid-active.md`,
- it returns “Execute work unit 2 without repeating work unit 1” as the next
  action,
- two active goals are rejected,
- an incomplete Authority Envelope is rejected,
- and a completed status is rejected when a criterion remains unchecked or has
  only pending evidence.

## Result

Pass. The repository state is sufficient to recover one next action and prevent
the two most important resumption failures: repeating completed work and claiming
completion without evidence.

## Limitation and Follow-Up

This thin slice is deterministic and intentionally does not judge
natural-language agent behavior. Phase 6 must run the complete goal through a
clean agent context and retain this fixture as the minimum regression baseline.
