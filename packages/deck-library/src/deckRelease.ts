import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { Quad, Term } from "n3";
import { formatTurtle } from "@solid-memo/turtle/formatTurtle";
import { parseTurtle } from "@solid-memo/turtle/rdf";

/**
 * Deck releases (see docs/deck-library.md). A deck's source,
 * decks/<name>.ttl, is edited freely; `npm run deck:release -- <name>
 * --notes "…"` freezes it as the next release, releases/<name>/<n>.ttl:
 * the source re-based onto the release's own IRI, with what makes it a
 * release added — its version, series, the release before it, when it
 * was issued, what changed, who publishes it and its Turtle
 * distribution. A release is never edited again: its sha256 is recorded
 * in the lockfile, and the build fails if the bytes change.
 */

export const LIBRARY_BASE = "https://solid-memo.com/decks/";
export const INDEX_URL = `${LIBRARY_BASE}index.ttl`;
export const PUBLISHER_URL = `${INDEX_URL}#solid-memo`;
export const LOCKFILE = "deck-releases.lock.json";
export const SOURCES_DIR = "decks";
export const RELEASES_DIR = "releases";

export function releaseUrlOf(deck: string, version: number): string {
  return `${LIBRARY_BASE}${deck}/${version}.ttl`;
}

export function seriesUrlOf(deck: string): string {
  return `${INDEX_URL}#${deck}`;
}

const DCAT = "http://www.w3.org/ns/dcat#";
const DCTERMS = "http://purl.org/dc/terms/";
const ADMS = "http://www.w3.org/ns/adms#";
const XSD = "http://www.w3.org/2001/XMLSchema#";
const TURTLE_MEDIA_TYPE = "https://www.iana.org/assignments/media-types/text/turtle";
const TURTLE_FILE_TYPE = "http://publications.europa.eu/resource/authority/file-type/RDF_TURTLE";

/** What a release adds on the deck subject; a source never states these. */
export const RELEASE_PREDICATES = [
  `${DCAT}version`,
  `${DCTERMS}issued`,
  `${ADMS}versionNotes`,
  `${DCTERMS}publisher`,
  `${DCAT}inSeries`,
  `${DCAT}isVersionOf`,
  `${DCAT}prev`,
  `${DCAT}previousVersion`,
  `${DCAT}distribution`,
];

/** The release's distribution, a subject of the release: <#turtle>. */
const DISTRIBUTION = "turtle";

const PREFIXES: [string, string][] = [
  ["dcat", DCAT],
  ["dcterms", DCTERMS],
  ["adms", ADMS],
  ["xsd", XSD],
];

export interface ReleaseInfo {
  version: number;
  /** xsd:dateTime, e.g. "2026-09-28T10:00:00Z". */
  issued: string;
  notes?: string;
}

/**
 * The release document of a source: its @base moved to the release's
 * IRI (so `<>` is the release and `<#id>` its cards and agents, as in
 * the source), the release triples added, in the house style.
 */
