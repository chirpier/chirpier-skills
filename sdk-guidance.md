# SDK Guidance

Use SDKs as the preferred execution path when OpenClaw is already running in an application runtime and the SDK matches that runtime cleanly.

## Default Choice For OpenClaw

Prefer `chirpier-js` for OpenClaw.

Why:

- OpenClaw integrations are most likely to run in a JavaScript or TypeScript runtime
- it is the lowest-friction path for emitting logs, listing events, creating policies, and testing destinations
- it matches the runtime shape OpenClaw is most likely to use

Current caveat:

- verify the exact SDK surface before assuming feature parity across all three language packages
- prefer the package examples for the runtime you are actually modifying

## When To Pick Another SDK

- use `chirpier-py` when the OpenClaw worker or integration code is clearly Python-native
- use `chirpier-go` when the integrating service is clearly Go-native and the task is closer to backend service code than agent orchestration
- use raw HTTP when you need a universal baseline, shell automation, or a language/runtime is not covered by the SDKs

## Rule

- prefer `chirpier-js` for OpenClaw unless the user’s runtime clearly points to Python or Go
- use SDK calls for logs, event lookup, analytics, policy creation, and destination tests when available in the selected runtime
- use raw HTTP only when the runtime is ambiguous, the language is unsupported, or shell automation is the better fit
