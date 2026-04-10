---
name: chirpier
description: Use for Chirpier contract setup, event naming, instrumentation, rollup and analytics queries, policy creation, and first-pass validation for agent workflows. OpenClaw is the primary trigger context, but the same contract applies to other agent systems. Use this skill when the user wants to emit Chirpier events, confirm stable `agent + event` identities, compare analytics windows, or create first policies. Do not use for destination-only setup, destination-only testing, workload-specific trend playbooks, or existing-alert-only investigation when a narrower Chirpier skill fits.
---

# Chirpier

## Required Inputs

- `CHIRPIER_API_KEY`

## Resources

- `references/event-identity.md`
- `references/policy-patterns.md`
- `references/guided-validation.md`
- `references/failure-recovery.md`
- `references/sdk-examples-javascript-and-http.md`
- `references/sdk-examples-python.md`
- `references/sdk-examples-go.md`
- `../../sdk-guidance.md`
- `assets/log-payload.json`
- `assets/policy-payload.json`
- `node scripts/validate-event-name.mjs tool.errors.count`
- `node scripts/validate-period.mjs rollup hour`
- `node scripts/validate-period.mjs analytics 1h`

## Skill Selection

| Task | Skill |
| --- | --- |
| first integration, naming, policies, validation | `chirpier` |
| workload playbooks, trends, public dashboard pages | `chirpier-monitoring` |
| destination setup or destination testing | `chirpier-destinations` |
| investigate an existing alert | `chirpier-alert-triage` |

## Aggregate Selection

| Stream shape | Example | Good aggregate | Avoid |
| --- | --- | --- | --- |
| count increment | `tool.errors.count` | `sum`, `count` | `average` |
| latency sample | `task.duration_ms` | `average`, `p95_est`, `p99_est` | `sum` |
| additive usage | `tokens.used` | `sum` | `average` unless intentional |
| binary or heartbeat signal | `heartbeat.missed.count` | `sum`, `count` | `average` |

1. Confirm the task is Chirpier-specific. If it is only about destination setup, use `chirpier-destinations`. If it is only about existing alerts and incident handling, use `chirpier-alert-triage`. If it is about workload-specific monitoring playbooks, use `chirpier-monitoring`.
2. Treat `docs` in the main Chirpier repo as the canonical public contract. Use this skill as the execution layer. If local skill guidance conflicts with `chirpier/docs`, follow the docs.
3. If `CHIRPIER_API_KEY` is missing, stop and ask for it before drafting API actions. Assume the default hosted Chirpier endpoints otherwise.
4. Read `references/event-identity.md` before choosing or approving an event name.
5. Treat the unique event definition identity as `agent + event`. Reuse stable producer names and stable canonical event names instead of inventing one-off streams.
6. If the user needs a payload shape, copy `assets/log-payload.json` and fill in `agent`, `event`, `value`, and optional `meta`.
7. Emit events before creating policies. Confirm the event definition appears in Chirpier after the first logs land.
8. Read `references/policy-patterns.md` before choosing an aggregate. Match the aggregate to the raw stream shape.
9. Use backend rollup and policy periods `minute`, `hour`, or `day`. If unsure, run `node scripts/validate-period.mjs rollup hour` with the candidate value.
10. Use analytics window periods `1h`, `1d`, `7d`, or `1m` with `previous=...` when the task requires explicit comparison. If unsure, run `node scripts/validate-period.mjs analytics 1h` with the candidate value.
11. If the task requires periodic comparison rather than thresholding, use `GET /v1.0/events/:eventID/analytics` instead of inventing a derived event.
12. Never encode time windows into event names. Use rollups or analytics windows instead.
13. Treat `meta` as inspection context in v1. Do not rely on `meta` as the primary alert semantics contract.
14. If the task is the first OpenClaw integration pass, read `references/guided-validation.md` and follow that sequence exactly.
15. Prefer `chirpier-js` for OpenClaw when the runtime is JavaScript or TypeScript. If the runtime clearly points to Python or Go, use the matching SDK instead. Use raw HTTP only when shell automation or a non-SDK runtime is the better fit.
16. If the user asks for a ready-to-run example, use `references/sdk-examples-javascript-and-http.md` for JavaScript or HTTP, `references/sdk-examples-python.md` for Python, and `references/sdk-examples-go.md` for Go.
17. If the user asks for a policy body, copy `assets/policy-payload.json` and adjust only the stream-specific fields.
18. If any step fails because of naming drift, invalid periods, or aggregate mismatch, read `references/failure-recovery.md` and correct the request before retrying.

## Success Checks

- the first log write succeeds
- the event definition appears under the intended `agent + event` identity
- the first analytics or policy request succeeds without invalid period or aggregate errors

## Failure Handling

- If auth is missing, stop and ask for `CHIRPIER_API_KEY`.
- If the task turns into destination CRUD or destination testing, switch to `chirpier-destinations`.
- If the task turns into an investigation of an already-triggered alert, switch to `chirpier-alert-triage`.
- If the task turns into a dashboard, trend, or recurring comparison playbook, switch to `chirpier-monitoring`.

## Common Mistakes

- Treating `event` alone as the event identity. Chirpier event definitions are keyed by `agent + event`.
- Using `1h` as a rollup or policy period. Use `hour` there.
- Using `hour` in analytics window queries. Use `1h` there.
- Inventing names like `tool.errors.last_hour` or `market.bitcoin.price_change_pct_1h`.
- Creating policies before the event definition exists.
- Forgetting that periodic comparisons belong in `/v1.0/events/:eventID/analytics`.
- Treating `kind=all` delivery history as the default operational view.
