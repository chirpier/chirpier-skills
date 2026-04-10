# Triage Loop

1. Open the triggered alert.
2. Inspect the event definition and policy.
3. Review recent rollups for the same signal.
4. Check delivery attempts if the notification path looks wrong.
5. Acknowledge when someone is actively working the issue.
6. Resolve or archive when the incident is complete.

## State Questions

- Did the `agent + event` identity match the intended stream?
- Did the policy aggregate match the raw stream shape?
- Did the alert actually trigger, or was only a test notification sent?
- Does the current rollup period match the operational question?
