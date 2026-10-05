import { randomUUID } from "node:crypto";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { DataFactory, Writer, type Quad } from "n3";
import type { ShapeEngine } from "@solid-memo/shacl/engine";
import { validateTurtleDocument } from "@solid-memo/shacl/node/shacl";
import { RDF_TYPE, objectsOf, parseTurtle } from "@solid-memo/turtle/rdf";

/**
 * A stand-in for the library's pod on the dev server (`npm run
 * dev:library`, docs/library-stats.md): an inbox that takes the app's
 * notices, and a statistics document counted from them whenever it is
 * read, so likes and downloads can be tried without the real inbox and
 * its processor (the solid-memo/inbox repository). It keeps to the
 * processor's contract: it drops a notice that does not fit its shape,
 * names a deck that is not in the index, or comes from an actor whose
 * profile cannot be read, and says why on the terminal. It checks that
 * a notice comes with a login, not whose: that is the real pod's work.
 * Never part of the build.
 */

const AS = "https://www.w3.org/ns/activitystreams#";
const SCHEMA = "https://schema.org/";
const DCTERMS = "http://purl.org/dc/terms/";
const XSD = "http://www.w3.org/2001/XMLSchema#";
const TURTLE = "text/turtle; charset=utf-8";

/** What a notice says someone did to a deck, as the inbox processor reads it. */
export interface DevNotice {
  action: "like" | "unlike" | "import";
  actor: string;
  /** The deck's series IRI, as the app found it in the index. */
  deck: string;
  published: string;
}

/** How many like and have imported each deck, by deck name. */
export type DevStats = ReadonlyMap<string, { likes: number; downloads: number }>;

/**
 * The notice a document's activities say: an as:Undo of an as:Like in
 * the document, an as:Add, or an as:Like, each with its actor and time;
 * null when it says none of them.
 */
export function noticeOf(quads: readonly Quad[]): DevNotice | null {
  const typed = (type: string) =>
    quads.filter((q) => q.predicate.value === RDF_TYPE && q.object.value === `${AS}${type}`).map((q) => q.subject.value);
  const one = (subject: string, predicate: string) => objectsOf(quads, subject, `${AS}${predicate}`)[0]?.value;
  const said = (subject: string) => ({ actor: one(subject, "actor"), published: one(subject, "published") });
  const notice = (action: DevNotice["action"], subject: string, deck: string | undefined): DevNotice | null => {
    const { actor, published } = said(subject);
    return actor === undefined || published === undefined || deck === undefined ? null : { action, actor, deck, published };
  };
  const undo = typed("Undo")[0];
  if (undo !== undefined) {
    const like = one(undo, "object");
    return notice("unlike", undo, like === undefined ? undefined : one(like, "object"));
  }
  const add = typed("Add")[0];
  if (add !== undefined) return notice("import", add, one(add, "object"));
  const like = typed("Like")[0];
  return like === undefined ? null : notice("like", like, one(like, "object"));
}

/**
 * The statistics the notices come to: a person counts once per deck
 * however often they import it, and their latest like or unlike wins,
 * in whatever order the notices come. `deckOf` names the deck a series
 * IRI is in the index; a notice about none is left out.
 */
export function countDevNotices(notices: readonly DevNotice[], deckOf: (iri: string) => string | null): DevStats {
  const imported = new Set<string>();
  const liked = new Map<string, { liked: boolean; at: string }>();
  for (const notice of notices) {
    const deck = deckOf(notice.deck);
    if (deck === null) continue;
    const key = JSON.stringify([deck, notice.actor]);
    if (notice.action === "import") imported.add(key);
    else if ((liked.get(key)?.at ?? "") <= notice.published) liked.set(key, { liked: notice.action === "like", at: notice.published });
  }
  const stats = new Map<string, { likes: number; downloads: number }>();
  const of = (key: string) => {
    const [deck] = JSON.parse(key) as [string];
    return stats.get(deck) ?? stats.set(deck, { likes: 0, downloads: 0 }).get(deck)!;
  };
  for (const key of imported) of(key).downloads += 1;
  for (const [key, like] of liked) if (like.liked) of(key).likes += 1;
  return stats;
}

/**
 * The statistics document as the inbox processor publishes it: each
 * deck named absolutely (`<index>#<name>`), its counters `#<name>-likes`
 * and `#<name>-downloads`, and when they were counted.
 */
export function devStatsTurtle(stats: DevStats, { indexUrl, statsUrl, countedAt }: { indexUrl: string; statsUrl: string; countedAt: string }): string {
  const { namedNode, literal, quad } = DataFactory;
  const writer = new Writer({ prefixes: { schema: SCHEMA, dcterms: DCTERMS, xsd: XSD } });
  writer.addQuad(quad(namedNode(statsUrl), namedNode(`${DCTERMS}modified`), literal(countedAt, namedNode(`${XSD}dateTime`))));
  for (const [deck, counts] of [...stats].sort(([a], [b]) => a.localeCompare(b))) {
    for (const [kind, type, count] of [["likes", "LikeAction", counts.likes], ["downloads", "DownloadAction", counts.downloads]] as const) {
      const counter = namedNode(`${statsUrl}#${deck}-${kind}`);
      writer.addQuad(quad(namedNode(`${indexUrl}#${deck}`), namedNode(`${SCHEMA}interactionStatistic`), counter));
      writer.addQuad(quad(counter, namedNode(RDF_TYPE), namedNode(`${SCHEMA}InteractionCounter`)));
      writer.addQuad(quad(counter, namedNode(`${SCHEMA}interactionType`), namedNode(`${SCHEMA}${type}`)));
      writer.addQuad(quad(counter, namedNode(`${SCHEMA}userInteractionCount`), literal(String(count), namedNode(`${XSD}integer`))));
    }
  }
  let output = "";
  writer.end((_error, result) => {
    output = result;
  });
  return output;
}

