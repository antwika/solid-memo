import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildIndex,
  checkLockfile,
  deckLibraryPlugin,
  loadValidators,
  publishedFiles,
  readDeckLibrary,
  readReleases,
  readSources,
  validateLibrary,
  validateWithRelease,
  type DeckRelease,
} from "./deckLibrary.ts";
import { releaseText, renderLockfile, sha256 } from "./deckRelease.ts";
import { DECK_LIBRARY_ROOT } from "./root.ts";
import { SOURCE } from "./deckRelease.test.ts";
import { parseTurtle } from "@solid-memo/turtle/rdf";

const validators = await loadValidators();

const SM = "https://solid-memo.com/vocab/v1#";
const DCAT = "http://www.w3.org/ns/dcat#";
const DCTERMS = "http://purl.org/dc/terms/";
const RDF_TYPE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
const DECKS = "https://solid-memo.com/decks/";
const INDEX = `${DECKS}index.ttl`;
const NORWAY = SOURCE.replace(
  "<#se>",
  `<#no>
    a solid-memo:Card ;
    solid-memo:formatVersion 1 ;
    solid-memo:front "Norway" ;
    solid-memo:back "Oslo" .

<#se>`,
);
const RIVERS = SOURCE.replaceAll("Capitals", "Rivers");

function release(deck: string, version: number, source = SOURCE, notes?: string): DeckRelease {
  return {
    deck,
    version,
    turtle: releaseText(deck, source, {
      version,
      issued: `2026-09-2${version}T10:00:00Z`,
      ...(notes === undefined ? {} : { notes }),
    }),
  };
}

const CAPITALS = [release("capitals", 1, SOURCE, "First."), release("capitals", 2, NORWAY, "Added Norway.")];

function lockOf(releases: readonly DeckRelease[]) {
  return {
    releases: releases.map((r) => ({
      deck: r.deck,
      version: r.version,
      issued: `2026-09-2${r.version}T10:00:00Z`,
      sha256: sha256(r.turtle),
    })),
  };
}

/** A repository with sources, releases and a lockfile in a temporary folder. */
async function libraryRoot(
  sources: Record<string, string> = { capitals: NORWAY },
  releases: readonly DeckRelease[] = CAPITALS,
) {
  const root = await mkdtemp(join(tmpdir(), "solid-memo-library-"));
  await mkdir(join(root, "decks"));
  for (const [deck, turtle] of Object.entries(sources)) {
    await writeFile(join(root, "decks", `${deck}.ttl`), turtle);
  }
  for (const r of releases) {
    await mkdir(join(root, "releases", r.deck), { recursive: true });
    await writeFile(join(root, "releases", r.deck, `${r.version}.ttl`), r.turtle);
  }
  await writeFile(join(root, "deck-releases.lock.json"), renderLockfile(lockOf(releases)));
  return root;
}

describe("readSources and readReleases", () => {
  it("read the sources and the releases, sorted, skipping what is not a deck", async () => {
    const root = await libraryRoot({ capitals: SOURCE, "Not_A-deck": SOURCE });
    await writeFile(join(root, "decks", "notes.txt"), "x");
    expect((await readSources(root)).map((s) => s.deck)).toEqual(["capitals"]);
    await mkdir(join(root, "releases", "Stray"));
    await writeFile(join(root, "releases", "README"), "x");
    expect((await readReleases(root)).map((r) => `${r.deck}/${r.version}`)).toEqual(["capitals/1", "capitals/2"]);
  });

  it("find no releases before the first, and refuse a stray file among them", async () => {
    const root = await libraryRoot({}, []);
    await expect(readReleases(root)).resolves.toEqual([]);
    await mkdir(join(root, "releases", "capitals"), { recursive: true });
    await writeFile(join(root, "releases", "capitals", "draft.ttl"), "x");
    await expect(readReleases(root)).rejects.toThrow(
      "releases/capitals/draft.ttl is not a release: expected <n>.ttl.",
    );
  });
});

