import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { DataFactory, Parser, Writer, type Quad_Object } from "n3";
import type { Plugin } from "vite";

/**
 * The deck library: ready-made decks in `decks/*.ttl` at the repository
 * root, published next to the app under `decks/` together with a
 * generated `decks/index.ttl` that lists them (title and card count).
 * A static host cannot list a directory, so the index is what the app
 * reads to browse the library; a deck document is fetched only to list
 * its cards or to import it.
 *
 * Adding a deck is dropping a Turtle file into `decks/`: the dev server
 * serves it straight away and the build copies it into `dist/decks/`.
 */

const SM = "https://solid-memo.com/vocab/v1#";
const RDF_TYPE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
const DCTERMS_TITLE = "http://purl.org/dc/terms/title";
const DCTERMS_CREATOR = "http://purl.org/dc/terms/creator";
const DCTERMS_LICENSE = "http://purl.org/dc/terms/license";
const DCTERMS_DESCRIPTION = "http://purl.org/dc/terms/description";
const DCTERMS_CREATED = "http://purl.org/dc/terms/created";
const DCTERMS_SOURCE = "http://purl.org/dc/terms/source";
const SM_FORMAT_VERSION = `${SM}formatVersion`;
const SM_DIRECTION = `${SM}direction`;
/** The study directions the app knows (domain/deck.ts). */
const DECK_DIRECTIONS = ["front-to-back", "back-to-front", "bidirectional"];
const XSD_INTEGER = "http://www.w3.org/2001/XMLSchema#integer";
const XSD_DATETIME = "http://www.w3.org/2001/XMLSchema#dateTime";
const TURTLE = "text/turtle; charset=utf-8";
const INDEX_FILE = "index.ttl";

/** What the index says about one deck document. */
export interface DeckSummary {
  /** File name inside the library, e.g. "capitals-of-the-world.ttl". */
  file: string;
  title: string;
  cardCount: number;
  /** Author names, in document order. */
  authors: string[];
  /** Licence URL, when the deck states one. */
  license?: string;
  /** The deck's blurb (what it covers, where it came from), when stated. */
  description?: string;
  /** When the deck was made (xsd:dateTime), when stated. */
  createdAt?: string;
  /** How the deck is meant to be studied, when stated (else front-to-back). */
  direction?: string;
  /** The resources the deck says it was compiled from, in document order. */
  sources: DeckSource[];
}

/** A `dcterms:source` of a deck, with what the file says about it. */
export interface DeckSource {
  url: string;
  title?: string;
  /** The source's own authors — not the deck's. */
  authors: string[];
  /** The source's own licence URL, when stated. */
  license?: string;
}

/**
 * Summarize one deck document. Throws when the file is not a deck, when
 * the deck or any card lacks its `sm:formatVersion`, or when a card's
 * side has neither text nor a picture (or a picture written as a string
 * instead of an IRI): a broken library file should fail the build, not
 * vanish from the index. (Pod data is read more leniently; the library
 * is authored, so it is held to the full format.)
 */
