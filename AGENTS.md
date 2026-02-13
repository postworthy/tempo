# AGENTS.md - Tempo Agent Operating Manual

This repository is implemented primarily by AI coding agents. The repository is the source of truth.

## Governing Order

If documents conflict, apply this order (highest first):

1. `CONSTITUTION.md`
2. `SPEC.md`
3. `VERIFY.md`
4. `DECISIONS.md`
5. `ROADMAP/COMMIT-PLAN.md`
6. `PROPOSALS/*`
7. `REVIEWS/*`
8. `RCA/*`
9. `STATUS.md`

No lower-priority file may weaken a higher-priority rule.

## Prime Directives

1. Follow `CONSTITUTION.md` first, then `SPEC.md`.
2. Work from written acceptance criteria, never assumptions.
3. Do all work on feature branches. Never commit directly to `main`.
4. Propose before implementing any non-trivial change.
5. Update documentation to match reality in the same change sequence.
6. If a user reports failure, perform RCA before repeated fix attempts.
7. Never perform destructive actions without explicit approval.
8. Never commit secrets, generated artifacts, caches, or local logs.
9. Prefer reversible changes with explicit rollback plans.
10. If a requested change did not work, perform RCA comparing request, implementation, and observed output before further fixes. Store RCA files at `RCA/YYYY-MM-DD--short-title.md`.
11. Do not add git remotes or execute external `push`/`publish` actions unless explicitly approved and recorded in `DECISIONS.md`.

## Project Invariants

- Canonical verification command: `pnpm verify`
- Canonical bootstrap command: `./bootstrap`
- Primary branch: `main`
- First-run onboarding contract: `BOOTSTRAP.md`
- Local-first Review Boundary: merge from feature branch into `main` with Review Record

## Review Definitions

- Change Review: evaluation of scope, verification, risk, and rollback readiness.
- Review Boundary: local merge from a feature branch into `main`.
- Review Record: `REVIEWS/YYYY-MM-DD--short-title.md`.
- Hosted change-request surfaces are optional only; never assumed.

## Template History Handling

- `TEMPLATE_HISTORY/` contains template-development records only.
- Do not treat files under `TEMPLATE_HISTORY/` as active project records.
- Active project records must use:
  - `PROPOSALS/YYYY-MM-DD--short-title.md`
  - `REVIEWS/YYYY-MM-DD--short-title.md`
  - `RCA/YYYY-MM-DD--short-title.md`

## Pre-Edit Read Checklist

Before making code changes, read:

- `AGENTS.md`
- `CONSTITUTION.md`
- `BOOTSTRAP.md`
- `PROJECT-BRIEF.md`
- `SPEC.md`
- `STATUS.md`
- `DECISIONS.md`
- `GETTING_STARTED.md`
- `VERIFY.md`
- `ROADMAP/COMMIT-PLAN.md`

If `ROADMAP/COMMIT-PLAN.md` does not exist, create it before feature work.

## Mandatory Work Loop (Per Change)

0. Confirm the next smallest valuable change from `ROADMAP/COMMIT-PLAN.md`.
1. For fresh/unfamiliar environments, run `./bootstrap --no-verify` before other work to validate local toolchain.
2. Classify risk (`T0`, `T1`, `T2`, `T3`) per `CONSTITUTION.md`.
3. If `PROJECT-BRIEF.md` is unfilled, run discovery and intake from `BOOTSTRAP.md` and update `PROJECT-BRIEF.md` and `SPEC.md` before non-trivial implementation.
4. During bootstrap, ask at least 3 clarifying questions and at least 1 follow-up question for each ambiguous answer.
5. For `T1` / `T2` / `T3`, decompose work into small verifiable units with per-unit exit criteria before implementation.
6. For non-trivial work, create a proposal in `PROPOSALS/`.
7. Implement only approved scope.
8. Run verification (`pnpm verify`).
9. Update docs (`STATUS.md`, `DECISIONS.md`, roadmap/proposal as needed).
10. Create/update Review Record at `REVIEWS/YYYY-MM-DD--short-title.md` for non-trivial changes.
11. Commit atomically with a conventional message.

Proposal path: `PROPOSALS/YYYY-MM-DD--short-title.md`

Proposal must include:

- Objective
- Out-of-scope
- Acceptance criteria
- Verification plan
- Rollback plan
- Risks and mitigations
- Compatibility or migration notes (if relevant)
- Decomposition plan (required for `T1` / `T2` / `T3`)

Exception: purely mechanical changes may skip a proposal.

## Verification Rules

- Preferred command: `pnpm verify > .verify.log 2>&1`
- If verification cannot run locally, report:
  - expected output
  - failure interpretation
  - next steps

## Bootstrap Rules

- Bootstrap assumes repository is already cloned locally.
- Installing or acquiring `git` is out of scope.
- Do not assume Node.js/pnpm/tooling are preinstalled.
- Use canonical bootstrap command `./bootstrap` unless an approved alternative setup command exists.
- Avoid privileged installation/escalation without explicit approval.
- If bootstrap gaps are found, update `GETTING_STARTED.md` in the same change sequence.

## Documentation Rules

When behavior changes, docs must change too.
Minimum required updates per non-trivial change:

- `STATUS.md`: what changed, what is next, follow-ups
- `ROADMAP/COMMIT-PLAN.md`: keep next target accurate

## Commit and Branch Rules

- One coherent change per commit.
- Prefer <= 300 changed lines per commit.
- If above limits, justify in proposal and split when possible.
- Branch naming:
  - `feat/<short-name>`
  - `chore/<short-name>`
- Include proposal reference in commit body:
  - `Proposal: PROPOSALS/YYYY-MM-DD--short-title.md`
- Non-trivial merges require a Review Record:
  - `Review: REVIEWS/YYYY-MM-DD--short-title.md`

## Pause-and-Ask Conditions

- Scope expands beyond approved proposal.
- Security or privacy implications are unclear.
- A change is destructive or irreversible.
- A production-impacting change lacks rollback.
- `PROJECT-BRIEF.md` is incomplete for non-trivial work.
- Discovery assumptions remain unresolved.

## RCA Rule

If a requested change did not work, perform RCA before additional fix attempts.

Minimum RCA content:

- Symptom
- Reproduction steps
- Root cause with evidence
- Corrective action
- Preventive control

Record RCA summary in `STATUS.md` and decision/process impacts in `DECISIONS.md`.

## Safety and Security Baseline

Agents must not:

- Exfiltrate secrets
- Add hidden telemetry
- Weaken authn/authz controls as a shortcut
- Introduce prohibited capabilities defined by `CONSTITUTION.md` or `SPEC.md`

Agents must:

- Use least privilege
- Keep secrets out of the repository
- Follow explicit safety constraints in `SPEC.md`

## Definition of Done (Per Commit)

A change is done only when:

- Scope is explicit (proposal or trivial note)
- Implementation matches approved scope
- Verification passes
- Docs are updated
- Required Review Record exists (for non-trivial changes)
- Change is merge-safe
- Rollback path exists
- Branch/merge policy is respected

## Definition of Ready (Before Implementation)

For `T1` / `T2` / `T3` work, implementation is ready only when:

- `PROJECT-BRIEF.md` and `SPEC.md` are sufficiently concrete for scope,
- risk class is declared,
- decomposition exists (proposal or `ROADMAP/COMMIT-PLAN.md`) with ordered work units,
- each planned unit includes verification notes and exit criteria,
- thin-slice milestone is explicit,
- review boundary plan is explicit (including Review Record path),
- unresolved unknowns and intentional deferrals are listed.
