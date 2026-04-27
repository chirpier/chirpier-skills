#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import path from "node:path";

const repoRoot = process.cwd();
const scriptsDir = path.join(repoRoot, "scripts");

const validators = [
  {
    name: "frontmatter lint",
    script: path.join(scriptsDir, "lint-skill-frontmatter.mjs"),
  },
  {
    name: "resource references",
    script: path.join(scriptsDir, "validate-resources.mjs"),
  },
];

let failed = false;

for (const { name, script } of validators) {
  try {
    const output = execFileSync("node", [script], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    });
    console.log(`pass  ${name}: ${output.trim()}`);
  } catch (error) {
    failed = true;
    console.error(`FAIL  ${name}:`);
    if (error.stderr) {
      for (const line of error.stderr.trim().split("\n")) {
        console.error(`  ${line}`);
      }
    }
  }
}

if (failed) {
  console.error("\nvalidation failed");
  process.exit(1);
}

console.log("\nall validators passed");
