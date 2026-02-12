Version: 0.1
Last updated: 2026-02-12
Status: Draft

## 1. Product Objective

Describe in 1-3 short paragraphs what Tempo should do and why it exists.

Template:
Tempo helps `<target user>` achieve `<core outcome>` by `<primary mechanism>`.
The MVP will focus on `<narrow scope>` and intentionally exclude `<major non-goal>`.

## 2. Users and Core Workflows

### Primary User(s)

- `<user type 2>`

### Core Workflows (MVP)

2. `<workflow 2 in plain English>`
3. `<workflow 3 in plain English>`

- `<goal 1>`
- `<goal 2>`
- `<goal 3>`

### Non-Goals (MVP)

- `<non-goal 2>`

## 4. Constraints

- Platforms: `<web/mobile/desktop/backend/etc>`
- Time/Budget: `<constraints>`
- Security/Privacy: `<requirements>`
- Operational constraints: `<uptime/perf/cost limits>`

Overall project risk: `<Low | Medium | High | Critical>`
Why:

- `<reason 2>`

High-risk areas:

- `<area 2>`

## 6. Functional Requirements

- FR2: `<requirement>`

A release is acceptable when:

- [ ] `<observable behavior 1>`
- [ ] `<observable behavior 3>`
- [ ] `<error/edge case behavior>`

```bash
pnpm verify

Supporting notes:

- Fast gate: pnpm verify:fast
- CI must run pnpm verify and block merge on failure.
- Detailed process is defined in VERIFY.md.

## 9. Safety and Capability Boundaries

Must not:

- <unsafe capability 1>
- <unsafe capability 2>

Must enforce:

- <safety control 1>
- <safety control 2>

## 10. Out of Scope for This Version

- <explicitly deferred item 1>
- <explicitly deferred item 2>

## 11. Open Questions

- <question 1>
- <question 2>
```
