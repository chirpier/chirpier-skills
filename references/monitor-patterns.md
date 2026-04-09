# Monitor Patterns

## Purpose

This file tells agents which policy patterns are valid and useful for each event family.

## Count / Error Count / Usage

Best aggregate:

- `sum`

Valid uses:

- tool failures in the last hour
- heartbeat misses in the last day
- token usage spikes in the last hour

Examples:

- `tool.errors.count` with `sum > 5` in `hour`
- `heartbeat.missed.count` with `sum > 0` in `day`
- `tokens.used` with `sum > 50000` in `hour`

## Duration

Best aggregates:

- `average`
- `p95_est`
- `p99_est`
- `max`

Examples:

- `task.duration_ms` with `average > 2000` in `hour`
- `task.duration_ms` with `p95_est > 5000` in `day`

## Value

Best aggregates:

- `average`
- `min`
- `max`
- `sum` when the stream is intentionally additive

Examples:

- `market.bitcoin.price_usd` with `max > 120000` in `hour`
- `sentiment.bitcoin.reddit.score` with `average < -0.4` in `hour`

## Gauge

Best aggregates:

- `average`
- `min`
- `max`

Examples:

- `system.queue_depth.gauge` with `max > 100` in `minute`

## Query Recipes

Use rollups for:

- last 60 minutes
- last 24 hours
- last 30 days

Do not create new event names for:

- last hour delta
- day-over-day change
- week-over-week shift

Those should be computed from rollups or analytics queries.

Canonical analytics query examples:

- last hour vs previous hour: `view=window&period=1h&previous=previous_window`
- last hour vs same hour yesterday: `view=window&period=1h&previous=previous_1d`
- last hour vs same hour last week: `view=window&period=1h&previous=previous_7d`
- last day vs same day last month: `view=window&period=1d&previous=previous_1m`
- last week vs same week last month: `view=window&period=7d&previous=previous_1m`
- last month vs previous month: `view=window&period=1m&previous=previous_window`
