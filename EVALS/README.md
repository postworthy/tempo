# Tempo Evaluation Suite

Run:

```bash
pnpm eval
```

The evaluator starts with structured cases, reads only named repository evidence,
executes the isolated portable-adoption regression, and prints a JSON summary.
It does not call model APIs, use network access, or retain generated workspaces.

The suite covers:

- vague greenfield onboarding,
- non-Node adopt-existing setup,
- fresh-state goal resumption and premature-completion rejection,
- RCA after a failed fix,
- mid-goal scope expansion,
- an unrelated prompt,
- clean primary-branch bootstrap evidence,
- and the full authority boundary matrix.

`baseline.json` records the pre-modernization comparison point. Static and
deterministic evaluation cannot prove every host model's probabilistic behavior;
the dated evaluation report records that limitation and the human audit.
