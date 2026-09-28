import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { DataFactory, Writer, type Quad, type Quad_Object } from "n3";
import type { Plugin } from "vite";
import type { ShapeEngine } from "../src/infrastructure/shacl/engine.ts";
import {
  contentOf,
  INDEX_URL,
  LIBRARY_BASE,
  LOCKFILE,
  PUBLISHER_URL,
  RELEASES_DIR,
  releaseText,
  releaseUrlOf,
  seriesUrlOf,
  sha256,
  SOURCES_DIR,
  type Lockfile,
} from "./deckRelease.ts";
import { formatTurtle } from "./formatTurtle.ts";
import { RDF_TYPE, objectsOf, parseTurtle } from "./rdf.ts";
import {
  loadEngine,
  loadProfileEngine,
  loadReferenceData,
  validateProfile,
  validateTurtleDocument,
} from "./shacl.ts";
import { SM_NS } from "./vocab.ts";

/**
 * The deck library (see docs/deck-library.md), published next to the app
 * under decks/: every release of every deck (releases/<name>/<n>.ttl,
 * frozen and checked against the lockfile), a copy of each deck's
 * current release at its pre-release address decks/<name>.ttl (so decks
 * imported before releases still resolve), and decks/index.ttl, a DCAT
 * catalogue generated from the releases that the app browses.
 *
 * Every release and the index are validated against Solid Memo's shapes
 * and against DCAT-AP (with the index and the reference data beside
 * them); a broken one fails the build. A source, decks/<name>.ttl, is
 * validated as its next release would be; one with changes not yet
 * released is a warning, not an error: it is released by hand.
 */

const DCAT = "http://www.w3.org/ns/dcat#";
const DCTERMS = "http://purl.org/dc/terms/";
const ADMS = "http://www.w3.org/ns/adms#";
const FOAF = "http://xmlns.com/foaf/0.1/";
const XSD = "http://www.w3.org/2001/XMLSchema#";
const TURTLE = "text/turtle; charset=utf-8";
const INDEX_FILE = "index.ttl";
const DATA_THEMES = "http://publications.europa.eu/resource/authority/data-theme";
const TOPICS = "https://solid-memo.com/vocab/topics";

/** One frozen release of a deck, as the build reads it. */
export interface DeckRelease {
  deck: string;
  version: number;
  turtle: string;
}

/** A deck's editable source. */
export interface DeckSource {
  deck: string;
  turtle: string;
}

/** Deck names are plain: lower-case letters, digits and dashes. */
const DECK_NAME = /^[a-z0-9][a-z0-9-]*$/;

/** Every source, decks/<name>.ttl, sorted by name. */
export async function readSources(root: string): Promise<DeckSource[]> {
  const names = (await readdir(join(root, SOURCES_DIR)))
    .filter((file) => file.endsWith(".ttl") && DECK_NAME.test(file.slice(0, -4)))
    .sort();
  return Promise.all(
    names.map(async (file) => ({
      deck: file.slice(0, -4),
      turtle: await readFile(join(root, SOURCES_DIR, file), "utf8"),
    })),
  );
}

/** Every release, releases/<name>/<n>.ttl, sorted by deck then version. */
export async function readReleases(root: string): Promise<DeckRelease[]> {
  const dir = join(root, RELEASES_DIR);
  const decks = (await readdir(dir, { withFileTypes: true }).catch(() => []))
    .filter((entry) => entry.isDirectory() && DECK_NAME.test(entry.name))
    .map((entry) => entry.name);
  const releases: DeckRelease[] = [];
  for (const deck of decks) {
    for (const file of await readdir(join(dir, deck))) {
      const match = /^([1-9][0-9]*)\.ttl$/.exec(file);
      if (match === null) {
        throw new Error(`${RELEASES_DIR}/${deck}/${file} is not a release: expected <n>.ttl.`);
      }
      releases.push({
        deck,
        version: Number(match[1]),
        turtle: await readFile(join(dir, deck, file), "utf8"),
      });
    }
  }
  return releases.sort((a, b) => a.deck.localeCompare(b.deck) || a.version - b.version);
}

export async function readLockfile(root: string): Promise<Lockfile> {
  return JSON.parse(await readFile(join(root, LOCKFILE), "utf8")) as Lockfile;
}

/**
 * Throws unless the releases on disk are exactly the lockfile's, byte
 * for byte, each deck's numbered 1, 2, … without gaps: a release is
 * never edited, renumbered or removed.
 */
