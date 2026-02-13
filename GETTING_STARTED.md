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
- installs dependencies,
- runs canonical verification (`pnpm verify`).

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

## If Bootstrap Reports Missing Tools

Follow the exact install instructions printed by `./bootstrap`, then run `./bootstrap` again.

The bootstrap process is idempotent and safe to rerun.
