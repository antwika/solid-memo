import { describe, expect, it, vi } from "vitest";
import { turtleFetch } from "../../test/turtle";
import { createShapeLoader } from "./shapeLoader";
import { CARD_V2, DECK_V2 } from "./shapes.generated";

describe("createShapeLoader", () => {
  it("fetches a shape document relative to the base URL, once per document", async () => {
    const fetch = vi.fn(turtleFetch(`<#shape> a <http://www.w3.org/ns/shacl#NodeShape> .`));
    const loader = createShapeLoader({ fetch, shapesBaseUrl: "https://app.example/solid-memo/shapes/" });
    const first = await loader.load(CARD_V2);
    expect(first.size).toBe(1);
    expect(await loader.load(CARD_V2)).toBe(first);
    await loader.load(DECK_V2);
    expect(fetch.mock.calls.map((call) => String(call[0]))).toEqual([
      "https://app.example/solid-memo/shapes/card/v2.ttl",
      "https://app.example/solid-memo/shapes/deck/v2.ttl",
    ]);
  });
});
