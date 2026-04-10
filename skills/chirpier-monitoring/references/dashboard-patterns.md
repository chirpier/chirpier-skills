# Dashboard Patterns

Build one small dashboard before creating many policies.

## Recommended First Dashboard

- `tool.errors.count` by hour with `sum`
- `task.duration_ms` by hour with `average`
- `task.duration_ms` by day with `p95_est`
- `tokens.used` by hour with `sum`
- `heartbeat.missed.count` by day with `sum`

## Why This Works

This gives a fast operational pass across:

- reliability
- latency
- cost
- liveness

## Follow-Up Dashboards

- per-tool reliability
- per-workflow latency
- market movement
- sentiment trends

## Public Dashboard Page Handoff

When the goal is human trend visibility:

1. make the event public
2. confirm the event has a share token
3. direct the user to the public dashboard page for the event

Use the public dashboard page when the human should inspect trends directly instead of waiting for an alert.
