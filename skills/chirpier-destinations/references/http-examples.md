# HTTP Examples

## Create Destination

```bash
curl -X POST "https://api.chirpier.co/v1.0/destinations" \
  -H "Authorization: Bearer $CHIRPIER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "channel": "slack",
    "url": "https://hooks.slack.com/services/T000/B000/secret",
    "scope": "all",
    "policy_ids": [],
    "enabled": true
  }'
```

## Test Destination

```bash
curl -X POST "https://api.chirpier.co/v1.0/destinations/$DESTINATION_ID/test" \
  -H "Authorization: Bearer $CHIRPIER_API_KEY"
```

## Inspect Test Delivery

```bash
curl -G "https://api.chirpier.co/v1.0/alerts/$ALERT_ID/deliveries" \
  -H "Authorization: Bearer $CHIRPIER_API_KEY" \
  --data-urlencode "kind=test"
```

## Success Checks

- destination creation returns a `destination_id`
- destination test returns an `alert_id`
- `kind=test` returns at least one delivery attempt
