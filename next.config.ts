/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/lib/env";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  output: "export",
  images: { unoptimized: true },
};

export default config;
