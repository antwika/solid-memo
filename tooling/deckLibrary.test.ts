import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildIndex,
  deckLibraryPlugin,
  readDeckFiles,
  readDeckLibrary,
  summarizeDeck,
} from "./deckLibrary";

const PREFIXES = `
@prefix sm: <https://solid-memo.com/vocab/v1#> .
@prefix dcterms: <http://purl.org/dc/terms/> .
`;

const CC0 = "https://creativecommons.org/publicdomain/zero/1.0/";

const CAPITALS = `${PREFIXES}
<> a sm:Deck ; dcterms:title "Capitals" ; sm:formatVersion 1 ;
   dcterms:creator "Anton Wiklund", "A friend" ; dcterms:license <${CC0}> ;
   dcterms:description "From Wikipedia." .
<#se> a sm:Card ; sm:front "Sweden" ; sm:back "Stockholm" ; sm:formatVersion 1 .
<#no> a sm:Card ; sm:front "Norway" ; sm:back "Oslo" ; sm:formatVersion 1 .
`;

const RIVERS = `${PREFIXES}
<> a sm:Deck ; dcterms:title "Rivers \\"long\\"" ; sm:formatVersion 1 .
`;

const BY_SA = "https://creativecommons.org/licenses/by-sa/4.0/";
const WIKIPEDIA = "https://en.wikipedia.org/wiki/List_of_chemical_elements";
const IUPAC = "https://iupac.org/what-we-do/periodic-table-of-elements/";

// Dated, and compiled from two sources: one described, one bare.
const ELEMENTS = `${PREFIXES}
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
<> a sm:Deck ; dcterms:title "Elements" ; sm:formatVersion 1 ;
   dcterms:created "2026-09-22T15:49:38.000Z"^^xsd:dateTime ;
   dcterms:source <${WIKIPEDIA}>, <${IUPAC}> ;
   dcterms:license <${CC0}> .
<${WIKIPEDIA}> dcterms:title "List of chemical elements" ;
   dcterms:creator "Wikipedia contributors" ; dcterms:license <${BY_SA}> .
`;

