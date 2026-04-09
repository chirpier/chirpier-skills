# Bitcoin Price Monitor

## Goal

Track Bitcoin price and alert when hourly or daily thresholds are crossed.

## Canonical Events

- `market.bitcoin.price_usd`
- `market.bitcoin.volume_usd`

## Why These Events

- keep event names raw and stable
- compute hourly or daily changes from rollups, not event names

## Example Event

```json
{
  "agent": "openclaw.market-watcher",
  "event": "market.bitcoin.price_usd",
  "value": 68421.12,
  "meta": {
    "source": "coingecko",
    "pair": "BTC/USD"
  }
}
```

## Example Monitors

- alert if `market.bitcoin.price_usd` `max > 120000` in `hour`
- alert if `market.bitcoin.price_usd` `min < 50000` in `hour`
- alert if `market.bitcoin.volume_usd` `sum > 1000000000` in `day`

## Example Query Flow

1. read the event definition for `market.bitcoin.price_usd`
2. query `hour` rollups for the last 24 windows
3. use analytics window queries like `view=window&period=1h&previous=previous_window` for explicit hour-over-hour comparison

## Good Practice

- do not emit `market.bitcoin.price_change_pct_1h`
- compute price change from `market.bitcoin.price_usd` rollups