describe("checkLockfile", () => {
  it("accepts the releases the lockfile records", () => {
    expect(() => checkLockfile(CAPITALS, lockOf(CAPITALS))).not.toThrow();
  });

  it("names a release that was edited", () => {
    const edited = { ...CAPITALS[1], turtle: `${CAPITALS[1].turtle}\n` };
    expect(() => checkLockfile([CAPITALS[0], edited], lockOf(CAPITALS))).toThrow(
      "releases/capitals/2.ttl has changed since it was released: a release is never edited.",
    );
  });

  it("names every release added by hand, lost, or numbered with a gap", () => {
    const lock = lockOf([CAPITALS[0], release("rivers", 2)]);
    expect(() => checkLockfile(CAPITALS, lock)).toThrow(
      [
        "deck-releases.lock.json:",
        "  releases/capitals/2.ttl is not in deck-releases.lock.json: release with npm run deck:release.",
        "  releases/rivers/2.ttl is in deck-releases.lock.json but missing.",
        "  rivers's releases must run 1, 2, … without gaps; found 2.",
      ].join("\n"),
    );
  });
});

/**
 * The source with the deck's objects of each predicate replaced (each
 * predicate the deck states once, ending in ";" or, the last, in ".").
 */
function withDeck(source: string, objects: Record<string, string>): string {
  let text = source;
  for (const [predicate, value] of Object.entries(objects)) {
    const pattern = new RegExp(`(\\n    ${predicate} )[^;]*?( [;.]\\n)`);
    expect(text, predicate).toMatch(pattern);
    text = text.replace(pattern, `$1${value}$2`);
  }
  return text;
}

