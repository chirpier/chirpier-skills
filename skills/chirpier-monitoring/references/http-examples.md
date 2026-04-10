# HTTP Examples

## Analytics Comparison

```bash
curl -G "https://api.chirpier.co/v1.0/events/$EVENT_ID/analytics" \
  -H "Authorization: Bearer $CHIRPIER_API_KEY" \
  --data-urlencode "view=window" \
  --data-urlencode "period=1h" \
  --data-urlencode "previous=previous_1d"
```

## Success Checks

- analytics query returns `200`
- the response includes current and previous window data
