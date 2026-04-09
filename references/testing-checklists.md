# Testing Checklists

## OpenClaw Integration Checklist

1. Verify the same bearer token works for ingest and servicer APIs
2. Send canonical OpenClaw events
3. Confirm event auto-registration
4. Create valid and invalid policies
5. Trigger alerts
6. Test lifecycle transitions
7. Test destinations
8. Inspect delivery history for `alert`, `test`, and `all`

## Guided Mode Checklist

1. Explicitly tell OpenClaw to use `chirpier-skills`
2. Verify canonical event names are used without drift
3. Verify allowed policy aggregates are chosen correctly
4. Verify destination testing uses `kind=test`

## Natural Mode Checklist

1. Remove explicit mention of `chirpier-skills`
2. Repeat the same scenarios
3. Verify OpenClaw still uses canonical names and periods
4. Verify OpenClaw still avoids time-window event names

## Smoke Test Streams

- `tool.errors.count`
- `task.duration_ms`
- `tokens.used`
- `heartbeat.missed.count`
- `market.bitcoin.price_usd`
- `sentiment.bitcoin.reddit.score`

## Go / No-Go

Ship to broader testing if:

- auth works
- event registration works
- policy validation works
- alerts trigger
- at least one real destination works
- delivery history behaves correctly
