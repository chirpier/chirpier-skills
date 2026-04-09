# Destinations

## Supported Outbound Destinations

- `webhook`
- `slack`
- `discord`
- `telegram`
- `email`

## Recommended Usage

- Slack for operator alerts in team channels
- Discord for community or internal chat alerts
- Telegram for direct/mobile alerts
- Generic webhook for automation or relay systems

## Configuration Notes

Slack:

- requires a valid Slack webhook URL
- host must be Slack-owned

Discord:

- requires a valid Discord webhook URL
- path must include `/webhooks/`

Telegram:

- requires `credentials.bot_token`
- requires `credentials.chat_id`
- does not use `url`

Generic webhook:

- requires a valid absolute `url`
- optional `credentials.authorization`

## Testing

After creating a destination, send a test notification:

`POST /v1.0/destinations/:destinationID/test`

Then inspect delivery history with:

`GET /v1.0/alerts/:alertID/deliveries?kind=test`

## Current Payload Shape

- Slack sends text + blocks
- Discord sends content + embeds
- Telegram sends `sendMessage`
- Generic webhook sends raw alert JSON
