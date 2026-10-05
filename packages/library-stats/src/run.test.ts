import { describe, expect, it, vi } from "vitest";
import { personKeyOf, run, settingsFrom, webIdCheck } from "./run";

const ENV = {
  LIBRARY_INBOX_URL: "https://library.example/inbox/",
  LIBRARY_STATE_URL: "https://library.example/private/state.ttl",
  LIBRARY_STATS_SALT: "pepper",
  SOLID_OIDC_ISSUER: "https://library.example/",
  SOLID_CLIENT_ID: "id",
  SOLID_CLIENT_SECRET: "secret",
};
const ALICE = "https://alice.example/profile/card#me";
const AS = "https://www.w3.org/ns/activitystreams#";
const NOTICE = `<#notice> a <${AS}Add> ;
  <https://solid-memo.com/vocab/v1#formatVersion> 1 ;
  <${AS}actor> <${ALICE}> ;
  <${AS}object> <https://solid-memo.com/decks/index.ttl#world-flags> ;
  <${AS}published> "2026-10-05T10:00:00Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> .`;

/** The library's pod: an inbox with one notice; state saved as JSON. */
function libraryPodFetch() {
  const resources = new Map<string, string>([[`${ENV.LIBRARY_INBOX_URL}n1`, NOTICE]]);
  return vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const method = init?.method ?? "GET";
    const respond = (status: number, body: string | null = null, type = "text/turtle") =>
      Object.defineProperty(new Response(body, { status, headers: body === null ? {} : { "Content-Type": type } }), "url", { value: url });
    if (method === "PUT") {
      resources.set(url, String(init!.body));
      return respond(201);
    }
    if (method === "DELETE") {
      resources.delete(url);
      return respond(205);
    }
    if (url === ENV.LIBRARY_INBOX_URL) {
      return respond(200, [...resources.keys()].filter((k) => k.startsWith(url)).map((k) => `<> <http://www.w3.org/ns/ldp#contains> <${k}> .`).join("\n"));
    }
    const body = resources.get(url);
    return body === undefined ? respond(404, "") : respond(200, body);
  }) as unknown as typeof globalThis.fetch;
}

describe("settingsFrom", () => {
  it("reads the settings, the library's index by default solid-memo.com's", () => {
    expect(settingsFrom(ENV)).toEqual({
      inboxUrl: ENV.LIBRARY_INBOX_URL,
      stateUrl: ENV.LIBRARY_STATE_URL,
      indexUrl: "https://solid-memo.com/decks/index.ttl",
      salt: "pepper",
      credentials: { oidcIssuer: ENV.SOLID_OIDC_ISSUER, clientId: "id", clientSecret: "secret" },
    });
    expect(settingsFrom({ ...ENV, LIBRARY_INDEX_URL: "https://x.example/decks/index.ttl" })).toMatchObject({ indexUrl: "https://x.example/decks/index.ttl" });
  });

  it("names every setting missing", () => {
    expect(settingsFrom({ ...ENV, LIBRARY_STATS_SALT: "", SOLID_CLIENT_ID: undefined })).toEqual({
      missing: ["LIBRARY_STATS_SALT", "SOLID_CLIENT_ID"],
    });
  });
});

describe("personKeyOf", () => {
  it("is a salted hash, the same for the same WebID and salt only", () => {
    const key = personKeyOf("pepper")(ALICE);
    expect(key).toMatch(/^[0-9a-f]{64}$/);
    expect(personKeyOf("pepper")(ALICE)).toBe(key);
    expect(personKeyOf("salt")(ALICE)).not.toBe(key);
  });
});

describe("webIdCheck", () => {
  it("is true when the profile can be read, false when not or when it cannot be reached", async () => {
    expect(await webIdCheck(vi.fn(async () => new Response("", { status: 200 })))(ALICE)).toBe(true);
    expect(await webIdCheck(vi.fn(async () => new Response("", { status: 404 })))(ALICE)).toBe(false);
    expect(await webIdCheck(vi.fn(async () => Promise.reject(new Error("offline"))))(ALICE)).toBe(false);
  });
});

describe("run", () => {
  function deps(env: Record<string, string | undefined> = ENV, args = ["dist/decks/stats.ttl"]) {
    const podFetch = libraryPodFetch();
    return {
      env,
      args,
      login: vi.fn(async () => podFetch),
      publicFetch: vi.fn(async () => new Response("", { status: 200 })) as unknown as typeof globalThis.fetch,
      writeFile: vi.fn(async () => undefined),
      log: vi.fn(),
      now: () => new Date("2026-10-05T12:00:00.000Z"),
      podFetch,
    };
  }

  it("logs in, counts the inbox and writes the statistics", async () => {
    const d = deps();
    expect(await run(d)).toBe(0);
    expect(d.login).toHaveBeenCalledWith({ oidcIssuer: ENV.SOLID_OIDC_ISSUER, clientId: "id", clientSecret: "secret" });
    expect(d.writeFile).toHaveBeenCalledOnce();
    const [path, text] = vi.mocked(d.writeFile).mock.calls[0] as unknown as [string, string];
    expect(path).toBe("dist/decks/stats.ttl");
    expect(text).toContain('<stats.ttl#world-flags-downloads> <https://schema.org/userInteractionCount> "1"^^<http://www.w3.org/2001/XMLSchema#integer> .');
    expect(d.log).toHaveBeenCalledWith("Counted 1 notices (0 left out); statistics of 1 decks written to dist/decks/stats.ttl.");
  });

  it("counts as of now by default", async () => {
    const { now: _now, ...d } = deps();
    expect(await run(d)).toBe(0);
  });

  it("says what is missing, and writes nothing", async () => {
    const d = deps({}, []);
    expect(await run(d)).toBe(1);
    expect(d.log).toHaveBeenCalledWith("Usage: count <file to write the statistics to>");
    expect(d.log).toHaveBeenCalledWith(expect.stringMatching(/^Missing settings: LIBRARY_INBOX_URL, /));
    expect(d.login).not.toHaveBeenCalled();
    for (const one of [deps(ENV, []), deps({})]) {
      expect(await run(one)).toBe(1);
      expect(one.log).toHaveBeenCalledOnce();
    }
  });

  it("says why counting failed, and writes nothing", async () => {
    const d = deps();
    d.login.mockRejectedValue(new Error("bad credentials"));
    expect(await run(d)).toBe(1);
    expect(d.log).toHaveBeenCalledWith("Counting failed: bad credentials");
    d.login.mockRejectedValue("refused");
    expect(await run(d)).toBe(1);
    expect(d.log).toHaveBeenCalledWith("Counting failed: refused");
    expect(d.writeFile).not.toHaveBeenCalled();
  });
});
