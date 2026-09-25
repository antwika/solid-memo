import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import {
  TURTLE_FOLDERS,
  defaultIo,
  formatFiles,
  formatTurtle,
  main,
  run,
  type FormatIo,
} from "./formatTurtle.ts";

const ROOT = `${process.cwd()}/`;
const BASE = "https://example.com/doc.ttl";

const PREFIXES = `@prefix ex: <https://example.com/ns#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
`;

describe("formatTurtle", () => {
  it("lays out prefixes, subjects, predicates and objects in the house style", () => {
    const source = `@base <${BASE}> .
${PREFIXES}<> a ex:Thing ; ex:name "A \\"quoted\\" name", "B"@en ; ex:count 2 ; ex:ratio 2.5 ; ex:flag true ;
  ex:when "2026-09-21T10:00:00Z"^^xsd:dateTime ; ex:link <https://other.example/x> ; ex:odd "x"^^<https://other.example/dt> .
<#b> ex:name "b" .
<https://example.com/doc.ttl#c> ex:name "c" .
`;
    expect(formatTurtle(source, "https://ignored.invalid/")).toBe(`@base <${BASE}> .

@prefix ex:  <https://example.com/ns#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<>
    a ex:Thing ;
    ex:name "A \\"quoted\\" name" ,
            "B"@en ;
    ex:count 2 ;
    ex:ratio 2.5 ;
    ex:flag true ;
    ex:when "2026-09-21T10:00:00Z"^^xsd:dateTime ;
    ex:link <https://other.example/x> ;
    ex:odd "x"^^<https://other.example/dt> .

<#b>
    ex:name "b" .

<#c>
    ex:name "c" .
`);
  });

  it("resolves relative IRIs against the fallback base when the document declares none", () => {
    expect(formatTurtle(`${PREFIXES}<#a> ex:link <> , <#b> .`, BASE)).toBe(`@prefix ex:  <https://example.com/ns#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<#a>
    ex:link <> ,
            <#b> .
`);
  });

  it("keeps lists and blank nodes inline, and unreferenced blank subjects as []", () => {
    const source = `${PREFIXES}<#a> ex:or ( [ ex:path ex:x ; ex:min 1 ] [ ex:path ex:y ; ex:min 1 ] ) ; ex:in ( "p" "q" ) ; ex:node [ ex:path ex:z ] ; ex:empty [] .
[] ex:name "anon" .
`;
    expect(formatTurtle(source, BASE)).toBe(`@prefix ex:  <https://example.com/ns#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<#a>
    ex:or ( [ ex:path ex:x ; ex:min 1 ] [ ex:path ex:y ; ex:min 1 ] ) ;
    ex:in ( "p" "q" ) ;
    ex:node [ ex:path ex:z ] ;
    ex:empty [] .

[]
    ex:name "anon" .
`);
  });

  it("carries comment blocks over to the subject they precede, blank lines included", () => {
    const source = `${PREFIXES}
# About a.
# Two lines.

<#a> ex:name "a" .
#### section ####

<#b> ex:name "b" .
`;
    expect(formatTurtle(source, BASE)).toBe(`@prefix ex:  <https://example.com/ns#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

# About a.
# Two lines.

<#a>
    ex:name "a" .

#### section ####

<#b>
    ex:name "b" .
`);
  });

  it("refuses a document whose comments it cannot place", () => {
    expect(() =>
      formatTurtle(`${PREFIXES}<#a> ex:name "a" ;\n  # between predicates\n  ex:count 1 .`, BASE),
    ).toThrow("a comment does not directly precede a subject and would be lost; move it or format by hand.");
  });

  it("is idempotent, and handles a document without prefixes", () => {
    const once = formatTurtle(`<#a> <https://example.com/ns#name> "a" .`, BASE);
    expect(once).toBe(`<#a>\n    <https://example.com/ns#name> "a" .\n`);
    expect(formatTurtle(once, BASE)).toBe(once);
  });
});

describe("the repository's Turtle files", () => {
  it("are formatted (run `npm run format:turtle` otherwise)", async () => {
    await expect(formatFiles(defaultIo(ROOT), { check: true })).resolves.toEqual({ changed: [] });
  });
});

function fakeIo(files: Record<string, string>): FormatIo & { written: Record<string, string>; logs: string[] } {
  const io = {
    written: {} as Record<string, string>,
    logs: [] as string[],
    readTurtleTree: async (dir: string) =>
      Object.entries(files)
        .filter(([path]) => path.startsWith(`${dir}/`))
        .map(([path, turtle]) => ({ path: path.slice(dir.length + 1), turtle })),
    writeFile: async (path: string, text: string) => {
      io.written[path] = text;
    },
    log: (message: string) => io.logs.push(message),
  };
  return io;
}

describe("formatFiles and main", () => {
  const unformatted = `@prefix ex: <https://example.com/ns#> .\n<#a> ex:name "a" .\n`;
  const formatted = `@prefix ex: <https://example.com/ns#> .\n\n<#a>\n    ex:name "a" .\n`;

  it("writes only the files that differ, in every house-style folder", async () => {
    const io = fakeIo({ "decks/x.ttl": unformatted, "shapes/deck/v1.ttl": formatted });
    expect(await main([], io)).toBe(0);
    expect(io.written).toEqual({ "decks/x.ttl": formatted });
    expect(io.logs).toEqual(["formatted decks/x.ttl"]);
    expect(TURTLE_FOLDERS).toContain("tooling/fixtures");
  });

  it("checks without writing", async () => {
    const io = fakeIo({ "vocab/v1.ttl": unformatted, "decks/y.ttl": formatted });
    expect(await main(["--check"], io)).toBe(1);
    expect(io.written).toEqual({});
    expect(io.logs).toEqual(["vocab/v1.ttl is not formatted: run `npm run format:turtle`."]);
    expect(await main(["--check"], fakeIo({ "decks/y.ttl": formatted }))).toBe(0);
  });

  it("names the file it refuses", async () => {
    const io = fakeIo({ "decks/z.ttl": `<#a> <https://example.com/ns#n> "a" ;\n  # stray\n  <https://example.com/ns#m> "b" .` });
    await expect(formatFiles(io, { check: true })).rejects.toThrow("decks/z.ttl: a comment does not directly precede a subject");
  });
});

describe("run and defaultIo", () => {
  it("sets the exit code from the repository's own files", async () => {
    const process = { argv: ["node", "--check"], cwd: () => ROOT, exitCode: undefined as number | undefined };
    await run(process);
    expect(process.exitCode).toBe(0);
  });

  it("writes relative to its root and logs through the console", async () => {
    const dir = await mkdtemp(join(tmpdir(), "solid-memo-format-"));
    await defaultIo(dir).writeFile("out.ttl", "x");
    expect(await readFile(join(dir, "out.ttl"), "utf8")).toBe("x");
    await writeFile(join(dir, "in.ttl"), "y");
    expect(await defaultIo(dir).readTurtleTree(".")).toEqual([
      { path: "in.ttl", turtle: "y" },
      { path: "out.ttl", turtle: "x" },
    ]);
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    defaultIo(dir).log("hello");
    expect(log).toHaveBeenCalledWith("hello");
    log.mockRestore();
  });
});
