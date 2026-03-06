# BOOTSTRAP.md - First-Run Agent Contract

This file defines the required first-run workflow for any AI coding assistant using this repository as a starter pack.

## Purpose

Ensure project intent is clarified before implementation for both:

- new (greenfield) projects, and
- existing repositories adopting Tempo governance.

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

## Onboarding Modes

Tempo supports two onboarding modes:

- `greenfield`: repository is new or still template-baseline with unfilled project intent.
- `adopt-existing`: repository already has meaningful implementation history and Tempo is being introduced after development started.

Mode selection:

1. Use explicit bootstrap mode override when provided (`--mode greenfield` or `--mode adopt-existing`).
2. Otherwise use auto-detection signals from repository discovery.
3. If signals conflict, pause and ask the user to confirm mode.

## First-Run Requirements

If `PROJECT-BRIEF.md` contains placeholders, the agent must determine mode before intake:

1. Select onboarding mode (`greenfield` or `adopt-existing`).
2. If mode is `adopt-existing`, run repository discovery first and record findings.
3. Run Mandatory Intake Questions using mode-appropriate prompts.
4. Run the Discovery Phase.
5. Fill `PROJECT-BRIEF.md` with approved answers.
6. Generate/update `SPEC.md` from the approved brief.
7. Ask for explicit approval before any non-trivial implementation.

The agent must not implement beyond trivial mechanical setup until steps 1-7 are complete.

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

Response contract guidance:

- Tell the user what the next response will contain.
- Return outputs in a stable order.
- State explicit stop conditions before any file edits or implementation.
- Keep discovery separate from implementation approval.

## Mandatory Intake Questions

### Greenfield Intake (default)

Ask these questions in plain language:

1. What are you trying to build, in one sentence?
2. Who is this for?
3. What should a successful first version do?
4. What should this first version explicitly not do?
5. What platform should it run on (web, backend, mobile, desktop, other)?
6. Any constraints (timeline, budget, legal, security, privacy)?
7. Any tools/stack preferences or exclusions?
8. What does "done" look like for v1?

### Adopt-Existing Intake (delta-focused)

Before asking questions, summarize inferred repository findings as hypotheses and ask the user to confirm/correct them.

Then ask questions that code review alone cannot answer:

1. Which inferred workflows are actually production-critical?
2. Which behaviors are legacy constraints and must remain backward-compatible?
3. What pain points are not obvious from code structure or tests?
4. Which areas are intentionally deferred vs accidentally incomplete?
5. What reliability/security/compliance requirements are known but not encoded yet?
6. What would count as a successful first Tempo-guided change here?

Question minimums:

- Ask at least 3 clarifying questions when the brief is unfilled.
- Ask at least 1 follow-up question for each ambiguous answer.
- If uncertainty remains, list explicit assumptions and request approval.

## Few-Shot Examples

Use these as concise behavior examples, not rigid scripts.

### Example 1 - Discovery response

User prompt:

```text
Use this repo as my starter pack. Read AGENTS.md, BOOTSTRAP.md, and PROMPTING.md first. Start in discovery mode.
```

Good first response shape:

```text
Summary:
- You want a starter-pack-guided project kickoff with discovery before coding.

Clarifying questions:
1. What are you trying to build in one sentence?
2. Who is the first version for?
3. What should this version explicitly not do?

V1 options:
1. Small: define brief + spec only.
2. Medium: define brief + spec + first thin slice proposal.
3. Larger: define brief + spec + proposal + begin implementation after approval.

Recommendation:
- Start with the medium option to lock scope before code.

Stop:
- Waiting for your answers and scope choice before drafting files.
```

### Example 2 - `PROJECT-BRIEF.md` drafting

Prompt pattern:

```text
Use my answers to draft PROJECT-BRIEF.md only. Return the draft in markdown. Do not draft SPEC.md yet. Stop after the draft and ask for approval.
```

Good response shape:

```text
PROJECT-BRIEF draft:
- includes only confirmed facts and clearly labeled assumptions
- preserves out-of-scope items
- ends with explicit open questions

Stop:
- Waiting for approval or corrections before drafting SPEC.md.
```

### Example 3 - `SPEC.md` drafting

Prompt pattern:

```text
Draft SPEC.md from the approved PROJECT-BRIEF.md. Return only the sections that need approval. Do not implement anything.
```

Good response shape:

```text
SPEC draft sections:
1. Product objective
2. Users and workflows
3. Constraints
4. Non-goals
5. Acceptance criteria
6. Risk model
7. Verification reference

Stop:
- Waiting for approval before proposing implementation work.
```

## Repository Discovery for Adopt-Existing Mode

When mode is `adopt-existing`, run a repository discovery pass before intake:

```bash
pnpm intake:scan
```

or to save an artifact:

```bash
pnpm intake:scan -- --write
```

Discovery output should capture:

- inferred stack/runtime/tooling,
- codebase shape and major entrypoints,
- tests/verification posture,
- probable risk areas,
- unknowns requiring human confirmation.

All inferred items must be treated as hypotheses until confirmed by the user.

## Discovery Output Contract

After discovery and intake, produce:

- Completed `PROJECT-BRIEF.md`
- Discovery artifact or equivalent inference summary (required for `adopt-existing` mode)
- Assumptions and unresolved questions list
- Updated `SPEC.md` aligned to the brief
- A proposal for the first non-trivial implementation change
- Outputs that follow the response-contract patterns from `PROMPTING.md`

## Safety Rules

- Do not assume missing answers.
- If user answers are contradictory, surface the conflict and request clarification.
- Keep all decisions documented in `DECISIONS.md` when durable trade-offs are made.