describe("summarizeDeck", () => {
  it("reads the title and counts the cards", () => {
    expect(summarizeDeck("capitals.ttl", CAPITALS)).toEqual({
      file: "capitals.ttl",
      title: "Capitals",
      cardCount: 2,
      authors: ["Anton Wiklund", "A friend"],
      license: CC0,
      description: "From Wikipedia.",
      sources: [],
    });
    expect(summarizeDeck("rivers.ttl", RIVERS)).toEqual({
      file: "rivers.ttl",
      title: 'Rivers "long"',
      cardCount: 0,
      authors: [],
      sources: [],
    });
  });

  it("keeps the creation date and describes each source from its own triples", () => {
    expect(summarizeDeck("elements.ttl", ELEMENTS)).toEqual({
      file: "elements.ttl",
      title: "Elements",
      cardCount: 0,
      authors: [],
      license: CC0,
      createdAt: "2026-09-22T15:49:38.000Z",
      sources: [
        {
          url: WIKIPEDIA,
          title: "List of chemical elements",
          authors: ["Wikipedia contributors"],
          license: BY_SA,
        },
        { url: IUPAC, authors: [] },
      ],
    });
  });

  it("requires a format version on the deck and on every card", () => {
    expect(() =>
      summarizeDeck("x.ttl", `${PREFIXES} <> a sm:Deck ; dcterms:title "A" .`),
    ).toThrow("decks/x.ttl: <https://library.invalid/x.ttl> has no solid-memo:formatVersion.");
    expect(() =>
      summarizeDeck(
        "x.ttl",
        `${PREFIXES} <> a sm:Deck ; dcterms:title "A" ; sm:formatVersion 1 .
         <#se> a sm:Card ; sm:front "f" ; sm:back "b" .`,
      ),
    ).toThrow("<https://library.invalid/x.ttl#se> has no solid-memo:formatVersion.");
  });

  it("counts picture cards and requires pictures to be IRIs", () => {
    const deckLine = `${PREFIXES} <> a sm:Deck ; dcterms:title "Flags" ; sm:formatVersion 1 .`;
    expect(
      summarizeDeck(
        "flags.ttl",
        `${deckLine}
         <#af> a sm:Card ; sm:frontImage <https://flagcdn.com/af.svg> ;
               sm:back "Afghanistan" ; sm:formatVersion 2 .`,
      ).cardCount,
    ).toBe(1);
    expect(() =>
      summarizeDeck(
        "flags.ttl",
        `${deckLine}
         <#af> a sm:Card ; sm:frontImage "https://flagcdn.com/af.svg" ;
               sm:back "Afghanistan" ; sm:formatVersion 2 .`,
      ),
    ).toThrow(
      "decks/flags.ttl: <https://library.invalid/flags.ttl#af> solid-memo:frontImage must be an IRI (<https://flagcdn.com/af.svg>), not a string literal.",
    );
    expect(() =>
      summarizeDeck(
        "flags.ttl",
        `${deckLine}
         <#af> a sm:Card ; sm:front "?" ; sm:backImage "x" ; sm:formatVersion 2 .`,
      ),
    ).toThrow("solid-memo:backImage must be an IRI");
  });

  it("requires text or a picture on both sides of every card", () => {
    const deckLine = `${PREFIXES} <> a sm:Deck ; dcterms:title "Flags" ; sm:formatVersion 1 .`;
    expect(() =>
      summarizeDeck(
        "flags.ttl",
        `${deckLine} <#af> a sm:Card ; sm:back "Afghanistan" ; sm:formatVersion 2 .`,
      ),
    ).toThrow(
      "decks/flags.ttl: <https://library.invalid/flags.ttl#af> has neither solid-memo:front nor solid-memo:frontImage.",
    );
    expect(() =>
      summarizeDeck(
        "flags.ttl",
        `${deckLine} <#af> a sm:Card ; sm:front "?" ; sm:formatVersion 2 .`,
      ),
    ).toThrow("has neither solid-memo:back nor solid-memo:backImage.");
  });

  it("rejects a file without exactly one deck", () => {
    expect(() => summarizeDeck("x.ttl", PREFIXES)).toThrow(
      "decks/x.ttl: expected exactly one sm:Deck subject, found 0.",
    );
    expect(() =>
      summarizeDeck(
        "x.ttl",
        `${PREFIXES} <#a> a sm:Deck ; dcterms:title "A" ; sm:formatVersion 1 . <#b> a sm:Deck .`,
      ),
    ).toThrow("found 2");
  });

  it("rejects a deck without a title", () => {
    expect(() =>
      summarizeDeck("x.ttl", `${PREFIXES} <> a sm:Deck ; sm:formatVersion 1 .`),
    ).toThrow("decks/x.ttl: the deck has no dcterms:title.");
  });
});

describe("buildIndex", () => {
  it("lists every deck relative to the index, with escaped titles", () => {
    const index = buildIndex([
      summarizeDeck("capitals.ttl", CAPITALS),
      summarizeDeck("rivers.ttl", RIVERS),
    ]);
    expect(index).toContain(
      `<capitals.ttl> a sm:Deck;\n    dcterms:title "Capitals";\n    sm:cardCount 2;\n    dcterms:creator "Anton Wiklund", "A friend";\n    dcterms:license <${CC0}>;\n    dcterms:description "From Wikipedia.".`,
    );
    expect(index).toContain('<rivers.ttl> a sm:Deck;\n    dcterms:title "Rivers \\"long\\"";\n    sm:cardCount 0.');
  });

  it("carries the creation date and the sources, each described as its own subject", () => {
    const index = buildIndex([summarizeDeck("elements.ttl", ELEMENTS)]);
    expect(index).toContain(
      `<elements.ttl> a sm:Deck;\n    dcterms:title "Elements";\n    sm:cardCount 0;\n    dcterms:license <${CC0}>;\n    dcterms:created "2026-09-22T15:49:38.000Z"^^<http://www.w3.org/2001/XMLSchema#dateTime>;\n    dcterms:source <${WIKIPEDIA}>, <${IUPAC}>.`,
    );
    expect(index).toContain(
      `<${WIKIPEDIA}> dcterms:title "List of chemical elements";\n    dcterms:creator "Wikipedia contributors";\n    dcterms:license <${BY_SA}>.`,
    );
    // The bare source has nothing to say for itself.
    expect(index).not.toContain(`<${IUPAC}> `);
  });
});

