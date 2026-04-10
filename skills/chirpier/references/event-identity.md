# Event Identity

Use this file whenever the task involves choosing, reviewing, or extending Chirpier events.

## Core Rule

The unique event definition identity is the combination of `agent` and `event`.

- `agent` is the stable producer identity.
- `event` is the stable canonical event name.
- Reuse stable `agent + event` pairs instead of inventing one-off streams.

## Naming Grammar

Use:

`domain.subject.measure[.suffix]`

Good examples:

- `tool.errors.count`
- `tool.calls.count`
- `task.duration_ms`
- `tokens.used`
- `heartbeat.missed.count`
- `market.bitcoin.price_usd`
- `sentiment.bitcoin.reddit.score`

Bad examples:

- `tool.errors.last_hour`
- `market.bitcoin.price_change_pct_1h`
- `reddit_sentiment_today`

## OpenClaw-Primary Streams

OpenClaw is the primary trigger context for this skill. Prefer these existing streams first:

- `tool.errors.count`
- `tool.calls.count`
- `task.duration_ms`
- `tokens.used`
- `heartbeat.missed.count`

## Meta Contract

Use `meta` for inspection context like:

- `tool_name`
- `task_name`
- `workflow`
- `source`
- `query`

Do not use `meta` as the primary analytical or alert-routing contract in v1.
