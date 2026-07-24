# Proposal: Add the Focused Tempo Skill Bundle

Date: 2026-07-24
Owner: Codex
Risk Class: T1
Related Issue/Context: active modernization goal
Roadmap Item: C018
Planned Branch: `docs/c012-tempo-modernization-goal`
Expected Commit Count: 3

## Objective

Ship five focused, repo-local, open-format Agent Skills that expose Tempo's
onboarding, goal planning, goal execution, change review, and RCA workflows
through progressive disclosure and precise trigger metadata.

## Concrete Usage Examples

- “Help me use Tempo to turn my rough app idea into an approved project brief.”
  → `tempo-onboard-project`
- “Turn this approved feature outcome into a resumable living goal.”
  → `tempo-plan-goal`
- “Continue the active Tempo goal until it is complete or reaches a real approval
  boundary.” → `tempo-execute-goal`
- “Review this feature branch against its proposal, evidence, and rollback plan.”
  → `tempo-review-change`
- “The fix still fails; reproduce it and write an RCA before trying again.”
  → `tempo-perform-rca`

Unrelated requests such as explaining a language feature, formatting prose, or
editing an image must not trigger any Tempo skill.

## Scope

In scope:

- Initialize all skills with the current bundled `skill-creator` workflow.
- Store skills under `.agents/skills/<skill-name>/`.
- Use only `name` and `description` in canonical `SKILL.md` frontmatter.
- Generate optional `agents/openai.yaml` interface metadata.
- Keep each skill focused and concise; move conditional checklists into
  one-level-deep references only when they reduce body load.
- Add deterministic validation for metadata, naming, reference resolution,
  body-size limits, and required bundle membership.
- Add positive, ambiguous, and negative trigger cases.
- Add focused tests for invalid metadata and broken references.

Out of scope:

- Installing skills into a user's global skill directory.
- Publishing a Codex plugin or marketplace entry.
- Duplicating Tempo's complete governance manual inside each skill.
- Stack-neutral repository installation; that remains C019.
- LLM-judged comparative evaluations; those remain C020.

## Expected Files Touched

- `.agents/skills/tempo-onboard-project/*`
- `.agents/skills/tempo-plan-goal/*`
- `.agents/skills/tempo-execute-goal/*`
- `.agents/skills/tempo-review-change/*`
- `.agents/skills/tempo-perform-rca/*`
- `EVALS/skill-trigger-cases.json`
- `scripts/validate-skills.mjs`
- `scripts/validate-skills.d.mts`
- `scripts/check-docs.mjs`
- `package.json`
- `test/governance.test.ts`
- `VERIFY.md`
- `STATUS.md`
- `DECISIONS.md`
- `ROADMAP/COMMIT-PLAN.md`
- active goal

## Acceptance Criteria

- [ ] All five required skill directories and `SKILL.md` files exist.
- [ ] Every skill passes the current bundled `quick_validate.py`.
- [ ] Repository validation enforces required names, canonical frontmatter,
      description quality, body-size limits, and resolved local references.
- [ ] Skill bodies are under 500 lines and contain only task-essential procedure.
- [ ] Conditional detail is at most one reference hop from `SKILL.md`.
- [ ] `agents/openai.yaml` metadata matches each skill and names it in the default
      prompt.
- [ ] Positive, ambiguous, and unrelated trigger cases exist for every skill.
- [ ] Focused tests reject invalid frontmatter and broken references.
- [ ] `pnpm verify` passes.

## Verification Plan

Commands:

```bash
python3 /home/landon/.codex/skills/.system/skill-creator/scripts/quick_validate.py .agents/skills/<skill>
pnpm check:skills
pnpm test
pnpm verify
```

Pass means:

- All five upstream validations exit 0.
- Repository validation prints all five skill names and no problems.
- Negative fixtures fail for the expected reason.
- Canonical verification exits 0.

## Change Review Plan