export function summarizeDeck(file: string, turtle: string): DeckSummary {
  // The base only matters for resolving relative IRIs, which the summary
  // never keeps; any absolute base will do.
  const quads = new Parser({ baseIRI: `https://library.invalid/${file}` }).parse(
    turtle,
  );
  const typed = (type: string) =>
    quads
      .filter((q) => q.predicate.value === RDF_TYPE && q.object.value === type)
      .map((q) => q.subject.value);
  const decks = typed(`${SM}Deck`);
  if (decks.length !== 1) {
    throw new Error(
      `decks/${file}: expected exactly one sm:Deck subject, found ${decks.length}.`,
    );
  }
  const deck = decks[0];
  const of = (subject: string, predicate: string) =>
    quads
      .filter((q) => q.subject.value === subject && q.predicate.value === predicate)
      .map((q) => q.object);
  const title = of(deck, DCTERMS_TITLE)[0];
  if (title === undefined) {
    throw new Error(`decks/${file}: the deck has no dcterms:title.`);
  }
  const cards = [...new Set(typed(`${SM}Card`))];
  for (const subject of [deck, ...cards]) {
    if (of(subject, SM_FORMAT_VERSION).length === 0) {
      throw new Error(
        `decks/${file}: <${subject}> has no solid-memo:formatVersion.`,
      );
    }
  }
  for (const card of cards) {
    for (const side of ["front", "back"] as const) {
      // A picture is a link to an image, so it is an IRI; a string in its
      // place would be ignored by the app and the side would be blank.
      const pictures = of(card, `${SM}${side}Image`);
      const literal = pictures.find((object) => object.termType === "Literal");
      if (literal !== undefined) {
        throw new Error(
          `decks/${file}: <${card}> solid-memo:${side}Image must be an IRI (<${literal.value}>), not a string literal.`,
        );
      }
      if (pictures.length === 0 && of(card, `${SM}${side}`).length === 0) {
        throw new Error(
          `decks/${file}: <${card}> has neither solid-memo:${side} nor solid-memo:${side}Image.`,
        );
      }
    }
  }
  const isLiteral = (object: Quad_Object) => object.termType === "Literal";
  const isIri = (object: Quad_Object) => object.termType === "NamedNode";
  const license = of(deck, DCTERMS_LICENSE).find(isIri);
  const description = of(deck, DCTERMS_DESCRIPTION).find(isLiteral);
  const createdAt = of(deck, DCTERMS_CREATED).find(isLiteral);
  const direction = of(deck, SM_DIRECTION).find(isLiteral);
  if (direction !== undefined && !DECK_DIRECTIONS.includes(direction.value)) {
    throw new Error(
      `decks/${file}: solid-memo:direction must be one of ${DECK_DIRECTIONS.join(", ")}, not "${direction.value}".`,
    );
  }
  // A source is described by its own triples, if the file has any: an
  // undescribed source is still listed, by URL alone.
  const sources = of(deck, DCTERMS_SOURCE)
    .filter(isIri)
    .map(({ value: url }): DeckSource => {
      const title = of(url, DCTERMS_TITLE).find(isLiteral);
      const sourceLicense = of(url, DCTERMS_LICENSE).find(isIri);
      return {
        url,
        ...(title === undefined ? {} : { title: title.value }),
        authors: of(url, DCTERMS_CREATOR)
          .filter(isLiteral)
          .map((object) => object.value),
        ...(sourceLicense === undefined ? {} : { license: sourceLicense.value }),
      };
    });
  return {
    file,
    title: title.value,
    cardCount: cards.length,
    authors: of(deck, DCTERMS_CREATOR)
      .filter(isLiteral)
      .map((object) => object.value),
    ...(license === undefined ? {} : { license: license.value }),
    ...(description === undefined ? {} : { description: description.value }),
    ...(createdAt === undefined ? {} : { createdAt: createdAt.value }),
    ...(direction === undefined ? {} : { direction: direction.value }),
    sources,
  };
}

/**
 * The index document. Subjects are relative to the index, so the
 * library works wherever the site is hosted.
 */
