import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Session } from "@inrupt/solid-client-authn-node";
import { runnerImport } from "vite";

/**
 * The counter's command (src/run.ts), with the real login, network and
 * file system. The workspace's sources import one another without file
 * extensions, as the bundler resolves them, so they are loaded through
 * Vite rather than by Node directly.
 */
const { module } = await runnerImport<typeof import("../src/run.ts")>(fileURLToPath(new URL("../src/run.ts", import.meta.url)));

process.exitCode = await module.run({
  env: process.env,
  args: process.argv.slice(2),
  async login({ oidcIssuer, clientId, clientSecret }) {
    const session = new Session();
    await session.login({ oidcIssuer, clientId, clientSecret });
    if (!session.info.isLoggedIn) throw new Error("The counter's agent could not log in.");
    return session.fetch;
  },
  publicFetch: globalThis.fetch,
  writeFile: (path, text) => writeFile(path, text, "utf8"),
  log: (line) => console.log(line),
});
