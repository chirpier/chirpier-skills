curl -X POST \
  -H "Authorization: Bearer $CHIRPIER_API_KEY" \
  -H "Content-Type: application/json" \
  https://logs.chirpier.co/v1.0/logs \
  -d '[
    {
      "agent": "openclaw.main",
      "event": "tool.errors.count",
      "value": 1,
      "meta": {"tool_name": "browser.open"}
    },
    {
      "agent": "openclaw.main",
      "event": "task.duration_ms",
      "value": 780,
      "meta": {"task_name": "daily_digest"}
    }
  ]'
