#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const skillsRoot = path.join(repoRoot, "skills");
const allowedKeys = new Set(["name", "description"]);

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

function parseFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  if (!content.startsWith("---\n")) {
    throw new Error("missing YAML frontmatter start");
  }
  const end = content.indexOf("\n---\n", 4);
  if (end === -1) {
    throw new Error("missing YAML frontmatter end");
  }
  const block = content.slice(4, end).trim();
  if (!block) {
    throw new Error("empty YAML frontmatter");
  }
  const keys = [];
  for (const line of block.split("\n")) {
    if (!line.trim()) continue;
    if (/^\s/.test(line)) {
      throw new Error(`unexpected indented frontmatter line: ${line}`);
    }
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) {
      throw new Error(`invalid frontmatter line: ${line}`);
    }
    keys.push(match[1]);
  }
  return keys;
}

if (!fs.existsSync(skillsRoot)) {
  console.error("missing skills directory");
  process.exit(1);
}

const skillFiles = listSkillFiles(skillsRoot);
const errors = [];

for (const filePath of skillFiles) {
  try {
    const keys = parseFrontmatter(filePath);
    for (const required of allowedKeys) {
      if (!keys.includes(required)) {
        errors.push(`${path.relative(repoRoot, filePath)}: missing required frontmatter key '${required}'`);
      }
    }
    for (const key of keys) {
      if (!allowedKeys.has(key)) {
        errors.push(`${path.relative(repoRoot, filePath)}: unsupported frontmatter key '${key}'`);
      }
    }
  } catch (error) {
    errors.push(`${path.relative(repoRoot, filePath)}: ${error.message}`);
  }
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(error);
  }
  process.exit(1);
}

console.log(`validated ${skillFiles.length} SKILL.md files`);
