import { execFileSync } from "node:child_process";
import { defineConfig } from "vitest/config";
import preact from "@preact/preset-vite";
import { deckLibraryPlugin } from "@solid-memo/deck-library/deckLibrary";
import { topicsPage, turtleDirectoryPlugin, vocabPage } from "@solid-memo/vocab/tooling/publishTurtle";
import { VOCAB_ROOT } from "@solid-memo/vocab/tooling/root";

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
  base: "./",
  plugins: [
    preact(),
    deckLibraryPlugin(),
    turtleDirectoryPlugin({ dir: `${VOCAB_ROOT}vocab`, publicPath: "vocab", pages: [vocabPage(), topicsPage()] }),
    turtleDirectoryPlugin({ dir: `${VOCAB_ROOT}shapes`, publicPath: "shapes" }),
    turtleDirectoryPlugin({ dir: `${VOCAB_ROOT}vendor`, publicPath: "vendor" }),
  ],
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
        inline: [/@tanstack\/react-query/],
      },
    },
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
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
