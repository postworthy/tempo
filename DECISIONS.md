# DECISIONS - Tempo

Record durable decisions and why they were made.

Format:
`YYYY-MM-DD - Title - Decision - Rationale - Consequences`

## 2026-02-12 - Constitutional Governance Baseline

Decision:
Adopt `CONSTITUTION.md` as the highest-precedence governance document for this repository.

Rationale:
Human + AI collaboration needs explicit, enforceable process controls to keep delivery reliable and reversible.

Consequences:
All workflow/process docs must align with `CONSTITUTION.md`; conflicts resolve in favor of the constitution.

## 2026-02-12 - Canonical Verification Gate

Decision:
Use `pnpm verify` as the single required pre-merge verification command.

Rationale:
A single canonical gate reduces ambiguity and ensures consistent local + CI health checks.

Consequences:
No merge to `main` without a passing `pnpm verify`; fast checks are optional but not sufficient.

## 2026-02-12 - Public Template Toolchain Baseline

Decision:
Standardize on Node.js 20+, pnpm 9, TypeScript, ESLint (flat config), Prettier, and Vitest for template baseline execution.

Rationale:
These tools are widely adopted, lightweight for fresh projects, and provide meaningful verification from day one.

Consequences:
Template consumers inherit this baseline and can tighten or replace it later through explicit proposal-driven changes.

## 2026-02-12 - Hosted CI as Optional Verification Surface

Decision:
Use a hosted CI workflow that runs `pnpm install` and `pnpm verify` as an optional review surface.

Rationale:
Hosted automation provides additional signal, but local-first governance should not depend on external platforms.

Consequences:
Hosted CI may aid confidence; authoritative merge readiness remains in local Change Review evidence.

## 2026-02-12 - Mandatory First-Run Intake for Novice Projects

Decision:
Require assistants to complete an intake interview and fill `PROJECT-BRIEF.md` before non-trivial implementation when using this template.

Rationale:
Novices need a predictable, low-friction start that captures intent before code is generated.

Consequences:
`BOOTSTRAP.md` and `PROJECT-BRIEF.md` become first-run mandatory artifacts; assistants must prompt users instead of assuming scope.

## 2026-02-13 - Discovery-First Ideation During Bootstrap

Decision:
Require assistants to run a short discovery/rubberduck phase with clarifying questions and scoped option trade-offs before finalizing the project brief.

Rationale:
Early idea expansion reduces ambiguity, improves spec quality, and helps novice users articulate a buildable v1 scope.

Consequences:
Bootstrap now includes minimum clarifying-question expectations, explicit assumption handling, and additional brief structure for alternatives, assumptions, and unknowns.

## 2026-02-13 - Decomposition Gate Before Implementation

Decision:
Require decomposition planning for T1/T2/T3 work before implementation, including ordered work units with per-unit verification notes and exit criteria.

Rationale:
Decomposition improves reviewability, reduces big-bang changes, and makes progress measurable for human + AI collaboration.

Consequences:
Definition of Ready now includes decomposition approval; proposal template and governance checks enforce decomposition artifacts.

## 2026-02-13 - Local-First Review Boundary and Review Records

Decision:
Define Change Review as local-first and require Review Records at `REVIEWS/YYYY-MM-DD--short-title.md` for non-trivial merges into `main`.

Rationale:
Local-first governance must be executable without hosted platforms while preserving auditable review evidence.

Consequences:
Hosted external review surfaces are optional only; remotes/push/publish actions require explicit approval and `DECISIONS.md` recording.

## 2026-02-13 - Canonical Bootstrap for Non-Git Toolchain Provisioning

Decision:
Require a canonical local bootstrap command (`./bootstrap`) and a repo-already-cloned onboarding guide (`GETTING_STARTED.md`) to provision non-git tooling safely.

Rationale:
Non-developer users need a deterministic setup path that does not assume preinstalled runtimes or package managers.

Consequences:
Bootstrap now validates tooling, provides safe install paths or explicit instructions, and aligns with canonical verification without managing `git` acquisition.

## 2026-02-13 - Template History Separation from Active Project Records

Decision:
Move template-development governance records into `TEMPLATE_HISTORY/` and keep active project record folders clean by default for fresh clones.

Rationale:
Users starting new projects should inherit process templates, not historical project-specific records.

Consequences:
Fresh-template mode enforces template-only live record folders while `PROJECT-BRIEF.md` remains unfilled; `./bootstrap --init-project` provides a one-time baseline reset with backups.

