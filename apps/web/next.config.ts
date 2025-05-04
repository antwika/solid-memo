/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import path from "path";
import "./src/lib/env";

/** @type {import("next").NextConfig} */
const config = {
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  output: "export",
  images: { unoptimized: true },
  webpack(config: any) {
    // Add a custom rule to handle TypeScript files with ts-loader
    config.module.rules.push({
      test: /\.(ts|tsx)$/, // Match .ts and .tsx files
      use: {
        loader: "ts-loader", // Use ts-loader for handling TypeScript
        options: {
          transpileOnly: true, // Skip type checking for faster builds
        },
      },
      exclude: /node_modules/, // Exclude node_modules from TypeScript handling
    });

    // Make sure Webpack can resolve .ts and .tsx files
    config.resolve.extensions.push(".ts", ".tsx");

    // Optionally, you can set path aliases for TypeScript
    config.resolve.alias["@solid-memo/core"] = path.resolve(
      __dirname,
      "../../packages/core"
    );

    return config;
  },
};

console.log("Resolved path: ", path.resolve(__dirname, "../../packages/core"));

export default config;
