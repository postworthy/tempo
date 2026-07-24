# Goal: Modernize Tempo for Skills and Long-Running Goals

Status: Ready for execution
Created: 2026-07-24
Risk class: T1 overall; reclassify individual work units to T2 or T3 when required
Execution mode: Long-running, incremental, evidence-driven

## Goal Invocation

Start this goal from the Tempo repository root with:

```text
/goal Execute ROADMAP/TEMPO-SKILLS-GOALS-MODERNIZATION.md to completion. Treat the document as the objective, constraints, execution contract, and definition of done. Keep its Progress, Discoveries, Decisions, and Outcomes sections current as work proceeds. Continue automatically through in-scope reversible work, and pause only at an explicit approval boundary or genuine blocker defined in the document.
```

Invoking this goal authorizes the in-scope, non-destructive repository work described here. It does not authorize publishing, pushing, adding or changing git remotes, production changes, secret access, destructive operations, or scope expansion.

## Outcome

Modernize Tempo into a portable, batteries-included system for reliable human-and-agent software delivery.

When this goal is complete:

1. A non-engineer can still obtain Tempo from its public GitHub repository and use one documented command to bootstrap a working local project.
2. Tempo provides concise repository guidance, progressively disclosed Agent Skills, and a resumable goal-execution loop.
3. Agents can continue approved, reversible work without stopping after every small unit, while meaningful approval and safety boundaries remain enforced.
4. Tempo works as both:
   - an opinionated starter repository with a useful default toolchain, and
   - a portable governance and workflow system that can be adopted by repositories using other stacks.
5. Tempo's claims are supported by executable validation and realistic skill and workflow evaluations.

The intended public experience must remain simple. A user should not need to understand skills, agent harnesses, git policy, Node.js, or software governance before starting. Tempo should expose one obvious setup command and explain any unavoidable prerequisite in plain language.

## Why This Matters

Tempo was designed when agentic coding was primarily a sequence of CLI prompts. Its foundations correctly emphasize discovery, specifications, small changes, verification, reversibility, and RCA. Current agent systems add two important capabilities:

- Agent Skills package reusable procedures and load detailed context only when relevant.
- Persistent goals support longer autonomous loops that act, observe, evaluate, checkpoint, and continue across many steps.

Tempo currently expresses most of its operating system as a large always-read document stack. It also distributes active state across roadmap, status, proposal, decision, review, and RCA documents. This creates context cost, duplicated state, and approval friction that can interrupt long-running goals.

This goal preserves Tempo's engineering values while updating how those values are delivered.

## Governing Sources

Before implementation, read the repository's active governing documents in the order required by `AGENTS.md`.

Refresh external guidance at execution time because agent products and skill standards evolve. Use primary sources only. At minimum, verify current guidance for:

- the open Agent Skills specification and skill-creation best practices,
- Codex skills, plugins, `AGENTS.md`, long-running goals, and execution plans,
- long-running agent harnesses, incremental progress, structured handoffs, environmental feedback, and evaluator loops.

Record material changes from the assumptions in this goal under Discoveries. Do not weaken repository safety rules based solely on vendor examples.

## Current-State Evidence

The starting repository has these known characteristics:

- `AGENTS.md` requires a large set of documents to be read before edits.
- `CONSTITUTION.md` contains both durable policy and detailed operating procedures.
- The same workflow requirements appear in several documents.
- `SPEC.md` is unfinished and contains malformed Markdown fencing.
- `scripts/check-docs.mjs` primarily validates file and string presence rather than document structure or semantic agreement.
- `./bootstrap` runs `pnpm verify`.
- `pnpm verify` includes `pnpm check:git-policy`.
- `pnpm check:git-policy` rejects a clean local `main` branch, so the documented fresh-clone bootstrap path can fail before a user edits anything.
- Governance is tightly coupled to a Node.js and pnpm starter baseline.
- Tempo has no canonical active-goal artifact that alone explains current progress, evidence, blockers, and the next action.
- Tempo does not yet ship an Agent Skill or a skills bundle.

Reproduce these claims before changing them. If a claim is no longer true, record the evidence and adjust the relevant work unit without expanding the goal.

## Product Principles

Use these principles to resolve implementation choices:

1. Preserve the novice experience.
   - Ask users for outcomes and constraints in plain language.
   - Hide process machinery unless it helps the immediate decision.
   - Provide a strong default instead of a menu of equivalent choices.