## 2026-03-04 - Git Policy Enforcement Baseline

Decision:
Adopt mandatory git preflight, branch naming, commit trailer, and local hook enforcement (`.githooks`) with `pnpm check:git-policy` integrated into canonical verification.

Rationale:
Instruction-only controls degrade under long context windows. Lightweight executable guardrails reduce drift and keep git history conformant.

Consequences:
Bootstrap now configures repository-local hooks; local development is blocked on direct-to-main commits, non-conventional commit messages, and missing roadmap/proposal trailers.

## 2026-03-04 - Dual-Mode Onboarding for Existing Repositories

Decision:
Support onboarding in two modes: `greenfield` for new projects and `adopt-existing` for repositories with existing implementation, including a repository intake scan before discovery questions in adopt-existing mode.

Rationale:
Tempo should remain focused on startup projects while being deployable into active repositories where standard blank-slate intake questions are inefficient and miss context available from code.

Consequences:
Bootstrap now supports mode selection/auto-detection and intake scan execution; onboarding artifacts include inferred-vs-confirmed project context and emphasize delta questions over generic startup prompts in existing codebases.

## 2026-03-06 - Canonical Prompt Contract for Prompt-Facing Docs

Decision:
Add `PROMPTING.md` as the canonical prompt-design document for reusable output contracts, stop conditions, scoped task updates, and lightweight prompt review.

Rationale:
Governance-heavy docs improve safety and process control, but assistants also need prompt-native structure to behave consistently across different hosts and model versions.

Consequences:
Starter prompts, onboarding docs, and adapter docs should reference `PROMPTING.md`; prompt-facing documentation changes should include a lightweight manual prompt review.

## 2026-07-24 - Skills and Goal-Native Modernization Direction

Decision:
Modernize Tempo around a concise repository kernel, focused open-format Agent Skills, a canonical living goal artifact, deterministic enforcement, and evidence-based evaluations.

Rationale:
Current agent hosts can progressively load reusable procedures and continue persistent goals. Tempo's large always-read instruction stack and duplicated execution state prevent those capabilities from delivering their full value.

Consequences:
Always-applicable policy will remain in `AGENTS.md`; reusable procedures will move to skills; active execution state will have one canonical owner; broad governance changes require a separate T2 proposal and constitutional amendment process.

## 2026-07-24 - Preserve One-Command Batteries-Included Setup

Decision:
Keep `./bootstrap` as Tempo's canonical in-repository setup command and preserve the default TypeScript starter profile while separating portable governance and skills from that profile.

Rationale:
Tempo's primary user should not need to assemble an agent environment or become a software engineer before starting, while existing non-Node repositories should not inherit an unrelated application stack.

Consequences:
Greenfield setup remains opinionated and batteries included; adopt-existing setup must be stack-neutral; clean primary-branch bootstrap and repeated setup become release acceptance criteria.
Plain `./bootstrap` is the deterministic contributor verification path;
new-project users run explicit `./bootstrap --init-project`, which creates a
recoverable backup before retiring Tempo's active development records.

## 2026-07-24 - Focused Skill Bundle Instead of Monolithic Skill

Decision:
Provide separate skills for onboarding, goal planning, goal execution, review, and RCA, with optional host-specific plugin metadata layered on top.

Rationale:
Focused skills trigger more accurately, use progressive disclosure, and avoid loading irrelevant workflow instructions.

Consequences:
Each skill requires independent validation and trigger evals; open-format `SKILL.md` content is canonical; public plugin publication is deferred until the repo-local bundle is proven.

## 2026-07-24 - Separate Verification from Mutation-Time Branch Enforcement

Decision:
Allow canonical read-only verification on a clean primary branch while retaining feature-branch enforcement at active-development preflight and commit-hook boundaries.

Rationale:
Bootstrap and verification must succeed for a newly cloned public starter on `main`, but that does not authorize development commits there.

Consequences:
`pnpm check:git-policy` permits `main` for repository verification; its `--require-feature-branch` mode and the pre-commit hook reject active development or direct commits on `main`.

## 2026-07-24 - Constitution 2.1 Living Goals and Bounded Authority

Decision:
Approve Constitution 2.1, recognizing one repository-native Living Goal as the canonical active execution state and permitting approved, reversible T0/T1 work within a recorded Authority Envelope to continue without repeated confirmation.

