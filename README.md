# Tempo Template

Use this repository as a starter pack for AI-assisted software projects.

## One Shot

```bash
codex "Please clone and use the tempo vibe coding starter pack via `git clone https://github.com/postworthy/tempo.git` and use it as the basis for my project."
```

## Quick Start (One Command)

```bash
git clone https://github.com/postworthy/tempo.git && cd tempo && codex "Use this repo as my starter pack. Read AGENTS.md and BOOTSTRAP.md, ask me the required intake questions, then draft PROJECT-BRIEF.md and SPEC.md for approval before coding."
```

If you are not using `codex`, replace `codex` with your assistant CLI (`claude`, `opencode`, etc.) and keep the same prompt text.

## What The Agent Does Next

1. Reads `AGENTS.md` and `BOOTSTRAP.md`.
2. Interviews you and fills `PROJECT-BRIEF.md`.
3. Updates `SPEC.md` for your approval.
4. Proposes implementation steps and runs `pnpm verify` before merge.

## Verification

- Canonical gate: `pnpm verify`
- Fast local gate: `pnpm verify:fast`
