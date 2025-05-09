import useSchedules from "@hooks/useSchedules";
import useDatasets from "@hooks/useDatasets";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import useSWR from "swr";
import { when } from "vitest-when";
import { parseSchedule, type ScheduleModel } from "@solid-memo/core";
import {
  getDatetime,
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
        .thenReturn({ data: undefined, mutate: mockMutate });
    });

    test("then return property 'schedules' as an empty array", () => {
      expect(useSchedules(["mock-iri"]).schedules).toStrictEqual([]);
    });

    test("then return property 'scheduleMap' as an empty object", () => {
      expect(useSchedules(["mock-iri"]).scheduleMap).toStrictEqual({});
    });

    test("then return property 'scheduleDatasets' as undefined", () => {
      expect(useSchedules(["mock-iri"]).scheduleDatasets).toBeUndefined();
    });
  });

  test("success", () => {
    // Arrange
    const mockDataset = {} as SolidDataset & WithServerResourceInfo;
    const mockDatasets = [mockDataset];
    const mockMutate = vi.fn();
    const mockThing = { url: "mock-iri" } as Thing;
    const mockSchedule = { iri: "mock-schedule-iri" } as ScheduleModel;

    when(useDatasets)
      .calledWith(["mock-iri"])
      .thenReturn({ data: mockDatasets, mutate: mockMutate });

    when(getThingAll).calledWith(mockDataset).thenReturn([mockThing]);

    when(getUrl)
      .calledWith(mockThing, "http://www.w3.org/1999/02/22-rdf-syntax-ns#type")
      .thenReturn("mock-type");

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
      .calledWith(mockThing, "http://antwika.com/ns/solid-memo#forFlashcard")
      .thenReturn("mock-flashcard-iri");

    when(getDatetime)
      .calledWith(mockThing, "http://antwika.com/ns/solid-memo#nextReview")
      .thenReturn(new Date(1));

    when(getDatetime)
      .calledWith(mockThing, "http://antwika.com/ns/solid-memo#lastReviewed")
      .thenReturn(new Date(2));

    when(parseSchedule)
      .calledWith({
        iri: mockThing.url,
        type: "mock-type",
        version: "mock-version",
        isInSolidMemoDataInstance: "mock-instance-iri",
        forFlashcard: "mock-flashcard-iri",
        nextReview: new Date(1),
        lastReviewed: new Date(2),
      })
      .thenReturn(mockSchedule);

    // Act
    const { schedules, scheduleMap, scheduleDatasets } = useSchedules([
      "mock-iri",
    ]);

    // Assert
    expect(schedules).toStrictEqual([mockSchedule]);
    expect(scheduleMap["mock-schedule-iri"]).toBe(mockSchedule);
    expect(scheduleDatasets).toStrictEqual([mockDataset]);
  });
});
