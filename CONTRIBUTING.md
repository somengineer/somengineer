# Contributing

## Philosophy

Small, focused contributions. Every PR should have one clear purpose.

## Workflow

1. **Fork** the repo
2. **Branch** from `main`: `git checkout -b feat/your-feature`
3. Make changes, commit with a clear message:  
   `git commit -m "feat: add thumbnail generator script"`
4. **Push** and open a Pull Request against `main`
5. Reference the relevant Issue number in your PR description

## Commit Style

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat:     new feature
fix:      bug fix
docs:     documentation only
chore:    build / tooling changes
refactor: code change with no feature/fix
```

## Code Style

- **TypeScript/JS**: ESLint + Prettier (config in `web/.eslintrc.json`)
- **Python**: PEP 8, type hints encouraged
- **Bash**: `set -euo pipefail` at the top of every script

## Testing

- Run `npm run lint` before submitting web changes
- Run `python3 -m py_compile scripts/*.py` to check syntax on scripts
- Any new automation script must include usage comments at the top

## Security

- **Never commit secrets, tokens, or credentials**
- Use `.env.local` (gitignored) for local secrets
- All deployment secrets live in GitHub Actions encrypted secrets

## Issues

Use the issue templates. If none fits, open a blank issue with:
- What you expected
- What happened
- Steps to reproduce

## Pull Requests

- Keep PRs under 400 lines changed where possible
- Link to the issue being resolved
- Add a short description of what changed and why
