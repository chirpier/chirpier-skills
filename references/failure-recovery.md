# Failure Recovery

## Invalid Policy Aggregates

If policy creation fails:

1. inspect the event definition
2. inspect the raw stream shape
3. switch to an aggregate that matches the stream behavior

Examples:

- `tool.errors.count` -> use `sum`, not `p95_est`
- `task.duration_ms` -> use `average` or `p95_est`, not `count`

## Invalid Periods

If rollup reads fail:

- use only `minute`, `hour`, or `day`
- do not use plural values like `minutes`
- do not use UI shortcuts like `30d` in backend rollup APIs

## Invalid Analytics Queries

- use analytics `period` values `1h`, `1d`, `7d`, or `1m`
- use the `previous` query key, not `compare`
- use only supported values like `previous_window`, `previous_1d`, `previous_7d`, and `previous_1m`

## Bad Destination Configs

- Slack: verify a valid Slack webhook URL
- Discord: verify a valid Discord webhook URL containing `/webhooks/`
- Telegram: verify `bot_token` and `chat_id`
- Generic webhook: verify an absolute URL and optional authorization header

## Delivery Debugging

- default delivery history shows real alerts only
- use `kind=test` after destination testing
- use `kind=all` if you need both real and test sends

## Event Taxonomy Drift

If OpenClaw proposes a new event name:

1. check `references/event-taxonomy.md`
2. prefer existing canonical streams
3. if a new stream is required, keep the `domain.subject.measure[.suffix]` grammar
4. do not add time windows to event names
