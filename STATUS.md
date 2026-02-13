## Current Milestone

M0 - Foundation and Governance

## Current Next Commit

docs(spec): write first project-specific spec from template

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

## In Progress

- Drafting project-specific `SPEC.md` content from template placeholders.

## Blockers / Risks

- `SPEC.md` still contains placeholders and must be completed before non-trivial product implementation.

## Recent Changes

- Proposal created: `PROPOSALS/2026-02-13--bootstrap-toolchain-provisioning.md`.
- Bootstrap policy now requires a repo-already-cloned setup path with explicit non-git scope.

## Next Planned Changes

- Finalize `SPEC.md` v1 for a concrete product objective and acceptance criteria.
- Add first thin vertical slice implementation from approved proposal.

## Notes

- Update this file at least once per merged commit sequence.
- Keep entries concise and factual.
- If a failure occurs, include RCA summary and preventive action.
