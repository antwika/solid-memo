import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "src"),
    },
  },
  test: {
    env: {
      TZ: "UTC",
    },
    reporters: ["verbose"],
    include: ["test/**/*.test.{ts,tsx}"],
    coverage: {
      include: ["src/**/*.{ts,tsx,js,jsx}"],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
});
