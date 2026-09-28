import { defineConfig, type ViteUserConfig } from "vitest/config";

/**
 * The test setup every package shares (docs/testing.md): each package's
 * own code at 100% coverage, test helpers (`src/testing/`, `src/test/`)
 * excepted. `environment` is "node" unless the package runs in the
 * browser; `include` lists what counts, beyond `src/`.
 */
export function packageConfig({
  environment = "node",
  include = [],
  exclude = [],
  test = {},
}: {
  environment?: "node" | "happy-dom";
  include?: string[];
  exclude?: string[];
  test?: NonNullable<ViteUserConfig["test"]>;
} = {}) {
  return defineConfig({
    test: {
      environment,
      ...test,
      coverage: {
        provider: "v8",
        include: ["src/**/*.{ts,tsx}", ...include],
        exclude: ["src/testing/**", "src/test/**", ...exclude],
        thresholds: { lines: 100, functions: 100, branches: 100, statements: 100 },
      },
    },
  });
}
