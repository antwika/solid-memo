import { execFileSync } from "node:child_process";
import { defineConfig } from "vitest/config";
import preact from "@preact/preset-vite";
import { deckLibraryPlugin } from "./tooling/deckLibrary.ts";

/**
 * The commit being built, shown as the site's version in the footer. Read
 * from the checkout itself (the deploy workflow builds a specific commit,
 * which GITHUB_SHA need not equal); null outside a git checkout.
 */
function commitSha(): string | null {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return process.env.GITHUB_SHA ?? null;
  }
}

export default defineConfig({
  define: {
    __COMMIT_SHA__: JSON.stringify(commitSha()),
  },
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