export function checkLockfile(releases: readonly DeckRelease[], lock: Lockfile): void {
  const problems: string[] = [];
  const key = (r: { deck: string; version: number }) => `${RELEASES_DIR}/${r.deck}/${r.version}.ttl`;
  const recorded = new Map(lock.releases.map((entry) => [key(entry), entry]));
  const onDisk = new Set(releases.map(key));
  for (const release of releases) {
    const entry = recorded.get(key(release));
    if (entry === undefined) problems.push(`${key(release)} is not in ${LOCKFILE}: release with npm run deck:release.`);
    else if (entry.sha256 !== sha256(release.turtle)) {
      problems.push(`${key(release)} has changed since it was released: a release is never edited.`);
    }
  }
  for (const entry of lock.releases) {
    if (!onDisk.has(key(entry))) problems.push(`${key(entry)} is in ${LOCKFILE} but missing.`);
  }
  for (const deck of new Set(lock.releases.map((entry) => entry.deck))) {
    const versions = lock.releases.filter((e) => e.deck === deck).map((e) => e.version).sort((a, b) => a - b);
    if (versions.some((version, i) => version !== i + 1)) {
      problems.push(`${deck}'s releases must run 1, 2, … without gaps; found ${versions.join(", ")}.`);
    }
  }
  if (problems.length > 0) throw new Error(`${LOCKFILE}:\n  ${problems.join("\n  ")}`);
}

function quadsOf(release: DeckRelease): Quad[] {
  return parseTurtle(release.turtle, releaseUrlOf(release.deck, release.version));
}

function literalOf(quads: readonly Quad[], subject: string, predicate: string): Quad_Object | undefined {
  return objectsOf(quads, subject, predicate).find((o) => o.termType === "Literal");
}

/**
 * The index: a dcat:Catalog of the library's decks. Each deck is a
 * dcat:DatasetSeries (and dcat:Dataset) whose members are its releases,
 * which are its versions too; every release is described (a
 * dcat:Dataset with its title, description, version, issue time and
 * notes), the current one in full — everything but its cards, plus
 * sm:cardCount — so the library can be listed from the index alone.
 * IRIs under the library are written relative to the index, so the
 * library works wherever the site is hosted.
 */
export function buildIndex(releases: readonly DeckRelease[]): string {
  const { namedNode, literal, quad } = DataFactory;
  const out: Quad[] = [];
  const add = (s: string, p: string, o: Quad_Object) => out.push(quad(namedNode(s), namedNode(p), o));
  const iri = (value: string) => namedNode(value);
  const decks = [...new Set(releases.map((r) => r.deck))];
  const issued = releases
    .map((r) => literalOf(quadsOf(r), releaseUrlOf(r.deck, r.version), `${DCTERMS}issued`)?.value)
    .filter((value): value is string => value !== undefined)
    .sort();

  add(INDEX_URL, RDF_TYPE, iri(`${DCAT}Catalog`));
  add(INDEX_URL, `${DCTERMS}title`, literal("Solid Memo deck library"));
  add(INDEX_URL, `${DCTERMS}description`, literal("Ready-made flashcard decks to import into your own Solid pod."));
  add(INDEX_URL, `${DCTERMS}publisher`, iri(PUBLISHER_URL));
  if (issued.length > 0) {
    add(INDEX_URL, `${DCTERMS}modified`, literal(issued[issued.length - 1], iri(`${XSD}dateTime`)));
  }
  add(INDEX_URL, `${DCAT}themeTaxonomy`, iri(DATA_THEMES));
  add(INDEX_URL, `${DCAT}themeTaxonomy`, iri(TOPICS));
  for (const deck of decks) add(INDEX_URL, `${DCAT}dataset`, iri(seriesUrlOf(deck)));
  add(PUBLISHER_URL, RDF_TYPE, iri(`${FOAF}Agent`));
  add(PUBLISHER_URL, `${FOAF}name`, literal("Solid Memo"));

  for (const deck of decks) {
    const ofDeck = releases.filter((r) => r.deck === deck);
    const latest = ofDeck[ofDeck.length - 1];
    const latestUrl = releaseUrlOf(deck, latest.version);
    const latestQuads = quadsOf(latest);
    const series = seriesUrlOf(deck);
    add(series, RDF_TYPE, iri(`${DCAT}DatasetSeries`));
    add(series, RDF_TYPE, iri(`${DCAT}Dataset`));
    for (const predicate of [`${DCTERMS}title`, `${DCTERMS}description`]) {
      const object = literalOf(latestQuads, latestUrl, predicate);
      // A release without one fails validation, which says so.
      if (object !== undefined) add(series, predicate, object);
    }
    add(series, `${DCTERMS}publisher`, iri(PUBLISHER_URL));
    for (const predicate of [`${DCAT}theme`, `${DCAT}keyword`]) {
      for (const object of objectsOf(latestQuads, latestUrl, predicate)) add(series, predicate, object);
    }
    add(series, `${DCAT}first`, iri(releaseUrlOf(deck, 1)));
    add(series, `${DCAT}last`, iri(latestUrl));
    for (const release of ofDeck) add(series, `${DCAT}hasVersion`, iri(releaseUrlOf(deck, release.version)));
    add(series, `${DCAT}hasCurrentVersion`, iri(latestUrl));

    for (const release of ofDeck.slice(0, -1)) {
      const url = releaseUrlOf(deck, release.version);
      const quads = quadsOf(release);
      add(url, RDF_TYPE, iri(`${DCAT}Dataset`));
      for (const predicate of [
        `${DCTERMS}title`,
        `${DCTERMS}description`,
        `${DCAT}version`,
        `${DCTERMS}issued`,
        `${ADMS}versionNotes`,
      ]) {
        const object = literalOf(quads, url, predicate);
        if (object !== undefined) add(url, predicate, object);
      }
    }

    const cards = new Set(
      latestQuads
        .filter((q) => q.predicate.value === RDF_TYPE && q.object.value === `${SM_NS}Card`)
        .map((q) => q.subject.value),
    );
    out.push(...latestQuads.filter((q) => !cards.has(q.subject.value)));
    add(latestUrl, `${SM_NS}cardCount`, literal(String(cards.size), iri(`${XSD}integer`)));
  }
  return writeRelative(out);
}

