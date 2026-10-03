import { defineConfig } from "vitest/config";

/**
 * The harness's own tests (`npm test`, so `npm run check`): what the
 * servers' compose files may say, without Docker and without starting a
 * server.
 */
export default defineConfig({
  test: { include: ["*.test.ts"], environment: "node" },
});