export function releaseText(deck: string, source: string, info: ReleaseInfo): string {
  const stated = parseTurtle(source, `${LIBRARY_BASE}${deck}`).filter(
    (q) => q.subject.value === `${LIBRARY_BASE}${deck}` && RELEASE_PREDICATES.includes(q.predicate.value),
  );
  if (stated.length > 0) {
    throw new Error(
      `decks/${deck}.ttl states ${[...new Set(stated.map((q) => `<${q.predicate.value}>`))].join(", ")}: a release adds these, the source never does.`,
    );
  }
  const url = releaseUrlOf(deck, info.version);
  const withoutBase = source.replace(/^@base\s+<[^>]*>\s*\.\s*\n+/m, "");
  const missing = PREFIXES.filter(
    ([name]) => !new RegExp(`^@prefix\\s+${name}:`, "m").test(withoutBase),
  ).map(([name, iri]) => `@prefix ${name}: <${iri}> .\n`);
  const previous = info.version > 1 ? releaseUrlOf(deck, info.version - 1) : undefined;
  const release = [
    "<>",
    `    dcat:version ${JSON.stringify(String(info.version))} ;`,
    `    dcterms:issued ${JSON.stringify(info.issued)}^^xsd:dateTime ;`,
    ...(info.notes === undefined ? [] : [`    adms:versionNotes ${JSON.stringify(info.notes)} ;`]),
    `    dcterms:publisher <${PUBLISHER_URL}> ;`,
    `    dcat:inSeries <${seriesUrlOf(deck)}> ;`,
    `    dcat:isVersionOf <${seriesUrlOf(deck)}> ;`,
    ...(previous === undefined
      ? []
      : [`    dcat:prev <${previous}> ;`, `    dcat:previousVersion <${previous}> ;`]),
    `    dcat:distribution <#${DISTRIBUTION}> .`,
    "",
    `<#${DISTRIBUTION}>`,
    "    a dcat:Distribution ;",
    "    dcat:accessURL <> ;",
    "    dcat:downloadURL <> ;",
    `    dcat:mediaType <${TURTLE_MEDIA_TYPE}> ;`,
    `    dcterms:format <${TURTLE_FILE_TYPE}> .`,
  ].join("\n");
  // The prefixes a source lacks go after its own, which keep their order.
  const lastPrefix = [...withoutBase.matchAll(/^@prefix[^\n]*\n/gm)].at(-1);
  const at = lastPrefix === undefined ? 0 : lastPrefix.index + lastPrefix[0].length;
  const body = `${withoutBase.slice(0, at)}${missing.join("")}${withoutBase.slice(at)}`;
  return formatTurtle(`@base <${url}> .\n\n${body}\n${release}\n`, url);
}

function termKey(term: Term): string {
  if (term.termType !== "Literal") return `${term.termType}:${term.value}`;
  return `Literal:${JSON.stringify(term.value)}@${term.language}^^${term.datatype.value}`;
}

/**
 * What a release says about its deck, without what makes it a release:
 * the triples of a document read against `base`, less the release
 * triples on the document and its distribution. Two documents with the
 * same content are the same deck. A blank node is named by what it says
 * (contentLabels), not by the label the parser happened to give it, which
 * differs from one parse to the next.
 */
export function contentOf(turtle: string, base: string): string[] {
  const quads = parseTurtle(turtle, base).filter(
    (q: Quad) =>
      !(q.subject.value === base && RELEASE_PREDICATES.includes(q.predicate.value)) &&
      q.subject.value !== `${base}#${DISTRIBUTION}`,
  );
  const labels = contentLabels(quads);
  const key = (term: Term) => (term.termType === "BlankNode" ? `BlankNode:${labels.get(term.value)}` : termKey(term));
  return quads.map((q) => `${key(q.subject)} ${q.predicate.value} ${key(q.object)}`).sort();
}

/**
 * A name for every blank node from what it says: the SHA-256 of its
 * triples, the blank nodes they name in turn named the same way (a cycle
 * of blank nodes, which a deck never has, named as such).
 */
function contentLabels(quads: readonly Quad[]): Map<string, string> {
  const labels = new Map<string, string>();
  const label = (node: string, seen: ReadonlySet<string>): string => {
    const known = labels.get(node);
    if (known !== undefined) return known;
    if (seen.has(node)) return "cycle";
    const inner = new Set([...seen, node]);
    const triples = quads
      .filter((q) => q.subject.termType === "BlankNode" && q.subject.value === node)
      .map((q) => `${q.predicate.value} ${q.object.termType === "BlankNode" ? label(q.object.value, inner) : termKey(q.object)}`)
      .sort();
    const named = sha256(triples.join("\n"));
    labels.set(node, named);
    return named;
  };
  for (const q of quads) {
    for (const term of [q.subject, q.object]) if (term.termType === "BlankNode") label(term.value, new Set());
  }
  return labels;
}