/** Where the notices are parsed, each document its own: they hold no IRIs but their fragments relative to it. */
const PARSE_BASE = "http://dev-inbox.invalid/";

export interface DevInbox {
  /**
   * Take a notice POSTed to the inbox, as the real one does (201 and
   * where it was put), or 401 without a login. `deckOf` names the deck
   * a series IRI is in the index now.
   */
  receive(body: string, { inboxUrl, loggedIn, deckOf }: { inboxUrl: string; loggedIn: boolean; deckOf: (iri: string) => string | null }): Promise<{ status: number; location?: string }>;
  /** Every notice kept: those the processor would count. */
  notices(): Promise<DevNotice[]>;
}

/**
 * The stand-in's inbox, keeping each notice it counts as a file in
 * `dir`/inbox/ and each it drops in `dir`/dropped/, so they last
 * between dev servers and can be looked at; delete `dir` to start over.
 */
export function createDevInbox({
  dir,
  shapes,
  profileReadable = async (webId) => (await fetch(webId, { headers: { Accept: "text/turtle" } })).ok,
  warn = (message) => console.warn(message),
}: {
  dir: string;
  shapes: ShapeEngine;
  /** Whether a WebID's profile can be read without a login; asked once per WebID. */
  profileReadable?: (webId: string) => Promise<boolean>;
  warn?: (message: string) => void;
}): DevInbox {
  const readable = new Map<string, Promise<boolean>>();
  const isReadable = (webId: string) => {
    if (!readable.has(webId)) readable.set(webId, profileReadable(webId).catch(() => false));
    return readable.get(webId)!;
  };

  /** Why the processor would drop the notice; null when it would count it. */
  async function problemOf(body: string, name: string, deckOf: (iri: string) => string | null): Promise<string | null> {
    let quads: Quad[];
    try {
      quads = parseTurtle(body, `${PARSE_BASE}${name}`);
      await validateTurtleDocument("it does not fit its shape", quads, shapes, "pod");
    } catch (error) {
      return (error as Error).message;
    }
    const notice = noticeOf(quads);
    if (notice === null) return "it is no like, unlike or import";
    if (deckOf(notice.deck) === null) return `<${notice.deck}> is no deck of the library's index`;
    if (!notice.actor.startsWith("https://") || !(await isReadable(notice.actor))) {
      return `the profile of <${notice.actor}> cannot be read without a login (the real inbox processor would drop it too)`;
    }
    return null;
  }

  return {
    async receive(body, { inboxUrl, loggedIn, deckOf }) {
      if (!loggedIn) return { status: 401 };
      const name = randomUUID();
      const problem = await problemOf(body, name, deckOf);
      const folder = join(dir, problem === null ? "inbox" : "dropped");
      await mkdir(folder, { recursive: true });
      await writeFile(join(folder, `${name}.ttl`), body);
      if (problem !== null) warn(`The library's dev inbox dropped a notice: ${problem}.`);
      return { status: 201, location: `${inboxUrl}${name}` };
    },

    async notices() {
      const folder = join(dir, "inbox");
      const files = (await readdir(folder).catch(() => [])).filter((file) => file.endsWith(".ttl"));
      const notices: DevNotice[] = [];
      for (const file of files) {
        const notice = noticeOf(parseTurtle(await readFile(join(folder, file), "utf8"), `${PARSE_BASE}${file}`));
        if (notice !== null) notices.push(notice);
      }
      return notices;
    },
  };
}

/** A request to the dev server under the library (`prefix`, e.g. `/decks/`), as the stand-in needs it. */
export interface DevRequest {
  path: string;
  prefix: string;
  method: string | undefined;
  /** The address the app was opened at: the stand-in names everything on it. */
  origin: string;
  loggedIn: boolean;
  body: () => Promise<string>;
  /** The decks of the index the dev server serves now. */
  decks: ReadonlySet<string>;
  now: () => Date;
}

/** What the stand-in answers. */
export interface DevResponse {
  status: number;
  headers: Record<string, string>;
  body?: string;
}

/**
 * The stand-in's answer to a request: its inbox at `<prefix>dev/inbox/`
 * (POST only), its statistics at `<prefix>dev/stats.ttl`, counted now;
 * null for any other address.
 */
export async function answerDevRequest(inbox: DevInbox, request: DevRequest): Promise<DevResponse | null> {
  const { path, prefix, origin } = request;
  const indexPath = `${prefix}index.ttl`;
  /** The deck a series IRI is in the index, on whichever address the app was opened at. */
  const deckOf = (iri: string) => {
    const url = new URL(iri, origin);
    const name = url.hash.slice(1);
    return url.pathname === indexPath && request.decks.has(name) ? name : null;
  };
  switch (path) {
    case `${prefix}dev/inbox/`: {
      if (request.method !== "POST") return { status: 405, headers: { Allow: "POST" } };
      const outcome = await inbox.receive(await request.body(), { inboxUrl: `${origin}${path}`, loggedIn: request.loggedIn, deckOf });
      return { status: outcome.status, headers: outcome.location === undefined ? {} : { Location: outcome.location } };
    }
    case `${prefix}dev/stats.ttl`: {
      const stats = countDevNotices(await inbox.notices(), deckOf);
      const body = devStatsTurtle(stats, { indexUrl: `${origin}${indexPath}`, statsUrl: `${origin}${path}`, countedAt: request.now().toISOString() });
      return { status: 200, headers: { "Content-Type": TURTLE }, body };
    }
    default:
      return null;
  }
}
