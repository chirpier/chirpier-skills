---
name: chirpier-destinations
description: Use for Chirpier destination setup, provider-specific validation, destination testing, and test-delivery inspection. Covers Slack webhooks, Discord webhooks, Telegram bots, email notifications, and custom webhook endpoints. OpenClaw is the primary trigger context, especially when routing alerts to notification channels. Use this skill when the task is destination-only or destination-test-focused. Do not use for first-pass instrumentation or for investigating an already-triggered alert when no destination change is needed.
---

# Chirpier Destinations

## Required Inputs

- `CHIRPIER_API_KEY`

## Resources

- `references/destination-rules.md`
- `references/delivery-history.md`
- `references/http-examples.md`
- `assets/destination-test-checklist.md`

## Current Resource Model

- the public resource name is `destination`
- provider types are `slack`, `discord`, `telegram`, `email`, and `webhook`
- follow the public Chirpier docs contract exactly for request fields
- do not assume older `webhook` resource naming

1. Use this skill when the user needs to create or validate an outbound Chirpier destination.
2. If `CHIRPIER_API_KEY` is missing, stop and ask for it before drafting API actions.
3. Read `references/destination-rules.md` before assuming a provider configuration is valid.
4. Read `references/delivery-history.md` for the local delivery-history contract.
5. Create the destination with the correct provider-specific fields.
6. Send a test notification immediately after creation and capture the returned `alert_id`.
7. Inspect `GET /v1.0/alerts/:alertID/deliveries?kind=test` right after the test send.
8. Trigger or inspect a real alert only after the destination test succeeds.
9. Use the default delivery history view first for real alerts. Use `kind=all` only for debugging.

## Exact Test Flow

1. Create the destination.
2. `POST /v1.0/destinations/:destinationID/test`
3. Capture the returned `alert_id`.
4. `GET /v1.0/alerts/:alertID/deliveries?kind=test`
5. Confirm delivery status, provider response, and target.

## Failure Handling

- If auth is missing, stop and ask for `CHIRPIER_API_KEY`.
- If the destination test fails, validate provider config before touching alert logic.
- If the alert never actually triggered, do not debug delivery first.
- If the task turns into instrumentation or policy design, switch back to `chirpier`.

## Success Checks

- destination creation returns a `destination_id`
- destination test returns an `alert_id`
- `kind=test` shows a delivery attempt for that `alert_id`

## Common Mistakes

- treating test delivery as proof that a real alert fired
- using `kind=all` as the default operational view