describe("buildIndex", () => {
  const index = buildIndex([...CAPITALS, release("rivers", 1, RIVERS)]);
  const quads = parseTurtle(index, INDEX);
  const of = (s: string, p: string) =>
    quads.filter((q) => q.subject.value === s && q.predicate.value === p).map((q) => q.object.value);

  it("is a catalogue of the decks, published by Solid Memo, classified by the EU themes and the topics", () => {
    expect(of(INDEX, RDF_TYPE)).toEqual([`${DCAT}Catalog`]);
    expect(of(INDEX, `${DCAT}dataset`)).toEqual([`${INDEX}#capitals`, `${INDEX}#rivers`]);
    expect(of(INDEX, `${DCTERMS}publisher`)).toEqual([`${INDEX}#solid-memo`]);
    expect(of(INDEX, `${DCTERMS}modified`)).toEqual(["2026-09-22T10:00:00Z"]);
    expect(of(INDEX, `${DCAT}themeTaxonomy`)).toEqual([
      "http://publications.europa.eu/resource/authority/data-theme",
      "https://solid-memo.com/vocab/topics",
    ]);
    expect(of(`${INDEX}#solid-memo`, "http://xmlns.com/foaf/0.1/name")).toEqual(["Solid Memo"]);
  });

  it("describes each deck as a series of its releases, which are its versions too", () => {
    const series = `${INDEX}#capitals`;
    expect(of(series, RDF_TYPE)).toEqual([`${DCAT}DatasetSeries`, `${DCAT}Dataset`]);
    expect(of(series, `${DCTERMS}title`)).toEqual(["Capitals"]);
    expect(of(series, `${DCAT}keyword`)).toEqual(["capitals"]);
    expect(of(series, `${DCAT}first`)).toEqual([`${DECKS}capitals/1.ttl`]);
    expect(of(series, `${DCAT}last`)).toEqual([`${DECKS}capitals/2.ttl`]);
    expect(of(series, `${DCAT}hasVersion`)).toEqual([`${DECKS}capitals/1.ttl`, `${DECKS}capitals/2.ttl`]);
    expect(of(series, `${DCAT}hasCurrentVersion`)).toEqual([`${DECKS}capitals/2.ttl`]);
  });

  it("states a series' title and description in every language of its current release, untagged text as English", async () => {
    const swedish = withDeck(SOURCE, {
      "dcterms:title": '"Capitals"@en , "Huvudstäder"@sv',
      "dcterms:description": '"Capitals of the world."@en , "Världens huvudstäder."@sv',
      "dcat:keyword": '"capitals"',
      "solid-memo:formatVersion": "4",
    });
    const releases = [release("capitals", 1, SOURCE), release("capitals", 2, swedish)];
    const built = buildIndex(releases);
    const texts = (subject: string, predicate: string) =>
      parseTurtle(built, INDEX)
        .filter((q) => q.subject.value === subject && q.predicate.value === predicate)
        .map((q) => `${q.object.value}@${q.object.termType === "Literal" ? q.object.language : ""}`)
        .sort();
    expect(texts(`${INDEX}#capitals`, `${DCTERMS}title`)).toEqual(["Capitals@en", "Huvudstäder@sv"]);
    expect(texts(`${INDEX}#capitals`, `${DCTERMS}description`)).toEqual(["Capitals of the world.@en", "Världens huvudstäder.@sv"]);
    expect(texts(`${DECKS}capitals/1.ttl`, `${DCTERMS}title`)).toEqual(["Capitals@en"]);
    expect(texts(`${INDEX}#capitals`, `${SM}formatVersion`)).toEqual(["3@"]);
    // A format-4 release's keywords state no language: the series keeps them so.
    expect(texts(`${INDEX}#capitals`, `${DCAT}keyword`)).toEqual(["capitals@"]);
    await expect(validateLibrary(releases, built, validators)).resolves.toBeUndefined();
  });

  it("copies the current release's keywords to its series with their language tags", async () => {
    const tagged = withDeck(SOURCE, {
      "dcterms:title": '"Capitals"@en , "Huvudstäder"@sv',
      "dcterms:description": '"Capitals of the world."@en',
      "dcat:keyword": '"capitals"@en , "countries"@en , "huvudstäder"@sv',
      "solid-memo:formatVersion": "5",
    });
    const releases = [release("capitals", 1, SOURCE), release("capitals", 2, tagged)];
    const built = buildIndex(releases);
    const keywords = parseTurtle(built, INDEX)
      .filter((q) => q.subject.value === `${INDEX}#capitals` && q.predicate.value === `${DCAT}keyword`)
      .map((q) => `${q.object.value}@${q.object.termType === "Literal" ? q.object.language : ""}`)
      .sort();
    expect(keywords).toEqual(["capitals@en", "countries@en", "huvudstäder@sv"]);
    await expect(validateLibrary(releases, built, validators)).resolves.toBeUndefined();
  });

  it("keeps the series links and the version links in agreement", () => {
    for (const deck of ["capitals", "rivers"]) {
      const series = `${INDEX}#${deck}`;
      expect(of(series, `${DCAT}last`)).toEqual(of(series, `${DCAT}hasCurrentVersion`));
      const current = of(series, `${DCAT}last`)[0];
      expect(of(current, `${DCAT}prev`)).toEqual(of(current, `${DCAT}previousVersion`));
    }
  });

  it("summarizes older releases and describes the current one in full, without its cards", () => {
    expect(of(`${DECKS}capitals/1.ttl`, `${DCAT}version`)).toEqual(["1"]);
    expect(of(`${DECKS}capitals/1.ttl`, "http://www.w3.org/ns/adms#versionNotes")).toEqual(["First."]);
    expect(of(`${DECKS}capitals/1.ttl`, `${SM}cardCount`)).toEqual([]);
    const current = `${DECKS}capitals/2.ttl`;
    expect(of(current, `${SM}cardCount`)).toEqual(["2"]);
    expect(of(current, `${SM}studyDirection`)).toEqual([`${SM}bidirectional`]);
    expect(of(`${current}#anton`, "http://xmlns.com/foaf/0.1/name")).toEqual(["Anton"]);
    expect(of(`${current}#se`, `${SM}front`)).toEqual([]);
  });

  it("counts only the cards in use, not the retired ones", () => {
    const retired = release("capitals", 3, NORWAY.replace('    solid-memo:front "Norway" ;', '    solid-memo:front "Norway" ;\n    owl:deprecated true ;').replace("@prefix", "@prefix owl: <http://www.w3.org/2002/07/owl#> .\n@prefix"));
    const quads = parseTurtle(buildIndex([...CAPITALS, retired]), INDEX);
    expect(quads.filter((q) => q.subject.value === `${DECKS}capitals/3.ttl` && q.predicate.value === `${SM}cardCount`).map((q) => q.object.value)).toEqual(["1"]);
  });

  it("writes library IRIs relative to the index, so the library works wherever it is hosted", () => {
    expect(index).toContain("<capitals/2.ttl>");
    expect(index).toContain("<#capitals>");
    expect(index).not.toContain(DECKS);
  });

  it("leaves out what a release does not say, for validation to name", () => {
    const bare = buildIndex([
      { deck: "x", version: 1, turtle: `<> a <${SM}Deck> .` },
      { deck: "x", version: 2, turtle: `<> a <${SM}Deck> .` },
    ]);
    expect(parseTurtle(bare, INDEX).filter((q) => q.subject.value === `${DECKS}x/1.ttl`).map((q) => q.predicate.value)).toEqual([RDF_TYPE]);
    expect(of.call(null, `${INDEX}#x`, `${DCTERMS}title`)).toEqual([]);
    expect(parseTurtle(bare, INDEX).some((q) => q.subject.value === `${INDEX}#x` && q.predicate.value === `${DCTERMS}title`)).toBe(false);
    expect(buildIndex([])).not.toContain("modified");
  });
});

