# Deployment Guide

## Overview

The portfolio site is a statically exported Next.js application. It can be deployed to:

- **Netlify** (primary — used in CI)
- **Vercel** (alternative)
- **GitHub Pages** (fallback)

---

## Option 1 — Netlify (Recommended)

### Manual Deploy

```bash
cd web
npm ci
npm run build
# installs netlify-cli globally if not present
npm install -g netlify-cli
netlify deploy --dir=out --prod
```

### CI Deploy (GitHub Actions)

Add these GitHub secrets to your repo:

| Secret | Description |
|---|---|
| `NETLIFY_AUTH_TOKEN` | Personal access token from Netlify |
| `NETLIFY_SITE_ID` | Your Netlify site ID |

The `ci/ci.yml` workflow deploys automatically on push to `main`.

### Security Headers (netlify.toml)

Create `web/netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; media-src 'self' https://www.youtube.com; frame-src https://www.youtube.com"
    Strict-Transport-Security = "max-age=63072000; includeSubDomains; preload"
```

---

## Option 2 — Vercel

```bash
npm install -g vercel
cd web
vercel --prod
```

Add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` as GitHub secrets for automated deploys.

Security headers live in `web/vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

---

## Option 3 — GitHub Pages

Set `basePath` in `next.config.js` to your repo name if hosting at `username.github.io/repo`.

```bash
cd web && npm run build
# push web/out to gh-pages branch
npx gh-pages -d out
```

---

## Environment Variables

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `.env.local` / Netlify env | Canonical URL for SEO meta |
| `NETLIFY_AUTH_TOKEN` | GitHub Secret | Netlify deploy auth |
| `NETLIFY_SITE_ID` | GitHub Secret | Target site |

Never commit `.env.local` — it is gitignored.

---

## Post-Deploy Checklist

- [ ] Verify canonical URL in `<head>` matches live domain
- [ ] Confirm security headers with [securityheaders.com](https://securityheaders.com)
- [ ] Check PageSpeed / Lighthouse score ≥ 90
- [ ] Verify YouTube embeds load correctly
- [ ] Update README quick links with live URL
