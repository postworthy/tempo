# Tempo Template

A clone-and-start template for human + AI software collaboration with built-in governance, onboarding, verification, and CI.

## 5-Minute Quickstart

```bash
git clone <your-fork-or-new-repo-url>
cd tempo
pnpm install
pnpm verify
```

If `pnpm verify` passes, your local setup is ready.

## One Prompt for Any Coding Assistant

Tell your coding assistant exactly this:

```text
Use this repo as my starter pack. Read AGENTS.md and BOOTSTRAP.md, ask me the required intake questions, then draft PROJECT-BRIEF.md and SPEC.md for approval before coding.
```

This is designed to work with assistants like Cursor, Claude Code, Codex, and similar tools.

## Governance Model Summary

Governance is document-first and enforced by precedence:

1. `CONSTITUTION.md`
2. `SPEC.md`
3. `VERIFY.md`
4. `DECISIONS.md`
5. `ROADMAP/COMMIT-PLAN.md`
6. `PROPOSALS/*`
7. `RCA/*`
8. `STATUS.md`

Core operating rules:

- Proposal-first for non-trivial work.
- Canonical verification gate is `pnpm verify`.
- First-run intake is mandatory when `PROJECT-BRIEF.md` is unfilled.
- Update docs in the same change sequence as behavior changes.
- Perform RCA before repeated fix attempts when a change fails.

## First-Run Workflow (Novice-Friendly)

1. Agent reads `AGENTS.md` and `BOOTSTRAP.md`.
2. Agent asks intake questions from `BOOTSTRAP.md`.
3. Agent fills `PROJECT-BRIEF.md`.
4. Agent updates `SPEC.md` from the brief.
5. You approve scope.
6. Agent creates proposal and starts implementation.

## Start Your Own Project From This Template

1. Clone this repository.
2. Use the one-prompt text above with your coding assistant.
3. Review and approve `PROJECT-BRIEF.md` and `SPEC.md`.
4. Confirm the next commit in `ROADMAP/COMMIT-PLAN.md`.
5. Run `pnpm verify` and confirm green before implementation PRs.

## Verification Commands

- Full gate: `pnpm verify`
- Fast local gate: `pnpm verify:fast`
- Docs consistency: `pnpm check:docs`
- Formatting write: `pnpm format`
- Unit tests: `pnpm test`
