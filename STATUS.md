## Current Milestone

M0 - Foundation and Governance

## Current Next Commit

docs(spec): write first project-specific spec from template

## Done (High-Level)

- Added public-template baseline execution layer (`package.json`, TypeScript, ESLint, Prettier, Vitest).
- Added minimal source + test and canonical verification scripts.
- Added clone-and-start documentation (`README.md`, `.env.example`, `LICENSE`).
- Added CI verification workflow running `pnpm verify` on PRs and pushes to `main`.
- Added mandatory first-run bootstrap and intake workflow (`BOOTSTRAP.md`, `PROJECT-BRIEF.md`, assistant adapters).
- Added docs-consistency verification via `pnpm check:docs` inside canonical verify.

## In Progress

- Drafting project-specific `SPEC.md` content from template placeholders.

## Blockers / Risks

- `SPEC.md` still contains placeholders and must be completed before non-trivial product implementation.

## Recent Changes

- Proposal created: `PROPOSALS/2026-02-12--novice-agent-bootstrap.md`.
- First-run onboarding protocol made explicit across governance docs and README.

## Next Planned Changes

- Finalize `SPEC.md` v1 for a concrete product objective and acceptance criteria.
- Add first thin vertical slice implementation from approved proposal.

## Notes

- Update this file at least once per merged commit sequence.
- Keep entries concise and factual.
- If a failure occurs, include RCA summary and preventive action.
