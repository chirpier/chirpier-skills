#!/usr/bin/env node

const mode = process.argv[2];
const value = process.argv[3];

const allowed = {
  rollup: new Set(["minute", "hour", "day"]),
  analytics: new Set(["1h", "1d", "7d", "1m"]),
};

if (!allowed[mode] || !value) {
  console.error("usage: validate-period.mjs <rollup|analytics> <value>");
  process.exit(1);
}

if (!allowed[mode].has(value)) {
  console.error(`invalid ${mode} period: ${value}`);
  process.exit(1);
}

console.log(`valid ${mode} period`);
