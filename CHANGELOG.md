# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [1.0.0] - 2026-04-25

### Added
- `package.json` for npm distribution as `@chirpier/chirpier-skills`
- `marketplace.json` for skills directory indexing
- `AGENTS.md` for AI agent onboarding
- `CONTRIBUTING.md` with contribution guidelines
- `LICENSE` (MIT)
- `.gitignore`
- Eval test cases for all 4 skills (`evals/`)
- Resource reference validator (`scripts/validate-resources.mjs`)
- Unified validation runner (`scripts/validate-all.mjs`)
- GitHub Actions CI/CD pipeline (`.github/workflows/validate.yml`)
- API error codes reference (`skills/chirpier/references/error-codes.md`)
- Troubleshooting guide (`skills/chirpier/references/troubleshooting.md`)
- API limits reference (`skills/chirpier/references/api-limits.md`)
- Expected response shapes in SDK examples
- Cross-platform compatibility statement in README
- Skill scaffolding script (`scripts/new-skill.mjs`)
- Cross-reference comments in delivery-history.md files

## [0.1.0] - 2026-04-10

### Added
- SDK coverage: JavaScript, Python, and Go examples plus HTTP fallbacks
- Skill-specific reference directories
- Event name and period validation scripts
- Frontmatter lint script

## [0.0.1] - 2026-04-09

### Added
- Initial skill structure with 4 skills: chirpier, chirpier-monitoring, chirpier-destinations, chirpier-alert-triage
- Golden path walkthrough
- SDK guidance
- Core references, playbooks, and example payloads