export function buildIndex(summaries: DeckSummary[]): string {
  const { namedNode, literal } = DataFactory;
  const writer = new Writer({
    prefixes: { sm: SM, dcterms: "http://purl.org/dc/terms/" },
  });
  for (const deck of summaries) {
    const subject = namedNode(deck.file);
    writer.addQuad(subject, namedNode(RDF_TYPE), namedNode(`${SM}Deck`));
    writer.addQuad(subject, namedNode(DCTERMS_TITLE), literal(deck.title));
    writer.addQuad(
      subject,
      namedNode(`${SM}cardCount`),
      literal(String(deck.cardCount), namedNode(XSD_INTEGER)),
    );
    for (const author of deck.authors) {
      writer.addQuad(subject, namedNode(DCTERMS_CREATOR), literal(author));
    }
    if (deck.license !== undefined) {
      writer.addQuad(subject, namedNode(DCTERMS_LICENSE), namedNode(deck.license));
    }
    if (deck.description !== undefined) {
      writer.addQuad(
        subject,
        namedNode(DCTERMS_DESCRIPTION),
        literal(deck.description),
      );
    }
    if (deck.createdAt !== undefined) {
      writer.addQuad(
        subject,
        namedNode(DCTERMS_CREATED),
        literal(deck.createdAt, namedNode(XSD_DATETIME)),
      );
    }
    if (deck.direction !== undefined) {
      writer.addQuad(subject, namedNode(SM_DIRECTION), literal(deck.direction));
    }
    for (const source of deck.sources) {
      writer.addQuad(subject, namedNode(DCTERMS_SOURCE), namedNode(source.url));
    }
    // What the deck says about each source, as its own subject: the
    // source's authors and licence must not read as the deck's.
    for (const source of deck.sources) {
      const sourceNode = namedNode(source.url);
      if (source.title !== undefined) {
        writer.addQuad(sourceNode, namedNode(DCTERMS_TITLE), literal(source.title));
      }
      for (const author of source.authors) {
        writer.addQuad(sourceNode, namedNode(DCTERMS_CREATOR), literal(author));
      }
      if (source.license !== undefined) {
        writer.addQuad(
          sourceNode,
          namedNode(DCTERMS_LICENSE),
          namedNode(source.license),
        );
      }
    }
  }
  let output = "";
  writer.end((_error, result) => {
    output = result;
  });
  return output;
}

/** Every deck file of the library with its content, sorted by name. */
export async function readDeckFiles(
  dir: string,
): Promise<{ file: string; turtle: string }[]> {
  const names = (await readdir(dir)).filter(isDeckFile).sort();
  return Promise.all(
    names.map(async (file) => ({
      file,
      turtle: await readFile(join(dir, file), "utf8"),
    })),
  );
}

/** Deck files are plain names: no path separators, no hidden files. */
function isDeckFile(name: string): boolean {
  return name !== INDEX_FILE && /^[A-Za-z0-9][A-Za-z0-9._-]*\.ttl$/.test(name);
}

export async function readDeckLibrary(
  dir: string,
): Promise<{ files: { file: string; turtle: string }[]; index: string }> {
  const files = await readDeckFiles(dir);
  const index = buildIndex(
    files.map(({ file, turtle }) => summarizeDeck(file, turtle)),
  );
  return { files, index };
}

export function deckLibraryPlugin({
  dir = "decks",
  publicPath = "decks",
}: { dir?: string; publicPath?: string } = {}): Plugin {
  return {
    name: "solid-memo:deck-library",

    // Dev: read the folder on every request, so a new or edited deck
    // shows up without a restart.
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = (req.url ?? "").split("?")[0];
        const prefix = `/${publicPath}/`;
        if (!path.startsWith(prefix)) return next();
        const name = path.slice(prefix.length);
        try {
          let body: string | undefined;
          if (name === INDEX_FILE) {
            body = (await readDeckLibrary(dir)).index;
          } else if (isDeckFile(name)) {
            body = (await readDeckFiles(dir)).find((f) => f.file === name)
              ?.turtle;
          }
          if (body === undefined) return next();
          res.setHeader("Content-Type", TURTLE);
          res.end(body);
        } catch (error) {
          next(error);
        }
      });
    },

    // Build: the deck documents and their index become plain assets.
    async generateBundle() {
      const { files, index } = await readDeckLibrary(dir);
      for (const { file, turtle } of files) {
        this.emitFile({
          type: "asset",
          fileName: `${publicPath}/${file}`,
          source: turtle,
        });
      }
      this.emitFile({
        type: "asset",
        fileName: `${publicPath}/${INDEX_FILE}`,
        source: index,
      });
    },
  };
}
