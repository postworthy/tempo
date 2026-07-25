# Proposal: Add Portable Tempo Adoption

Date: 2026-07-24
Owner: Codex
Risk Class: T1
Related Issue/Context: active modernization goal
Roadmap Item: C019
Planned Branch: `docs/c012-tempo-modernization-goal`
Expected Commit Count: 3

## Objective

Keep `./bootstrap` as Tempo's one public setup command while adding an
idempotent, stack-neutral adopt-existing mode that installs only Tempo's portable
kernel, living-goal contracts, and focused skills into a target repository
without imposing Node, pnpm, TypeScript, starter source, or dependency manifests.

## Scope

In scope:

- Add `./bootstrap --mode adopt-existing --target <path> --verify-command
<command>`.
- Route target adoption before Node/pnpm checks.
- Add a pure-shell portable installer and stack-neutral kernel templates.
- Install Tempo under `.tempo/`, repo-local skills under `.agents/skills/`, and
  living-goal templates under `GOALS/`.
- Create or append a bounded Tempo routing block in target `AGENTS.md`, backing
  up a pre-existing file before the first mutation.
- Refuse to overwrite conflicting installed files.
- Record an installation manifest and make repeated setup a no-op.
- Add isolated greenfield-repeat and non-Node adopt-existing tests.
- Update public setup and migration documentation.

Out of scope:

- Automatically rewriting a target's product specification or verification
  command.
- Installing Node, pnpm, TypeScript, application source, or dependencies into an
  adopted repository.
- Removing or uninstalling a prior Tempo installation.
- Merging arbitrary existing governance policies automatically.
- Remote clone, push, publication, plugin installation, or external registry
  actions.

## Expected Files Touched

- `bootstrap`
- `scripts/install-portable.sh`
- `portable/KERNEL.md`
- `portable/VERIFY.md`
- `portable/README.md`
- `.agents/skills/*/SKILL.md`
- `test/portable-adoption.test.ts`
- `README.md`
- `GETTING_STARTED.md`
- `BOOTSTRAP.md`
- `VERIFY.md`
- `scripts/check-docs.mjs`
- `STATUS.md`
- `DECISIONS.md`
- `ROADMAP/COMMIT-PLAN.md`
- active goal

## Acceptance Criteria

- [ ] `./bootstrap` remains the one primary public setup command.
- [ ] Default/greenfield bootstrap retains the pinned TypeScript profile.
- [ ] Target adoption runs before any Node/pnpm requirement.
- [ ] A non-Node fixture receives no `package.json`, lockfile, `src/`, `test/`,
      Node dependency directory, or starter application files.
- [ ] The target receives a stack-neutral kernel, verification contract, focused
      skills, living-goal template, and installation manifest.
- [ ] A pre-existing `AGENTS.md` is backed up and receives exactly one bounded
      routing block without losing original content.
- [ ] Conflicting destination files fail with an actionable message rather than
      being overwritten.
- [ ] Repeated target adoption succeeds without duplicate routing or changed
      output.
- [ ] Repeated greenfield bootstrap succeeds non-interactively.
- [ ] Public README and `GETTING_STARTED.md` agree on the primary command and
      adopt-existing variant.
- [ ] Canonical verification passes.

## Verification Plan

Commands:

```bash
pnpm test
./bootstrap --mode greenfield --no-verify
./bootstrap --mode greenfield --no-verify
pnpm verify
```

Focused tests create an isolated repository containing non-Node application
files and a pre-existing `AGENTS.md`, run target adoption twice, and assert:

- original files remain byte-for-byte present,
- one routing marker exists,
- backup and manifest exist,
- portable files and five skills exist,
- starter-stack files do not appear,
- a deliberate conflicting file causes a nonzero actionable failure.

Pass means:

- All isolated assertions pass.
- Both greenfield runs complete without prompts.
- Full canonical verification exits 0.

## Change Review Plan

