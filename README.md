# Solid Memo

A spaced-repetition (SRS) app that stores all data in the user's own
[Solid](https://solidproject.org/) pod. Flashcard decks live in the user's
storage, scheduling follows the SuperMemo-2 algorithm, and the app never
sees the data server-side — there is no backend.

## Features

- **Pod onboarding** — create a Pod with a provider (iGrant.io Data Pod)
  or connect one you already have; after login the app finds your Pod
  through your WebID profile and confirms the connection.
- **Login with a WebID** — the app dereferences the WebID, discovers the
  `solid:oidcIssuer`, and runs the Solid-OIDC redirect flow. Session
  restore and logout included; expired sessions drop back to login.
- **Instances in your pod** — choose a storage (multiple storages
  supported), create one or more Solid Memo instances, registered in your
  private (or, by choice, public) type index for rediscovery. Existing
  instances can be re-attached by URL.
- **Decks & cards** — create decks of plain-text front/back cards. All
  editing happens under each deck's Browser (rename/remove the deck, add
  cards; every card has its own page to view, edit or remove it); the deck
  list and deck view are for studying.
- **Daily practice** — due and new cards queued per SM-2 with daily caps;
  answers graded 0–5.
- **Study preferences** — new cards/day, max reviews/day, day-boundary
  hour; stored per instance in the pod.
- **Developer settings** — a per-instance developer mode (off by default)
  that reveals diagnostic views such as the raw WebID document.

## Stack

- [Vite](https://vitejs.dev/) + TypeScript + [Preact](https://preactjs.com/)
- [TanStack Query](https://tanstack.com/query) (via `preact/compat`)
- [@inrupt/solid-client](https://docs.inrupt.com/developer-tools/javascript/client-libraries/) +
  [@inrupt/solid-client-authn-browser](https://docs.inrupt.com/developer-tools/javascript/client-libraries/authentication/)

## Development

```sh
npm install
npm run dev      # start the dev server
npm test         # unit tests + enforced 100% coverage
npm run build    # type-check + production build
```

## Documentation

Architecture and design docs live in [docs/](docs/):

- [architecture.md](docs/architecture.md) — layers and the dependency rule
- [boundaries.md](docs/boundaries.md) — import rules and enforcement
- [vendor-code.md](docs/vendor-code.md) — vendor-specific vs vendor-independent code
- [authentication.md](docs/authentication.md) — Solid-OIDC login/session flow
- [onboarding.md](docs/onboarding.md) — Pod provider choice, WebID login, Pod discovery
- [data-model.md](docs/data-model.md) — pod layout, vocabulary, type-index discovery
- [srs.md](docs/srs.md) — SM-2 and the scheduling model
- [testing.md](docs/testing.md) — test strategy and the 100% coverage policy

The app's RDF vocabulary is minted under `https://solid-memo.com/vocab/v1#`.