async function libraryDir(): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), "solid-memo-decks-"));
  await writeFile(join(dir, "rivers.ttl"), RIVERS);
  await writeFile(join(dir, "capitals.ttl"), CAPITALS);
  // Ignored: not deck files.
  await writeFile(join(dir, "index.ttl"), "stale");
  await writeFile(join(dir, ".hidden.ttl"), "hidden");
  await writeFile(join(dir, "notes.md"), "notes");
  return dir;
}

describe("readDeckFiles", () => {
  it("returns the deck files sorted by name, skipping everything else", async () => {
    const files = await readDeckFiles(await libraryDir());
    expect(files.map((f) => f.file)).toEqual(["capitals.ttl", "rivers.ttl"]);
    expect(files[0].turtle).toBe(CAPITALS);
  });
});

describe("readDeckLibrary", () => {
  it("returns the files together with their index", async () => {
    const { files, index } = await readDeckLibrary(await libraryDir());
    expect(files).toHaveLength(2);
    expect(index).toContain("<capitals.ttl>");
    expect(index).toContain("<rivers.ttl>");
  });
});

describe("deckLibraryPlugin", () => {
  let dir: string;
  beforeEach(async () => {
    dir = await libraryDir();
  });

  type Handler = (
    req: { url?: string },
    res: { setHeader: ReturnType<typeof vi.fn>; end: ReturnType<typeof vi.fn> },
    next: ReturnType<typeof vi.fn>,
  ) => Promise<void>;

  function devHandler(): Handler {
    const plugin = deckLibraryPlugin({ dir });
    let handler: Handler | undefined;
    const server = { middlewares: { use: (h: Handler) => (handler = h) } };
    (plugin.configureServer as (s: unknown) => void)(server);
    return handler!;
  }

  async function request(url: string | undefined) {
    const res = { setHeader: vi.fn(), end: vi.fn() };
    const next = vi.fn();
    await devHandler()({ url }, res, next);
    return { res, next };
  }

  it("serves the generated index in dev as Turtle", async () => {
    const { res, next } = await request("/decks/index.ttl?t=1");
    expect(res.setHeader).toHaveBeenCalledWith(
      "Content-Type",
      "text/turtle; charset=utf-8",
    );
    expect(res.end.mock.calls[0][0]).toContain("<capitals.ttl> a sm:Deck");
    expect(next).not.toHaveBeenCalled();
  });

  it("serves a deck file in dev", async () => {
    const { res } = await request("/decks/rivers.ttl");
    expect(res.end).toHaveBeenCalledWith(RIVERS);
  });

  it("passes other requests on", async () => {
    for (const url of [
      "/index.html",
      "/decks/missing.ttl",
      "/decks/../package.json",
      undefined,
    ]) {
      const { res, next } = await request(url);
      expect(res.end).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith();
    }
  });

  it("reports a broken deck file to the dev server", async () => {
    await writeFile(join(dir, "broken.ttl"), "<> a <x> .");
    const { next } = await request("/decks/index.ttl");
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });

  it("emits the deck files and the index into the build", async () => {
    const plugin = deckLibraryPlugin({ dir, publicPath: "library" });
    const emitFile = vi.fn();
    await (
      plugin.generateBundle as unknown as (this: {
        emitFile: typeof emitFile;
      }) => Promise<void>
    ).call({ emitFile });
    expect(emitFile.mock.calls.map((c) => c[0].fileName)).toEqual([
      "library/capitals.ttl",
      "library/rivers.ttl",
      "library/index.ttl",
    ]);
    expect(emitFile.mock.calls[2][0].source).toContain("<rivers.ttl>");
  });
});
