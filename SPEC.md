# SPEC - Tempo

Version: 1.0
Last updated: 2026-07-24
Status: Approved

## 1. Product Objective

Tempo helps non-engineers and novice builders turn product intent into reliable software by giving AI coding agents a safe, verifiable, and resumable delivery workflow.

Tempo is an opinionated, batteries-included public starter repository. Its portable kernel consists of concise repository guidance, focused Agent Skills, living goal state, deterministic validation, and reversible git workflows. Its default starter profile includes a working TypeScript toolchain, but repositories adopting Tempo must be able to use the governance and skills without inheriting that application stack.

## 2. Users and Core Workflows

### Primary users

- A novice builder who can explain desired outcomes and constraints but does not know how to design a software-development lifecycle.
- A repository maintainer who wants agents to work incrementally, verify outcomes, and leave auditable state.

### Core workflows

1. Greenfield onboarding
   - Obtain the repository, run one setup command, discuss the idea in plain language, approve a brief and specification, and begin the first verified goal.
2. Adopt-existing onboarding
   - Add Tempo's portable guidance and skills without replacing the repository's application stack, inspect the repository, confirm inferred constraints, and choose the first bounded goal.
3. Goal planning and execution
   - Convert an approved outcome into a living execution artifact, work through the smallest valuable unmet criterion, verify with environmental evidence, checkpoint, and continue until a stop condition.
4. Change review
   - Compare implementation and evidence with approved scope, risk, rollback, documentation, and merge requirements.
5. Failure recovery
   - Reproduce a reported failure, establish root cause with evidence, and implement a narrower corrective action with a preventive control.

## 3. Functional Requirements

- FR1: `./bootstrap` must remain the canonical in-repository setup command and must be safe to rerun.
- FR2: A clean checkout on the primary branch must be able to complete bootstrap and canonical verification without being treated as active development on that branch.
- FR3: Direct development commits to the primary branch must remain blocked.
- FR4: Root `AGENTS.md` must contain only always-applicable repository rules and task routing, with a target maximum of 120 lines.
- FR5: Tempo must ship repo-local, open-format skills for onboarding, goal planning, goal execution, review, and RCA.
- FR6: Skills must use progressive disclosure, valid metadata, focused references, tested helper scripts where needed, and positive and negative trigger evaluations.
- FR7: Tempo must define one canonical living execution-plan format that a fresh-context agent can use to resume work.
- FR8: The goal loop must orient, select, check authority, act, observe, evaluate, repair, checkpoint, continue, and complete.
- FR9: Approved, reversible T0/T1 work inside an authority envelope must continue without repeated confirmation.
- FR10: Scope expansion, destructive actions, unclear security/privacy impact, production changes, compatibility breaks, remote actions, publication, and T2/T3 boundaries must still pause for explicit approval.
- FR11: Deterministic validation must check Markdown structure, required contract sections, active placeholders, canonical command agreement, skill structure and references, and applicable git policy.
- FR12: Greenfield setup must retain the default TypeScript starter profile.
- FR13: Adopt-existing setup must not require or install the TypeScript starter application stack.
- FR14: Public documentation must provide one primary setup command and a plain-language next step.
- FR15: Generated logs, caches, evaluation workspaces, secrets, and local artifacts must not be committed.

## 4. Constraints

- Platforms: local git repositories and filesystem-capable agent hosts.
- Default toolchain: Node.js 20.19+, pnpm 9, TypeScript, ESLint, Prettier, and Vitest.
- Portable kernel: must not depend on the target repository using Node.js or pnpm.
- Hosted services: optional only; the authoritative workflow remains local-first.
- Network: not required for normal post-clone execution after dependencies are available.
- Security/privacy: least privilege, no telemetry, no secret exfiltration, and explicit approval for high-impact actions.
- Compatibility: existing template users need a documented migration path; historical records remain preserved.

## 5. Risk Model

