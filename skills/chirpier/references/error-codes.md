# API Error Codes

Use this file when a Chirpier API request returns an HTTP error.

## 401 Unauthorized

**Cause:** Missing or invalid `CHIRPIER_API_KEY`.

**Recovery:**
1. Confirm `CHIRPIER_API_KEY` is set in the environment.
2. Verify the key has not expired or been revoked.
3. Check the `Authorization: Bearer <key>` header format.

## 400 Bad Request

**Cause:** Invalid request body or query parameters.

**Common triggers:**
- Invalid rollup period (e.g., `1h` instead of `hour` for policies)
- Invalid analytics period (e.g., `hour` instead of `1h` for analytics)
- Missing required fields (`agent`, `event`, `value` for logs)
- Invalid aggregate for the stream shape
- Malformed JSON body

**Recovery:**
1. Check the response body for field-level error messages.
2. Validate periods with `node scripts/validate-period.mjs rollup <period>`.
3. Validate event names with `node scripts/validate-event-name.mjs <name>`.
4. Compare your payload against the templates in `assets/`.

## 404 Not Found

**Cause:** The referenced resource does not exist.

**Common triggers:**
- `event_id` does not match any event definition
- `policy_id` does not match any policy
- `destination_id` does not match any destination
- `alert_id` does not match any alert

**Recovery:**
1. Use `GET /v1.0/events` to list existing event definitions.
2. Confirm the `agent + event` pair has been emitted at least once.
3. Remember that event definitions appear only after the first logs land.

## 422 Unprocessable Entity

**Cause:** Request is well-formed but semantically invalid.

**Common triggers:**
- Policy references an event that does not exist yet
- Destination provider config does not match provider type requirements
- Aggregate does not match the stream shape

**Recovery:**
1. Read the response body for the specific validation error.
2. Emit events before creating policies.
3. Read `references/destination-rules.md` for provider-specific config.
4. Read `references/policy-patterns.md` for aggregate matching.

## 429 Too Many Requests

**Cause:** Rate limit exceeded.

**Recovery:**
1. Back off and retry after the delay indicated in the `Retry-After` header.
2. Batch log writes instead of sending one at a time.
3. Read `references/api-limits.md` for rate limit details.
