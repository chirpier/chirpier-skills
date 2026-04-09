# Chirpier

Use this skill when an agent needs to send Chirpier log events, create policies, inspect alerts, query rollups, or test destinations.

## Rules

- Use flat event names; event names are the schema
- Use the grammar from `references/event-taxonomy.md`
- Prefer canonical OpenClaw logging names before inventing new names
- Use policy/query windows, not time-window suffixes in event names
- Treat `meta` as inspection-only in v1

## Workflow

1. Identify the raw event logs to emit
2. Emit canonical event names with optional agent name
3. Read event definitions if needed
4. Create a policy using an aggregate that matches the raw event log shape
5. Read rollups and alerts for validation
6. Test destinations before relying on real delivery

## Guided Mode

When a user explicitly mentions `chirpier-skills`, follow this strict sequence:

1. choose canonical event names from `references/event-taxonomy.md`
2. log events first
3. verify event definitions exist
4. create only valid policies using `references/monitor-patterns.md`
5. inspect rollups with `minute`, `hour`, or `day`
6. use analytics windows with `previous` when you need explicit comparisons
7. test destinations and inspect `kind=test` delivery history

## Natural Mode

If the user does not explicitly mention skills but the task is clearly about Chirpier policy automation or alerting:

- apply the same contract implicitly
- do not invent time-window event names
- do not rely on `meta` as a first-class analytical filter
- do not rely on stored semantic-class or default-aggregate behavior
- use `kind=all` only for debugging

## Recovery Rules

- if a destination test fails, inspect destination validation and delivery history before retrying
- if rollup queries fail, verify the period value is exactly `minute`, `hour`, or `day`
- if analytics queries fail, verify `previous` is used instead of `compare`

## Embed Guidance

- prefer bare `<ChirpierChart />` usage when generating React embed examples
- only add wrapper components when the host app needs its own title, card, placeholder, or branded fallback
- prefer `CHIRPIER_EMBEDS_JSON` for multiple embed configurations
- keep share tokens server-side unless the embed is intentionally public

## Read First

- `references/event-taxonomy.md`
- `references/monitor-patterns.md`
- `references/gotchas.md`
- `references/operator-prompts.md`
- `references/failure-recovery.md`
