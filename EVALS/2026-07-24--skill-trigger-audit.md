# Focused Skill Trigger Audit

Date: 2026-07-24
Scope: C018 metadata and case audit
Cases: `EVALS/skill-trigger-cases.json`

## Method

Compare each prompt with the `description` metadata that a host sees before
loading a skill body. Check whether:

- positive prompts name the workflow and expected state,
- ambiguous prompts resolve using approval or lifecycle context,
- negative prompts avoid the target skill,
- neighboring Tempo skills do not claim the same lifecycle stage,
- unrelated requests trigger no Tempo skill.

## Results

| Skill                   | Positive                           | Ambiguous                             | Negative               | Result |
| ----------------------- | ---------------------------------- | ------------------------------------- | ---------------------- | ------ |
| `tempo-onboard-project` | vague greenfield idea              | project lacks users/v1                | language explanation   | pass   |
| `tempo-plan-goal`       | approved outcome needs goal        | non-repository daily plan             | active goal execution  | pass   |
| `tempo-execute-goal`    | resume active goal                 | informal “finish it” with active goal | draft new goal         | pass   |
| `tempo-review-change`   | branch readiness and Review Record | assess evidence/rollback              | implementation request | pass   |
| `tempo-perform-rca`     | reported failed fix                | regression contradicts passing test   | first-pass trivial bug | pass   |

The descriptions distinguish lifecycle stages with explicit “Use when” and “do
not use” language. Fifteen cases cover every skill with one positive, ambiguous,
and negative scenario. Repository validation enforces that coverage.

## Limitations and Follow-Up

This audit validates trigger contracts and deterministic coverage, not a
particular host model's classification. C020 must run clean-context behavioral
evaluations and preserve any false trigger as a regression case.
