# Golden Path

Use this repo-level walkthrough for one complete first pass.

Prefer `chirpier-js` for OpenClaw when code changes are happening in a JavaScript or TypeScript runtime. Use the HTTP examples in the skill references when shell automation or a non-SDK runtime is the better fit.

1. Export `CHIRPIER_API_KEY`.
2. Send one canonical log with the preferred SDK or the HTTP fallback.
3. Confirm the event definition exists under the stable `agent + event` identity.
4. Run one analytics comparison.
5. Create one policy with a valid rollup period and aggregate.
6. Create one destination.
7. Test the destination and capture the returned `alert_id`.
8. Inspect `GET /v1.0/alerts/:alertID/deliveries?kind=test` or the matching SDK helper.
9. Trigger one real alert and inspect the default delivery-history view.
10. If the event is public, hand the human the public dashboard page.

## Minimum Success

- one log is accepted
- one event definition appears
- one analytics query succeeds
- one policy is created
- one destination test returns an `alert_id`
- one `kind=test` delivery record exists

## SDK Path For OpenClaw

Use `chirpier-js` first when OpenClaw is in a JS or TS runtime.

```ts
import { createClient } from "@chirpier/chirpier-js";

const client = createClient({ key: process.env.CHIRPIER_API_KEY! });

await client.log({
  agent: "openclaw.main",
  event: "tool.errors.count",
  value: 1,
  meta: { tool_name: "crm.lookup" },
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

await client.getEventAnalytics(EVENT_ID, {
  view: "window",
  period: "1h",
  previous: "previous_window",
});

await client.createPolicy({
  event_id: EVENT_ID,
  title: "OpenClaw tool errors spike",
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
  enabled: true,
});

const test = await client.testDestination(destination.destination_id);
await client.getAlertDeliveries(test.alert_id, { kind: "test" });
```

Then use `skills/chirpier/references/sdk-examples-javascript-and-http.md` when shell automation or a non-SDK runtime is the better fit.