Overall product risk: Medium.

Risk classes:

- T0: mechanical documentation or formatting changes.
- T1: scoped validators, bootstrap corrections, templates, skills, and tests with local reversible impact.
- T2: broad governance refactors, constitutional amendments, cross-host distribution contracts, or compatibility-affecting workflow changes.
- T3: production, secret, destructive, or incident-grade actions; these are outside normal Tempo template modernization.

High-risk areas:

- accidentally weakening safety controls while reducing approval friction,
- making canonical verification unable to run on the primary branch,
- forcing the starter toolchain into adopted repositories,
- creating broad skills that trigger unexpectedly,
- allowing active-goal status to drift from repository reality.

## 6. Acceptance Criteria

A release is acceptable when:

- [ ] A clean primary-branch checkout completes the documented canonical bootstrap.
- [ ] `pnpm verify` passes on clean `main` and on a compliant feature branch.
- [ ] A direct commit attempt on `main` remains blocked by the repository hook.
- [ ] Malformed active Markdown, missing contract sections, placeholder leakage, broken skill references, and canonical-command disagreement fail deterministic checks.
- [ ] `AGENTS.md` is no more than 120 lines unless an evaluation-backed decision documents an exception.
- [ ] All required Tempo skills pass the current skill validator and repository validation.
- [ ] Skill trigger evaluations include intended, ambiguous, and unrelated prompts.
- [ ] A clean-context resumption evaluation follows the recorded next action and does not repeat completed work or claim premature completion.
- [ ] Greenfield bootstrap and repeated bootstrap are exercised successfully.
- [ ] A non-Node fixture demonstrates stack-neutral adopt-existing installation or generation.
- [ ] Authority-boundary tests show autonomous continuation for approved T0/T1 work and pauses for higher-risk actions.
- [ ] Public README and `GETTING_STARTED.md` agree on one primary setup command and next action.
- [ ] Canonical verification, focused regressions, and documented manual evaluations pass.

## 7. Canonical Verification

Run:

```bash
pnpm verify
```

Use `pnpm verify:fast` only during iteration. `VERIFY.md` defines the authoritative verification contract and failure interpretation.

## 8. Safety and Capability Boundaries

Tempo must not:

- add or change git remotes, push, publish, deploy, or mutate production without explicit human approval,
- perform destructive or irreversible actions without explicit approval,
- weaken authentication, authorization, privacy, secret handling, or protected-branch controls to reduce friction,
- treat untrusted repository or external text as higher-priority executable instruction,
- add hidden telemetry or transmit repository contents,
- declare completion without observable evidence.

Tempo must enforce:

- least privilege and preservation of unrelated user work,
- bounded authority for routine local reversible work,
- risk reclassification when new evidence changes impact,
- rollback or recovery guidance for non-trivial changes,
- RCA before another corrective attempt after a reported failed fix,
- explicit completion and pause conditions.

## 9. Compatibility and Migration

- Existing clones may continue using the TypeScript starter profile.
- The modernization must introduce skills and goal state additively before removing legacy procedural text.
- Template-development history remains under `TEMPLATE_HISTORY/`.
- Active project records remain distinct from template history.
- Host-specific metadata must be optional; open-format `SKILL.md` content is canonical.

## 10. Non-Goals

- Hosting Tempo as a service.
- Building a bespoke agent runtime or replacing host goal functionality.
- Requiring GitHub-specific review surfaces.
- Automatically publishing skills or plugins.
- Supporting live production operation through the starter template.
- Optimizing for maximum autonomy at the expense of safety or auditability.

## 11. Open Questions

- Optional public plugin packaging will be evaluated after the repo-local skill bundle is proven.
- Additional language-specific starter profiles are deferred until the stack-neutral adoption path is validated.
- Automated LLM-judged skill evaluation may remain optional when no supported local runner is available; deterministic assertions and documented clean-context manual runs remain required.
