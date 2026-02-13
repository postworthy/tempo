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

## If You Need Setup Without Full Verify

```bash
./bootstrap --no-verify
```

Then run:

```bash
pnpm verify
```

## If Bootstrap Reports Missing Tools

Follow the exact install instructions printed by `./bootstrap`, then run `./bootstrap` again.

The bootstrap process is idempotent and safe to rerun.
