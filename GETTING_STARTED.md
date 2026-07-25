# GETTING_STARTED

This setup starts from one assumption:

- the repository is already cloned locally.

Installing or acquiring `git` is out of scope for this guide.

## Fast Path

For a new project created from Tempo:

```bash
./bootstrap --init-project
```

What this does:

- backs up Tempo's inherited project records and creates a clean project
  baseline,
- checks required Node.js and pnpm versions,
- activates pnpm via corepack when safe and available,
- configures repository-local git hooks under `.githooks/`,
- installs dependencies,
- runs canonical verification (`pnpm verify`).

## Onboarding Modes

Tempo supports:

- `greenfield`: new project startup flow.
- `adopt-existing`: apply Tempo governance to a codebase that already has implementation history.
- `auto`: infer mode from repository signals when explicitly requested.

The cloned Tempo starter defaults to `greenfield`.

## Template History vs Your Project History

Tempo ships with historical governance records in `TEMPLATE_HISTORY/`.

These are reference artifacts for how the template was built.
They are not active project records.

Active record folders should start clean for new projects:

- `PROPOSALS/` contains only `TEMPLATE.md`
- `REVIEWS/` contains only `TEMPLATE.md`
- `RCA/` contains only `TEMPLATE.md`

## One-Time Project Initialization

The fast path above performs this initialization. To run it explicitly in an
existing Tempo clone:

```bash
./bootstrap --init-project --no-verify
```

This resets:

- `PROJECT-BRIEF.md` to unfilled baseline,
- `SPEC.md` to a project-ready draft,
- `STATUS.md` to starter baseline,
- `DECISIONS.md` to an empty project decision log,
- `ROADMAP/COMMIT-PLAN.md` to starter next-commit plan,
- active proposals, reviews, RCA records, and completed goals to template-only
  folders,
- Tempo-specific roadmap documents, dated evaluation reports, discovery
  inventory, and clean-release evidence into the backup.

`INITIALIZATION-POLICY.json` is the machine-readable source of truth for reset,
archive, retain, and preserve behavior. Reusable skills, validators, evaluation
cases, starter tooling, and `TEMPLATE_HISTORY/` remain unchanged.

A recoverable local backup is created under
`.template-init-backup/<timestamp>/` before changes. The backup directory is
ignored by git.

Then run:

```bash
pnpm verify
```

Canonical verification includes `pnpm check:initialized`, which rejects
residual Tempo-development state whenever `PROJECT-BRIEF.md` is unfilled.

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

For older Tempo clones and rollback guidance, see `MIGRATION.md`.

## Push Safety

Tempo blocks `git push` by default using a local pre-push hook.

Only push when explicitly approved and recorded in `DECISIONS.md`, then run the push command with:

```bash
TEMPO_PUSH_APPROVED=1 git push
```
