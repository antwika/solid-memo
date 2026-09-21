# Vendor-specific and vendor-independent code

Which third-party technology we depend on, where each is confined, and what
replacing one would cost.

## Vendors and their confinement

| Vendor | Packages | Confined to | Role |
|---|---|---|---|
| Inrupt Solid clients | `@inrupt/solid-client`, `@inrupt/solid-client-authn-browser` | `src/infrastructure/solid/` | RDF datasets, pod I/O, Solid-OIDC auth |
| TanStack | `@tanstack/react-query` (via `preact/compat`) | `src/ui/`, `src/main.tsx` | Async-state caching and invalidation |
| Preact | `preact` | `src/ui/`, `src/main.tsx` | Rendering |

## Vendor-independent code

`src/domain/` and `src/application/` import no vendor package. They express
the app in its own vocabulary (`Session`, `WebIdDocument`, ports, use cases).
This is enforced as a boundary rule ([boundaries.md](boundaries.md)).

The bridge between the two worlds is the mapper layer:
`src/infrastructure/solid/mappers/` contains pure functions that translate
Inrupt's RDF types (`SolidDataset`, `Thing`) into domain types. Vendor types
never cross upward past a mapper.

## Cost of swapping a vendor

- **Inrupt clients** → touch `src/infrastructure/solid/` only. Ports and
  everything above them are unchanged. A different RDF library (rdflib, LDO)
  or a plain HTTP backend means rewriting the port implementations and
  mappers, nothing else.
- **TanStack Query** → touch `src/ui/` hooks usage and the provider in
  `main.tsx`. Use cases are plain async functions and would not change.
- **Preact** → `src/ui/` and `main.tsx`. Domain/application are
  framework-free by construction.