describe("validateLibrary", () => {
  it("accepts releases and an index that conform to the shapes and to DCAT-AP", async () => {
    await expect(validateLibrary(CAPITALS, buildIndex(CAPITALS), validators)).resolves.toBeUndefined();
  });

  it("refuses a release that is not one deck, the document itself", async () => {
    const two = { ...CAPITALS[0], turtle: `${CAPITALS[0].turtle}\n<#other> a <${SM}Deck> .\n` };
    await expect(validateLibrary([two], buildIndex([two]), validators)).rejects.toThrow(
      `releases/capitals/1.ttl: expected the document itself to be its one sm:Deck, found <${DECKS}capitals/1.ttl>, <${DECKS}capitals/1.ttl#other>.`,
    );
    const none = { ...CAPITALS[0], turtle: "<#x> a <https://example.com/Thing> ." };
    await expect(validateLibrary([none], buildIndex([]), validators)).rejects.toThrow("found none.");
  });

  it("refuses a release whose version or series is not the one its path says", async () => {
    const moved = { ...CAPITALS[0], version: 3, turtle: CAPITALS[0].turtle.replace("capitals/1.ttl> .", "capitals/3.ttl> .") };
    await expect(validateLibrary([moved], buildIndex([]), validators)).rejects.toThrow(
      `releases/capitals/3.ttl: states version 1 of <${INDEX}#capitals>; its path says version 3 of <${INDEX}#capitals>.`,
    );
  });

  it("refuses a release that drops a card of the release before it, and accepts one that retires it", async () => {
    const dropped = release("capitals", 3, SOURCE);
    await expect(validateLibrary([...CAPITALS, dropped], buildIndex([...CAPITALS, dropped]), validators)).rejects.toThrow(
      "releases/capitals/3.ttl: drops <#no>, which release 2 has. A card is never removed: retire it (owl:deprecated true)",
    );
    const retired = release(
      "capitals",
      3,
      NORWAY.replace('    solid-memo:formatVersion 1 ;\n    solid-memo:front "Norway" ;', '    solid-memo:formatVersion 3 ;\n    solid-memo:front "Norway" ;\n    owl:deprecated true ;').replace(
        "@prefix",
        "@prefix owl: <http://www.w3.org/2002/07/owl#> .\n@prefix",
      ),
    );
    await expect(validateLibrary([...CAPITALS, retired], buildIndex([...CAPITALS, retired]), validators)).resolves.toBeUndefined();
  });

  it("names a release that breaks a shape", async () => {
    const broken = release("capitals", 1, SOURCE.replace('    dcterms:description "Capitals of the world." ;\n', ""));
    await expect(validateLibrary([broken], buildIndex([broken]), validators)).rejects.toThrow(
      `releases/capitals/1.ttl:\n  <${DECKS}capitals/1.ttl> (${DCTERMS}description): A format-3 deck has a description`,
    );
  });

  it("names a release that breaks DCAT-AP, with the index beside it", async () => {
    const unnamed = release("capitals", 1, SOURCE.replace('    a foaf:Agent ;\n    foaf:name "Anton" .', "    a foaf:Agent ."));
    await expect(validateLibrary([unnamed], buildIndex([unnamed]), validators)).rejects.toThrow(
      `releases/capitals/1.ttl:\n  <${DECKS}capitals/1.ttl#anton> (http://xmlns.com/foaf/0.1/name)`,
    );
  });
});

