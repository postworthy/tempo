## Current Milestone

M0 - Foundation and Governance

## Current Next Commit

C021 docs(release): document migration and complete review

## Done (High-Level)

- Added public-template baseline execution layer (`package.json`, TypeScript, ESLint, Prettier, Vitest).
- Added minimal source + test and canonical verification scripts.
- Added clone-and-start documentation (`README.md`, `.env.example`, `LICENSE`).
- Added optional hosted CI workflow that mirrors canonical verification.
- Added mandatory first-run bootstrap and intake workflow (`BOOTSTRAP.md`, `PROJECT-BRIEF.md`, assistant adapters).
- Added docs-consistency verification via `pnpm check:docs` inside canonical verify.
- Added mandatory discovery-first ideation flow with clarifying-question minimums and structured brief sections.
- Added mandatory decomposition-before-development governance for T1/T2/T3 work, including a Definition of Ready gate.
- Added local-first Change Review model with Review Boundary and Review Record requirements.
- Added canonical local toolchain bootstrap (`./bootstrap`) and `GETTING_STARTED.md` for non-technical onboarding.
- Separated template-development history into `TEMPLATE_HISTORY/` while keeping active project record folders clean by default.
- Hardened git governance with mandatory preflight checks, branch naming rules, commit trailer requirements, and local hook enforcement.
- Added dual onboarding support for existing repositories with mode-aware bootstrap and repository intake scanning.

## In Progress

- Executing `ROADMAP/TEMPO-SKILLS-GOALS-MODERNIZATION.md`.
- Implementing approved migration guidance and final publication-readiness review.

## Blockers / Risks

- Portable adoption must not overwrite existing application or governance files.
- Skill and goal evaluations must use clean contexts without committing generated workspaces.

## Recent Changes

- Added a self-contained modernization goal covering skills, living goals, portability, evaluation, and one-command setup.
- Replaced the placeholder brief and malformed specification with the approved Tempo product contract.
- Added Phase 0/1 decomposition and a T1 foundation-repair proposal.
- Separated read-only primary-branch verification from direct-commit enforcement.
- Added structural contract validation and focused governance regression tests.
- Made dependency installation non-interactive and frozen-lockfile based.
- Made project initialization reset and back up both the brief and specification.
- Applied the approved Constitution 2.1 amendment and responsibility map.
- Reduced the always-loaded repository kernel from 238 lines to 113 lines while retaining routed invariants.
- Added the living-goal lifecycle, one-active-goal validator, retry and completion controls, active modernization goal, and negative fixtures.
- Consolidated active execution state into one living goal and recorded the deterministic resumption thin slice.
- Added five focused repo-local Tempo skills with progressive-disclosure references, validation, and trigger cases.
- Added stack-neutral target adoption through `./bootstrap`, with preservation, idempotence, conflict, and no-toolchain fixture coverage.
- Added a seven-scenario evaluation harness with 59 assertions, baseline comparison, clean-state resumption, and a dated human audit.
- Added one-time initialization flow via `./bootstrap --init-project --no-verify` for clean project baselines.
- Added fresh-template checks to prevent inherited dated records from appearing in active governance folders.
- Added `pnpm check:git-policy` and integrated it into canonical verification.
- Added `.githooks` (`pre-commit`, `commit-msg`, `pre-push`) and wired hook setup into `./bootstrap`.
- Added `pnpm intake:scan` discovery tooling and `adopt-existing` onboarding flow guidance.
- Added canonical prompt guidance in `PROMPTING.md` and aligned starter/onboarding docs to explicit output contracts and approval-stop behavior.
- Added lightweight prompt review guidance in `VERIFY.md` and enforcement for `PROMPTING.md` in `pnpm check:docs`.

## Next Planned Changes

- Add migration guidance and draft the Review Record.
- Audit every remaining goal criterion, public command, rollback, safety boundary,
  and generated-artifact exclusion.

## Notes

- Update this file at least once per merged commit sequence.
- Keep entries concise and factual.
- If a failure occurs, include RCA summary and preventive action.
