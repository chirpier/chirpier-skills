# Delivery History

## Purpose

This file explains how agents should interpret Chirpier delivery history.

## Endpoint

`GET /v1.0/alerts/:alertID/deliveries?kind=alert|test|all&limit=100&offset=0`

## Semantics

- default behavior hides test sends
- `kind=alert` returns real alert deliveries
- `kind=test` returns destination test sends
- `kind=all` returns both

## Recommended Agent Behavior

- use default delivery history when triaging a real alert
- use `kind=test` immediately after destination testing
- use `kind=all` only for debugging or setup audits

## Important Note

Older rows without `delivery_context.kind` should be treated as `alert`.
