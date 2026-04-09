# Event Taxonomy

## Purpose

This file defines the canonical event naming grammar for Chirpier when used with OpenClaw.

## Core Rule

Event name, and optional agent name, are the schema.

- Use event name and optional agent name for stable event logging identity
- Use monitor/query windows for time comparisons
- Do not encode time windows into event names
- `meta` is inspection-only in v1

## Naming Grammar

Use:

`domain.subject.measure[.suffix]`

Examples:

- `tool.errors.count`
- `tool.calls.count`
- `task.duration_ms`
- `tokens.used`
- `heartbeat.missed.count`
- `market.bitcoin.price_usd`
- `sentiment.bitcoin.reddit.score`

## What Not To Do

Avoid event names like:

- `market.bitcoin.price_change_pct_1h`
- `tool.errors.last_hour`
- `reddit_sentiment_today`

Those are queries or monitor semantics, not stream names.

## Recommended Aggregates By Stream Shape

Ingres v1 no longer relies on event-level semantic classes or stored default aggregates. Choose aggregates deliberately based on the raw stream shape:

- `*.count`, `*.errors.count`, `*.used` -> usually `sum`; sometimes `count` when you need sample volume
- `*.duration_ms` -> usually `average`, `p95_est`, `p99_est`, or `max`
- `*.score`, `*.price_usd` -> usually `average`, `min`, or `max`
- `*.gauge` -> usually `average`, `min`, or `max`
- unknown suffix -> use `sum` only if the stream is intentionally additive

## Analytics Window Conventions

When you need comparisons, query analytics windows instead of inventing derived event names:

- `view=window&period=1h&previous=previous_window`
- `view=window&period=1h&previous=previous_1d`
- `view=window&period=1h&previous=previous_7d`
- `view=window&period=1h&previous=previous_1m`
- `view=window&period=1d&previous=previous_window`
- `view=window&period=1d&previous=previous_7d`
- `view=window&period=1d&previous=previous_1m`
- `view=window&period=7d&previous=previous_window`
- `view=window&period=7d&previous=previous_1m`
- `view=window&period=1m&previous=previous_window`

## Canonical OpenClaw Streams

Agent monitoring:

- `tool.errors.count`
- `tool.calls.count`
- `task.duration_ms`
- `tokens.used`
- `heartbeat.missed.count`

Market monitoring:

- `market.bitcoin.price_usd`
- `market.bitcoin.volume_usd`
- `market.bitcoin.sentiment_score`

Sentiment monitoring:

- `sentiment.bitcoin.reddit.score`
- `sentiment.bitcoin.reddit.positive.count`
- `sentiment.bitcoin.reddit.negative.count`
- `sentiment.bitcoin.reddit.post_volume.count`

## Meta Guidance

Good `meta` examples:

- `tool_name`
- `task_name`
- `workflow`
- `source`
- `query`

Do not rely on `meta` for monitor grouping or alert semantics in v1.
