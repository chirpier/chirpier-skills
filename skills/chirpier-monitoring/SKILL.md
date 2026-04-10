---
name: chirpier-monitoring
description: Use for Chirpier workload playbooks, recurring comparisons, dashboards, and public dashboard page handoff after the core contract is already understood. OpenClaw is the primary trigger context, especially for tool errors, latency, token usage, liveness, market monitoring, and sentiment workflows. Use this skill when the user wants trend visibility or repeated monitoring workflows. Do not use for first-pass instrumentation, destination-only work, or existing-alert-only investigation.
---

# Chirpier Monitoring

## Required Inputs

- `CHIRPIER_API_KEY`

## Resources

- `references/playbooks.md`
- `references/dashboard-patterns.md`
- `references/http-examples.md`
- `assets/tool-error-log.json`
- `assets/task-latency-log.json`

## Task Routing

| Task | Route |
| --- | --- |
| compare one period with another | analytics |
| inspect multiple related trends | dashboard |
| hand a single public trend to a human | public dashboard page |
| pick a known workload pattern | playbook |

## Core Flow

1. Use this skill when the user already knows they want to monitor a workload pattern in Chirpier.
2. If `CHIRPIER_API_KEY` is missing, stop and ask for it before drafting API actions.
3. Preserve the `agent + event` identity model from the core Chirpier contract.
4. Read `references/playbooks.md` and pick the closest existing workload before inventing a new stream.
5. Emit raw scalar streams first. Do not create derived time-window event names.
6. Keep workflow detail in `meta` for inspection, not as the primary v1 alert semantics contract.
7. If the task is OpenClaw-specific, prefer the existing tool, task, token, heartbeat, market, and sentiment patterns before extending the taxonomy.

## Analytics Comparisons

1. Use `GET /v1.0/events/:eventID/analytics` when the task is to compare one window against another.
2. Use analytics before creating a policy when the user first wants to understand the change.

## Dashboards

1. Build at least one chart before tuning lots of policies.
2. Read `references/dashboard-patterns.md` to choose the first charts and matching aggregates.

## Public Dashboard Pages

1. Use the public dashboard page when a human should inspect one event trend directly.
2. Read `references/dashboard-patterns.md` for the public dashboard handoff pattern.

## Success Checks

- the monitoring stream already exists or is clearly defined
- the analytics or dashboard path matches the user intent
- the human handoff points to the intended public dashboard page when needed

## Decision Table

| Need | Use |
| --- | --- |
| raw numeric samples | event logs |
| explicit window comparison | analytics |
| threshold-based notification | policy |
| human trend visibility | public dashboard page |

## Failure Handling

- If auth is missing, stop and ask for `CHIRPIER_API_KEY`.
- If the task becomes first-pass event naming, instrumentation, or initial policy creation, switch back to `chirpier`.
- If the task becomes destination setup or destination testing, switch to `chirpier-destinations`.
- If the task becomes investigation of an existing alert, switch to `chirpier-alert-triage`.

## Common Mistakes

- inventing names like `task.duration_ms_p95_1h`
- alerting on a derived stream instead of the raw stream
- skipping analytics when the task is really a window comparison
- using `sum` for latency streams that should use `average` or `p95_est`
