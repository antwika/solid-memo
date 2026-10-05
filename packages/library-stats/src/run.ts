import { createHash } from "node:crypto";
import { countLibraryNotices } from "@solid-memo/application/libraryCounter";
import { createSolidLibraryCounterStore } from "@solid-memo/solid/solidLibraryCounterStore";
import { toLibraryStatsTurtle } from "@solid-memo/solid/mappers/libraryStatsMapper";

/** What the counter is told by its environment (docs/library-stats.md). */
export interface CounterSettings {
  inboxUrl: string;
  stateUrl: string;
  indexUrl: string;
  salt: string;
  credentials: { oidcIssuer: string; clientId: string; clientSecret: string };
}

const REQUIRED = {
  inboxUrl: "LIBRARY_INBOX_URL",
  stateUrl: "LIBRARY_STATE_URL",
  salt: "LIBRARY_STATS_SALT",
  oidcIssuer: "SOLID_OIDC_ISSUER",
  clientId: "SOLID_CLIENT_ID",
  clientSecret: "SOLID_CLIENT_SECRET",
} as const;

/** The settings from the environment; the names of those missing when any is. */
export function settingsFrom(env: Readonly<Record<string, string | undefined>>): CounterSettings | { missing: string[] } {
  const missing = Object.values(REQUIRED).filter((name) => (env[name] ?? "") === "");
  if (missing.length > 0) return { missing };
  const value = (key: keyof typeof REQUIRED) => env[REQUIRED[key]]!;
  return {
    inboxUrl: value("inboxUrl"),
    stateUrl: value("stateUrl"),
    indexUrl: env.LIBRARY_INDEX_URL || "https://solid-memo.com/decks/index.ttl",
    salt: value("salt"),
    credentials: { oidcIssuer: value("oidcIssuer"), clientId: value("clientId"), clientSecret: value("clientSecret") },
  };
}

/** The key a person is counted by: a salted hash of their WebID, which the salt kept secret keeps from being guessed. */
export function personKeyOf(salt: string): (webId: string) => string {
  return (webId) => createHash("sha256").update(`${salt}\n${webId}`).digest("hex");
}

/** Whether a URL is a WebID: its profile can be read, without logging in. */
export function webIdCheck(fetch: typeof globalThis.fetch): (webId: string) => Promise<boolean> {
  return async (webId) => {
    try {
      const response = await fetch(webId, { headers: { Accept: "text/turtle" } });
      return response.ok;
    } catch {
      return false;
    }
  };
}

export interface RunDeps {
  env: Readonly<Record<string, string | undefined>>;
  /** The command's arguments: the file to write the statistics to. */
  args: readonly string[];
  /** Log in as the counter's agent: its authenticated fetch. */
  login: (credentials: CounterSettings["credentials"]) => Promise<typeof globalThis.fetch>;
  /** Fetch without logging in, for WebID profiles. */
  publicFetch: typeof globalThis.fetch;
  writeFile: (path: string, text: string) => Promise<void>;
  log: (line: string) => void;
  now?: () => Date;
}

/**
 * `npm run count -w @solid-memo/library-stats -- <out>`: count the
 * library's inbox into its statistics and write them, as Turtle, to
 * <out> (the site's decks/stats.ttl). The exit code: 0 when written, 1
 * when not.
 */
export async function run({ env, args, login, publicFetch, writeFile, log, now = () => new Date() }: RunDeps): Promise<number> {
  const out = args[0];
  const settings = settingsFrom(env);
  if (out === undefined || "missing" in settings) {
    if (out === undefined) log("Usage: count <file to write the statistics to>");
    if ("missing" in settings) log(`Missing settings: ${settings.missing.join(", ")}.`);
    return 1;
  }
  try {
    const outcome = await countLibraryNotices({
      store: createSolidLibraryCounterStore({ fetch: await login(settings.credentials) }),
      inboxUrl: settings.inboxUrl,
      stateUrl: settings.stateUrl,
      indexUrl: settings.indexUrl,
      personKey: personKeyOf(settings.salt),
      isWebId: webIdCheck(publicFetch),
      now,
    });
    await writeFile(out, toLibraryStatsTurtle(outcome.stats, settings.indexUrl));
    log(`Counted ${outcome.counted} notices (${outcome.dropped} left out); statistics of ${Object.keys(outcome.stats.decks).length} decks written to ${out}.`);
    return 0;
  } catch (error) {
    log(`Counting failed: ${error instanceof Error ? error.message : String(error)}`);
    return 1;
  }
}
