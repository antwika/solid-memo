import type { TestProject } from "vitest/node";
import { SERVERS, serversNamed, type SolidServer } from "./servers";

export type { SolidServer };

declare module "vitest" {
  export interface ProvidedContext {
    /** The Solid servers the tests run against, each the whole suite. */
    solidServers: SolidServer[];
  }
}

/**
 * The Solid servers for the end-to-end tests: the one SOLID_SERVER_URL
 * names (it must let anyone read and write), else those SOLID_SERVERS
 * names ("css-7,nss-5"; every one in servers.ts when unset), started
 * here on free ports and stopped after.
 */
export default async function setup(project: TestProject) {
  const given = process.env.SOLID_SERVER_URL;
  if (given !== undefined && given !== "") {
    project.provide("solidServers", [{ name: given, url: given.endsWith("/") ? given : `${given}/` }]);
    return;
  }
  const started = await Promise.all(serversNamed(process.env.SOLID_SERVERS).map((id) => SERVERS[id]()));
  project.provide("solidServers", started.map(({ server }) => server));
  return async () => {
    for (const { stop } of started) await stop();
  };
}
