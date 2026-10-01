/**
 * `npm run pod`: a Community Solid Server (servers/css-7, installed by
 * `npm run servers`) on port 3999, in memory, for running the end-to-end
 * tests against with SOLID_SERVER_URL=http://localhost:3999/.
 */
import { spawn } from "node:child_process";
import { join } from "node:path";
import { serverPackageDir } from "./servers.ts";

const server = spawn(
  process.execPath,
  [join(serverPackageDir("css-7", "@solid/community-server"), "bin/server.js"), "--port", "3999", "--loggingLevel", "warn"],
  { stdio: "inherit" },
);
server.on("exit", (code) => process.exit(code ?? 0));
