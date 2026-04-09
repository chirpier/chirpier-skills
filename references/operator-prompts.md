# Operator Prompts

## Guided Mode Prompts

Use these when you want OpenClaw to explicitly follow `chirpier-skills`.

- "Use chirpier-skills to emit canonical OpenClaw task duration and tool error events to Chirpier."
- "Use chirpier-skills to create a valid policy for OpenClaw tool failures in the last hour."
- "Use chirpier-skills to set up a Slack destination, send a test notification, and inspect test delivery history."
- "Use chirpier-skills to analyze Bitcoin price in Chirpier without inventing time-window event names."
- "Use chirpier-skills to analyze Reddit sentiment about Bitcoin and alert on negative sentiment."

## Natural Mode Prompts

Use these after guided mode passes.

- "Track OpenClaw tool failures and task latency in Chirpier."
- "Set up Bitcoin price monitoring with Chirpier and alert me if price spikes."
- "Inspect the last alert and tell me whether delivery worked."

## Expected Behavior

- OpenClaw should emit canonical event names
- OpenClaw should use `minute`, `hour`, or `day` periods only
- OpenClaw should choose policy aggregates based on the raw stream shape
- OpenClaw should use `previous` for analytics comparisons and valid window values like `previous_window` or `previous_7d`
- OpenClaw should use `kind=test` or `kind=all` appropriately during destination validation