2. Keep durable policy small.
   - Put only always-applicable repository rules in `AGENTS.md`.
   - Put reusable procedures in skills.
   - Put detailed or conditional knowledge in skill references.
   - Enforce deterministic rules with scripts, hooks, tests, and host permissions.

3. Separate method from state.
   - Skills define how recurring work is performed.
   - A goal defines one concrete desired outcome.
   - A living execution artifact records resumable state.
   - Git and verification evidence ground claims about progress.

4. Prefer outcomes over ceremony.
   - Every required artifact must help scope, execution, recovery, or review.
   - Avoid maintaining the same fact manually in several documents.
   - Generate summaries from canonical state when practical.

5. Grant bounded autonomy.
   - Once a human approves an objective, constraints, acceptance criteria, and risk envelope, continue through reversible in-scope T0 and T1 work.
   - Pause when authority, safety, or product intent genuinely requires a human decision.

6. Keep the harness adaptable.
   - Add scaffolding only where evaluations show that it improves outcomes.
   - Re-evaluate load-bearing workflow rules as agent capabilities change.

7. Preserve portability.
   - Use the open Agent Skills format for reusable workflows.
   - Keep host-specific metadata and adapters thin.
   - Do not make the governance kernel depend on the starter application's language or package manager.

## Target Architecture

Implement and document these conceptual layers. Exact paths may change through an approved decision, but responsibilities must remain distinct.

### Repository kernel

Keep a concise root `AGENTS.md` containing:

- instruction precedence,
- repository-specific build and verification routing,
- critical safety and destructive-action boundaries,
- git preflight and dirty-worktree handling,
- the definition of done,
- routing to the active goal and relevant skills.

Target no more than 120 lines unless evaluation evidence justifies more. Remove the requirement to read every governance document for every task.

### Stable product contract

Use `PROJECT-BRIEF.md` and `SPEC.md` for durable product intent, users, constraints, safety boundaries, non-goals, and observable acceptance.

Complete Tempo's own product brief and specification before behavior-changing modernization work. Ensure the public starter can later reset or generate project-specific versions without confusing template intent with the user's project intent.

### Living goal state

Add a canonical execution-plan template and documented location for active goals. A fresh agent must be able to resume from the active goal artifact plus the repository without needing the prior chat.

Each active goal must include:

- outcome,
- constraints and authority envelope,
- observable acceptance criteria,
- risk classification,
- ordered work units or current milestone,
- progress with timestamps,
- discoveries with evidence,
- decision log,
- verification evidence,
- blockers and the exact input needed,
- next action,
- rollback or recovery guidance,
- outcomes and retrospective.

Avoid duplicating active state across `STATUS.md`, `ROADMAP/COMMIT-PLAN.md`, proposals, and the execution artifact. Choose and document one source of truth; make other views summaries, indexes, historical records, or generated outputs.

### Skills bundle

Ship focused, open-format Agent Skills. Start with this bundle unless execution evidence supports a smaller coherent split:

- `tempo-onboard`: discover greenfield intent or adopt an existing repository; produce an approved brief and specification.
- `tempo-plan-goal`: turn an approved outcome into a self-contained living execution plan with measurable completion criteria.
- `tempo-run-goal`: orient, select the next valuable unmet criterion, implement, verify, checkpoint, and continue.
- `tempo-review`: evaluate scope alignment, evidence, risk, rollback readiness, and merge readiness.
- `tempo-rca`: reproduce a reported failure, establish root cause with evidence, and define corrective and preventive action before another fix.

Each skill must:

- use valid `SKILL.md` frontmatter,
- describe both what it does and when it should activate,
- contain only core procedures needed on every invocation,
- use one-level-deep `references/` for conditional detail,
- use tested scripts for deterministic or repeatedly reimplemented operations,
- stay under 500 lines and preferably under 5,000 tokens,
- avoid duplicating repository policy,
- define stop conditions and expected outputs,
- be validated with the current reference validator,
- be evaluated in clean contexts against realistic prompts.

Keep OpenAI-specific `agents/openai.yaml` or plugin metadata optional and additive. The primary skill content must remain usable by compatible Agent Skills hosts.

### Deterministic enforcement

Keep prose for judgment and use executable controls for facts that can be checked.

At minimum, validate:

- Markdown structure and required headings,
- placeholders in active project contracts,
- agreement about canonical setup and verification commands,
- valid skill structure and references,
- branch and commit policy at the operation where it matters,
- clean-tree and protected-branch behavior,
- absence of secrets, caches, generated evaluation workspaces, and local logs from commits.

