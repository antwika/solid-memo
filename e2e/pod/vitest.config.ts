import { defineConfig } from "vitest/config";

/**
 * Against real Solid servers (docs/testing.md), which globalSetup.ts
 * starts unless SOLID_SERVER_URL names one; no coverage: this package
 * only tests. The harness's own tests are vitest.unit.config.ts's.
 */
export default defineConfig({
  test: {
    include: ["src/**/*.integration.test.ts"],
    environment: "node",
    testTimeout: 60_000,
    hookTimeout: 90_000,
    globalSetup: ["./globalSetup.ts"],
  },
});
