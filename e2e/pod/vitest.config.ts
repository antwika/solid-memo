import { defineConfig } from "vitest/config";

/**
 * Against a real Solid server (docs/testing.md), which globalSetup.ts
 * starts unless SOLID_SERVER_URL names one; no coverage: this package
 * only tests.
 */
export default defineConfig({
  test: { environment: "node", testTimeout: 60_000, hookTimeout: 90_000, globalSetup: ["./globalSetup.ts"] },
});
