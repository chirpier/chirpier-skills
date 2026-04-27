# API Limits

Use this file when planning high-volume integrations or when encountering 429 errors.

## Log Ingestion

- **Endpoint:** `POST /v1.0/logs`
- **Batch size:** Send logs as a JSON array. Batch multiple events per request to reduce overhead.
- **Recommended pattern:** Buffer logs locally and flush periodically rather than sending one log per request.
- **SDK flush:** Call `client.flush()` to send buffered logs. The SDK handles batching internally.

## Rate Limiting

- If you receive a `429 Too Many Requests` response, back off and retry.
- Check the `Retry-After` header for the recommended delay in seconds.
- Do not retry immediately — exponential backoff is recommended.

## General Guidance

- **Emit first, query later.** Event definitions and rollups are computed asynchronously. Allow a short delay between emitting logs and querying analytics.
- **Batch log writes.** Prefer fewer requests with larger batches over many single-event requests.
- **Reuse the client.** SDK clients manage connection pooling and batching internally. Create one client per process and reuse it.
- **Flush before shutdown.** Call `client.flush()` and `client.shutdown()` (or equivalent) before process exit to avoid losing buffered logs.
- **Polling frequency.** When polling analytics or delivery history, avoid sub-second polling. A 5-10 second interval is appropriate for most use cases.
