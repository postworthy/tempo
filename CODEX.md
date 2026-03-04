# CODEX.md

Canonical operating instructions are in:

1. `AGENTS.md`
2. `BOOTSTRAP.md`

First-run requirement:

- If `PROJECT-BRIEF.md` is unfilled, run intake interview questions from `BOOTSTRAP.md`, then update `PROJECT-BRIEF.md` and `SPEC.md` before non-trivial implementation.

Git non-negotiables:

1. Never commit on `main`; create a feature branch first.
2. Use conventional commits.
3. Include `Roadmap` and `Proposal` trailers in commit body (`Proposal: N/A (T0)` allowed only for approved T0/mechanical changes).
4. No `push`/`publish`/remote changes without explicit approval and `DECISIONS.md` record.
5. Non-trivial merge requires `REVIEWS/YYYY-MM-DD--short-title.md`.
