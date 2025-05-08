import useDecks from "@hooks/useDecks";
import useDatasets from "@hooks/useDatasets";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import useSWR from "swr";
import { when } from "vitest-when";
import { parseDeck, type DeckModel } from "@solid-memo/core";
import {
  getStringNoLocale,
  getThingAll,
  getUrl,
  getUrlAll,
  type SolidDataset,
  type Thing,
  type WithServerResourceInfo,
} from "@inrupt/solid-client";

vi.mock("swr", () => ({
  default: vi.fn(),
}));

vi.mock("@lib/utils", () => ({
  multiFetcher: vi.fn(),
}));

vi.mock("@hooks/useDatasets", () => ({
  default: vi.fn(),
}));

vi.mock("@inrupt/solid-client");

vi.mock("@solid-memo/core");

describe("useDecks (function) (default export)", () => {
  let mockData = {};
  let mockMutate = vi.fn();

  beforeEach(() => {
    mockData = {};
    mockMutate = vi.fn();

    vi.mocked(useSWR, { partial: true }).mockReturnValue({
      data: mockData,
      mutate: mockMutate,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.unstubAllEnvs();
  });

  describe("when useDatasets return data as undefined", () => {
    beforeEach(() => {
      when(useDatasets)
        .calledWith(["mock-iri"])
        .thenReturn({ data: undefined, mutate: mockMutate });
    });

    test("then return property 'decks' as an empty array", () => {
      // Act
      const { decks, deckMap, deckDatasets } = useDecks(["mock-iri"]);

      // Assert
      expect(decks).toStrictEqual([]);
      expect(deckMap).toStrictEqual({});
      expect(deckDatasets).toBeUndefined();
    });

    test("then return property 'deckMap' as an empty object", () => {
      // Act
      const { decks, deckMap, deckDatasets } = useDecks(["mock-iri"]);

      // Assert
      expect(decks).toStrictEqual([]);
      expect(deckMap).toStrictEqual({});
      expect(deckDatasets).toBeUndefined();
    });

    test("then return property 'deckDatasets' as undefined", () => {
      // Act
      const { decks, deckMap, deckDatasets } = useDecks(["mock-iri"]);

      // Assert
      expect(decks).toStrictEqual([]);
      expect(deckMap).toStrictEqual({});
      expect(deckDatasets).toBeUndefined();
    });
  });

  test("success", () => {
    // Arrange
    const mockDataset = {} as SolidDataset & WithServerResourceInfo;
    const mockDeckDatasets = [mockDataset];
    const mockMutate = vi.fn();
    const mockThing = { url: "mock-iri" } as Thing;
    const mockDeck = { iri: "mock-deck-iri" } as DeckModel;

    when(useDatasets)
      .calledWith(["mock-iri"])
      .thenReturn({ data: mockDeckDatasets, mutate: mockMutate });

    when(getThingAll).calledWith(mockDataset).thenReturn([mockThing]);

    when(getUrl)
      .calledWith(mockThing, "http://www.w3.org/1999/02/22-rdf-syntax-ns#type")
      .thenReturn("mock-type");

    when(getStringNoLocale)
      .calledWith(mockThing, "http://antwika.com/ns/solid-memo#name")
      .thenReturn("mock-name");

    when(getStringNoLocale)
      .calledWith(mockThing, "http://antwika.com/ns/solid-memo#version")
      .thenReturn("mock-version");

    when(getUrl)
      .calledWith(
        mockThing,
        "http://antwika.com/ns/solid-memo#isInSolidMemoDataInstance"
      )
      .thenReturn("mock-instance-iri");

    when(getUrlAll)
      .calledWith(mockThing, "http://antwika.com/ns/solid-memo#hasCard")
      .thenReturn(["mock-flashcard-iri"]);

    when(parseDeck)
      .calledWith({
        iri: mockThing.url,
        type: "mock-type",
        name: "mock-name",
        version: "mock-version",
        isInSolidMemoDataInstance: "mock-instance-iri",
        hasCard: ["mock-flashcard-iri"],
      })
      .thenReturn(mockDeck);

    // Act
    const { decks, deckMap, deckDatasets } = useDecks(["mock-iri"]);

    // Assert
    expect(decks).toStrictEqual([mockDeck]);
    expect(deckMap["mock-deck-iri"]).toBe(mockDeck);
    expect(deckDatasets).toStrictEqual([mockDataset]);
  });
});
