# PROJECT-BRIEF

Status: APPROVED
Last updated: 2026-07-24

## 1. Onboarding Mode

- Mode: adopt-existing
- Why this mode was selected: Tempo already has an implemented starter template, governance history, bootstrap tooling, and users. This work modernizes an existing product rather than defining a blank-slate project.

## 2. One-Sentence Project Goal

- Modernize Tempo into a portable, batteries-included system that helps non-engineers build reliable software with AI agents through concise repository guidance, focused Agent Skills, and resumable goal loops.

## 3. Problem Statement (In User Words)

- Tempo began when agentic coding mostly meant repeated CLI prompts and one-shot project generation. It needs to preserve its software-engineering guardrails while adapting to current Agent Skills and long-running goals so users can build complex projects without first becoming software engineers.

## 4. Why Now / Motivation

- Agent hosts can now discover reusable skills, maintain persistent goals, use tools for environmental feedback, and continue across many work units. Tempo's current document-heavy prompt model consumes context and introduces approval friction that can prevent those capabilities from working well.

## 5. Target Users

- Primary user: a non-engineer or novice builder who can describe a desired outcome but does not want to design a software-delivery process.
- Secondary users: experienced developers adopting consistent agentic delivery practices, and maintainers distributing Tempo through its public GitHub repository.

## 6. First Version Outcomes (Must Have)

- Preserve one-command setup for the public GitHub starter repository.
- Provide focused, open-format Agent Skills for onboarding, goal planning and execution, review, and RCA.
- Provide a resumable living goal artifact and bounded-autonomy execution loop.
- Keep the default TypeScript starter batteries included while supporting stack-neutral adoption into existing repositories.
- Replace important prose-only claims with deterministic validation and realistic evaluations.

## 7. Out of Scope (Must Not Build Yet)

- A hosted Tempo SaaS or custom agent runtime.
- Publishing a plugin, pushing repository changes, or changing external systems.
- Requiring hosted pull requests, cloud CI, telemetry, or a specific commercial agent host.
- Supporting every agent host through duplicated full instruction manuals.

## 8. Platform and Delivery Shape

- Platforms: local git repositories and compatible filesystem-capable coding-agent hosts.
- Delivery expectation: a public GitHub starter repository with `./bootstrap` as its canonical in-repository setup command, plus repo-local open-format skills.

## 9. Constraints

- Timeline: execute incrementally with independently verifiable phases; do not use a big-bang rewrite.
- Budget: prefer repository-native files and existing Node tooling; add dependencies only when they provide measurable value.
- Legal/compliance: retain the MIT-licensed public-repository model and avoid embedding third-party proprietary material.
- Security/privacy requirements: least privilege, no secrets or hidden telemetry, no remote or production actions without explicit approval, and no destructive operations without approval.

## 10. Technical Preferences

- Preferred languages/frameworks: open Agent Skills format, Markdown for human-readable contracts, Node.js scripts for the default starter's deterministic validation, and shell only for the canonical bootstrap boundary.
- Tools to avoid: custom agent runtimes, opaque orchestration frameworks, mandatory hosted services, and stack-specific dependencies in the portable governance kernel.

## 11. Inferred from Codebase (Hypotheses, Adopt-Existing Mode)

- Tempo's highest-value existing assets are discovery, acceptance criteria, risk classification, verification, rollback, git history, and RCA.
- The main current liabilities are always-loaded context volume, duplicated active state, shallow documentation validation, bootstrap/branch-policy contradiction, and coupling between governance and the TypeScript starter profile.
- Confidence: high; these were confirmed through repository inspection and the user's modernization goal.

## 12. Confirmed Facts vs Corrected Inferences

- Confirmed: Tempo remains opinionated and batteries included; one-command setup is non-negotiable; the public GitHub repository remains the primary distribution surface; modern skills and goals should enhance rather than discard the engineering guardrails.
- Corrected: Tempo should not become one monolithic skill. It should provide a focused skill bundle, with optional host-specific plugin metadata as a distribution layer.
- Unknown: cross-host skill discovery and plugin publication details may evolve and must be refreshed from primary documentation before release.

## 13. Alternatives Considered

- Option A: retain the existing document stack and add more prompt instructions. Rejected because it increases context cost and does not create resumable execution state.
- Option B: replace Tempo with a single large skill. Rejected because broad skills trigger imprecisely and load irrelevant procedures.
- Option C: use a small repository kernel, focused skills, a living goal artifact, and deterministic enforcement. Selected because it preserves strong defaults while using current agent capabilities.

## 14. Chosen V1 Scope and Why

- Chosen scope: modernize the local starter and adoption workflow, add focused skills and goal execution, strengthen validation, preserve one-command bootstrap, and add evidence-based evaluations.
- Why this scope is right now: it directly updates Tempo's foundational delivery model without expanding into hosted infrastructure or external publication.

## 15. Top Assumptions to Validate

- Repo-local open-format skills materially reduce instruction load while preserving governance compliance.
- An authority envelope reduces unnecessary interruptions without weakening meaningful safety boundaries.
- Existing repositories can adopt Tempo's portable kernel without inheriting its TypeScript starter stack.

## 16. Biggest Unknowns / Open Questions

- Which skill boundaries produce the best trigger precision after realistic evaluations?
- Which legacy governance artifacts can become generated summaries without reducing auditability?
- Whether optional plugin packaging adds enough distribution value to include before a later publication phase.

## 17. V1 Done Criteria

- [ ] A clean primary-branch checkout completes canonical bootstrap and verification.
- [ ] The repository ships validated focused skills and a resumable goal loop.
- [ ] Greenfield and stack-neutral adopt-existing paths pass realistic evaluations.
- [ ] The always-loaded repository guidance is concise and retains critical safety and quality controls.
- [ ] Public documentation presents one obvious setup command and a plain-language next action.
