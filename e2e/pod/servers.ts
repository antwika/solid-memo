import { spawn, type ChildProcess } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";

/** A Solid server the tests run against. */
export interface SolidServer {
  /** What it is, in test names: "Community Solid Server 7.2.0". */
  name: string;
  /** Its root, ending in a slash. */
  url: string;
}

export interface StartedServer {
  server: SolidServer;
  stop: () => Promise<void>;
}

/**
 * The servers the end-to-end tests can start, by the id SOLID_SERVERS
 * names them with. Each is its own npm project in servers/<id>/, with its
 * own lockfile, outside the workspace (`npm run servers` installs them):
 * two majors of the Community Solid Server in one node_modules find each
 * other's Components.js modules and fail to start.
 */
export const SERVER_IDS = ["css-7", "css-6", "nss-6", "nss-5"] as const;

export type ServerId = (typeof SERVER_IDS)[number];

export const SERVERS: Record<ServerId, () => Promise<StartedServer>> = {
  "css-7": () => communitySolidServer("css-7"),
  "css-6": () => communitySolidServer("css-6"),
  "nss-6": () => nodeSolidServer("nss-6"),
  "nss-5": () => nodeSolidServer("nss-5"),
};

/** The servers a comma-separated list names; every one when it is empty. */
export function serversNamed(list: string | undefined): ServerId[] {
  const all: readonly ServerId[] = SERVER_IDS;
  if (list === undefined || list.trim() === "") return [...all];
  const named = list.split(",").map((id) => id.trim());
  const unknown = named.filter((id) => !all.includes(id as ServerId));
  if (unknown.length > 0) throw new Error(`SOLID_SERVERS names no server ${unknown.join(", ")}; it knows ${all.join(", ")}.`);
  return named as ServerId[];
}

/** Lets anyone read and write everything: the tests are about the app, not access control. */
const OPEN_ACL = `@prefix acl: <http://www.w3.org/ns/auth/acl#> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
<#public> a acl:Authorization ; acl:agentClass foaf:Agent ; acl:accessTo <./> ; acl:default <./> ;
    acl:mode acl:Read, acl:Write, acl:Append, acl:Control .
`;

/** A Community Solid Server, in memory (its default configuration). */
async function communitySolidServer(id: ServerId): Promise<StartedServer> {
  const port = await freePort();
  const url = `http://localhost:${port}/`;
  const dir = serverPackageDir(id, "@solid/community-server");
  const name = `Community Solid Server ${packageVersion(dir)}`;
  const bin = join(dir, "bin/server.js");
  const process_ = await start(name, url, [bin, "--port", String(port), "--loggingLevel", "warn"]);
  return { server: { name, url }, stop: async () => void process_.kill() };
}

/** A node-solid-server, in a temporary folder whose root ACL lets anyone read and write. */
async function nodeSolidServer(id: ServerId): Promise<StartedServer> {
  const port = await freePort();
  const url = `http://localhost:${port}/`;
  const pkg = serverPackageDir(id, "solid-server");
  const name = `node-solid-server ${packageVersion(pkg)}`;
  const dir = await mkdtemp(join(tmpdir(), "solid-memo-nss-"));
  const root = join(dir, "data");
  await mkdir(root);
  // With a root index and ACL in place, the server keeps them rather than its templates.
  await writeFile(join(root, "index.html"), "<!doctype html><title>Solid</title>\n");
  await writeFile(join(root, ".acl"), OPEN_ACL);
  // The server copies its templates into the config folder unless they are
  // there; solid-server 6.0.0 does not ship the root ACL it copies, and
  // fails. Ours is there already, so it copies nothing for the root.
  const templates = join(dir, "config", "templates", "server");
  await mkdir(templates, { recursive: true });
  await writeFile(join(templates, ".acl"), OPEN_ACL);
  const bin = join(pkg, "bin/solid");
  const process_ = await start(name, url, [
    bin, "start", "--root", root, "--port", String(port), "--server-uri", url.slice(0, -1),
    "--no-live", "--suppress-data-browser", "--config-path", join(dir, "config"), "--db-path", join(dir, "db"),
  ]);
  return {
    server: { name, url },
    stop: async () => {
      process_.kill();
      await rm(dir, { recursive: true, force: true });
    },
  };
}

/**
 * Where a server's package is installed: servers/<id>/node_modules. Found
 * by its folder, not through its "exports", which may not offer
 * package.json (solid-server 6 does not) or may name a file it does not
 * ship (its "require" entry).
 */
export function serverPackageDir(id: ServerId, pkg: string): string {
  const dir = join(import.meta.dirname, "servers", id, "node_modules", pkg);
  if (!existsSync(join(dir, "package.json"))) {
    throw new Error(`The ${id} server is not installed: npm run servers -w @solid-memo/e2e-pod -- ${id}`);
  }
  return dir;
}

function packageVersion(dir: string): string {
  return (JSON.parse(readFileSync(join(dir, "package.json"), "utf8")) as { version: string }).version;
}

/** The server, started and answering at its URL; what it printed, if it stops before. */
async function start(name: string, url: string, args: string[]): Promise<ChildProcess> {
  const server = spawn(process.execPath, args, { stdio: ["ignore", "pipe", "pipe"] });
  let log = "";
  const keep = (chunk: Buffer) => void (log += chunk.toString());
  server.stdout!.on("data", keep);
  server.stderr!.on("data", keep);
  const exited = new Promise<never>((_, reject) =>
    server.once("exit", (code) => reject(new Error(`${name} exited (${code}):\n${log}`))),
  );
  await Promise.race([exited, untilUp(name, url)]);
  server.removeAllListeners("exit");
  // Once it is up, what it prints is not needed (and must not fill the pipe).
  server.stdout!.off("data", keep).resume();
  server.stderr!.off("data", keep).resume();
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
