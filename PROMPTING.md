# PROMPTING.md - Canonical Prompt Contract

This file defines how Tempo should express instructions so assistants behave more reliably across hosts, model versions, and long conversations.

Use this document for prompt design. Use `AGENTS.md`, `BOOTSTRAP.md`, and `VERIFY.md` for workflow and governance.

## Purpose

Tempo should not rely only on broad process rules. It should also provide prompt-native structure that makes the next response easier to predict and review.

## Instruction Layers

Prefer this order when an assistant host supports message roles:

1. System or platform rules for safety and platform behavior.
2. Developer instructions for stable Tempo rules and workflow constraints.
3. User instructions for project-specific goals and current task details.
4. Repository artifacts for durable project context (`PROJECT-BRIEF.md`, `SPEC.md`, proposals, reviews, RCAs).

Guidelines:

- Put durable Tempo rules in the highest available stable instruction layer.
- Put task-specific requests in the user layer, not mixed into long reusable policy text.
- Treat repository documents as source material to summarize into active instructions when needed.
- If two instructions conflict, follow the highest-priority instruction and state the conflict explicitly.

## Output Contract Pattern

When asking an assistant to do multi-step work, define the response contract explicitly.

Recommended structure:

1. What to do now.
2. What to produce before approval.
3. What must not happen yet.
4. What evidence will prove the step is complete.

Example contract:

```text
Read AGENTS.md and BOOTSTRAP.md first.
Then do only the discovery step.
Return:
1. a plain-language summary of my idea,
2. 3 clarifying questions,
3. 2-3 scoped v1 options with trade-offs,
4. a recommended option.
Do not edit files or start implementation yet.
Stop after that and wait for approval.
```

Use explicit stop conditions such as:

- `Stop after drafting and wait for approval.`
- `Do not write code yet.`
- `Do not run destructive commands.`

## Starter Prompt Pattern

Starter prompts should separate environment/setup intent from assistant behavior.

Guidelines:

- Keep shell commands outside the natural-language instruction when possible.
- Tell the assistant exactly which files to read first.
- Specify the order of outputs expected in the first response.
- State the approval boundary before any coding or file edits.

Preferred starter shape:

```text
Use this repo as my starter pack.
Read AGENTS.md and BOOTSTRAP.md first.
Start in discovery mode.
For your first response, return:
1. a brief summary of what you think I want,
2. 3 clarifying questions,
3. 2-3 v1 scope options with trade-offs,
4. your recommended option.
Do not draft files or implement anything until I approve a direction.
```

## Few-Shot Example Guidance

Use examples only when the task is complex enough that plain instructions still leave room for drift.

Prefer:

- short examples,
- one good pattern per example,
- examples that match repository artifacts,
- examples that show both structure and stopping behavior.

Avoid:

- many near-duplicate examples,
- examples with project-specific assumptions that do not generalize,
- examples that reveal hidden reasoning requirements.

## Scoped Task Updates

When the user changes direction mid-conversation, update scope explicitly instead of relying on inference.

Recommended pattern:

```text
Task update for the next step only:
- Keep all prior safety and approval rules.
- Replace the current goal with: <new goal>
- Reuse existing context only where still relevant.
- Return a revised plan before making edits.
```

Use this when:

- the user narrows or expands scope,
- the repo state changes,
- a prior plan is no longer valid,
- a failed attempt requires a revised approach.

## Grounding and Context

Prefer grounded instructions over assumptions.

Guidelines:

- Reference exact files the assistant should read first.
- Distinguish inferred facts from user-confirmed facts.
- When repository discovery is used, label findings as hypotheses until confirmed.
- For recommendations that affect spending, policy, security, or current APIs, verify against current sources before acting.

## Prompt Review Checks

When changing prompts or prompt-facing docs, review them for:

- clear instruction priority,
- explicit output order,
- explicit stop conditions,
- approval boundary before non-trivial implementation,
- grounded references to repo artifacts,
- minimal ambiguity about tools or shell actions.

## Lightweight Prompt Eval

Prompt changes should include a manual eval pass, even if no automated prompt harness exists yet.

Minimum eval scenarios:

1. Fresh greenfield onboarding request.
2. Adopt-existing onboarding request.
3. Mid-task scope change after discovery.

For each scenario, verify that the prompt:

- produces the requested sections in the requested order,
- does not skip directly to coding,
- asks clarifying questions when the brief is incomplete,
- respects approval boundaries.

Record notable failures in the proposal, review record, or RCA as appropriate.
