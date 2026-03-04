# Security Policy

## Scope

This policy applies to the `somengineer` repository including the portfolio site, automation scripts, and CI/CD pipeline.

## Supported Versions

Only the `main` branch is actively maintained and considered production.

## Reporting a Vulnerability

If you discover a security issue:

1. **Do not open a public GitHub issue.**
2. Email directly (add your contact email here) with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
3. You will receive a response within 72 hours.
4. Once verified and patched, a public disclosure will follow at a mutually agreed date.

## Security Practices in This Repo

### Secrets Management

- All deployment tokens, API keys, and credentials are stored as **GitHub Actions encrypted secrets**.
- No secrets are committed to the repository. Pre-commit hooks (optional) can be added to enforce this.
- `.env.local` is gitignored and used only for local development.

### Static Site Architecture

- The portfolio site is a **static export (Next.js `output: 'export'`)** — no server-side runtime, no database, minimal attack surface.
- No user input is processed server-side.

### Dependency Management

- `npm ci` is used in CI to install exact locked versions.
- `npm audit --audit-level=high` runs on every PR.
- Python deps are pinned in `requirements.txt` (when applicable).

### CI/CD

- All workflow files are in `ci/` (copy to `.github/workflows/` for GitHub Actions to pick them up).
- Third-party Actions are pinned to commit SHA where security is critical.
- No `pull_request_target` workflows without explicit review gates.

### Content Security

- HTTP security headers (CSP, X-Frame-Options, HSTS) are configured at the hosting layer. See `docs/DEPLOYMENT.md`.

## Known Limitations

- This is a solo-maintainer project. Response times may vary.
- Motion pipeline scripts run locally only; they are not exposed to the internet.
