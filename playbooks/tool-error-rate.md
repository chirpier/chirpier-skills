# Tool Error Rate

## Canonical Events

- `tool.errors.count`
- `tool.calls.count`

## Example Usage

- emit `tool.calls.count` for each tool invocation
- emit `tool.errors.count` for each failed invocation

## Example Monitors

- `tool.errors.count` with `sum > 5` in `hour`
- `tool.calls.count` with `sum < 1` in `day` for inactive workflows only if intended

## Query Guidance

- read `hour` rollups for operational review
- use `view=window&period=1h&previous=previous_window` when you need explicit hour-over-hour comparison
