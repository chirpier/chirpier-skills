# chirpier-alert-triage

Use this skill when an agent needs to inspect, acknowledge, resolve, archive, or explain Chirpier alerts.

## Workflow

1. Read active alerts
2. Inspect recent rollups for the event stream
3. Inspect alert delivery history with `kind=alert`
4. Acknowledge if the issue is being worked on
5. Resolve when the stream returns to expected behavior
6. Archive when historical cleanup is needed

## Guided Questions

Ask and answer these during triage:

- did the event name match the canonical taxonomy?
- did the policy use an aggregate that matches the raw stream shape?
- did the destination deliver a real alert, a test alert, or both?
- does the current rollup period match the operational question?

## Failure Recovery

- if no delivery is visible, check `kind=all`
- if only tests appear, verify a real alert was actually triggered
- if alert values look wrong, inspect the rollup period before changing policies

## Read First

- `references/delivery-history.md`
- `references/testing-checklists.md`
- `references/operator-prompts.md`
