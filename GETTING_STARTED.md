# GETTING_STARTED

This setup starts from one assumption:

- the repository is already cloned locally.

Installing or acquiring `git` is out of scope for this guide.

## Fast Path

```bash
./bootstrap
```

What this does:

- checks required Node.js and pnpm versions,
- activates pnpm via corepack when safe and available,
- configures repository-local git hooks under `.githooks/`,
- installs dependencies,
- runs canonical verification (`pnpm verify`).

## Onboarding Modes

Tempo supports:

- `greenfield`: new project startup flow.
- `adopt-existing`: apply Tempo governance to a codebase that already has implementation history.
- `auto`: infer mode from repository signals (default bootstrap behavior).

## Template History vs Your Project History

Tempo ships with historical governance records in `TEMPLATE_HISTORY/`.

These are reference artifacts for how the template was built.
They are not active project records.

Active record folders should start clean for new projects:

- `PROPOSALS/` contains only `TEMPLATE.md`
- `REVIEWS/` contains only `TEMPLATE.md`
- `RCA/` contains only `TEMPLATE.md`

## One-Time Project Initialization

If you want a clean baseline for your own project records:

```bash
./bootstrap --init-project --no-verify
```

This resets:

- `PROJECT-BRIEF.md` to unfilled baseline,
- `STATUS.md` to starter baseline,
- `ROADMAP/COMMIT-PLAN.md` to starter next-commit plan.

A backup is created under `.template-init-backup/<timestamp>/` before changes.

Then run:

```bash
pnpm verify
```

## Adopt Tempo in an Existing Repository

From an existing repository root:

```bash
./bootstrap --mode adopt-existing --no-verify
```

Then run repository discovery to generate an intake snapshot:

```bash
pnpm intake:scan -- --write
```

Use the generated discovery findings as hypotheses, and ask only delta questions that code review cannot answer.

## If Bootstrap Reports Missing Tools

Follow the exact install instructions printed by `./bootstrap`, then run `./bootstrap` again.

The bootstrap process is idempotent and safe to rerun.

## Push Safety

Tempo blocks `git push` by default using a local pre-push hook.

Only push when explicitly approved and recorded in `DECISIONS.md`, then run the push command with:

```bash
TEMPO_PUSH_APPROVED=1 git push
```
