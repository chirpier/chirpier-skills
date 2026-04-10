# Policy Patterns

Use this file before creating or reviewing Chirpier policies.

## Aggregate Selection

Choose the aggregate that matches the raw stream shape.

| Event shape | Good aggregates | Avoid |
| --- | --- | --- |
| `*.count`, `*.errors.count`, `*.used` | `sum` | `average` |
| `*.duration_ms` | `average`, `p95_est`, `p99_est`, `max` | `sum` |
| `*.score`, `*.price_usd` | `average`, `min`, `max` | `sum` unless the stream is intentionally additive |
| `*.gauge` | `average`, `min`, `max` | `sum` |

## Examples

- `tool.errors.count` with `sum > 5` in `hour`
- `heartbeat.missed.count` with `sum > 0` in `day`
- `task.duration_ms` with `average > 2000` in `hour`
- `task.duration_ms` with `p95_est > 5000` in `day`
- `market.bitcoin.price_usd` with `max > 120000` in `hour`
- `sentiment.bitcoin.reddit.score` with `average < -0.4` in `hour`

## Period Split

Use this exact split:

- rollups and policies: `minute`, `hour`, `day`
- analytics windows: `1h`, `1d`, `7d`, `1m`

## Analytics Window Examples

- last hour vs previous hour: `period=1h&previous=previous_window`
- last hour vs same hour yesterday: `period=1h&previous=previous_1d`
- last hour vs same hour last week: `period=1h&previous=previous_7d`
- last day vs same day last month: `period=1d&previous=previous_1m`

## Use Analytics Instead When

- the user wants a recurring comparison such as last hour versus previous hour
- the user wants percent change or delta between windows
- the user does not need alert thresholding yet

## Do Not Do This

- Do not use `1h` for policy or rollup periods.
- Do not use `hour` for analytics window periods.
- Do not invent event names for hour-over-hour or day-over-day comparisons.
