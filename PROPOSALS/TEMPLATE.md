Owner: <human/agent name>
Risk Class: T0 / T1 / T2 / T3
Related Issue/Context: <optional>

## Objective

Describe the single outcome this change should produce.

- <item 1>
- <item 2>
  Out of scope:
- <item 2>

## Expected Files Touched

- `path/to/file1`

- [ ] <observable result 1>
- [ ] <observable result 2>
- [ ] <observable result 3>

## Verification Plan

Commands:

```bash
pnpm verify
Optional focused checks:
# example
pnpm --filter <pkg> test
Pass means:
- Canonical verification exits 0.
- Acceptance criteria are demonstrably satisfied.


If this change causes regressions:

1. Revert commit(s): <how>
2. Restore prior behavior: <how>
3. Validate rollback with: <command(s)>

## Risks and Mitigations

- Risk: <risk 1>
  Mitigation: <mitigation 1>
- Risk: <risk 2>
  Mitigation: <mitigation 2>

## Compatibility / Migration Notes

- API compatibility impact: <none / describe>
- Data/schema migration needed: <no / yes + plan>
- Backward compatibility window: <if applicable>

## Observability / Debug Notes (if relevant)

- New logs/metrics/traces: <list>
- How to detect failure quickly: <signals/alerts>

## Approval

- Requested from: <name/role>
- Approval status: <pending/approved>
- Approved at: <timestamp>
```
