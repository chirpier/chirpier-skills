# Go SDK Examples

Use these examples when the integrating service is clearly Go-native.

```go
ctx := context.Background()

client, err := chirpier.NewClient(chirpier.Options{Key: "chp_your_api_key"})
if err != nil {
    return err
}
defer client.Close(ctx)

if err := client.Log(ctx, chirpier.Log{
    Agent: "openclaw.main",
    Event: "tool.errors.count",
    Value: 1,
    Meta: map[string]any{"tool_name": "crm.lookup"},
}); err != nil {
    return err
}

if err := client.Log(ctx, chirpier.Log{
    Agent: "openclaw.main",
    Event: "task.duration_ms",
    Value: 780,
    Meta: map[string]any{"task_name": "daily_digest"},
}); err != nil {
    return err
}

if err := client.Flush(ctx); err != nil {
    return err
}

events, err := client.ListEvents(ctx)
if err != nil {
    return err
}

var eventID string
for _, item := range events {
    if item.Agent == "openclaw.main" && item.Event == "tool.errors.count" {
        eventID = item.EventID
        break
    }
}

if eventID == "" {
    return fmt.Errorf("expected event definition for openclaw.main + tool.errors.count")
}

analytics, err := client.GetEventAnalytics(ctx, eventID, chirpier.AnalyticsWindowQuery{
    View:     "window",
    Period:   "1h",
    Previous: "previous_window",
})
if err != nil {
    return err
}

policy, err := client.CreatePolicy(ctx, chirpier.Policy{
    EventID:   eventID,
    Title:     "OpenClaw tool errors last hour",
    Channel:   "ops",
    Period:    "hour",
    Aggregate: "sum",
    Condition: "gt",
    Threshold: 5,
    Severity:  "warning",
    Enabled:   true,
})
if err != nil {
    return err
}

destination, err := client.CreateDestination(ctx, chirpier.Destination{
    Channel: "slack",
    URL:     "https://hooks.slack.com/services/T000/B000/secret",
    Scope:   "all",
    PolicyIDs: []string{},
    Enabled: true,
})
if err != nil {
    return err
}

test, err := client.TestDestination(ctx, destination.DestinationID)
if err != nil {
    return err
}

deliveries, err := client.GetAlertDeliveries(ctx, test.AlertID, 0, 0, "test")
if err != nil {
    return err
}

_, _, _ = analytics, policy, deliveries
```

## Success Checks

- event lookup returns the expected `event_id` for the `agent + event` pair
- analytics query returns the expected response shape
- policy creation returns a `policy_id`
- destination test returns an `alert_id`