/**
 * The index in the house style (tooling/formatTurtle.ts), IRIs under the
 * library written relative to the index.
 */
function writeRelative(quads: readonly Quad[]): string {
  const writer = new Writer({
    prefixes: {
      sm: SM_NS,
      dcat: DCAT,
      dcterms: DCTERMS,
      adms: ADMS,
      foaf: FOAF,
      prov: "http://www.w3.org/ns/prov#",
      topic: `${TOPICS}#`,
      xsd: XSD,
    },
  });
  writer.addQuads([...quads]);
  let output = "";
  writer.end((_error, result) => {
    output = result;
  });
  return formatTurtle(output, INDEX_URL, { relativeTo: LIBRARY_BASE });
}

/** What the library is checked with: Solid Memo's shapes, DCAT-AP and the reference data. */
export interface LibraryValidators {
  shapes: ShapeEngine;
  dcatAp: ShapeEngine;
  reference: Quad[];
}

export async function loadValidators(root: string): Promise<LibraryValidators> {
  const [shapes, dcatAp, reference] = await Promise.all([
    loadEngine(root),
    loadProfileEngine(root, "dcat-ap"),
    loadReferenceData(root),
  ]);
  return { shapes, dcatAp, reference };
}

/**
 * Throws, naming every problem, unless every release and the index
 * conform: to Solid Memo's shapes, to DCAT-AP (a release with the index
 * beside it, where its series and publisher are described), and to what
 * the shapes cannot say — a release is exactly one deck, the document
 * itself, numbered and placed as its path says.
 */
export async function validateLibrary(
  releases: readonly DeckRelease[],
  index: string,
  validators: LibraryValidators,
): Promise<void> {
  const indexQuads = parseTurtle(index, INDEX_URL);
  for (const release of releases) {
    const label = `${RELEASES_DIR}/${release.deck}/${release.version}.ttl`;
    const url = releaseUrlOf(release.deck, release.version);
    const quads = quadsOf(release);
    const decks = [
      ...new Set(
        quads
          .filter((q) => q.predicate.value === RDF_TYPE && q.object.value === `${SM_NS}Deck`)
          .map((q) => q.subject.value),
      ),
    ];
    if (decks.length !== 1 || decks[0] !== url) {
      throw new Error(`${label}: expected the document itself to be its one sm:Deck, found ${decks.map((d) => `<${d}>`).join(", ") || "none"}.`);
    }
    const version = literalOf(quads, url, `${DCAT}version`)?.value;
    const series = objectsOf(quads, url, `${DCAT}inSeries`)[0]?.value;
    if (version !== String(release.version) || series !== seriesUrlOf(release.deck)) {
      throw new Error(`${label}: states version ${version} of <${series}>; its path says version ${release.version} of <${seriesUrlOf(release.deck)}>.`);
    }
    await validateTurtleDocument(label, quads, validators.shapes, "library");
    await validateProfile(label, quads, validators.dcatAp, [...validators.reference, ...indexQuads]);
  }
  await validateTurtleDocument(`decks/${INDEX_FILE}`, indexQuads, validators.shapes, "library");
  await validateProfile(`decks/${INDEX_FILE}`, indexQuads, validators.dcatAp, validators.reference);
}

