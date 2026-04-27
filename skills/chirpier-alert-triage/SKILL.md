---
name: chirpier-alert-triage
description: Use for investigation, acknowledgement, resolution, archiving, and explanation of existing Chirpier alerts. Covers incident response, on-call triage, alert lifecycle management, and delivery debugging. OpenClaw is the primary trigger context, especially for tool-error, latency, token-usage, and heartbeat alerts. Use this skill only when an alert already exists and the task is to investigate alert behavior, delivery, or lifecycle state. Do not use for destination setup, first-pass instrumentation, or policy creation without an existing alert.
---

# Chirpier Alert Triage

## Required Inputs

- `CHIRPIER_API_KEY`

## Resources

- `references/triage-loop.md`
- `references/delivery-history.md`
- `assets/openclaw-triage-questions.md`

1. Use this skill only when an alert already exists and the job is to investigate or change alert state.
2. If `CHIRPIER_API_KEY` is missing, stop and ask for it before drafting API actions.
3. Open the current alert and inspect the related event definition and policy first.
4. Read `references/triage-loop.md` and follow the sequence exactly.
5. Read `references/delivery-history.md` for the local delivery-history contract.
6. Inspect recent rollups for the same signal before changing the policy.
7. Use the default delivery history view first for real-alert investigation.
8. Use `kind=test` only when checking destination setup behavior. Use `kind=all` only for debugging.
9. Acknowledge when someone owns the issue. Resolve or archive only after the event behavior is understood.
10. If the alert is OpenClaw-related, use `assets/openclaw-triage-questions.md` to guide the investigation.

## Failure Handling

- If auth is missing, stop and ask for `CHIRPIER_API_KEY`.
- If the alert never actually triggered, do not debug delivery first.
- If the task becomes destination setup or destination testing, switch to `chirpier-destinations`.
- If the task becomes instrumentation, naming, or policy design, switch back to `chirpier`.

## Success Checks

- the related policy has been inspected
- recent rollups have been checked before any state change
- delivery history has been checked before blaming the destination

## Common Mistakes

- changing the policy before checking recent rollups
- starting with `kind=all` instead of the default delivery history view
- assuming a destination problem when the alert never triggered
