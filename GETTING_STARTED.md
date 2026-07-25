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

From the cloned Tempo repository, point the same setup command at the existing
repository and provide its real verification command:

```bash
./bootstrap --mode adopt-existing --target /path/to/existing-repo --verify-command "make verify"
```

This portable path runs before Tempo's Node/pnpm checks and installs only:

- a stack-neutral kernel under `.tempo/`,
- the focused skills under `.agents/skills/`,
- living-goal guidance under `GOALS/`,
- and one marked routing block in `AGENTS.md`.

It records but does not execute the supplied verification command. It does not
add application code, package manifests, dependencies, or a language toolchain.
Existing `AGENTS.md` content is backed up before the first marked append.

Rerun the same command safely; unchanged files remain unchanged and conflicting
files stop with an actionable message instead of being overwritten.

Then ask your agent to read `AGENTS.md` and use `tempo-onboard-project`. Treat
repository findings as hypotheses and answer only product-intent questions the
code cannot resolve.

## If Bootstrap Reports Missing Tools

Follow the exact install instructions printed by `./bootstrap`, then run `./bootstrap` again.

The bootstrap process is idempotent and safe to rerun.

## Push Safety

Tempo blocks `git push` by default using a local pre-push hook.

Only push when explicitly approved and recorded in `DECISIONS.md`, then run the push command with:

```bash
TEMPO_PUSH_APPROVED=1 git push
```