describe("validateWithRelease", () => {
  it("validates the library as it would be with one more release", async () => {
    await expect(validateWithRelease([CAPITALS[0]], CAPITALS[1], validators)).resolves.toBeUndefined();
  });
});

describe("readDeckLibrary", () => {
  it("reads, checks and validates the library, released as it is", async () => {
    const { releases, index, warnings, previews } = await readDeckLibrary(await libraryRoot(), validators);
    expect(releases).toEqual(CAPITALS);
    expect(index).toBe(buildIndex(CAPITALS));
    expect(warnings).toEqual([]);
    expect(previews).toEqual([]);
  });

  it("warns of a source with changes not released yet, and of a deck never released, previewing their next releases", async () => {
    const changed = NORWAY.replace('"Oslo"', '"Oslo!"');
    const root = await libraryRoot({ capitals: changed, rivers: RIVERS });
    const now = () => new Date("2026-09-28T12:00:00Z");
    const { warnings, previews } = await readDeckLibrary(root, validators, now);
    expect(warnings).toEqual([
      'decks/capitals.ttl has changed since release 2: npm run deck:release -- capitals --notes "What changed."',
      "decks/rivers.ttl is not released yet: npm run deck:release -- rivers",
    ]);
    const info = (deck: string) => ({
      issued: "2026-09-28T12:00:00.000Z",
      notes: `Preview of decks/${deck}.ttl, not released: shown by the dev server only.`,
    });
    expect(previews).toEqual([
      { deck: "capitals", version: 3, turtle: releaseText("capitals", changed, { version: 3, ...info("capitals") }) },
      { deck: "rivers", version: 1, turtle: releaseText("rivers", RIVERS, { version: 1, ...info("rivers") }) },
    ]);
  });

  it("fails on a source that would not release, before anyone releases it", async () => {
    const root = await libraryRoot({ capitals: NORWAY, rivers: RIVERS.replace("solid-memo:bidirectional", "solid-memo:sideways") });
    await expect(readDeckLibrary(root, validators)).rejects.toThrow("releases/rivers/1.ttl:");
  });

  it("fails on a release that does not match the lockfile", async () => {
    const root = await libraryRoot();
    await writeFile(join(root, "releases/capitals/1.ttl"), `${CAPITALS[0].turtle}\n`);
    await expect(readDeckLibrary(root, validators)).rejects.toThrow("has changed since it was released");
  });
});

describe("publishedFiles", () => {
  it("publishes every release, each deck's current release at its old address, and the index", () => {
    const files = publishedFiles(CAPITALS, "index");
    expect([...files.keys()]).toEqual(["capitals/1.ttl", "capitals/2.ttl", "capitals.ttl", "index.ttl"]);
    expect(files.get("capitals.ttl")).toBe(CAPITALS[1].turtle);
  });
});

