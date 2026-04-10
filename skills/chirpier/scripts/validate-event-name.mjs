#!/usr/bin/env node

const name = process.argv[2];
const pattern = /^[a-z0-9]+(?:\.[a-z0-9_]+)+$/;

if (!name) {
  console.error("usage: validate-event-name.mjs <event-name>");
  process.exit(1);
}

if (!pattern.test(name)) {
  console.error("invalid event name: use domain.subject.measure[.suffix] with lowercase segments");
  process.exit(1);
}

if (/(^|\.)(last|hour|day|week|month|today|yesterday|1h|1d|7d|1m)(\.|$)/.test(name)) {
  console.error("invalid event name: do not encode time windows into Chirpier event names");
  process.exit(1);
}

console.log("valid Chirpier event name");
