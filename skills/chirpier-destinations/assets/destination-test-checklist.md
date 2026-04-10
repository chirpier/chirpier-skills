# Destination Test Checklist

1. Create the destination.
2. Confirm the provider-specific config is valid.
3. Send a test notification and capture the returned `alert_id`.
4. Inspect `GET /v1.0/alerts/:alertID/deliveries?kind=test`.
5. Trigger one real alert.
6. Inspect the default delivery history view.
7. Check policy and destination configuration if the real alert did not deliver.
