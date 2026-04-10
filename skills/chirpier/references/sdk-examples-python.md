# Python SDK Examples

Use these examples when the integration runtime is clearly Python-native.

```python
from chirpier import Log, new_client

client = new_client(api_key="chp_your_api_key")

client.log(
    Log(
        agent="openclaw.main",
        event="tool.errors.count",
        value=1,
        meta={"tool_name": "crm.lookup"},
    )
)

client.log(
    Log(
        agent="openclaw.main",
        event="task.duration_ms",
        value=780,
        meta={"task_name": "daily_digest"},
    )
)

client.flush()

events = client.list_events()
event_definition = next(
    (
        item
        for item in events
        if item.get("agent") == "openclaw.main"
        and item.get("event") == "tool.errors.count"
    ),
    None,
)

if not event_definition:
    raise RuntimeError("expected event definition for openclaw.main + tool.errors.count")

event_id = event_definition["event_id"]

analytics = client.get_event_analytics(
    event_id,
    view="window",
    period="1h",
    previous="previous_window",
)

policy = client.create_policy(
    {
        "event_id": event_id,
        "title": "OpenClaw tool errors last hour",
        "channel": "ops",
        "period": "hour",
        "aggregate": "sum",
        "condition": "gt",
        "threshold": 5,
        "severity": "warning",
        "enabled": True,
    }
)

destination = client.create_destination(
    {
        "channel": "slack",
        "url": "https://hooks.slack.com/services/T000/B000/secret",
        "scope": "all",
        "policy_ids": [],
        "enabled": True,
    }
)

test = client.test_destination(destination["destination_id"])
deliveries = client.get_alert_deliveries(test["alert_id"], kind="test")

client.close()
```

## Success Checks

- event lookup returns the expected `event_id` for the `agent + event` pair
- analytics query returns the expected response shape
- policy creation returns a `policy_id`
- destination test returns an `alert_id`
