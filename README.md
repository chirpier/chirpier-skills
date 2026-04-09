# Chirpier Skills

A collection of skills for AI coding agents following the Agent Skills format. These skills help OpenClaw and other agents work with Chirpier as a flat log, event, policy, alerting, and destination backend.

## Available Skills

### `chirpier`

Unified skill for sending flat Chirpier events, reading event definitions, creating policies, querying rollups, inspecting alerts, and testing destinations. This is the default skill most agents should use first.

Reference files:
- `references/event-taxonomy.md` - Canonical event naming grammar, event logging shape guidance, and analytics window conventions
- `references/monitor-patterns.md` - Recommended policy recipes by event type
- `references/gotchas.md` - Flat-model rules, common mistakes, and debugging notes
- `references/testing-checklists.md` - OpenClaw integration and rollout checklist
- `references/operator-prompts.md` - Guided and natural-mode prompts for OpenClaw
- `references/failure-recovery.md` - How to recover from invalid policies, bad configs, and delivery failures

### `chirpier-monitoring`

Focused skill for turning observed behavior into Chirpier logging and policies. Best for market monitoring, workflow monitoring, tool failures, latency tracking, and sentiment monitoring.

Reference files:
- `playbooks/bitcoin-price-monitor.md`
- `playbooks/bitcoin-reddit-sentiment.md`
- `playbooks/tool-error-rate.md`
- `playbooks/task-latency.md`

### `chirpier-destinations`

Skill for setting up, validating, and testing outbound destinations including webhook, Slack, Discord, Telegram, and email.

Reference files:
- `references/destinations.md`
- `references/delivery-history.md`

### `chirpier-alert-triage`

Skill for reading active alerts, inspecting deliveries, acknowledging, resolving, archiving, and validating whether alert behavior matches expected logging values.

Reference files:
- `references/delivery-history.md`
- `references/testing-checklists.md`

## Installation

```bash
# Install all skills
npx skills @chirpier/chirpier-skills

# Install individual skills
npx skills @chirpier/chirpier-skills/chirpier
npx skills @chirpier/chirpier-skills/chirpier-monitoring
npx skills @chirpier/chirpier-skills/chirpier-destinations
npx skills @chirpier/chirpier-skills/chirpier-alert-triage
```

## Usage

Skills should activate when an agent is asked to do tasks like:

- "Send OpenClaw task duration and error events to Chirpier"
- "Create a policy for OpenClaw tool failures in the last hour"
- "Show me Bitcoin price rollups for the last 24 hours"
- "Analyze Reddit sentiment about Bitcoin and alert if sentiment drops"
- "Set up a Slack destination for Chirpier alerts"
- "Test my Telegram destination and inspect delivery history"

## Embed Guidance

- prefer bare `<ChirpierChart />` usage in examples and generated code
- wrap the chart only for host-specific layout like cards, headings, placeholders, or branded empty states
- prefer a single `CHIRPIER_EMBEDS_JSON` config for multiple embeds instead of many separate env vars
- keep share-scoped tokens server-side unless they are intentionally public to the browser

## Recommended Testing Modes

### Guided Mode

Start here first.

- explicitly tell OpenClaw to use `chirpier-skills`
- verify canonical event names, valid policy aggregates, analytics window queries, and destination test flows
- compare behavior against `references/testing-checklists.md`

### Natural Mode

Use this after guided mode passes.

- give OpenClaw the same tasks without explicitly naming the skills
- confirm it still follows the same event grammar, policy rules, and delivery-history behavior

## Supported SDKs

- Node.js / TypeScript
- Python
- Go
- cURL / raw HTTP

## Prerequisites

- Chirpier/Ingres deployment with `publisher`, `consumer`, and `servicer`
- Postgres with required migrations applied
- Redis for token and queue/cache behavior
- Bearer token stored in `users.token`

## Recommended Starting Path

1. Start with the `chirpier` skill
2. Read `references/event-taxonomy.md`
3. Pick a playbook from `playbooks/`
4. Emit events first, then create policies
5. Test destinations before relying on real alert delivery

## License

MIT