Verification of a clean repository must succeed on `main`. Mutation and commit protections must still prevent direct development on `main`.

### Bootstrap and distribution

Preserve `./bootstrap` as the canonical in-repository setup command unless a proposal demonstrates a safer equally simple replacement.

The published README must show one primary public setup command that:

- starts from a repository already obtained locally, or obtains it as part of the same shell command,
- configures Tempo's repository-local guidance and skills,
- checks prerequisites,
- installs only what the selected starter profile requires,
- runs validation that can pass on a clean primary branch,
- ends with a clear next prompt or goal invocation.

Also support adoption into an existing repository without forcing the TypeScript starter stack into that project. The default GitHub template may remain batteries-included with Node.js, pnpm, TypeScript, ESLint, Prettier, and Vitest, but Tempo governance and skills must be separable from that profile.

Do not add a git remote, push, publish, or change external repository state while executing this goal.

## Goal Execution Loop

Implement the following loop in the active-goal guidance and `tempo-run-goal` skill:

1. Orient.
   - Read the active goal.
   - Inspect the working tree and recent relevant history.
   - Run the cheapest meaningful health or smoke check.

2. Select.
   - Choose the smallest valuable unmet acceptance criterion or recovery action.
   - Prefer completing one coherent slice over partially touching several.

3. Check authority and risk.
   - Confirm the action is reversible and inside the approved envelope.
   - Reclassify risk when new evidence warrants it.

4. Act.
   - Make the smallest coherent implementation.
   - Preserve unrelated user work.

5. Observe.
   - Run tools, tests, or direct product exercises that provide environmental ground truth.

6. Evaluate.
   - Compare evidence with the work-unit exit criteria and overall goal criteria.
   - Do not mark work complete based only on code presence or agent confidence.

7. Repair.
   - Fix in-scope failures and repeat verification.
   - If the same blocker persists across three evidence-backed attempts, stop guessing, record it, and request the exact missing input or authority.
   - If a requested fix was previously reported as unsuccessful, follow the RCA workflow before another corrective attempt.

8. Checkpoint.
   - Leave the repository in a clean, understandable state.
   - Update progress, discoveries, decisions, evidence, and next action.
   - Commit atomically when the current approved workflow calls for a commit.

9. Continue.
   - Move automatically to the next unmet criterion while the goal remains active and no pause condition applies.

10. Complete.

- Run full verification and realistic end-to-end evaluation.
- Review the complete diff and goal evidence.
- Update outcomes and retrospective.
- Mark complete only when every required acceptance criterion has evidence.

## Authority Envelope and Pause Conditions

Continue without asking for routine confirmation when work is:

- explicitly in scope,
- T0 or T1,
- reversible,
- confined to the local repository,
- supported by written acceptance criteria,
- and does not affect production or external systems.

Pause and request explicit direction when:

- scope must expand,
- core product intent remains ambiguous after repository discovery,
- the action is destructive or difficult to reverse,
- security, privacy, legal, or compatibility consequences are unclear,
- production or external systems would change,
- a T2 or T3 phase requires approval under `CONSTITUTION.md`,
- a constitutional amendment materially weakens an existing control,
- unrelated dirty changes cannot be safely preserved,
- publishing, pushing, remote changes, credentials, or privileged installation are required,
- or the same blocking condition remains after three evidence-backed attempts.

User invocation of this goal counts as approval of the stated modernization direction and its non-destructive T1 work. It does not waive any pause condition above.

## Out of Scope

- Building a hosted SaaS product for Tempo.
- Creating a custom agent runtime when host goal and skill capabilities are sufficient.
- Requiring GitHub, hosted pull requests, or cloud CI for the core local workflow.
- Publishing a plugin or release.
- Pushing branches or commits.
- Adding telemetry or transmitting repository data.
- Replacing project-specific toolchains with the Tempo TypeScript starter stack.
- Supporting every agent host through duplicated full instruction manuals.
- Weakening protected-branch, secret-handling, destructive-action, or production controls to reduce friction.

## Decomposition and Exit Criteria

Execute the work in ordered phases. Before implementation, update `ROADMAP/COMMIT-PLAN.md` with atomic commit identifiers and create the proposal and review paths required by the governing documents.

### Phase 0: Refresh research and establish approved scope

Work:

