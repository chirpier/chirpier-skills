# Destination Rules

## Supported Types

- `webhook`
- `email`
- `slack`
- `discord`
- `telegram`

## Validation Rules

- Slack requires a valid Slack-owned destination URL.
- Discord requires a valid Discord destination URL with `/destinations/` in the path.
- Telegram requires `credentials.bot_token` and `credentials.chat_id`.
- Email uses the `url` field as the destination email address.
- Webhook requires an absolute `url`.
