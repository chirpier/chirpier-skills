# OpenClaw Triage Questions

- `tool.errors.count`: which tool is failing, and is it isolated to one workflow?
- `task.duration_ms`: is the latency spike global or tied to one task name?
- `tokens.used`: is the increase expected traffic or runaway usage?
- `heartbeat.missed.count`: did the worker stop running, or did the emitter stop logging?
