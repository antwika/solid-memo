# Deployment

Solid Memo builds to plain static files — no server-side code — so it
publishes to any static host. The primary path is GitHub Pages,
deployed automatically by CI.

## GitHub Pages (automatic)

`.github/workflows/deploy.yml` runs on every push to `main`:

```mermaid
flowchart LR
    push["push to main"] --> test["npm test"] --> build["npm run build"] --> pages["deploy dist/ to GitHub Pages"]
```

A red test run or build never deploys. The workflow enables Pages for
the repository on its first run; no manual settings are required. The
site lands at `https://<user>.github.io/solid-memo/`.

One-time setup on a new machine or fork:

```sh
gh auth login
gh repo create <user>/solid-memo --public --source . --push
```

(GitHub Pages on the free plan requires a public repository.)

## Why any static host works, unconfigured

- Asset URLs are relative (`base: "./"` in `vite.config.ts`), so the
  build works at a domain root or any subfolder — including the
  `/solid-memo/` project path on GitHub Pages.
- Routing is hash-based (`docs/routing.md`), so deep links resolve to
  `index.html` without rewrite rules.
- The Solid OIDC redirect URL derives from `window.location` at
  runtime; no per-origin auth configuration. HTTPS is required, which
  GitHub Pages provides.

## Custom domain (solid-memo.com via one.com DNS)

To serve the Pages site on the owned domain later:

1. In one.com's DNS panel, add a `CNAME` record for `www` pointing to
   `<user>.github.io` (and/or apex `A` records to GitHub Pages' IPs).
2. Set the custom domain in the repository: Settings → Pages →
   Custom domain (GitHub then provisions the certificate).

Nothing in the app changes: the same build serves from any origin.

## Manual publish (any static web space)

`npm run build`, then upload the **contents** of `dist/` to the web
root (or any subfolder) via SFTP or a file manager. Verify a build
locally with `npm run preview`.
