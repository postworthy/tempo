# Goal: Exercise Resumption

Status: active
Owner: Tempo Test
Risk: T1
Updated: 2026-07-24
Proposal: `PROPOSALS/test.md`
Review Boundary: fixture review

## Outcome

Prove that a fresh context can select the next action.

## Non-Goals

- Do not modify external systems.

## Acceptance Criteria

- [x] AC1 — First unit is complete.
  - Evidence: fixture checkpoint
- [ ] AC2 — Second unit remains.
  - Evidence: pending

## Authority Envelope

### May Continue Without Asking

- Read and validate this fixture.

### Must Pause for Approval

- Any write outside the fixture.

## Work Units

| Unit | Status    | Exit criteria          | Verification |
| ---- | --------- | ---------------------- | ------------ |
| 1    | completed | First unit recorded.   | Inspect AC1. |
| 2    | pending   | Next action completed. | Inspect AC2. |

## Progress

- Unit 1 completed.

## Evidence

- AC1: fixture checkpoint.

## Discoveries

- None yet.

## Decisions

- Continue with unit 2.

## Retry State

- Current attempt: 0
- Maximum attempts per unchanged failure: 2
- Last failure: none

## Next Action

- Execute work unit 2 without repeating work unit 1.

## Pause Conditions

- Pause for any action outside fixture authority.

## Outcomes

- In progress.