- Reproduce current defects and record concise evidence.
- Refresh the primary-source guidance named above.
- Complete Tempo's project brief and product specification.
- Create the required proposal with per-unit commit and review plans.
- Record durable architectural decisions.

Verify:

- Markdown parses correctly.
- No required section contains placeholders.
- Product intent explicitly covers novice users, skills, long-running goals, portability, and one-command bootstrap.
- Proposal names expected files, rollback, compatibility, and evaluation.

Exit criteria:

- Definition of Ready is satisfied for the first implementation unit.

### Phase 1: Repair bootstrap and verification contradictions

Work:

- Make clean-repository verification pass on the primary branch.
- Keep direct commits and unauthorized mutations to the primary branch blocked.
- Repair malformed active Markdown.
- Replace shallow documentation checks with structural validation for the highest-risk artifacts.
- Add regression tests for the clean-clone bootstrap and branch-policy distinction.

Verify:

- `./bootstrap` succeeds from a clean primary-branch checkout in its supported environment.
- `pnpm verify` succeeds on clean `main`.
- a direct commit attempt on `main` remains blocked,
- a compliant feature branch passes policy checks,
- malformed `SPEC.md` or missing required sections cause deterministic failure.

Exit criteria:

- The documented first-run path is internally consistent and covered by regression tests.

### Phase 2: Create the concise repository kernel

Work:

- Reduce `AGENTS.md` to always-applicable rules and routing.
- Separate durable policy from conditional procedures.
- Remove duplicated or obsolete prompt-era instructions.
- Preserve constitutional controls or amend them through the required process.
- Document which artifact is authoritative for each kind of information.

Verify:

- `AGENTS.md` is no more than 120 lines unless the proposal records evaluation-based justification.
- A task-specific agent can locate the relevant workflow without reading all governance files.
- No safety, verification, rollback, or dirty-worktree invariant is lost.
- Documentation consistency and prompt eval scenarios pass.

Exit criteria:

- The always-loaded instruction surface is concise, accurate, and sufficient to route work.

### Phase 3: Add living goal execution

Work:

- Add the active-goal template and lifecycle.
- Define authority envelopes, progress state, evidence, retry bounds, handoffs, pause conditions, and completion rules.
- Consolidate overlapping roadmap, status, proposal, and execution-state responsibilities.
- Add commands or scripts that validate goal structure and identify the active goal.

Verify:

- A fresh-context agent can resume a partially completed fixture goal using only the repository and active goal artifact.
- It selects the recorded next action, preserves completed work, and does not prematurely claim completion.
- Goal validation rejects missing outcome, acceptance, authority, evidence, or next-action fields.

Exit criteria:

- Tempo has one documented, testable, resumable source of active execution state.

### Phase 4: Build the skills bundle

Work:

- Create the focused skills using the current Agent Skills initialization workflow where applicable.
- Move procedural detail and templates into appropriate references and assets.
- Bundle and test deterministic helper scripts.
- Add optional host metadata without compromising the open skill format.
- Document explicit and implicit invocation examples.

Verify:

- Every skill passes the current skill validator.
- All skill references resolve.
- Helper scripts pass representative tests.
- Descriptions trigger on intended requests and avoid unrelated requests.
- Skill bodies meet size and progressive-disclosure constraints.

Exit criteria:

- The complete Tempo workflow is usable through focused skills without loading the entire governance manual.

### Phase 5: Preserve one-command public setup and portability

Work:

- Integrate repo-local skills and the goal template into canonical bootstrap.
- Keep the default starter profile batteries-included.
- Add an adopt-existing path that installs governance and skills without adding the starter application stack.
- Update README and getting-started guidance around one primary setup command.
- Make setup idempotent and safe to rerun.

Verify:

- Test fresh greenfield setup.
- Test repeated setup.
- Test adopt-existing setup against at least one non-Node fixture repository.
- Confirm setup does not add remotes, push, publish, destroy files, or require privileged installation.
- Confirm the final output tells a novice exactly what to do next.

Exit criteria:

- The public GitHub repository retains a one-command start and supports stack-neutral adoption.

### Phase 6: Add skill and goal evaluations

Work:

- Create realistic eval cases and objective assertions.
- Compare runs with the skill against a no-skill or prior-version baseline.
- Use clean contexts and isolated workspaces.
- Measure both quality and workflow cost.
- Add deterministic grading where possible and human review for subjective novice experience.

Minimum scenarios:

