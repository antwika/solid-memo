/**
 * `npm run servers [-- <id> ...]`: install the Solid servers the
 * end-to-end tests start (all of them, or the ids named), each from its
 * own lockfile in servers/<id>/. They are kept out of the workspace: two
 * majors of the Community Solid Server in one node_modules find each
 * other's Components.js modules and fail to start. Without install
 * scripts, which none of them needs and one would misuse: solid-server
 * 6.0.0 depends on @fastify/pre-commit, whose script installs a git hook
 * into this repository (npm 12 blocks it anyway; npm 11 would not).
 */
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { serversNamed } from "./servers.ts";

const ids = serversNamed(process.argv.slice(2).join(","));
for (const id of ids) {
  const dir = join(import.meta.dirname, "servers", id);
  console.log(`Installing ${id} in ${dir}`);
  const { status } = spawnSync("npm", ["ci", "--prefix", dir, "--ignore-scripts", "--no-audit", "--no-fund"], {
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (status !== 0) process.exit(status ?? 1);
}

