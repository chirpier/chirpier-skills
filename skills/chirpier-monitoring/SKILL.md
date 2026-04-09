# chirpier-monitoring

Use this skill when OpenClaw is monitoring workflows, market data, sentiment, or tool behavior and needs to convert observations into Chirpier event streams and policies.

## Rules

- Emit raw scalar streams
- Avoid derived time-window names
- Use rollups for hourly/daily comparison logic
- Choose policy aggregates according to raw stream behavior

## Execution Pattern

1. identify the stable raw stream
2. emit a canonical event name
3. create a policy only after the event definition exists
4. use `hour` or `day` rollups for comparisons rather than inventing derived event names
5. use analytics windows with `previous` for explicit last-hour / last-day / last-week / last-month comparisons
6. keep source/query/task details in `meta` for inspection only

## Failure Recovery

- if you are tempted to create names like `price_change_pct_1h`, stop and use rollup comparison logic instead
- if `value` streams need thresholding, prefer `average`, `min`, or `max` unless the stream is intentionally additive
- if sentiment workflows drift toward raw text storage, collapse them back into aggregate scalar events

## Preferred Playbooks

- `playbooks/bitcoin-price-monitor.md`
- `playbooks/bitcoin-reddit-sentiment.md`
- `playbooks/tool-error-rate.md`
- `playbooks/task-latency.md`
