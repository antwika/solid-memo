import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@lib": path.resolve(__dirname, "src/lib"),
    },
  },
  test: {
    include: ["test/**/*.test.{ts,tsx}"],
  },
});
