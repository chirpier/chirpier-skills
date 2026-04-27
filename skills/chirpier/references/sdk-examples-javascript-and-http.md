# JavaScript And HTTP Examples

Use these examples when the task is clear enough to act without reading the broader docs first.

Prefer `chirpier-js` for OpenClaw unless the runtime clearly points to Python or Go.

## Preferred SDK For OpenClaw: chirpier-js

```ts
import { createClient } from "@chirpier/chirpier-js";

const client = createClient({ key: process.env.CHIRPIER_API_KEY! });

await client.log({
  agent: "openclaw.main",
  event: "tool.errors.count",
  value: 1,
  meta: { tool_name: "crm.lookup" },
});

await client.log({
  agent: "openclaw.main",
  event: "task.duration_ms",
  value: 780,
  meta: { task_name: "daily_digest" },
});

await client.flush();

const events = await client.listEvents();
const eventDefinition = events.find(
  (item) => item.agent === "openclaw.main" && item.event === "tool.errors.count",
);

if (!eventDefinition) {
  throw new Error("expected event definition for openclaw.main + tool.errors.count");
}

const EVENT_ID = eventDefinition.event_id;

const analytics = await client.getEventAnalytics(EVENT_ID, {
  view: "window",
  period: "1h",
  previous: "previous_window",
});

const policy = await client.createPolicy({
  event_id: EVENT_ID,
  title: "OpenClaw tool errors last hour",
  channel: "ops",
  period: "hour",
  aggregate: "sum",
  condition: "gt",
  threshold: 5,
  severity: "warning",
  enabled: true,
});

const destination = await client.createDestination({
  channel: "slack",
  url: "https://hooks.slack.com/services/T000/B000/secret",
  scope: "all",
  policy_ids: [],
  enabled: true,
});

const test = await client.testDestination(destination.destination_id);
await client.getAlertDeliveries(test.alert_id, { kind: "test" });

await client.shutdown();
```

## Alternate SDKs

- `chirpier-py` when the integration runtime is Python-native
- `chirpier-go` when the integrating service is Go-native
- raw HTTP when you need the universal fallback or the SDK does not fit the runtime you are modifying

## Expected Response Shapes

These are the response shapes agents need for chaining operations.

### Log write

```json
{ "status": "ok" }
```

### List events

```json
[
  {
    "event_id": "evt_abc123",
    "agent": "openclaw.main",
    "event": "tool.errors.count",
    "created_at": "2026-04-25T10:00:00Z"
  }
]
```

### Analytics

```json
{
  "event_id": "evt_abc123",
  "period": "1h",
  "current": { "sum": 12, "count": 8, "average": 1.5 },
  "previous": { "sum": 3, "count": 3, "average": 1.0 }
}
```

### Policy creation

```json
{
  "policy_id": "pol_xyz789",
  "event_id": "evt_abc123",
  "title": "OpenClaw tool errors last hour",
  "period": "hour",
  "aggregate": "sum",
  "condition": "gt",
  "threshold": 5,
  "enabled": true
}
```

### Destination creation

```json
{
  "destination_id": "dst_def456",
  "channel": "slack",
  "enabled": true
}
```

### Destination test

```json
{
  "alert_id": "alt_ghi012"
}
```

### Delivery history

```json
[
  {
    "delivery_id": "dlv_jkl345",
    "alert_id": "alt_ghi012",
    "destination_id": "dst_def456",
    "kind": "test",
    "status": "delivered",
    "provider_response": "ok"
  }
]
```

## Send Logs

```bash
curl -X POST "https://logs.chirpier.co/v1.0/logs" \
  -H "Authorization: Bearer $CHIRPIER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '[
    {
      "agent": "openclaw.main",
      "event": "tool.errors.count",
      "value": 1,
      "meta": {"tool_name": "crm.lookup"}
    }
  ]'
```

## Read Analytics

```bash
curl -G "https://api.chirpier.co/v1.0/events/$EVENT_ID/analytics" \
  -H "Authorization: Bearer $CHIRPIER_API_KEY" \
  --data-urlencode "view=window" \
  --data-urlencode "period=1h" \
  --data-urlencode "previous=previous_window"
```

## Create Policy

```bash
curl -X POST "https://api.chirpier.co/v1.0/policies" \
  -H "Authorization: Bearer $CHIRPIER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "event_id": "'$EVENT_ID'",
    "title": "OpenClaw tool errors last hour",
    "channel": "ops",
    "period": "hour",
    "aggregate": "sum",
    "condition": "gt",
    "threshold": 5,
    "severity": "warning",
    "enabled": true
  }'
```

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

## Success Checks

- log write returns `200`
- event lookup returns the expected `event_id` for the `agent + event` pair
- analytics query returns the expected response shape
- policy creation returns a `policy_id`
- destination test returns an `alert_id`
- the SDK path can perform logs plus analytics, policy creation, and destination testing in the same runtime
