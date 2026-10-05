import { mkdir, mkdtemp, readdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { objectsOf, parseTurtle } from "@solid-memo/turtle/rdf";
import { countDevNotices, createDevInbox, devStatsTurtle, noticeOf, type DevNotice } from "./devInbox.ts";
import { loadValidators } from "./deckLibrary.ts";

const { shapes } = await loadValidators();
const INDEX = "http://localhost:5173/decks/index.ttl";
const INBOX = "http://localhost:5173/decks/dev/inbox/";
const STATS = "http://localhost:5173/decks/dev/stats.ttl";
const ALICE = "https://alice.example/profile/card#me";
const BOB = "https://bob.example/profile/card#me";
const PREFIXES = `@prefix as: <https://www.w3.org/ns/activitystreams#>.
@prefix sm: <https://solid-memo.com/vocab/v1#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
`;

/** A notice as the app sends it (solidLibraryInbox.ts). */
function noticeTurtle(type: "Like" | "Add" | "Undo", { actor = ALICE, deck = `${INDEX}#capitals`, at = "2026-10-05T10:00:00.000Z" } = {}): string {
  const time = `as:published "${at}"^^xsd:dateTime`;
  if (type !== "Undo") return `${PREFIXES}<#notice> a as:${type}; sm:formatVersion 1; as:actor <${actor}>; as:object <${deck}>; ${time}.`;
  return `${PREFIXES}<#notice> a as:Undo; sm:formatVersion 1; as:actor <${actor}>; as:object <#like>; ${time}.
<#like> a as:Like; sm:formatVersion 1; as:actor <${actor}>; as:object <${deck}>.`;
}

const quadsOf = (turtle: string) => parseTurtle(turtle, "http://inbox.example/n1");
const deckOf = (iri: string) => (iri.startsWith(`${INDEX}#`) ? iri.slice(INDEX.length + 1) : null);

describe("noticeOf", () => {
  it("reads a like, an unlike and an import as the app sends them", () => {
    const deck = `${INDEX}#capitals`;
    const at = "2026-10-05T10:00:00.000Z";
    expect(noticeOf(quadsOf(noticeTurtle("Like")))).toEqual({ action: "like", actor: ALICE, deck, published: at });
    expect(noticeOf(quadsOf(noticeTurtle("Undo")))).toEqual({ action: "unlike", actor: ALICE, deck, published: at });
    expect(noticeOf(quadsOf(noticeTurtle("Add")))).toEqual({ action: "import", actor: ALICE, deck, published: at });
  });

  it("reads none from a document without a whole activity", () => {
    expect(noticeOf(quadsOf(`${PREFIXES}<#n> a as:Like; as:object <${INDEX}#capitals>.`))).toBeNull();
    expect(noticeOf(quadsOf(`${PREFIXES}<#n> a as:Undo; as:actor <${ALICE}>; as:published "2026-10-05T10:00:00Z"^^xsd:dateTime.`))).toBeNull();
    expect(noticeOf(quadsOf(`${PREFIXES}<#n> a as:Undo; as:actor <${ALICE}>; as:object <#like>.`))).toBeNull();
    expect(noticeOf(quadsOf(`<#n> <http://purl.org/dc/terms/title> "no activity".`))).toBeNull();
  });
});

describe("countDevNotices", () => {
  const notice = (action: DevNotice["action"], actor: string, at: string, deck = `${INDEX}#capitals`): DevNotice => ({ action, actor, deck, published: at });

  it("counts a person once per deck however often they import it, leaving out what is about no deck of the index", () => {
    const stats = countDevNotices(
      [
        notice("import", ALICE, "2026-10-05T10:00:00Z"),
        notice("import", ALICE, "2026-10-05T11:00:00Z"),
        notice("import", BOB, "2026-10-05T11:00:00Z"),
        notice("import", BOB, "2026-10-05T11:00:00Z", `${INDEX}#rivers`),
        notice("import", BOB, "2026-10-05T11:00:00Z", "https://elsewhere.example/decks/index.ttl#capitals"),
      ],
      deckOf,
    );
    expect(Object.fromEntries(stats)).toEqual({ capitals: { likes: 0, downloads: 2 }, rivers: { likes: 0, downloads: 1 } });
  });

  it("lets a person's latest like or unlike win, in whatever order the notices come", () => {
    const stats = countDevNotices(
      [
        notice("unlike", ALICE, "2026-10-05T11:00:00Z"),
        notice("like", ALICE, "2026-10-05T10:00:00Z"),
        notice("like", BOB, "2026-10-05T10:00:00Z"),
        notice("unlike", BOB, "2026-10-05T10:30:00Z"),
        notice("like", BOB, "2026-10-05T11:30:00Z"),
      ],
      deckOf,
    );
    expect(Object.fromEntries(stats)).toEqual({ capitals: { likes: 1, downloads: 0 } });
  });
});

describe("devStatsTurtle", () => {
  it("writes the document as the inbox processor publishes it, decks named absolutely", () => {
    const stats = new Map([
      ["rivers", { likes: 0, downloads: 1 }],
      ["capitals", { likes: 2, downloads: 7 }],
    ]);
    const quads = parseTurtle(devStatsTurtle(stats, { indexUrl: INDEX, statsUrl: STATS, countedAt: "2026-10-05T06:00:00.000Z" }), STATS);
    const SCHEMA = "https://schema.org/";
    expect(objectsOf(quads, STATS, "http://purl.org/dc/terms/modified").map((o) => o.value)).toEqual(["2026-10-05T06:00:00.000Z"]);
    expect(objectsOf(quads, `${INDEX}#capitals`, `${SCHEMA}interactionStatistic`).map((o) => o.value)).toEqual([
      `${STATS}#capitals-likes`,
      `${STATS}#capitals-downloads`,
    ]);
    expect(objectsOf(quads, `${STATS}#capitals-likes`, `${SCHEMA}interactionType`).map((o) => o.value)).toEqual([`${SCHEMA}LikeAction`]);
    expect(objectsOf(quads, `${STATS}#capitals-downloads`, `${SCHEMA}userInteractionCount`).map((o) => o.value)).toEqual(["7"]);
    expect(objectsOf(quads, `${STATS}#rivers-downloads`, `${SCHEMA}userInteractionCount`).map((o) => o.value)).toEqual(["1"]);
  });
});

describe("createDevInbox", () => {
  let dir: string;
  beforeEach(async () => {
    dir = await mkdtemp(join(tmpdir(), "solid-memo-dev-inbox-"));
  });
  const options = { inboxUrl: INBOX, loggedIn: true, deckOf };

  it("keeps a notice it would count, says where, and gives it back", async () => {
    const inbox = createDevInbox({ dir, shapes, profileReadable: async () => true, warn: vi.fn() });
    const outcome = await inbox.receive(noticeTurtle("Like"), options);
    expect(outcome.status).toBe(201);
    expect(outcome.location).toMatch(new RegExp(`^${INBOX}[0-9a-f-]{36}$`));
    const [file] = await readdir(join(dir, "inbox"));
    expect(await readFile(join(dir, "inbox", file!), "utf8")).toBe(noticeTurtle("Like"));
    await inbox.receive(noticeTurtle("Undo", { at: "2026-10-05T11:00:00.000Z" }), options);
    expect((await inbox.notices()).map((n) => n.action).sort()).toEqual(["like", "unlike"]);
  });

  it("takes nothing without a login", async () => {
    const inbox = createDevInbox({ dir, shapes, profileReadable: async () => true });
    await expect(inbox.receive(noticeTurtle("Like"), { ...options, loggedIn: false })).resolves.toEqual({ status: 401 });
    await expect(inbox.notices()).resolves.toEqual([]);
  });

  it("drops, as the inbox processor does, and says why: what is no notice, about no deck of the index, or from no readable profile", async () => {
    const warn = vi.fn();
    const profileReadable = vi.fn(async (webId: string) => {
      if (webId === BOB) throw new Error("offline");
      return webId === ALICE;
    });
    const inbox = createDevInbox({ dir, shapes, profileReadable, warn });
    const sent = [
      "nonsense",
      `${PREFIXES}<#notice> a as:Like; sm:formatVersion 1; as:actor <${ALICE}>.`,
      `<#n> <http://purl.org/dc/terms/title> "no activity".`,
      noticeTurtle("Add", { deck: "https://elsewhere.example/decks/index.ttl#capitals" }),
      noticeTurtle("Add", { actor: "http://alice.example/profile/card#me" }),
      noticeTurtle("Add", { actor: "https://carol.example/profile/card#me" }),
      noticeTurtle("Add", { actor: BOB }),
      noticeTurtle("Like", { actor: BOB }),
    ];
    for (const body of sent) expect((await inbox.receive(body, options)).status).toBe(201);
    expect(await inbox.notices()).toEqual([]);
    expect(await readdir(join(dir, "dropped"))).toHaveLength(sent.length);
    const reasons = warn.mock.calls.map(([message]) => message as string);
    expect(reasons[0]).toContain("The library's dev inbox dropped a notice: ");
    expect(reasons[1]).toContain("it does not fit its shape");
    expect(reasons[2]).toContain("it is no like, unlike or import");
    expect(reasons[3]).toContain("<https://elsewhere.example/decks/index.ttl#capitals> is no deck of the library's index");
    for (const reason of reasons.slice(4)) expect(reason).toContain("cannot be read without a login");
    // Asked once per WebID, never for one that is no https IRI.
    expect(profileReadable.mock.calls.map(([webId]) => webId)).toEqual(["https://carol.example/profile/card#me", BOB]);
  });

  it("gives back only the notices among the kept files", async () => {
    await mkdir(join(dir, "inbox"));
    await writeFile(join(dir, "inbox", "readme.txt"), "not a notice");
    await writeFile(join(dir, "inbox", "other.ttl"), `<#n> <http://purl.org/dc/terms/title> "no activity".`);
    await expect(createDevInbox({ dir, shapes }).notices()).resolves.toEqual([]);
  });

  it("reads a profile without a login, and warns on the console, by default", async () => {
    const fetch = vi.fn(async () => new Response("", { status: 404 }));
    vi.stubGlobal("fetch", fetch);
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    await createDevInbox({ dir, shapes }).receive(noticeTurtle("Like"), options);
    expect(fetch).toHaveBeenCalledWith(ALICE, { headers: { Accept: "text/turtle" } });
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("cannot be read without a login"));
    warn.mockRestore();
    vi.unstubAllGlobals();
  });
});
