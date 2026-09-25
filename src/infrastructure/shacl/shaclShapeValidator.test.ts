import { readFile } from "node:fs/promises";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { buildThing, createThing, mockSolidDatasetFrom, setThing } from "@inrupt/solid-client";
import { getSolidDatasetOrNull } from "../solid/datasets";
import { DCTERMS, RDF, SM } from "../solid/vocab";
import type { ShapeEngine } from "./engine";
import { createShaclShapeValidator } from "./shaclShapeValidator";
import type { ShapeLoader } from "./shapeLoader";

vi.mock("../solid/datasets");

const DOC = "https://pod.example/solid-memo/a/catalog.ttl";

function catalog() {
  let dataset = mockSolidDatasetFrom(DOC);
  dataset = setThing(
    dataset,
    buildThing(createThing({ url: `${DOC}#deck-1` }))
      .addIri(RDF.type, SM.Deck)
      .addStringNoLocale(DCTERMS.title, "Capitals")
      .addInteger(SM.formatVersion, 2)
      .build(),
  );
  dataset = setThing(
    dataset,
    buildThing(createThing({ url: `${DOC}#deck-2` }))
      .addIri(RDF.type, SM.Deck)
      .addInteger(SM.formatVersion, 9)
      .build(),
  );
  dataset = setThing(
    dataset,
    buildThing(createThing({ url: `${DOC}#note` })).addStringNoLocale(DCTERMS.title, "x").build(),
  );
  return dataset;
}

function makeValidator() {
  const validateNode = vi.fn(async (_data: unknown, focus: string) =>
    focus.endsWith("deck-1")
      ? [{ path: SM.cardsDocument, message: "Less than 1 values", severity: "violation" as const, constraint: "MinCount" }]
      : [],
  );
  const createEngine = vi.fn((): ShapeEngine => ({ validateNode }));
  const loader: ShapeLoader = { load: vi.fn(async () => ({ size: 0 }) as never) };
  const validator = createShaclShapeValidator({
    fetch: vi.fn() as unknown as typeof fetch,
    shapesFetch: vi.fn() as unknown as typeof fetch,
    shapesBaseUrl: "https://app.example/shapes/",
    loadEngine: async () => ({ createEngine }),
    loader,
  });
  return { validator, validateNode, createEngine, loader };
}

beforeEach(() => {
  vi.mocked(getSolidDatasetOrNull).mockReset();
});

describe("createShaclShapeValidator", () => {
  it("loads the engine and the site's shapes itself by default", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(catalog());
    const shapesFetch: typeof fetch = async (input) => {
      const url = String(input);
      const body = await readFile(`${process.cwd()}/shapes/${url.slice("https://app.example/shapes/".length)}`, "utf8");
      const response = new Response(body, { status: 200, headers: { "Content-Type": "text/turtle" } });
      Object.defineProperty(response, "url", { value: url });
      return response;
    };
    const validator = createShaclShapeValidator({
      fetch: vi.fn() as unknown as typeof fetch,
      shapesFetch,
      shapesBaseUrl: "https://app.example/shapes/",
    });
    const report = await validator.validateDocument(DOC);
    expect(report.subjects[0]).toMatchObject({
      status: "checked",
      shape: "deck",
      version: 2,
      violations: [
        expect.objectContaining({ path: SM.cardsDocument, constraint: "MinCount" }),
        expect.objectContaining({ path: SM.direction, constraint: "MinCount" }),
        expect.objectContaining({ path: SM.reviewsDocument, constraint: "MinCount" }),
      ],
    });
  });

  it("reports a missing document as missing, without loading anything", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(null);
    const { validator, loader } = makeValidator();
    await expect(validator.validateDocument(DOC)).resolves.toEqual({
      url: DOC,
      status: "missing",
      subjects: [],
    });
    expect(loader.load).not.toHaveBeenCalled();
  });

  it("checks each subject against the shape of its class and version", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(catalog());
    const { validator, validateNode, createEngine, loader } = makeValidator();
    await expect(validator.validateDocument(DOC)).resolves.toEqual({
      url: DOC,
      status: "checked",
      subjects: [
        {
          url: `${DOC}#deck-1`,
          status: "checked",
          shape: "deck",
          version: 2,
          violations: [
            { path: SM.cardsDocument, message: "Less than 1 values", severity: "violation", constraint: "MinCount" },
          ],
        },
        { url: `${DOC}#deck-2`, status: "newer", shape: "deck", version: 9, latest: 2 },
        { url: `${DOC}#note`, status: "untyped" },
      ],
    });
    expect(validateNode).toHaveBeenCalledExactlyOnceWith(
      expect.anything(),
      `${DOC}#deck-1`,
      "https://solid-memo.com/shapes/deck/v2.ttl#inPod",
    );
    expect(loader.load).toHaveBeenCalledOnce();
    await validator.validateDocument(DOC);
    expect(loader.load).toHaveBeenCalledOnce();
    expect(createEngine).toHaveBeenCalledOnce();
  });
});
