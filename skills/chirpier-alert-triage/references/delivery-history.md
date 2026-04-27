# Delivery History

<!-- Note: a destination-focused version of this file also exists at chirpier-destinations/references/delivery-history.md. Keep shared sections in sync. -->

Use this file for the local delivery-history contract.

## Default View

- use the default view first for real alert deliveries

## Kind Filters

- `kind=test`: destination test sends
- `kind=alert`: explicit real-alert filter if needed
- `kind=all`: combined debug view only

## Operational Rule

- use `kind=test` only when checking destination setup behavior
- use the default view first when investigating a real alert
- use `kind=all` only when you need both views together

If no delivery is visible in the default view, confirm the alert actually triggered before changing the destination.