- Review Boundary: merge from `docs/c012-tempo-modernization-goal` into `main`
- Planned Review Record: `REVIEWS/2026-07-24--tempo-skills-goals-modernization.md`
- Reviewer/approver expectation: confirm file preservation, idempotence,
  stack-neutrality, command clarity, rollback, and no external mutation.

## Git Plan

- Existing branch: `docs/c012-tempo-modernization-goal`
- Planned commits:
  - `docs(bootstrap): approve portable adoption`
  - `feat(bootstrap): add stack-neutral target install`
  - `test(bootstrap): verify portable and repeated setup`
- Required trailers:
  - `Roadmap: ROADMAP/COMMIT-PLAN.md#C019`
  - `Proposal: PROPOSALS/2026-07-24--portable-tempo-adoption.md`
- Planned merge method: `git merge --no-ff docs/c012-tempo-modernization-goal`

## Decomposition Plan

1. Define portable file ownership, collision behavior, and CLI contract — Verify
   by: proposal and template review — Exit criteria: no target application-stack
   mutation is implicit — Risk: T1 — Dependencies: C018.
2. Add pure-shell installer and bootstrap routing — Verify by: shell syntax,
   isolated empty/non-Node target, and manifest inspection — Exit criteria:
   target adoption completes without invoking Node or pnpm — Risk: T1 —
   Dependencies: unit 1.
3. Add idempotence, preservation, collision, and stack-neutral tests — Verify by:
   focused Vitest suite — Exit criteria: positive and negative fixture behavior
   is deterministic — Risk: T1 — Dependencies: unit 2.
4. Exercise greenfield twice and align public docs — Verify by: two bootstrap
   runs, README/guide audit, and `pnpm verify` — Exit criteria: C019 is
   review-ready and C020 is the exact next action — Risk: T1 — Dependencies:
   units 2–3.

Thin slice milestone:

- A non-Node target with no prior Tempo files receives `.tempo/KERNEL.md`, the
  skill bundle, and one AGENTS routing block without running Node.

Dependencies and unknowns:

- Target repositories may already own `AGENTS.md`; append-with-backup is the only
  automatic merge and uses explicit marker boundaries.
- Target verification commands are repository-specific and therefore supplied
  by the user rather than guessed.
- Shell availability is already required by the canonical `./bootstrap`
  boundary.

Intentional deferrals:

- Automated uninstall, host-global skill installation, plugin packaging, and
  remote repository acquisition.

## Rollback Plan

1. Use `.tempo/install-manifest.txt` to identify files Tempo created.
2. Restore `.tempo/backups/AGENTS.md.before-tempo` when it exists.
3. Remove only files listed in the manifest after explicit destructive-action
   approval; do not remove pre-existing directories wholesale.
4. Run the target's recorded verification command.
5. Revert C019 commits in the Tempo source repository if installer behavior
   itself regresses.

## Risks and Mitigations

- Risk: adoption overwrites user files.
  Mitigation: compare before copy, fail on conflicts, and back up `AGENTS.md`
  before the only append.
- Risk: shell command injection through the verification command.
  Mitigation: store and display the user-provided command; do not evaluate it
  during installation.
- Risk: portable skills call pnpm-specific helpers.
  Mitigation: describe default-profile commands as examples and require the
  repository's available validator in portable contexts.
- Risk: “one command” becomes several incompatible entry points.
  Mitigation: retain `./bootstrap` and express target adoption only as flags on
  that command.

## Compatibility / Migration Notes

- Default greenfield behavior remains backward compatible.
- Existing `./bootstrap --mode adopt-existing` without `--target` retains local
  template-maintainer behavior during the transition.
- Target adoption creates only new `.tempo/`, `.agents/skills/`, and `GOALS/`
  content plus a marked `AGENTS.md` block.

## Observability / Debug Notes

- Installer output must label every created, unchanged, backed-up, or conflicting
  path.
- The final message must print the recorded verification command and one
  plain-language next action.

## Approval

- Requested from: Human Partner
- Approval status: approved through the original `/goal` directive and active
  goal Authority Envelope for scoped, reversible T1 work
- Approved at: 2026-07-24