export function sha256(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

export interface LockEntry {
  deck: string;
  version: number;
  issued: string;
  sha256: string;
}

export interface Lockfile {
  releases: LockEntry[];
}

export function renderLockfile(lock: Lockfile): string {
  const releases = [...lock.releases].sort(
    (a, b) => a.deck.localeCompare(b.deck) || a.version - b.version,
  );
  return `${JSON.stringify({ releases }, null, 2)}\n`;
}

export interface ReleaseIo {
  readFile(path: string): Promise<string>;
  writeFile(path: string, text: string): Promise<void>;
  now(): Date;
  log(message: string): void;
  /** Throws, naming every problem, unless the library with this release added is valid. */
  validate(release: { deck: string; version: number; turtle: string }): Promise<void>;
}

/** An xsd:dateTime to the second, e.g. "2026-09-28T10:00:00Z". */
function issuedAt(now: Date): string {
  return `${now.toISOString().slice(0, 19)}Z`;
}

/**
 * `npm run deck:release -- <name> --notes "…"`: freeze decks/<name>.ttl
 * as its next release and record it in the lockfile. Refuses a source
 * that has not changed since its last release. Exit code 0 on success.
 */
export async function main(argv: readonly string[], io: ReleaseIo): Promise<number> {
  // `node -e` puts the node binary first and drops the `--`.
  const args = argv.includes("--") ? argv.slice(argv.indexOf("--") + 1) : argv.slice(1);
  const notesAt = args.indexOf("--notes");
  const notes = notesAt === -1 ? undefined : args[notesAt + 1];
  const deck = args.find((arg, i) => !arg.startsWith("--") && (notesAt === -1 || i !== notesAt + 1));
  if (deck === undefined || !/^[a-z0-9][a-z0-9-]*$/.test(deck) || (notesAt !== -1 && notes === undefined)) {
    io.log('Usage: npm run deck:release -- <deck> [--notes "What changed."]');
    return 1;
  }
  const source = await io.readFile(`${SOURCES_DIR}/${deck}.ttl`).catch(() => undefined);
  if (source === undefined) {
    io.log(`There is no ${SOURCES_DIR}/${deck}.ttl to release.`);
    return 1;
  }
  const lock = JSON.parse(await io.readFile(LOCKFILE)) as Lockfile;
  const previous = lock.releases.filter((r) => r.deck === deck).sort((a, b) => b.version - a.version)[0];
  const version = (previous?.version ?? 0) + 1;
  if (previous !== undefined) {
    const latestUrl = releaseUrlOf(deck, previous.version);
    const latest = await io.readFile(`${RELEASES_DIR}/${deck}/${previous.version}.ttl`);
    const again = releaseText(deck, source, { version: previous.version, issued: previous.issued });
    if (contentOf(again, latestUrl).join("\n") === contentOf(latest, latestUrl).join("\n")) {
      io.log(`${SOURCES_DIR}/${deck}.ttl has not changed since release ${previous.version}.`);
      return 1;
    }
  }
  const issued = issuedAt(io.now());
  const turtle = releaseText(deck, source, { version, issued, ...(notes === undefined ? {} : { notes }) });
  await io.validate({ deck, version, turtle });
  const path = `${RELEASES_DIR}/${deck}/${version}.ttl`;
  await io.writeFile(path, turtle);
  await io.writeFile(
    LOCKFILE,
    renderLockfile({ releases: [...lock.releases, { deck, version, issued, sha256: sha256(turtle) }] }),
  );
  io.log(`released ${path}`);
  return 0;
}

export function defaultIo(
  root: string,
  validate: ReleaseIo["validate"],
): ReleaseIo {
  return {
    readFile: (path) => readFile(join(root, path), "utf8"),
    writeFile: async (path, text) => {
      await mkdir(dirname(join(root, path)), { recursive: true });
      await writeFile(join(root, path), text);
    },
    now: () => new Date(),
    log: (message) => console.log(message),
    validate,
  };
}

/** The script entry: `node -e "import('./tooling/deckRelease.ts').then((m) => m.run(process))" -- <deck>`. */
export async function run(
  process: { argv: readonly string[]; cwd(): string; exitCode?: number },
): Promise<void> {
  const root = process.cwd();
  const library = await import("./deckLibrary.ts");
  const validators = library.loadValidators();
  const io = defaultIo(root, async (release) =>
    library.validateWithRelease(await library.readReleases(root), release, await validators),
  );
  process.exitCode = await main(process.argv, io);
}
