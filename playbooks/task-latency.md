# Task Latency

## Canonical Event

- `task.duration_ms`

## Example Event

```json
{
  "agent": "openclaw.main",
  "event": "task.duration_ms",
  "value": 780,
  "meta": {
    "task_name": "daily_digest",
    "result": "success"
  }
}
```

## Example Monitors

- `task.duration_ms` with `average > 2000` in `hour`
- `task.duration_ms` with `p95_est > 5000` in `day`

## Notes

- use duration streams for latency-like measurements only
- prefer `average` or `p95_est`, not `sum`
