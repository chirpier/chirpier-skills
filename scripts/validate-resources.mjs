#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const skillsRoot = path.join(repoRoot, "skills");

function listSkillFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...listSkillFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name === "SKILL.md") {
      results.push(fullPath);
    }
  }
  return results;
}

function extractResources(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const resources = [];
  let inResources = false;

  for (const line of lines) {
    if (/^## Resources/.test(line)) {
      inResources = true;
      continue;
    }
    if (inResources && /^## /.test(line)) {
      break;
    }
    if (!inResources) continue;

    // Match lines like: - `references/event-identity.md`
    // or: - `../../sdk-guidance.md`
    const fileMatch = line.match(/^- `([^`]+\.(md|json))`$/);
    if (fileMatch) {
      resources.push(fileMatch[1]);
      continue;
    }

    // Match lines like: - `node scripts/validate-event-name.mjs tool.errors.count`
    const scriptMatch = line.match(/^- `node (scripts\/[^\s`]+)/);
    if (scriptMatch) {
      resources.push(scriptMatch[1]);
    }
  }

  return resources;
}

if (!fs.existsSync(skillsRoot)) {
  console.error("missing skills directory");
  process.exit(1);
}

const skillFiles = listSkillFiles(skillsRoot);
const errors = [];
let totalResources = 0;

for (const filePath of skillFiles) {
  const skillDir = path.dirname(filePath);
  const resources = extractResources(filePath);
  totalResources += resources.length;

  for (const resource of resources) {
    const resolved = path.resolve(skillDir, resource);
    if (!fs.existsSync(resolved)) {
      errors.push(
        `${path.relative(repoRoot, filePath)}: missing resource '${resource}' (expected at ${path.relative(repoRoot, resolved)})`
      );
    }
  }
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(error);
  }
  process.exit(1);
}

console.log(
  `validated ${totalResources} resource references across ${skillFiles.length} skills`
);
