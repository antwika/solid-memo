import { defineConfig } from "vitest/config";
import preact from "@preact/preset-vite";
import { deckLibraryPlugin } from "./tooling/deckLibrary.ts";

export default defineConfig({
  // Relative asset URLs: the built site works from the domain root or
  // any subfolder of a static host (one.com web space), no rewrites
  // needed thanks to hash routing.
  base: "./",
  // The deck library (decks/*.ttl) is published under decks/ with a
  // generated index; see docs/deck-library.md.
  plugins: [preact(), deckLibraryPlugin()],
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
  },
  test: {
    environment: "happy-dom",
    globals: true,
    server: {
      deps: {
        // Must go through the Vite pipeline so the react -> preact/compat
        // alias applies; otherwise Node resolves the real react package.
        inline: [/@tanstack\/react-query/],
      },
    },
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**", "tooling/**"],
      // Documented exclusions (docs/testing.md): the composition root is
      // pure wiring with no logic; vite-env.d.ts is a type declaration;
      // src/test/ is test setup, not product code.
      exclude: ["src/main.tsx", "src/vite-env.d.ts", "src/test/**"],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
});
