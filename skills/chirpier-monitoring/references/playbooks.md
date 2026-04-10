# Monitoring Playbooks

Start from one of these four OpenClaw jobs:

1. log a stable stream
2. compare recent windows with analytics
3. create a policy and destination when a threshold matters
4. direct humans to the public dashboard page for trends

## OpenClaw Agent Ops

Use these first:

- `tool.errors.count`
- `tool.calls.count`
- `task.duration_ms`
- `tokens.used`
- `heartbeat.missed.count`

Starter policies:

- `tool.errors.count` with `sum > 5` in `hour`
- `task.duration_ms` with `average > 2000` in `hour`
- `heartbeat.missed.count` with `sum > 0` in `day`

Starter analytics checks:

- `tool.errors.count` last hour vs previous hour
- `task.duration_ms` last hour vs same hour yesterday
- `tokens.used` last day vs previous day

Human handoff:

- make the event public and share the public dashboard page for trend inspection

## Market Monitoring

Use:

- `market.bitcoin.price_usd`
- `market.bitcoin.volume_usd`

Starter policies:

- `market.bitcoin.price_usd` with `max > 120000` in `hour`
- `market.bitcoin.volume_usd` with `average > 500000000` in `hour`

## Sentiment Monitoring

Use:

- `sentiment.bitcoin.reddit.score`
- `sentiment.bitcoin.reddit.positive.count`
- `sentiment.bitcoin.reddit.negative.count`
- `sentiment.bitcoin.reddit.post_volume.count`

Starter policy:

- `sentiment.bitcoin.reddit.score` with `average < -0.4` in `hour`

## Extension Rule

If a new workload is needed:

1. keep the raw stream scalar
2. preserve `agent + event` identity
3. reuse the canonical naming grammar
4. use rollups or analytics windows for comparisons
