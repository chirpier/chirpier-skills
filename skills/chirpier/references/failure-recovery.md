# Failure Recovery

Use this file when Chirpier operations fail validation or produce confusing results.

## Naming Drift

If the proposed event name looks new:

1. Check whether an existing canonical stream already fits.
2. Keep the event grammar `domain.subject.measure[.suffix]`.
3. Preserve the stable `agent + event` identity model.
4. Do not add time windows to the event name.

## Invalid Aggregate

If policy creation fails:

1. Inspect the raw stream shape.
2. Switch to a matching aggregate.

Examples:

- `tool.errors.count` -> use `sum`, not `p95_est`
- `task.duration_ms` -> use `average` or `p95_est`, not `count`

## Invalid Period

If a rollup or policy query fails:

- use only `minute`, `hour`, or `day`
- do not use `minutes`, `hours`, `days`, `1h`, or `30d`

If an analytics query fails:

- use only `1h`, `1d`, `7d`, or `1m`
- use `previous`, not `compare`

## Delivery Confusion

- default delivery history is for real alerts
- `kind=test` is for destination validation
- `kind=all` is for debugging only