/** A deck's releases, with what its source would be released as next. */
function withNextRelease(releases: readonly DeckRelease[], source: DeckSource): DeckRelease[] {
  const version = releases.filter((r) => r.deck === source.deck).length + 1;
  const next = {
    deck: source.deck,
    version,
    turtle: releaseText(source.deck, source.turtle, { version, issued: "2000-01-01T00:00:00Z" }),
  };
  return [...releases, next].sort((a, b) => a.deck.localeCompare(b.deck) || a.version - b.version);
}

/**
 * Throws unless the library with this release added is valid: what
 * `npm run deck:release` checks before it freezes a release.
 */
export async function validateWithRelease(
  releases: readonly DeckRelease[],
  release: DeckRelease,
  validators: LibraryValidators,
): Promise<void> {
  const all = [...releases, release].sort((a, b) => a.deck.localeCompare(b.deck) || a.version - b.version);
  await validateLibrary(all, buildIndex(all), validators);
}

/**
 * The library as published: the releases, checked against the lockfile
 * and validated, the index built from them, and a warning for every
 * source not yet released as it is. A source is validated as its next
 * release would be, so a broken source fails the build before anyone
 * releases it.
 */
export async function readDeckLibrary(
  root: string,
  validators: LibraryValidators,
): Promise<{ releases: DeckRelease[]; index: string; warnings: string[] }> {
  const [sources, releases, lock] = await Promise.all([
    readSources(root),
    readReleases(root),
    readLockfile(root),
  ]);
  checkLockfile(releases, lock);
  const index = buildIndex(releases);
  await validateLibrary(releases, index, validators);
  const warnings: string[] = [];
  for (const source of sources) {
    const released = releases.filter((r) => r.deck === source.deck);
    const latest = released[released.length - 1];
    if (latest === undefined) {
      const candidate = withNextRelease(releases, source);
      await validateLibrary(candidate, buildIndex(candidate), validators);
      warnings.push(`${SOURCES_DIR}/${source.deck}.ttl is not released yet: npm run deck:release -- ${source.deck}`);
      continue;
    }
    const url = releaseUrlOf(source.deck, latest.version);
    const entry = lock.releases.find((e) => e.deck === source.deck && e.version === latest.version)!;
    const again = releaseText(source.deck, source.turtle, { version: latest.version, issued: entry.issued });
    if (contentOf(again, url).join("\n") !== contentOf(latest.turtle, url).join("\n")) {
      const candidate = withNextRelease(releases, source);
      await validateLibrary(candidate, buildIndex(candidate), validators);
      warnings.push(
        `${SOURCES_DIR}/${source.deck}.ttl has changed since release ${latest.version}: npm run deck:release -- ${source.deck} --notes "What changed."`,
      );
    }
  }
  return { releases, index, warnings };
}

/** Every published file of the library: path under the library folder → content. */
export function publishedFiles(
  releases: readonly DeckRelease[],
  index: string,
): Map<string, string> {
  const files = new Map<string, string>();
  for (const release of releases) files.set(`${release.deck}/${release.version}.ttl`, release.turtle);
  for (const release of releases) files.set(`${release.deck}.ttl`, release.turtle);
  files.set(INDEX_FILE, index);
  return files;
}

export function deckLibraryPlugin({
  publicPath = "decks",
  root = ".",
  warn = (message: string) => console.warn(message),
  validators: loadLibraryValidators = () => loadValidators(root),
}: {
  publicPath?: string;
  root?: string;
  warn?: (message: string) => void;
  validators?: () => Promise<LibraryValidators>;
} = {}): Plugin {
  let validators: Promise<LibraryValidators> | undefined;
  const library = async () => {
    const read = await readDeckLibrary(root, await (validators ??= loadLibraryValidators()));
    for (const warning of read.warnings) warn(warning);
    return publishedFiles(read.releases, read.index);
  };
  return {
    name: "solid-memo:deck-library",

    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = (req.url ?? "").split("?")[0];
        const prefix = `/${publicPath}/`;
        if (!path.startsWith(prefix)) return next();
        try {
          const body = (await library()).get(path.slice(prefix.length));
          if (body === undefined) return next();
          res.setHeader("Content-Type", TURTLE);
          res.end(body);
        } catch (error) {
          next(error);
        }
      });
    },

    async generateBundle() {
      for (const [path, source] of await library()) {
        this.emitFile({ type: "asset", fileName: `${publicPath}/${path}`, source });
      }
    },
  };
}
