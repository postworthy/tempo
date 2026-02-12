# BOOTSTRAP.md - First-Run Agent Contract

This file defines the required first-run workflow for any AI coding assistant using this repository as a starter pack.

## Purpose

Ensure a new project starts with clarified user intent before implementation.

## Required Read Order

Before proposing or coding, the agent must read these files in order:

1. `AGENTS.md`
2. `CONSTITUTION.md`
3. `BOOTSTRAP.md`
4. `PROJECT-BRIEF.md`
5. `SPEC.md`
6. `STATUS.md`
7. `DECISIONS.md`
8. `VERIFY.md`
9. `ROADMAP/COMMIT-PLAN.md`

## First-Run Requirements

If `PROJECT-BRIEF.md` contains placeholders, the agent must:

1. Interview the user using the intake questions below.
2. Fill `PROJECT-BRIEF.md` with the user's answers.
3. Generate/update `SPEC.md` from the approved brief.
4. Ask for explicit approval before any non-trivial implementation.

The agent must not implement beyond trivial mechanical setup until steps 1-4 are complete.

## Mandatory Intake Questions

Ask these questions in plain language:

1. What are you trying to build, in one sentence?
2. Who is this for?
3. What should a successful first version do?
4. What should this first version explicitly not do?
5. What platform should it run on (web, backend, mobile, desktop, other)?
6. Any constraints (timeline, budget, legal, security, privacy)?
7. Any tools/stack preferences or exclusions?
8. What does "done" look like for v1?

## Output Contract

After collecting answers, produce:

- Completed `PROJECT-BRIEF.md`
- Updated `SPEC.md` aligned to the brief
- A proposal for the first non-trivial implementation change

## Safety Rules

- Do not assume missing answers.
- If user answers are contradictory, surface the conflict and request clarification.
- Keep all decisions documented in `DECISIONS.md` when durable trade-offs are made.
