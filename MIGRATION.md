# Migrating to Skills-and-Goals Tempo

This guide moves an older Tempo workflow or an existing repository to the
skills-and-goals foundation without discarding product intent, history, or the
application stack.

## Choose the Path

### Start a new batteries-included project

After cloning Tempo:

```bash
./bootstrap --init-project
```

Then tell your agent what you want to build and ask it to follow `AGENTS.md`.
Tempo retains the pinned TypeScript starter, local hooks, validation, skills, and
living-goal tooling. Explicit initialization backs up Tempo's own active
development decisions, plans, records, and release evidence under
`.template-init-backup/`, preserves `TEMPLATE_HISTORY/`, and leaves neutral
project contracts plus reusable Tempo capabilities.

Tempo contributors working on the template itself use plain `./bootstrap`,
which defaults to the greenfield profile and verifies without initializing
project records.

### Add Tempo to an existing repository

From the cloned Tempo source:

```bash
./bootstrap --mode adopt-existing --target /path/to/existing-repo --verify-command "make verify"
```

Replace `make verify` with the target's real command. If you do not know it, ask
the repository's coding assistant to identify the existing verification command;
do not guess.

This path installs only the portable kernel, contracts, living-goal guidance,
and focused skills. It does not add Node, pnpm, TypeScript, dependencies, or
starter application files.

## Upgrade an Older Tempo Clone

1. Create a compliant feature branch and inspect `git status --short`.
2. Preserve local product contracts and active records. Do not replace a
   project-specific `SPEC.md`, decisions, proposals, reviews, or RCA history with
   template copies.
3. Bring in the modernization changes through the repository's approved local
   git workflow.
4. Run:

   ```bash
   ./bootstrap --no-verify
   ```

5. Move only current execution state into one living goal under `GOALS/`.
6. Keep historical proposals, roadmap entries, reviews, and RCAs in place.
7. Run:

   ```bash
   pnpm verify
   ```

8. Review the migration on the feature branch before the local Review Boundary.

Tempo does not add remotes, fetch, merge, push, or publish as part of setup.

Do not run `--init-project` over an established project merely to upgrade Tempo:
it intentionally resets project-owned contracts and decisions. It is the
source-clone-to-new-project boundary, not an in-place upgrade command.

## State Ownership Changes

| Old pattern                                      | Current owner                                               |
| ------------------------------------------------ | ----------------------------------------------------------- |
| Full procedure always loaded from `AGENTS.md`    | concise kernel plus focused `.agents/skills/`               |
| Current work repeated in roadmap/status/proposal | one active `GOALS/*`                                        |
| Host conversation as the only loop state         | repository living goal; host state is an adapter            |
| Prose-only structural checks                     | contract, goal, skill, git, test, and evaluation commands   |
| Starter stack required for adoption              | `.tempo/` portable profile with target verification command |

`STATUS.md` remains a concise human summary. It must not override the active
goal. `DECISIONS.md`, proposals, reviews, and RCAs retain durable historical
ownership.

## Behavioral Changes to Expect

- `pnpm verify` may run on clean `main`; direct commits to `main` remain blocked
  by hooks and active-development preflight.
- `AGENTS.md` routes conditional workflows instead of embedding the complete
  operating manual.
- Skills may trigger implicitly on compatible hosts or explicitly by name.
- Living-goal completion requires criterion-level evidence and no remaining
  required work.
- Reversible approved T0/T1 work may continue without repeated confirmation;
  high-impact boundaries still pause.
- Target adoption rejects managed-path symlinks and preflights conflicts before
  mutation rather than overwriting or partially installing files.

## Compatibility Notes

- Existing TypeScript starter projects remain supported.
- The batteries-included profile requires Node.js 20.19 or later.
- Non-Node repositories use the portable profile and their own verification
  command.
- Hosts that ignore skills can still follow the repository kernel and source
  artifacts.
- Host-specific `agents/openai.yaml` is optional; `SKILL.md` is canonical.
- Historical template-development records remain under `TEMPLATE_HISTORY/`.

## Rollback

### After project initialization

Restore the affected paths from the single timestamped directory under
`.template-init-backup/`, then run `pnpm verify`. The backup contains every
reset original and every archived Tempo-development artifact.

### Before a local merge

Abandon the feature branch or revert individual atomic commits. The primary
branch remains unchanged.

### After a future merge

Revert the no-fast-forward modernization merge as one reviewed change, or revert
the independently scoped goal, skill, portable, and evaluation commits.

### In a portable target

1. Obtain explicit approval before removing files.
2. Inspect `.tempo/install-manifest.txt`.
3. Restore `.tempo/backups/AGENTS.md.before-tempo` when present.
4. Remove only Tempo-created paths named by the manifest.
5. Run the target command recorded in `.tempo/VERIFY_COMMAND`.

Never remove `.agents/`, `GOALS/`, or another broad directory wholesale without
confirming that Tempo created every contained file.