- Review Boundary: merge from `docs/c012-tempo-modernization-goal` into `main`
- Planned Review Record: `REVIEWS/2026-07-24--tempo-skills-goals-modernization.md`
- Reviewer/approver expectation: confirm trigger precision, progressive
  disclosure, reference integrity, safety-boundary preservation, and rollback.

## Git Plan

- Existing branch: `docs/c012-tempo-modernization-goal`
- Planned commits:
  - `docs(skills): approve focused skill bundle`
  - `feat(skills): add focused Tempo workflows`
  - `test(skills): enforce structure and trigger cases`
- Required trailers:
  - `Roadmap: ROADMAP/COMMIT-PLAN.md#C018`
  - `Proposal: PROPOSALS/2026-07-24--focused-tempo-skills.md`
- Planned merge method: `git merge --no-ff docs/c012-tempo-modernization-goal`

## Decomposition Plan

1. Record concrete trigger examples and initialize five skill skeletons — Verify
   by: directory inventory and upstream quick validation — Exit criteria: each
   skill has valid generated structure and no placeholder examples — Risk: T1 —
   Dependencies: active goal and current `skill-creator`.
2. Write focused workflows and one-level references — Verify by: line counts,
   link resolution, interface metadata review, and scenario walkthrough — Exit
   criteria: every workflow is self-contained without duplicating global policy —
   Risk: T1 — Dependencies: unit 1.
3. Add repository validator and negative fixtures — Verify by: focused tests and
   `pnpm check:skills` — Exit criteria: malformed metadata, unexpected skills,
   missing references, and oversized bodies fail deterministically — Risk: T1 —
   Dependencies: units 1–2.
4. Add trigger cases and complete evidence — Verify by: deterministic case
   schema, manual trigger audit, upstream validators, and `pnpm verify` — Exit
   criteria: C018 is review-ready and C019 is the exact next action — Risk: T1 —
   Dependencies: all prior units.

Thin slice milestone:

- One initialized and validated onboarding skill demonstrates the canonical
  layout before the remaining focused skills are filled.

Dependencies and unknowns:

- Cross-host discovery may differ; open `SKILL.md` is canonical and
  `agents/openai.yaml` remains optional host metadata.
- Forward-testing with independent subagents is unavailable under the current
  no-subagent instruction, so C018 uses deterministic and manual trigger cases;
  Phase 6 retains the clean-context behavioral evaluation.

Intentional deferrals:

- Global installation, plugin packaging, stack-neutral adoption, comparative
  agent evaluation, and external publication.

## Rollback Plan

1. Revert the skill test/enforcement commit.
2. Revert the skill content commit.
3. Remove skill routing references only after the directories are reverted.
4. Run `pnpm verify` and confirm the pre-skill goal workflow remains usable.

## Risks and Mitigations

- Risk: broad descriptions cause false triggering.
  Mitigation: keep workflow nouns and request contexts specific; maintain
  unrelated and ambiguous cases.
- Risk: skills duplicate and drift from constitutional policy.
  Mitigation: reference authoritative repository artifacts and keep safety
  boundaries in the kernel rather than copying the manual.
- Risk: host metadata becomes the canonical contract.
  Mitigation: validate `SKILL.md` independently and treat `agents/openai.yaml` as
  optional interface metadata.
- Risk: references hide essential steps or become deep chains.
  Mitigation: keep the core loop in `SKILL.md` and permit only direct reference
  links.

## Compatibility / Migration Notes

- Application API impact: none.
- Existing agent hosts that ignore skills continue using `AGENTS.md` routing.
- Hosts supporting repo-local skills can progressively load the new workflows.
- No global directories or external registries are changed.

## Observability / Debug Notes

- Validation failures must name the skill and exact metadata, line, or reference
  problem.
- `pnpm check:skills` must print the validated required bundle.

## Approval

- Requested from: Human Partner
- Approval status: approved through the original `/goal` directive and active
  goal Authority Envelope for scoped, reversible T1 work
- Approved at: 2026-07-24
