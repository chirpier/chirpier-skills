# Contributing

## Adding a New Skill

1. Run the scaffolding script:
   ```bash
   node scripts/new-skill.mjs <skill-name>
   ```
2. Edit `skills/<skill-name>/SKILL.md` with your skill content.
3. Add references and assets as needed in the skill's subdirectories.
4. Add the skill to `marketplace.json`.
5. Add eval test cases in `evals/<skill-name>.eval.json`.
6. Run validation: `npm run validate`.

## Modifying Existing Skills

1. Follow the event naming grammar: `domain.subject.measure[.suffix]`.
2. Use only `name` and `description` in SKILL.md frontmatter.
3. Use rollup periods `minute`, `hour`, `day` and analytics periods `1h`, `1d`, `7d`, `1m`.
4. Keep each skill self-contained under its own `references/`, `assets/`, and `scripts/`.
5. Run `npm run validate` before committing.

## Running Validation

```bash
npm run validate        # all validators
npm run lint            # frontmatter only
```

## Commit Conventions

- Use short, imperative commit messages (e.g., "Add email destination examples")
- One logical change per commit
- Run `npm run validate` before committing

## Eval Test Cases

Each skill should have eval cases in `evals/<skill-name>.eval.json` covering:

- **should_trigger=true**: prompts that should activate the skill
- **should_trigger=false**: prompts that should NOT activate the skill (including cross-skill routing cases)
- At least one completely unrelated prompt to test non-activation
