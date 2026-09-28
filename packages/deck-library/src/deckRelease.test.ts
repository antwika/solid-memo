import { mkdtemp, readFile, writeFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import {
  contentOf,
  defaultIo,
  main,
  releaseText,
  releaseUrlOf,
  renderLockfile,
  run,
  sha256,
  type ReleaseIo,
} from "./deckRelease.ts";
import { parseTurtle } from "@solid-memo/turtle/rdf";

const DCAT = "http://www.w3.org/ns/dcat#";
const DCTERMS = "http://purl.org/dc/terms/";

export const SOURCE = `@base <https://solid-memo.com/decks/capitals> .

@prefix solid-memo: <https://solid-memo.com/vocab/v1#> .
@prefix dcterms:    <http://purl.org/dc/terms/> .
@prefix dcat:       <http://www.w3.org/ns/dcat#> .
@prefix foaf:       <http://xmlns.com/foaf/0.1/> .

<>
    a solid-memo:Deck ,
      dcat:Dataset ;
    dcterms:title "Capitals" ;
    dcterms:description "Capitals of the world." ;
    dcterms:creator <#anton> ;
    dcterms:license <https://creativecommons.org/publicdomain/zero/1.0/> ;
    dcat:theme <http://publications.europa.eu/resource/authority/data-theme/EDUC> ,
               <https://solid-memo.com/vocab/topics#geography> ;
    dcat:keyword "capitals" ;
    solid-memo:studyDirection solid-memo:bidirectional ;
    solid-memo:formatVersion 3 .

<#anton>
    a foaf:Agent ;
    foaf:name "Anton" .

<https://creativecommons.org/publicdomain/zero/1.0/>
    a dcterms:LicenseDocument .

<#se>
    a solid-memo:Card ;
    solid-memo:formatVersion 1 ;
    solid-memo:front "Sweden" ;
    solid-memo:back "Stockholm" .
`;

describe("releaseText", () => {
  it("re-bases the source onto the release and adds what makes it a release", () => {
    const text = releaseText("capitals", SOURCE, {
      version: 1,
      issued: "2026-09-28T10:00:00Z",
      notes: 'First "release".',
    });
    expect(text.startsWith("@base <https://solid-memo.com/decks/capitals/1.ttl> .\n")).toBe(true);
    expect(text).toMatch(/@prefix foaf: +<http:\/\/xmlns.com\/foaf\/0.1\/> \.\n@prefix adms: /);
    const url = releaseUrlOf("capitals", 1);
    const quads = parseTurtle(text, url);
    const of = (s: string, p: string) => quads.filter((q) => q.subject.value === s && q.predicate.value === p).map((q) => q.object.value);
    expect(of(url, `${DCAT}version`)).toEqual(["1"]);
    expect(of(url, `${DCTERMS}issued`)).toEqual(["2026-09-28T10:00:00Z"]);
    expect(of(url, "http://www.w3.org/ns/adms#versionNotes")).toEqual(['First "release".']);
    expect(of(url, `${DCAT}inSeries`)).toEqual(["https://solid-memo.com/decks/index.ttl#capitals"]);
    expect(of(url, `${DCAT}prev`)).toEqual([]);
    expect(of(`${url}#turtle`, `${DCAT}accessURL`)).toEqual([url]);
    expect(of(`${url}#se`, "https://solid-memo.com/vocab/v1#front")).toEqual(["Sweden"]);
  });

  it("links a later release to the one before, and leaves out missing notes", () => {
    const text = releaseText("capitals", SOURCE, { version: 2, issued: "2026-09-28T10:00:00Z" });
    const url = releaseUrlOf("capitals", 2);
    const quads = parseTurtle(text, url);
    const of = (p: string) => quads.filter((q) => q.subject.value === url && q.predicate.value === p).map((q) => q.object.value);
    expect(of(`${DCAT}prev`)).toEqual([releaseUrlOf("capitals", 1)]);
    expect(of(`${DCAT}previousVersion`)).toEqual([releaseUrlOf("capitals", 1)]);
    expect(of("http://www.w3.org/ns/adms#versionNotes")).toEqual([]);
  });

  it("takes a source without @base or prefixes of its own", () => {
    const text = releaseText("x", `<> a <https://solid-memo.com/vocab/v1#Deck> .`, {
      version: 1,
      issued: "2026-09-28T10:00:00Z",
    });
    expect(text).toMatch(/^@base <https:\/\/solid-memo.com\/decks\/x\/1.ttl> \.\n\n@prefix dcat: /);
  });

  it("refuses a source that states release triples itself", () => {
    expect(() =>
      releaseText("capitals", SOURCE.replace('dcat:keyword "capitals" ;', 'dcat:keyword "capitals" ;\n    dcat:version "7" ;'), {
        version: 1,
        issued: "2026-09-28T10:00:00Z",
      }),
    ).toThrow(`decks/capitals.ttl states <${DCAT}version>: a release adds these, the source never does.`);
  });
});

describe("contentOf", () => {
  const url = releaseUrlOf("capitals", 1);

  it("is the same for the same source released twice", () => {
    const first = releaseText("capitals", SOURCE, { version: 1, issued: "2026-09-28T10:00:00Z", notes: "One." });
    const again = releaseText("capitals", SOURCE, { version: 1, issued: "2027-01-01T00:00:00Z" });
    expect(contentOf(again, url)).toEqual(contentOf(first, url));
  });

  it("differs when a card or a language tag changes", () => {
    const first = releaseText("capitals", SOURCE, { version: 1, issued: "2026-09-28T10:00:00Z" });
    const changed = releaseText("capitals", SOURCE.replace('"Stockholm"', '"Sthlm"'), { version: 1, issued: "2026-09-28T10:00:00Z" });
    expect(contentOf(changed, url)).not.toEqual(contentOf(first, url));
    const tagged = releaseText("capitals", SOURCE.replace('"Stockholm"', '"Stockholm"@sv'), { version: 1, issued: "2026-09-28T10:00:00Z" });
    expect(contentOf(tagged, url)).not.toEqual(contentOf(first, url));
  });
});

describe("renderLockfile", () => {
  it("sorts by deck, then version", () => {
    const entry = (deck: string, version: number) => ({ deck, version, issued: "x", sha256: "y" });
    expect(JSON.parse(renderLockfile({ releases: [entry("b", 1), entry("a", 2), entry("a", 1)] })).releases.map(
      (e: { deck: string; version: number }) => `${e.deck}/${e.version}`,
    )).toEqual(["a/1", "a/2", "b/1"]);
  });
});

function fakeIo(files: Record<string, string>) {
  const logs: string[] = [];
  const validate = vi.fn(async () => undefined);
  const io: ReleaseIo & { files: Record<string, string>; logs: string[] } = {
    files,
    logs,
    readFile: async (path) => {
      if (!(path in files)) throw new Error(`ENOENT ${path}`);
      return files[path];
    },
    writeFile: async (path, text) => {
      files[path] = text;
    },
    now: () => new Date("2026-09-28T10:00:00.123Z"),
    log: (message) => logs.push(message),
    validate,
  };
  return { io, validate };
}

const ARGV = ["node", "capitals", "--notes", "Added Norway."];

describe("main", () => {
  it("releases a deck's first version, validated, and records it", async () => {
    const { io, validate } = fakeIo({ "decks/capitals.ttl": SOURCE, "deck-releases.lock.json": '{ "releases": [] }' });
    expect(await main(["node", "--", "capitals"], io)).toBe(0);
    const release = io.files["releases/capitals/1.ttl"];
    expect(release).toContain('dcat:version "1"');
    expect(release).toContain('dcterms:issued "2026-09-28T10:00:00Z"^^xsd:dateTime');
    expect(validate).toHaveBeenCalledWith({ deck: "capitals", version: 1, turtle: release });
    expect(JSON.parse(io.files["deck-releases.lock.json"])).toEqual({
      releases: [{ deck: "capitals", version: 1, issued: "2026-09-28T10:00:00Z", sha256: sha256(release) }],
    });
    expect(io.logs).toEqual(["released releases/capitals/1.ttl"]);
  });

  it("releases a changed deck as the next version, and refuses an unchanged one", async () => {
    const { io } = fakeIo({ "decks/capitals.ttl": SOURCE, "deck-releases.lock.json": '{ "releases": [] }' });
    await main(ARGV, io);
    expect(await main(ARGV, io)).toBe(1);
    expect(io.logs.at(-1)).toBe("decks/capitals.ttl has not changed since release 1.");
    io.files["decks/capitals.ttl"] = SOURCE.replace('"Stockholm"', '"Sthlm"');
    expect(await main(ARGV, io)).toBe(0);
    expect(io.files["releases/capitals/2.ttl"]).toContain("dcat:prev <https://solid-memo.com/decks/capitals/1.ttl>");
    expect(io.files["releases/capitals/2.ttl"]).toContain('adms:versionNotes "Added Norway."');
    io.files["decks/capitals.ttl"] = SOURCE.replace('"Stockholm"', '"Stockholm, Sweden"');
    expect(await main(ARGV, io)).toBe(0);
    expect(io.files["releases/capitals/3.ttl"]).toContain("dcat:prev <https://solid-memo.com/decks/capitals/2.ttl>");
    expect(JSON.parse(io.files["deck-releases.lock.json"]).releases).toHaveLength(3);
  });

  it("writes nothing when the release does not validate", async () => {
    const { io, validate } = fakeIo({ "decks/capitals.ttl": SOURCE, "deck-releases.lock.json": '{ "releases": [] }' });
    validate.mockRejectedValueOnce(new Error("invalid"));
    await expect(main(ARGV, io)).rejects.toThrow("invalid");
    expect(Object.keys(io.files)).toEqual(["decks/capitals.ttl", "deck-releases.lock.json"]);
  });

  it("explains its usage, and names a deck without a source", async () => {
    const { io } = fakeIo({ "deck-releases.lock.json": '{ "releases": [] }' });
    for (const argv of [["node"], ["node", "Bad_Name"], ["node", "capitals", "--notes"]]) {
      expect(await main(argv, io)).toBe(1);
    }
    expect(io.logs).toEqual(Array(3).fill('Usage: npm run deck:release -- <deck> [--notes "What changed."]'));
    expect(await main(["node", "rivers"], io)).toBe(1);
    expect(io.logs.at(-1)).toBe("There is no decks/rivers.ttl to release.");
  });
});

describe("defaultIo and run", () => {
  async function repository() {
    const root = await mkdtemp(join(tmpdir(), "solid-memo-release-"));
    await mkdir(join(root, "decks"));
    await writeFile(join(root, "decks/capitals.ttl"), SOURCE);
    await writeFile(join(root, "deck-releases.lock.json"), '{ "releases": [] }');
    return root;
  }

  it("reads and writes under the root, creating folders, and logs to the console", async () => {
    const root = await repository();
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined);
    const io = defaultIo(root, async () => undefined);
    await io.writeFile("releases/x/1.ttl", "text");
    expect(await io.readFile("releases/x/1.ttl")).toBe("text");
    expect(io.now()).toBeInstanceOf(Date);
    io.log("hello");
    expect(log).toHaveBeenCalledWith("hello");
    log.mockRestore();
  });

  it("releases a deck of the repository it runs in, validated against the whole library", async () => {
    const root = await repository();
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined);
    const process = { argv: ["node", "capitals"], cwd: () => root, exitCode: undefined as number | undefined };
    await run(process);
    expect(process.exitCode).toBe(0);
    expect(await readFile(join(root, "releases/capitals/1.ttl"), "utf8")).toContain('dcat:version "1"');
    log.mockRestore();
  }, 30_000);
});
