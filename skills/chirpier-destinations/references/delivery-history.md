# Delivery History

<!-- Note: a triage-focused version of this file also exists at chirpier-alert-triage/references/delivery-history.md. Keep shared sections in sync. -->

Use this file for the local delivery-history contract.

## Default View

- use the default view first for real alert deliveries

## Kind Filters

- `kind=test`: destination test sends
- `kind=alert`: explicit real-alert filter
- `kind=all`: combined debug view only

## Operational Rule

- use `kind=test` immediately after destination setup
- use the default view first when investigating a real alert
- use `kind=all` only when you need both views together

## Exact Test Lookup

1. call `POST /v1.0/destinations/:destinationID/test`
2. capture the returned `alert_id`
3. read `GET /v1.0/alerts/:alertID/deliveries?kind=test`
4. confirm delivery status, provider response, and target
