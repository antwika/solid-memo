import { defineConfig } from "vitest/config";

/**
 * Against real Solid servers (docs/testing.md), which globalSetup.ts
 * starts unless SOLID_SERVER_URL names one; no coverage: this package
 * only tests. The harness's own tests are vitest.unit.config.ts's.
 * E2E_RESULT_JSON names a file for the results too, which compare.ts reads.
 */
const resultFile = process.env.E2E_RESULT_JSON;

export default defineConfig({
  test: {
    include: ["src/**/*.integration.test.ts"],
    // Naming any reporter drops the one Vitest adds on GitHub Actions: named again.
    reporters: resultFile ? ["default", ...(process.env.GITHUB_ACTIONS ? ["github-actions"] : []), ["json", { outputFile: resultFile }]] : undefined,
    environment: "node",
    testTimeout: 60_000,
    hookTimeout: 90_000,
    globalSetup: ["./globalSetup.ts"],
  },
});
