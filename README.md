# Tempo Template

A clone-and-start template for human + AI software collaboration with built-in governance, verification, and CI.

## 5-Minute Quickstart

```bash
git clone <your-fork-or-new-repo-url>
cd tempo
pnpm install
pnpm verify
```

If `pnpm verify` passes, your local setup is ready.

## Governance Model Summary

Governance is document-first and enforced by precedence:

1. `CONSTITUTION.md`
2. `SPEC.md`
3. `VERIFY.md`
4. `DECISIONS.md`
5. `ROADMAP/COMMIT-PLAN.md`
6. `PROPOSALS/*`
7. `RCA/*`
8. `STATUS.md`

Core operating rules:

- Proposal-first for non-trivial work.
- Canonical verification gate is `pnpm verify`.
- Update docs in the same change sequence as behavior changes.
- Perform RCA before repeated fix attempts when a change fails.

## Start Your Own Project From This Template

1. Clone this repository.
2. Rename package metadata in `package.json` (`name`, `description`, optional author fields).
3. Replace `SPEC.md` placeholders with your product objective, workflows, constraints, and acceptance criteria.
4. Update `ROADMAP/COMMIT-PLAN.md` with your next smallest valuable commit.
5. Run `pnpm verify` and confirm green before opening your first PR.

## First Proposal Workflow

Create a proposal before non-trivial implementation:

1. Copy `PROPOSALS/TEMPLATE.md` to `PROPOSALS/YYYY-MM-DD--short-title.md`.
2. Fill in objective, scope, acceptance criteria, verification plan, rollback plan, and risks.
3. Get approval from the human partner/maintainer.
4. Implement only the approved scope.
5. Run `pnpm verify`.
6. Update `STATUS.md`, `DECISIONS.md`, and `ROADMAP/COMMIT-PLAN.md`.

## Verification Commands

- Full gate: `pnpm verify`
- Fast local gate: `pnpm verify:fast`
- Formatting write: `pnpm format`
- Unit tests: `pnpm test`