describe("deckLibraryPlugin", () => {
  let root: string;
  beforeEach(async () => {
    root = await libraryRoot({ capitals: NORWAY, rivers: RIVERS });
  });

  type Handler = (
    req: { url?: string },
    res: { setHeader: ReturnType<typeof vi.fn>; end: ReturnType<typeof vi.fn> },
    next: ReturnType<typeof vi.fn>,
  ) => Promise<void>;

  async function request(url: string | undefined, warn = vi.fn()) {
    const plugin = deckLibraryPlugin({ root, warn, validators: async () => validators });
    let handler: Handler | undefined;
    const server = { middlewares: { use: (h: Handler) => (handler = h) } };
    (plugin.configureServer as (s: unknown) => void)(server);
    const res = { setHeader: vi.fn(), end: vi.fn() };
    const next = vi.fn();
    await handler!({ url }, res, next);
    return { res, next };
  }

  it("serves the index, the releases and the old addresses in dev, as Turtle, warning of unreleased sources", async () => {
    const warn = vi.fn();
    const { res, next } = await request("/decks/index.ttl?t=1", warn);
    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "text/turtle; charset=utf-8");
    expect(res.end.mock.calls[0][0]).toContain("<#capitals>");
    expect(next).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalledWith("decks/rivers.ttl is not released yet: npm run deck:release -- rivers");
    expect((await request("/decks/capitals/1.ttl")).res.end).toHaveBeenCalledWith(CAPITALS[0].turtle);
    expect((await request("/decks/capitals.ttl")).res.end).toHaveBeenCalledWith(CAPITALS[1].turtle);
  });

  it("previews an unreleased source in dev as its next release, in the index too", async () => {
    const index = (await request("/decks/index.ttl")).res.end.mock.calls[0][0] as string;
    expect(index).toContain("<#rivers>");
    expect(index).toContain("<rivers/1.ttl>");
    const rivers = (await request("/decks/rivers/1.ttl")).res.end.mock.calls[0][0] as string;
    expect(rivers).toContain("Preview of decks/rivers.ttl, not released: shown by the dev server only.");
    expect((await request("/decks/rivers.ttl")).res.end.mock.calls[0][0]).toContain("Preview of decks/rivers.ttl");
  });

  it("serves the releases alone in dev when every source is released", async () => {
    root = await libraryRoot();
    const index = (await request("/decks/index.ttl")).res.end.mock.calls[0][0] as string;
    expect(index).toBe(buildIndex(CAPITALS));
  });

  it("passes other requests on", async () => {
    for (const url of ["/index.html", "/decks/missing.ttl", "/decks/capitals/9.ttl", undefined]) {
      const { res, next } = await request(url);
      expect(res.end).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith();
    }
  });

  it("reports a broken library to the dev server", async () => {
    await writeFile(join(root, "releases/capitals/1.ttl"), "<> a <x> .");
    const { next } = await request("/decks/index.ttl");
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });

  it("emits the library into the build, releases only: never a preview", async () => {
    const plugin = deckLibraryPlugin({ root, publicPath: "library", warn: vi.fn(), validators: async () => validators });
    const emitFile = vi.fn();
    await (plugin.generateBundle as unknown as (this: { emitFile: typeof emitFile }) => Promise<void>).call({ emitFile });
    expect(emitFile.mock.calls.map((c) => c[0].fileName)).toEqual([
      "library/capitals/1.ttl",
      "library/capitals/2.ttl",
      "library/capitals.ttl",
      "library/index.ttl",
    ]);
  });

  it("warns on the console and loads the validators from the vocab package by default", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const plugin = deckLibraryPlugin({ root });
    await (plugin.generateBundle as unknown as (this: { emitFile: () => void }) => Promise<void>).call({ emitFile: () => undefined });
    expect(warn).toHaveBeenCalledWith("decks/rivers.ttl is not released yet: npm run deck:release -- rivers");
    warn.mockRestore();
  });
});

describe("the deck library", () => {
  it("is valid and released as it is: every release, the index and every source", async () => {
    const { releases, warnings } = await readDeckLibrary(DECK_LIBRARY_ROOT, await loadValidators());
    expect(releases.length).toBeGreaterThan(0);
    expect(warnings).toEqual([]);
  }, 120_000);
});
