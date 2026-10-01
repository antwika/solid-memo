import { spawn, type ChildProcess } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import type { TestProject } from "vitest/node";

/** A Solid server the tests run against. */
export interface SolidServer {
  /** What it is, in test names: "Community Solid Server". */
  name: string;
  /** Its root, ending in a slash. */
  url: string;
}

declare module "vitest" {
  export interface ProvidedContext {
    /** The Solid servers the tests run against, each the whole suite. */
    solidServers: SolidServer[];
  }
}

/** Lets anyone read and write everything: the tests are about the app, not access control. */
const OPEN_ACL = `@prefix acl: <http://www.w3.org/ns/auth/acl#> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
<#public> a acl:Authorization ; acl:agentClass foaf:Agent ; acl:accessTo <./> ; acl:default <./> ;
    acl:mode acl:Read, acl:Write, acl:Append, acl:Control .
`;

/**
 * The Solid servers for the end-to-end tests: the one SOLID_SERVER_URL
 * names (it must let anyone read and write), else two started here on
 * free ports and stopped after: a Community Solid Server, in memory, and
 * node-solid-server 5.7.4, in a temporary folder whose root ACL lets
 * anyone read and write.
 */
export default async function setup(project: TestProject) {
  const given = process.env.SOLID_SERVER_URL;
  if (given !== undefined && given !== "") {
    project.provide("solidServers", [{ name: given, url: given.endsWith("/") ? given : `${given}/` }]);
    return;
  }
  const started = await Promise.all([communitySolidServer(), nodeSolidServer()]);
  project.provide("solidServers", started.map(({ server }) => server));
  return async () => {
    for (const { stop } of started) await stop();
  };
}

async function communitySolidServer(): Promise<{ server: SolidServer; stop: () => Promise<void> }> {
  const port = await freePort();
  const url = `http://localhost:${port}/`;
  const bin = join(packageDir("@solid/community-server"), "bin/server.js");
  const process_ = await start("The Community Solid Server", url, [bin, "--port", String(port), "--loggingLevel", "warn"]);
  return { server: { name: "Community Solid Server", url }, stop: async () => void process_.kill() };
}

async function nodeSolidServer(): Promise<{ server: SolidServer; stop: () => Promise<void> }> {
  const port = await freePort();
  const url = `http://localhost:${port}/`;
  const dir = await mkdtemp(join(tmpdir(), "solid-memo-nss-"));
  const root = join(dir, "data");
  await mkdir(root);
  // With a root index and ACL in place, the server keeps them rather than its templates.
  await writeFile(join(root, "index.html"), "<!doctype html><title>Solid</title>\n");
  await writeFile(join(root, ".acl"), OPEN_ACL);
  const bin = join(packageDir("solid-server"), "bin/solid");
  const process_ = await start("node-solid-server", url, [
    bin, "start", "--root", root, "--port", String(port), "--server-uri", url.slice(0, -1),
    "--no-live", "--suppress-data-browser", "--config-path", join(dir, "config"), "--db-path", join(dir, "db"),
  ]);
  return {
    server: { name: "node-solid-server 5.7.4", url },
    stop: async () => {
      process_.kill();
      await rm(dir, { recursive: true, force: true });
    },
  };
}

function packageDir(name: string): string {
  return dirname(createRequire(import.meta.url).resolve(`${name}/package.json`));
}

/** The server, started and answering at its URL. */
async function start(name: string, url: string, args: string[]): Promise<ChildProcess> {
  const server = spawn(process.execPath, args, { stdio: ["ignore", "ignore", "pipe"] });
  let log = "";
  server.stderr!.on("data", (chunk: Buffer) => (log += chunk.toString()));
  const exited = new Promise<never>((_, reject) =>
    server.once("exit", (code) => reject(new Error(`${name} exited (${code}):\n${log}`))),
  );
  await Promise.race([exited, untilUp(name, url)]);
  server.removeAllListeners("exit");
  return server;
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

async function untilUp(name: string, url: string, timeoutMs = 60_000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const up = await fetch(url).then((r) => r.ok, () => false);
    if (up) return;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`${name} did not answer at ${url} within ${timeoutMs / 1000}s.`);
}
