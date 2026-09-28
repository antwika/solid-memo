import { defineConfig } from "vitest/config";

/** Against a real Solid server (docs/testing.md); no coverage: this package only tests. */
export default defineConfig({ test: { environment: "node", testTimeout: 60_000 } });