Rationale:
Long-running agents need durable resumption state and enough bounded authority to complete approved routine work, while meaningful safety and product boundaries remain human-controlled.

Consequences:
`GOALS/*` becomes authoritative for active execution state. Explicit approval remains mandatory for scope expansion, destructive or irreversible work, remote/publication actions, production effects, unclear security/privacy impact, compatibility breaks, and all T2/T3 implementation.

## 2026-07-24 - Concise Repository Kernel

Decision:
Limit `AGENTS.md` to always-applicable invariants, authority boundaries, task routing, preflight, the core work loop, and completion/recovery rules.

Rationale:
Loading every conditional procedure for every task wastes context and makes durable instructions harder to follow. The Constitution 2.1 responsibility map provides authoritative destinations for procedural detail.

Consequences:
Onboarding, prompting, proposals, reviews, RCA, and active-goal procedures are loaded when relevant rather than duplicated in the repository kernel. A deterministic check enforces the 120-line limit.

## 2026-07-24 - Canonical Focused Skill Bundle

Decision:
Ship `tempo-onboard-project`, `tempo-plan-goal`, `tempo-execute-goal`, `tempo-review-change`, and `tempo-perform-rca` as Tempo's canonical repo-local skill bundle.

Rationale:
These boundaries match distinct lifecycle intents, produce precise trigger descriptions, and let agents load only the procedure needed for the current task.

Consequences:
Skills live under `.agents/skills/`, canonical frontmatter uses only `name` and `description`, host interface metadata remains optional, and deterministic validation enforces direct references and positive/ambiguous/negative trigger coverage.

## 2026-07-24 - Target-Based Portable Adoption

Decision:
Use `./bootstrap --mode adopt-existing --target <repo> --verify-command <command>` as the stack-neutral adoption form while retaining default `./bootstrap` for the batteries-included starter.

Rationale:
One public entry point is easier for novice users, but an existing repository must not inherit Tempo's Node/TypeScript application profile or have its files overwritten.

Consequences:
Target adoption runs before Node/pnpm checks, installs a portable Constitution/kernel/goals/skills profile, backs up and marks existing `AGENTS.md`, records the target verification command as data, refuses conflicts, and remains idempotent.
Every managed path component must be a real directory rather than a symlink, and
known conflicts must be rejected during preflight before target mutation.

## 2026-07-24 - Audited Development Toolchain Floor

Decision:
Require Node.js 20.19 or later, upgrade the verification stack to current
compatible ESLint 10, Vitest 4, TypeScript ESLint 8, and related tools, and pin
patched transitive versions when upstream dependency ranges otherwise resolve a
known-vulnerable release.

Rationale:
Every greenfield Tempo user installs and executes the development toolchain.
High and critical advisories in that graph are therefore release blockers even
though Tempo has no runtime production dependencies.

Consequences:
`.nvmrc`, package engines, bootstrap validation, hosted verification, and
documentation use Node 20.19 as the minimum. Public release review runs
`pnpm audit:high`; the network-backed audit remains separate from the offline
canonical verification gate.

## 2026-07-24 - Initialized Project as a Distribution Boundary

Decision:
Treat `./bootstrap --init-project` as the explicit conversion from Tempo's
auditable source repository into a fresh user project. Reset project-owned
contracts and decisions, archive Tempo-specific execution and release state,
retain reusable capabilities, and preserve explicitly quarantined
`TEMPLATE_HISTORY/`.

Rationale:
Tempo maintainers need source history and evidence, while novice users must not
inherit active decisions or plans that appear to govern an unrelated product.

Consequences:
`INITIALIZATION-POLICY.json` defines the behavior, initialization creates one
recoverable ignored backup, and canonical verification rejects residual
Tempo-development state in an unfilled project.

## 2026-07-24 - Approve Modernization Merge and GitHub Publication

Decision:
The Human Partner explicitly approved merging
`docs/c012-tempo-modernization-goal` into `main` with `--no-ff`, then pushing
`main` to `origin`.

Rationale:
The final production-readiness review found no blocking issue. Exact
minimum-runtime, merge, bootstrap, initialization, portable adoption,
security/artifact, and dependency gates passed.

Consequences:
Execute one local no-fast-forward merge and one push of `main` to `origin`.
This approval does not authorize tags, releases, deployments, other branches,
remotes, or later publication actions. Verify merged `main` before pushing and
confirm the remote ref afterward.
