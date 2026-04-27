#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const name = process.argv[2];

if (!name) {
  console.error("usage: node scripts/new-skill.mjs <skill-name>");
  process.exit(1);
}

if (!/^[a-z0-9-]+$/.test(name)) {
  console.error("skill name must be lowercase alphanumeric with hyphens only");
  process.exit(1);
}

const repoRoot = process.cwd();
const skillDir = path.join(repoRoot, "skills", name);

if (fs.existsSync(skillDir)) {
  console.error(`skill directory already exists: skills/${name}/`);
  process.exit(1);
}

fs.mkdirSync(path.join(skillDir, "references"), { recursive: true });
fs.mkdirSync(path.join(skillDir, "assets"), { recursive: true });

const skillMd = `---
name: ${name}
description: TODO — describe when to use this skill and when not to
---

# ${name.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}

## Required Inputs

- \`CHIRPIER_API_KEY\`

## Resources

## Core Flow

1. TODO

## Success Checks

- TODO

## Failure Handling

- If auth is missing, stop and ask for \`CHIRPIER_API_KEY\`.

## Common Mistakes

- TODO
`;

fs.writeFileSync(path.join(skillDir, "SKILL.md"), skillMd);

const evalFile = path.join(repoRoot, "evals", `${name}.eval.json`);
const evalTemplate = [
  {
    prompt: `TODO — a prompt that should trigger ${name}`,
    expected_skill: name,
    should_trigger: true,
    reason: "TODO",
  },
  {
    prompt: "What is the weather in Tokyo?",
    expected_skill: null,
    should_trigger: false,
    reason: "Unrelated prompt — no Chirpier skill should trigger",
  },
];

fs.writeFileSync(evalFile, JSON.stringify(evalTemplate, null, 2) + "\n");

console.log(`created skill: skills/${name}/`);
console.log(`  SKILL.md`);
console.log(`  references/`);
console.log(`  assets/`);
console.log(`created eval: evals/${name}.eval.json`);
console.log(`\nnext steps:`);
console.log(`  1. edit skills/${name}/SKILL.md`);
console.log(`  2. add the skill to marketplace.json`);
console.log(`  3. add eval test cases in evals/${name}.eval.json`);
console.log(`  4. run: npm run validate`);
