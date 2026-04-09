# Gotchas

## Flat Model Rules

- event names are the schema
- `meta` is not used for alert grouping or filtering in v1
- do not encode time windows into event names

## Common Mistakes

Bad:

- `bitcoin.sentiment.last_24h`
- `tool_errors_last_hour`
- `duration-regression-p95-1d`

Good:

- `sentiment.bitcoin.reddit.score`
- `tool.errors.count`
- `task.duration_ms`

## Policy Mistakes

- do not use `p95_est` on `*.count`
- do not use `sum` on `*.gauge` unless you explicitly want additive snapshots
- use `sum` for `*.count` and `*.used`

## Destination Gotchas

- Slack and Discord require valid provider webhook URLs
- Telegram requires credentials, not a generic URL
- test sends are hidden from default delivery history

## Rollup Guidance

- use `minute` for recent debugging
- use `hour` for operational review
- use `day` for long-range monitoring
