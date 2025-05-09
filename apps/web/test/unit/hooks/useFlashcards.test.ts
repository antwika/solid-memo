import useFlashcards from "@hooks/useFlashcards";
import useDatasets from "@hooks/useDatasets";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import useSWR from "swr";
import { when } from "vitest-when";
import { parseFlashcard, type FlashcardModel } from "@solid-memo/core";
import {
  getDecimal,
  getInteger,
  getStringNoLocale,
  getThingAll,
  getUrl,
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

describe("useFlashcards (function) (default export)", () => {
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
        .thenReturn({ data: undefined, mutate: mockMutate, isLoading: false });
    });

    test("then return property 'flashcards' as an empty array", () => {
      expect(useFlashcards(["mock-iri"]).flashcards).toStrictEqual([]);
    });

    test("then return property 'flashcardMap' as an empty object", () => {
      expect(useFlashcards(["mock-iri"]).flashcardMap).toStrictEqual({});
    });

    test("then return property 'flashcardDatasets' as undefined", () => {
      expect(useFlashcards(["mock-iri"]).flashcardDatasets).toBeUndefined();
    });
  });

  test("success", () => {
    // Arrange
    const mockDataset = {} as SolidDataset & WithServerResourceInfo;
    const mockDatasets = [mockDataset];
    const mockMutate = vi.fn();
    const mockThing = { url: "mock-iri" } as Thing;
    const mockFlashcard = { iri: "mock-flashcard-iri" } as FlashcardModel;

    when(useDatasets)
      .calledWith(["mock-iri"])
      .thenReturn({ data: mockDatasets, mutate: mockMutate, isLoading: false });

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

    when(getUrl)
      .calledWith(mockThing, "http://antwika.com/ns/solid-memo#isInDeck")
      .thenReturn("mock-deck-iri");

    when(getStringNoLocale)
      .calledWith(mockThing, "http://antwika.com/ns/solid-memo#front")
      .thenReturn("mock-front");

    when(getStringNoLocale)
      .calledWith(mockThing, "http://antwika.com/ns/solid-memo#back")
      .thenReturn("mock-back");

    when(getInteger)
      .calledWith(mockThing, "http://antwika.com/ns/solid-memo#interval")
      .thenReturn(1);

    when(getDecimal)
      .calledWith(mockThing, "http://antwika.com/ns/solid-memo#easeFactor")
      .thenReturn(2);

    when(getInteger)
      .calledWith(mockThing, "http://antwika.com/ns/solid-memo#repetition")
      .thenReturn(3);

    when(parseFlashcard)
      .calledWith({
        iri: mockThing.url,
        type: "mock-type",
        name: "mock-name",
        version: "mock-version",
        isInSolidMemoDataInstance: "mock-instance-iri",
        isInDeck: "mock-deck-iri",
        front: "mock-front",
        back: "mock-back",
        interval: 1,
        easeFactor: 2,
        repetition: 3,
      })
      .thenReturn(mockFlashcard);

    // Act
    const { flashcards, flashcardMap, flashcardDatasets } = useFlashcards([
      "mock-iri",
    ]);

    // Assert
    expect(flashcards).toStrictEqual([mockFlashcard]);
    expect(flashcardMap["mock-flashcard-iri"]).toBe(mockFlashcard);
    expect(flashcardDatasets).toStrictEqual([mockDataset]);
  });

  describe("returned property 'isLoading'", () => {
    test("when useDatasets returned property 'isLoading' as true, this function also returns property 'isLoading' as true.", () => {
      // Arrange
      when(useDatasets)
        .calledWith(["mock-iri"])
        .thenReturn({ isLoading: true } as any);

      // Act & Assert
      expect(useFlashcards(["mock-iri"]).isLoading).toBeTruthy();
    });

    test("when useDatasets returned property 'isLoading' as false, this function also returns property 'isLoading' as false.", () => {
      // Arrange
      when(useDatasets)
        .calledWith(["mock-iri"])
        .thenReturn({ isLoading: false } as any);

      // Act & Assert
      expect(useFlashcards(["mock-iri"]).isLoading).toBeFalsy();
    });
  });
});
