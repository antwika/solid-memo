# Boundaries

Import rules between layers. These are the load-bearing walls of the
codebase; a change that violates them is wrong even if it works.

## Rules

| Package / module | Allowed in | Forbidden everywhere else |
|---|---|---|
| `@inrupt/solid-client`, `@inrupt/solid-client-authn-browser` | `src/infrastructure/solid/` only | UI, application, domain |
| `@tanstack/react-query` | `src/ui/` and `src/main.tsx` | application, domain, infrastructure |
| `preact` | `src/ui/`, `src/main.tsx` | application, domain, infrastructure |
| `@fontsource-variable/*` | `src/style.css` | any TypeScript module |
| Anything (imports at all) | — | `src/domain/` imports nothing except sibling domain modules |

Additional rules:

- UI components never import ports or infrastructure. They receive `UseCases`
  as a prop.
- Application imports domain types and nothing else.
- Infrastructure may import domain types (to map onto them) and application
  ports (to implement them) — never UI.
- `src/main.tsx` is the only module that imports across all layers.

```mermaid
graph LR
    subgraph allowed
        A["ui → application"] --- B["application → domain"] --- C["infrastructure → ports + domain"]
    end
    subgraph forbidden
        X["ui → @inrupt/*"] --- Y["application → @tanstack/*"] --- Z["domain → anything"]
    end
```

## Enforcement

Currently by convention, verified with:

```sh
grep -rn "@inrupt" src --include="*.ts" --include="*.tsx" | grep -v infrastructure
grep -rn "@tanstack" src | grep -vE "src/(ui|main)"
```

Both must return nothing (test files mirror their subject's layer and follow
the same rules). Lint enforcement (`eslint-plugin-boundaries` or
`import/no-restricted-paths`) is planned but not yet configured.

## Adding a dependency

1. Decide which single layer it belongs to.
2. If it performs I/O, wrap it behind a port in `src/application/ports.ts`
   and implement the port in `src/infrastructure/`.
3. Add the confinement rule to the table above.
