import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@lib": path.resolve(__dirname, "src/lib"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    },
  },
  test: {
    reporters: ["verbose"],
    include: ["test/**/*.test.{ts,tsx}"],
  },
});
