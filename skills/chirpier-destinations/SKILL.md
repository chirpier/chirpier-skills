# chirpier-destinations

Use this skill when configuring, validating, or testing Chirpier outbound destinations.

## Supported Destinations

- webhook
- slack
- discord
- telegram
- email

## Rules

- Validate config before assuming delivery will work
- Always send a test notification after destination creation
- Check delivery history with `kind=test`
- Use `kind=all` only for debugging

## Guided Destination Flow

1. create destination with valid provider-specific configuration
2. send a test notification
3. inspect `kind=test`
4. trigger a real alert
5. inspect default delivery history or `kind=alert`

## Failure Recovery

- if Slack fails, verify the webhook host is Slack-owned
- if Discord fails, verify the URL path includes `/webhooks/`
- if Telegram fails, verify `bot_token` and `chat_id`
- if test sends appear missing, remember default delivery history hides tests

## Read First

- `references/destinations.md`
- `references/delivery-history.md`
- `references/failure-recovery.md`