1. Greenfield user with a vague idea.
2. Existing non-Node repository adopting Tempo.
3. Multi-session feature goal resumed from fresh context.
4. Reported failed fix requiring RCA.
5. Mid-goal scope change.
6. Unrelated prompt that must not trigger a Tempo skill.
7. Clean primary-branch bootstrap.

Minimum measures:

- correct skill triggering,
- acceptance-criterion completion rate,
- verification evidence quality,
- premature completion rate,
- unnecessary human interruption count,
- successful fresh-context resumption,
- token or instruction-load cost,
- elapsed time where available,
- preservation of unrelated work,
- safety-boundary compliance.

Verify:

- The skills improve important outcomes over baseline without unacceptable context or interruption cost.
- Failures and false triggers become regression cases.
- Evaluation workspaces and generated outputs are not committed unless intentionally maintained as small fixtures.

Exit criteria:

- Tempo's modernized workflow has evidence of benefit, not only structural compliance.

### Phase 7: Review, migration, and publication readiness

Work:

- Document migration from the old document-heavy workflow.
- Review all public commands from a novice perspective.
- Ensure template history remains separate from active user history.
- Complete status, decisions, roadmap, proposal, and review records.
- Perform a final security, portability, rollback, and documentation review.

Verify:

- Canonical verification passes.
- The complete public setup is exercised from a clean checkout.
- The complete adopt-existing path is exercised in an isolated fixture.
- All goal acceptance criteria have linked evidence.
- The working tree contains no secrets, caches, logs, generated eval workspaces, or unrelated changes.

Exit criteria:

- The repository is merge-safe and publication-ready, but no push or publication has occurred.

## Acceptance Criteria

This goal is complete only when all of the following are true:

- [ ] Tempo's product brief and specification describe the modernized product without placeholders.
- [ ] A clean primary-branch checkout can run the documented canonical bootstrap successfully.
- [ ] Canonical verification passes on a clean primary branch.
- [ ] Direct development commits to the primary branch remain blocked.
- [ ] `AGENTS.md` is concise and routes tasks without requiring all governance files to be read.
- [ ] Durable policy, reusable workflow, active goal state, historical evidence, and executable enforcement have distinct documented owners.
- [ ] Tempo provides a self-contained living goal format that supports fresh-context resumption.
- [ ] The goal loop acts, observes environmental evidence, evaluates, repairs, checkpoints, and continues until a defined stop condition.
- [ ] T0/T1 reversible work can continue inside an approved authority envelope without repeated approval prompts.
- [ ] T2/T3, destructive, production, privacy, compatibility, remote, and publication boundaries still require explicit approval.
- [ ] The focused Tempo skills exist, pass validation, use progressive disclosure, and have tested references or scripts.
- [ ] Skill trigger behavior includes positive and negative eval coverage.
- [ ] At least one fresh-context resume eval demonstrates correct continuation without premature completion.
- [ ] Tempo retains one documented public setup command suitable for the GitHub README.
- [ ] Greenfield setup remains batteries-included.
- [ ] Adopt-existing setup works without imposing the TypeScript starter stack.
- [ ] Documentation validation detects structural defects and material command inconsistencies.
- [ ] Current behavior, migration guidance, rollback, decisions, roadmap, and review evidence agree.
- [ ] Full canonical verification and the documented manual eval suite pass.
- [ ] No external push, publication, remote change, or production action occurred.

## Verification Strategy

Use a layered verification strategy:

1. Fast mechanical checks during each edit.
2. Targeted unit and regression tests for each work unit.
3. Skill schema and reference validation.
4. Clean-context skill and goal evals.
5. Fresh-checkout bootstrap tests.
6. Stack-neutral adopt-existing fixture tests.
7. Full `pnpm verify` before every review boundary.
8. Final diff, safety, rollback, and novice-experience review.

Every acceptance claim must name the command, artifact, or observable behavior that proves it. A passing string-presence check is not sufficient evidence of semantic correctness.

## Rollback and Recovery

- Keep modernization changes in atomic commits on compliant feature branches.
- Preserve the last known-good public bootstrap path until its replacement passes fresh-checkout tests.
- Prefer additive introduction of goal and skill paths before removing old instructions.
- Do not delete historical governance artifacts; archive or migrate them according to documented policy.
- If a new skill or goal workflow regresses outcomes, disable its routing and restore the last validated workflow while retaining eval evidence.
- If a phase cannot be completed safely, leave the repository green, update this document with the blocker and exact next action, and stop.

