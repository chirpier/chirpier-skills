# Bitcoin Reddit Sentiment

## Goal

Track Reddit sentiment about Bitcoin and alert when sentiment drops or negative volume spikes.

## Canonical Events

- `sentiment.bitcoin.reddit.score`
- `sentiment.bitcoin.reddit.positive.count`
- `sentiment.bitcoin.reddit.negative.count`
- `sentiment.bitcoin.reddit.post_volume.count`

## Example Events

```json
{
  "agent": "openclaw.sentiment-watcher",
  "event": "sentiment.bitcoin.reddit.score",
  "value": -0.62,
  "meta": {
    "source": "reddit",
    "query": "bitcoin OR btc"
  }
}
```

```json
{
  "agent": "openclaw.sentiment-watcher",
  "event": "sentiment.bitcoin.reddit.negative.count",
  "value": 143,
  "meta": {
    "source": "reddit"
  }
}
```

## Example Monitors

- alert if `sentiment.bitcoin.reddit.score` `average < -0.4` in `hour`
- alert if `sentiment.bitcoin.reddit.negative.count` `sum > 100` in `hour`
- alert if `sentiment.bitcoin.reddit.post_volume.count` `sum > 500` in `day`

## Good Practice

- emit aggregate sentiment scores, not raw text
- use event names for the stream, not the window
- keep query terms in `meta`
