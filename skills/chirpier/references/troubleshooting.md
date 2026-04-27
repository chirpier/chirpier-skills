# Troubleshooting

Use this file when Chirpier operations succeed (HTTP 200) but the expected outcome does not appear. For HTTP errors, see `error-codes.md`. For validation failures, see `failure-recovery.md`.

## Logs accepted but event definition not appearing

**Symptoms:** `POST /v1.0/logs` returns 200 but `GET /v1.0/events` does not list the event.

**Checks:**
1. Wait a few seconds — event definitions are created asynchronously after the first log lands.
2. Call `client.flush()` (or equivalent) before querying events. Logs may still be buffered.
3. Verify the exact `agent` and `event` strings match between your log and your query.
4. Remember event identity is `agent + event` — a typo in either field creates a new definition.

## Policy never triggers

**Symptoms:** Policy exists and events are being emitted, but no alerts fire.

**Checks:**
1. Verify the `event_id` on the policy matches the correct event definition.
2. Check that the aggregate matches the stream shape (e.g., `sum` for counts, `average` for latency).
3. Review the threshold — use analytics to see current values before setting thresholds.
4. Confirm the rollup period is appropriate. A `day` period only evaluates once per day.
5. Ensure `enabled: true` on the policy.
6. Emit enough data points to produce a meaningful rollup value.

## Analytics comparison returns empty

**Symptoms:** `GET /v1.0/events/:eventID/analytics` returns 200 but data is empty or zeroed.

**Checks:**
1. Confirm data exists in the requested window. A `1h` window needs data from the last hour.
2. Check that the event is not brand new — it needs at least one full period of data.
3. Verify the `period` uses analytics format (`1h`, `1d`, `7d`, `1m`), not rollup format.
4. Ensure `previous` is set if you want a comparison (e.g., `previous=previous_window`).

## Destination test succeeds but real alerts do not deliver

**Symptoms:** `POST /v1.0/destinations/:destinationID/test` works, but triggered alerts never arrive.

**Checks:**
1. Confirm the alert actually triggered — check `GET /v1.0/alerts` for recent alerts.
2. If no alert exists, the issue is with the policy, not the destination.
3. Check `GET /v1.0/alerts/:alertID/deliveries` (default view) for delivery attempts.
4. Verify the destination `scope` and `policy_ids` include the relevant policy.
5. Check `enabled: true` on both the policy and the destination.

## Duplicate event definitions

**Symptoms:** Two event definitions exist for what should be the same stream.

**Checks:**
1. Compare `agent` strings exactly — `openclaw.main` and `openclaw_main` are different identities.
2. Compare `event` strings exactly — `tool.errors.count` and `tool.error.count` are different events.
3. Standardize on a canonical name and stop emitting to the incorrect one.
4. Policies and analytics must reference the correct `event_id`.

## Rollup values seem wrong

**Symptoms:** Rollup aggregates do not match expected values.

**Checks:**
1. Verify the aggregate matches the stream shape. `sum` on a latency stream produces a meaningless total.
2. Check that the rollup period aligns with your data emission rate. An `hour` rollup with one data point per day will show sparse results.
3. Remember that `p95_est` and `p99_est` need a meaningful sample size within the period.
