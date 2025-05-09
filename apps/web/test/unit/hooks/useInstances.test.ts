import useInstances from "@hooks/useInstances";
import useDatasets from "@hooks/useDatasets";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import useSWR from "swr";
import { when } from "vitest-when";
import { parseInstance, type InstanceModel } from "@solid-memo/core";
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

describe("useInstances (function) (default export)", () => {
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

    test("then return property 'instances' as an empty array", () => {
      expect(useInstances(["mock-iri"]).instances).toStrictEqual([]);
    });

    test("then return property 'instanceMap' as an empty object", () => {
      expect(useInstances(["mock-iri"]).instanceMap).toStrictEqual({});
    });

    test("then return property 'instanceDatasets' as undefined", () => {
      expect(useInstances(["mock-iri"]).instanceDatasets).toBeUndefined();
    });
  });

  test("success", () => {
    // Arrange
    const mockDataset = {} as SolidDataset & WithServerResourceInfo;
    const mockDatasets = [mockDataset];
    const mockMutate = vi.fn();
    const mockThing = { url: "mock-iri" } as Thing;
    const mockInstance = { iri: "mock-instance-iri" } as InstanceModel;

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
        "http://antwika.com/ns/solid-memo#isInPrivateTypeIndex"
      )
      .thenReturn("mock-private-type-index-iri");

    when(getUrlAll)
      .calledWith(mockThing, "http://antwika.com/ns/solid-memo#hasDeck")
      .thenReturn(["mock-deck-iri"]);

    when(getUrlAll)
      .calledWith(mockThing, "http://antwika.com/ns/solid-memo#hasSchedule")
      .thenReturn(["mock-schedule-iri"]);

    when(parseInstance)
      .calledWith({
        iri: mockThing.url,
        type: "mock-type",
        name: "mock-name",
        version: "mock-version",
        isInPrivateTypeIndex: "mock-private-type-index-iri",
        hasDeck: ["mock-deck-iri"],
        hasSchedule: ["mock-schedule-iri"],
      })
      .thenReturn(mockInstance);

    // Act
    const { instances, instanceMap, instanceDatasets } = useInstances([
      "mock-iri",
    ]);

    // Assert
    expect(instances).toStrictEqual([mockInstance]);
    expect(instanceMap["mock-instance-iri"]).toBe(mockInstance);
    expect(instanceDatasets).toStrictEqual([mockDataset]);
  });

  describe("returned property 'isLoading'", () => {
    test("when useDatasets returned property 'isLoading' as true, this function also returns property 'isLoading' as true.", () => {
      // Arrange
      when(useDatasets)
        .calledWith(["mock-iri"])
        .thenReturn({ isLoading: true } as any);

      // Act & Assert
      expect(useInstances(["mock-iri"]).isLoading).toBeTruthy();
    });

    test("when useDatasets returned property 'isLoading' as false, this function also returns property 'isLoading' as false.", () => {
      // Arrange
      when(useDatasets)
        .calledWith(["mock-iri"])
        .thenReturn({ isLoading: false } as any);

      // Act & Assert
      expect(useInstances(["mock-iri"]).isLoading).toBeFalsy();
    });
  });
});
