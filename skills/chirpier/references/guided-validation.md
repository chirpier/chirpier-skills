# Guided Validation

Use this file for the first end-to-end OpenClaw pass.

1. Export `CHIRPIER_API_KEY`.
2. Explicitly tell OpenClaw to use `chirpier-skills`.
3. Emit canonical events:
   - `tool.errors.count`
   - `task.duration_ms`
   - `tokens.used`
   - `heartbeat.missed.count`
4. Confirm Chirpier auto-registers the event definitions.
5. Create one valid policy and one intentionally invalid policy.
6. Inspect rollups using `minute`, `hour`, and `day`.
7. Run one analytics comparison with `GET /v1.0/events/:eventID/analytics` using `view=window`, a valid `period`, and `previous=...`.
8. Configure a destination and send a test notification.
9. Inspect delivery history with `kind=test`.
10. Trigger a real alert and inspect the default delivery history view.
11. Confirm the event can be handed to a human through the public dashboard page when public sharing is enabled.

## Pass Criteria

- OpenClaw uses canonical event names.
- OpenClaw preserves the `agent + event` identity model.
- OpenClaw uses rollup and policy periods `minute`, `hour`, or `day` only.
- OpenClaw uses analytics window periods `1h`, `1d`, `7d`, or `1m` only.
- OpenClaw chooses aggregates that match raw stream shape.
- OpenClaw uses `kind=test` after destination tests.
- OpenClaw uses the default delivery history view for real alert investigation.
- OpenClaw can direct a human to the public dashboard page for trend inspection.

## Natural Mode Follow-Up

Repeat the same scenarios without explicitly naming the skills. Verify the contract stays the same.
