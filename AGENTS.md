# AGENTS.md - Tempo Repository Kernel

This repository is the source of truth. Keep this file small: it contains only
rules that apply to nearly every task.

## Governing Order

When instructions conflict, use this order:

1. `CONSTITUTION.md`
2. `SPEC.md`
3. `VERIFY.md`
4. `DECISIONS.md`
5. `ROADMAP/COMMIT-PLAN.md`
6. approved `PROPOSALS/*`
7. active `GOALS/*`
8. `REVIEWS/*`
9. `RCA/*`
10. `STATUS.md`

No lower-precedence artifact may weaken a higher one. `TEMPLATE_HISTORY/`
contains template history, not active project records.

## Invariants

- Canonical setup: `./bootstrap`
- Canonical verification: `pnpm verify`
- Primary branch: `main`; all development occurs on a compliant feature branch.
- Non-trivial work requires approved scope, risk classification, decomposition,
  verification, rollback, documentation, and a Review Record.
- Preserve unrelated user changes. Never commit secrets, generated artifacts,
  caches, local logs, or `.verify.log`.
- Never perform destructive/irreversible, remote/publish, production,
  compatibility-breaking, or unclear security/privacy actions without explicit
  approval.
- If a requested fix failed, perform RCA before another corrective attempt.

## Orient and Route

Always read `CONSTITUTION.md`, `SPEC.md`, and `VERIFY.md`. Then inspect the active
goal when one exists and load only the procedure relevant to the task:

| Need                             | Authoritative route           |
| -------------------------------- | ----------------------------- |
| First-run discovery or adoption  | skill `tempo-onboard-project` |
| Create or revise a living goal   | skill `tempo-plan-goal`       |
| Continue the active goal         | skill `tempo-execute-goal`    |
| Review boundary readiness        | skill `tempo-review-change`   |
| Analyze a failed prior fix       | skill `tempo-perform-rca`     |
| Prompt/output patterns           | `PROMPTING.md`                |
| Product acceptance               | `SPEC.md`                     |
| Active execution and next action | one active `GOALS/*`          |
| Milestone sequencing             | `ROADMAP/COMMIT-PLAN.md`      |
| Approved change scope            | `PROPOSALS/*`                 |
| Human summary                    | `STATUS.md`                   |

`PROJECT-BRIEF.md` must be complete before non-trivial project implementation.
For adopt-existing onboarding, treat repository findings as hypotheses until the
user confirms them. Installing or acquiring `git` is out of scope.

## Preflight

Before edits run:

```bash
git rev-parse --abbrev-ref HEAD
git status --short
```

- If on `main`, create a branch matching
  `^(feat|fix|docs|chore|refactor|test|ci|hotfix)/c[0-9]{3}-[a-z0-9-]+$`.
- If unrelated dirty files overlap the task, pause and ask.
- Confirm the smallest valuable approved work unit and its acceptance evidence.

## Authority and Work Loop

Approved, local, reversible T0/T1 work inside a recorded Authority Envelope may
continue without repeated confirmation. Pause for scope expansion, destructive
or irreversible work, remote/publication action, production effects,
security/privacy uncertainty, compatibility breaks, or any T2/T3 implementation
that lacks explicit approval.

For each work unit:

1. Orient to current repository and goal state.
2. Confirm scope, risk, authority, exit criteria, and rollback.
3. Implement the smallest coherent change.
4. Observe actual behavior; do not infer success from edits.
5. Run focused checks, then `pnpm verify`.
6. Record evidence, discoveries, decisions, and the next action.
7. Update behavior-facing docs in the same change sequence.
8. Commit atomically with conventional subject and required trailers.

Required commit body:

```text
Roadmap: ROADMAP/COMMIT-PLAN.md#Cxxx
Proposal: PROPOSALS/YYYY-MM-DD--short-title.md
```

Use `Proposal: N/A (T0)` only for approved mechanical work. Direct commits to
`main` are prohibited. External push/publish or remote changes require explicit
approval and a `DECISIONS.md` entry.

## Completion and Recovery

A work unit is complete only when implementation matches approved scope,
acceptance evidence and canonical verification pass, docs agree with behavior,
rollback is viable, and required review records exist. A living goal is complete
only when every criterion has evidence and no required work remains.

On failure, preserve evidence and diagnose before retrying. After a reported
failed fix, create `RCA/YYYY-MM-DD--short-title.md` with symptom, reproduction,
root cause, corrective action, and preventive control; update `STATUS.md` and
`DECISIONS.md` when their state changes.