## Progress

Update this list at every meaningful stopping point. Add timestamps and evidence paths.

- [x] Phase 0: Refresh research and establish approved scope. (Completed 2026-07-24; evidence: `dbff42b`, approved brief/specification, C016 proposal, refreshed primary guidance.)
- [x] Phase 1: Repair bootstrap and verification contradictions. (Completed 2026-07-24; evidence: focused governance tests, non-interactive bootstrap, contract validator, and passing `pnpm verify`.)
- [ ] Phase 2: Create the concise repository kernel. (Pending explicit T2 approval; proposal: `PROPOSALS/2026-07-24--concise-kernel-living-goals.md`.)
- [ ] Phase 3: Add living goal execution.
- [ ] Phase 4: Build the skills bundle.
- [ ] Phase 5: Preserve one-command public setup and portability.
- [ ] Phase 6: Add skill and goal evaluations.
- [ ] Phase 7: Review, migration, and publication readiness.

Current next action:

- Obtain explicit human approval for `PROPOSALS/2026-07-24--concise-kernel-living-goals.md`, including its Constitution 2.1 text changes, bounded T0/T1 authority envelope, and active-state ownership model.

## Discoveries

Record unexpected facts and concise evidence here as execution proceeds.

- Observation: Current Codex guidance explicitly treats repo `AGENTS.md` as a small durable-guidance surface and `.agents/skills` as the repo-local progressive-disclosure workflow surface.
  Evidence: refreshed `/tmp/openai-docs-cache/codex-manual.md` sections "Best practices", "Build skills", and "Customization" on 2026-07-24.

- Observation: The open Agent Skills specification currently permits optional metadata fields beyond `name` and `description`, while the bundled Codex `skill-creator` guidance intentionally restricts generated frontmatter to those two fields.
  Evidence: `https://agentskills.io/specification` and the local `skill-creator/SKILL.md`, refreshed 2026-07-24. Tempo skills will use only `name` and `description` for widest compatibility.

- Observation: Tempo bootstrap initially failed inside the restricted execution sandbox because configuring `.git/config` requires write access; the same command succeeded with scoped approval.
  Evidence: `./bootstrap --no-verify` error "could not lock config file .git/config", followed by a successful approved run on 2026-07-24.

- Observation: `pnpm install` in bootstrap can display an interactive modules-reinstall prompt, which is unsuitable for unattended one-command setup even though the observed run completed.
  Evidence: bootstrap output on 2026-07-24 prompted whether to remove and reinstall `node_modules`. Add this to C016 regression scope.

- Observation: Tempo's approved template product contract and the unfilled contracts generated for a user's project have different valid states.
  Evidence: structural validation initially assumed Tempo-specific headings; C016 changed it to validate semantic sections and added a reset regression test covering both `PROJECT-BRIEF.md` and `SPEC.md`.

- Observation: `CI=1 pnpm install --frozen-lockfile` removes the interactive modules-reinstall question and completed successfully against the pinned lockfile.
  Evidence: approved `./bootstrap --no-verify` run on 2026-07-24 recreated dependencies without prompting and completed the setup path.

## Decisions

Record decisions that affect execution here, then copy durable product or process decisions to `DECISIONS.md`.

- Decision: Preserve a one-command public bootstrap as a non-negotiable product requirement.
  Rationale: Tempo's primary user may not be a software engineer and should not need to assemble the agent environment manually.
  Date: 2026-07-24

- Decision: Target a bundle of focused open-format skills rather than one monolithic skill.
  Rationale: Focused skills trigger more accurately and support progressive disclosure; optional plugin metadata can provide host-specific distribution.
  Date: 2026-07-24

- Decision: Keep the default starter stack while separating it from the portable governance and skills kernel.
  Rationale: This preserves Tempo's batteries-included experience without forcing Node.js and pnpm onto adopted repositories.
  Date: 2026-07-24

- Decision: Treat branch verification and branch mutation as distinct policy events.
  Rationale: A public starter must verify on its default branch, while active development and direct commits must remain on compliant feature branches.
  Date: 2026-07-24

## Outcomes and Retrospective

Complete this section at major milestones and final completion.

- Phase 0 established an approved product contract and an execution-ready modernization sequence.
- Phase 1 removed the bootstrap/branch-policy contradiction, introduced deterministic contract validation, preserved direct-main commit protection, and covered the corrected boundaries with isolated tests.
