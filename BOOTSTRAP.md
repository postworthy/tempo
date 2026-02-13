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

1. Run the Mandatory Intake Questions.
2. Run the Discovery Phase.
3. Fill `PROJECT-BRIEF.md` with approved answers.
4. Generate/update `SPEC.md` from the approved brief.
5. Ask for explicit approval before any non-trivial implementation.

The agent must not implement beyond trivial mechanical setup until steps 1-5 are complete.

## Discovery Phase (Mandatory)

The agent must run a short rubberduck-style discovery conversation before finalizing scope.

Required discovery steps:

1. Reflect the user's idea back in plain language.
2. Ask clarifying questions for any ambiguity.
3. Offer 2-3 feasible scope options (small/medium/larger v1).
4. Explain key trade-offs for each option.
5. Confirm the chosen direction explicitly.

Tone guidance:

- Be engaged and collaborative.
- Help expand ideas with examples and options.
- Do not overpromise capabilities.
- Keep guidance practical and concrete.

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

Question minimums:

- Ask at least 3 clarifying questions when the brief is unfilled.
- Ask at least 1 follow-up question for each ambiguous answer.
- If uncertainty remains, list explicit assumptions and request approval.

## Discovery Output Contract

After discovery and intake, produce:

- Completed `PROJECT-BRIEF.md`
- Assumptions and unresolved questions list
- Updated `SPEC.md` aligned to the brief
- A proposal for the first non-trivial implementation change

## Safety Rules

- Do not assume missing answers.
- If user answers are contradictory, surface the conflict and request clarification.
- Keep all decisions documented in `DECISIONS.md` when durable trade-offs are made.
