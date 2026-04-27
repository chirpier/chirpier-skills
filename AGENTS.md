# AGENTS.md

This repository contains Agent Skills for Chirpier. It is the operational execution layer for AI agents integrating with Chirpier's event monitoring, analytics, policies, and alerting platform.

## Skill Structure

```
skills/
  chirpier/              → core contract: event identity, instrumentation, policies, validation
  chirpier-monitoring/   → workload playbooks, dashboards, recurring comparisons
  chirpier-destinations/ → destination setup, testing, delivery inspection
  chirpier-alert-triage/ → alert investigation, acknowledgement, resolution
```

Each skill is self-contained under `skills/{name}/` with:
- `SKILL.md` — skill definition with YAML frontmatter (`name`, `description`)
- `references/` — detailed guidance files
- `assets/` — example payloads and checklists
- `scripts/` — optional validation utilities

## Entry Path

1. Start with `chirpier` for any new integration.
2. Follow `skills/chirpier/references/guided-validation.md` for the first end-to-end pass.
3. Move to a narrower skill only when the task is clearly scoped to monitoring, destinations, or alert triage.
4. See `golden-path.md` for the full end-to-end flow.

## Conventions

- **Event identity:** `agent + event` is the unique identifier (not event alone)
- **Rollup/policy periods:** `minute`, `hour`, `day`
- **Analytics window periods:** `1h`, `1d`, `7d`, `1m`
- **Resource naming:** `destination` (not `webhook`); `webhook` is a provider type
- **Frontmatter:** Only `name` and `description` allowed in SKILL.md YAML frontmatter
- **Event naming grammar:** `domain.subject.measure[.suffix]` — never encode time windows in names

## Validation

```bash
npm run validate        # run all validators
npm run lint            # frontmatter only
```

Individual validators:
- `node scripts/lint-skill-frontmatter.mjs` — checks SKILL.md frontmatter
- `node scripts/validate-resources.mjs` — checks all resource references exist
- `node skills/chirpier/scripts/validate-event-name.mjs <name>` — checks event name grammar
- `node skills/chirpier/scripts/validate-period.mjs rollup <period>` — checks rollup period
- `node skills/chirpier/scripts/validate-period.mjs analytics <period>` — checks analytics period

## Adding a New Skill

1. Create `skills/{name}/SKILL.md` with frontmatter containing `name` and `description`
2. Add `references/` and `assets/` subdirectories as needed
3. Add the skill to `marketplace.json`
4. Add eval test cases in `evals/{name}.eval.json`
5. Run `npm run validate` to confirm everything passes
