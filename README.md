# Chirpier Skills

Self-contained Agent Skills for working with Chirpier.

`chirpier/docs` is the canonical public contract. `chirpier-skills` is the operational execution layer optimized for agents. If the two ever diverge, follow `docs`.

These skills are optimized for OpenClaw-style agent workflows. They are not a replacement for the full Chirpier API docs. Use them as operational decision support for agents, with a few concrete API and SDK examples for the most common first actions.

The core `chirpier` skill now includes ready-to-run examples for JavaScript, Python, and Go, plus HTTP fallbacks when shell automation is a better fit.

## Install

```bash
npx skills @chirpier/chirpier-skills
```

## Skills

| Skill | Purpose |
| --- | --- |
| `chirpier` | Core Chirpier contract for event identity, instrumentation, rollups, analytics windows, policies, and guided validation |
| `chirpier-monitoring` | Workload playbooks for recurring comparisons, charts, public dashboard pages, and policies |
| `chirpier-destinations` | Destination setup, provider-specific validation, and delivery-history checks after tests |
| `chirpier-alert-triage` | Investigation and lifecycle handling for existing alerts |

## Design Rules

- treat the unique event definition identity as `agent + event`
- keep each skill self-contained under its own `references/`, `assets/`, and optional `scripts/`
- prefer the selected skill's local instructions and resources first; fall back to repo-level guidance only when needed
- use backend rollup and policy periods `minute`, `hour`, `day`
- use analytics window periods `1h`, `1d`, `7d`, `1m`
- use `destination` as the resource name and `webhook` only as a provider type
- use `public dashboard page` consistently for the hosted human-facing trend surface
- use the default delivery history view for real alerts, `kind=test` after destination tests, and `kind=all` only for debugging

## Recommended Entry Path

1. Start with `chirpier`.
2. Follow the guided validation flow for the first OpenClaw integration pass.
3. Move to `chirpier-monitoring`, `chirpier-destinations`, or `chirpier-alert-triage` only when the task is clearly narrower than the core contract.

## Golden Path

See `golden-path.md` for one end-to-end flow covering logs, analytics, policies, destinations, delivery inspection, and public dashboard page handoff.

For runtime-specific examples, start with the core skill references:

- `skills/chirpier/references/sdk-examples-javascript-and-http.md`
- `skills/chirpier/references/sdk-examples-python.md`
- `skills/chirpier/references/sdk-examples-go.md`

## SDK Choice

See `sdk-guidance.md`.

- prefer `chirpier-js` for OpenClaw by default
- use `chirpier-py` when the runtime is clearly Python-native
- use `chirpier-go` when the integrating service is clearly Go-native
- use raw HTTP as the universal fallback

## Validation

```bash
node scripts/lint-skill-frontmatter.mjs
```

This checks that every `SKILL.md` frontmatter block contains only the AgentSkills-spec keys: `name` and `description`.

## Repo Layout

```text
skills/
  chirpier/
  chirpier-monitoring/
  chirpier-destinations/
  chirpier-alert-triage/
```

Each skill package owns its own instructions and supporting files.
