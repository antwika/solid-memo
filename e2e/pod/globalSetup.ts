import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { createServer } from "node:net";
import { dirname, join } from "node:path";
import type { TestProject } from "vitest/node";

declare module "vitest" {
  export interface ProvidedContext {
    /** The Solid server the tests run against, ending in a slash. */
    solidServerUrl: string;
  }
}

/**
 * The Solid server for the end-to-end tests: the one SOLID_SERVER_URL
 * names (it must let anyone read and write), else a Community Solid
 * Server started here, in memory, on a free port, and stopped after.
 */
export default async function setup(project: TestProject) {
  const given = process.env.SOLID_SERVER_URL;
  if (given !== undefined && given !== "") {
    project.provide("solidServerUrl", given.endsWith("/") ? given : `${given}/`);
    return;
  }
  const port = await freePort();
  const url = `http://localhost:${port}/`;
  const bin = join(dirname(createRequire(import.meta.url).resolve("@solid/community-server/package.json")), "bin/server.js");
  const server = spawn(process.execPath, [bin, "--port", String(port), "--loggingLevel", "warn"], {
    stdio: ["ignore", "ignore", "pipe"],
  });
  let log = "";
  server.stderr.on("data", (chunk: Buffer) => (log += chunk.toString()));
  const exited = new Promise<never>((_, reject) =>
    server.once("exit", (code) => reject(new Error(`The Community Solid Server exited (${code}):\n${log}`))),
  );
  await Promise.race([exited, untilUp(url)]);
  project.provide("solidServerUrl", url);
  return () => {
    server.removeAllListeners("exit");
    server.kill();
  };
}

function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const probe = createServer().listen(0, () => {
      const { port } = probe.address() as { port: number };
      probe.close(() => resolve(port));
    });
    probe.on("error", reject);
  });
}

async function untilUp(url: string, timeoutMs = 60_000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const up = await fetch(url).then((r) => r.ok, () => false);
    if (up) return;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`The Community Solid Server did not answer at ${url} within ${timeoutMs / 1000}s.`);
}
