import type {
  Assessment,
  ISpacedRepetitionAlgorithm,
} from "../../../src/ISpacedRepetitionAlgorithm";
import {
  type ISchedulerService,
  SchedulerService,
} from "../../../src/service/scheduler.service";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import { when } from "vitest-when";
import type { FlashcardModel } from "../../../src/domain";
import { v4 as uuid } from "uuid";

vi.mock("uuid");

describe("scheduler.service", () => {
  let schedulerService: ISchedulerService;
  let spacedRepetitionAlgorithm: ISpacedRepetitionAlgorithm = {
    compute: vi.fn(),
  };

  beforeAll(() => {
    schedulerService = new SchedulerService(
      spacedRepetitionAlgorithm as unknown as ISpacedRepetitionAlgorithm
    );
  });

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("scheduler.service", () => {
    // Arrange
    const mockFlashcard = {
      iri: "mock-iri",
      version: "mockv-version",
      front: "mock-front",
      back: "mock-back",
      isInDeck: "mock-deck-iri",
      interval: 1,
      easeFactor: 2,
      repetition: 3,
    };
    const mockAssessments: Assessment[] = [
      {
        ...mockFlashcard,
        q: 4,
      },
    ];
    const mockUpdatedFlashcards: FlashcardModel[] = [
      {
        ...mockFlashcard,
        interval: 2,
        easeFactor: 3,
        repetition: 4,
      },
    ];

    vi.setSystemTime(new Date(2000, 1, 2, 3, 4, 5, 6));

    vi.mocked(uuid).mockReturnValue("mock-uuid" as any);

    when(spacedRepetitionAlgorithm.compute)
      .calledWith(mockAssessments)
      .thenReturn(mockUpdatedFlashcards);

    // Act
    const schedules = schedulerService.schedule(
      "mock-resource-iri",
      mockAssessments
    );

    // Assert
    expect(schedules).toStrictEqual([
      {
        iri: "mock-resource-iri#mock-uuid",
        version: "mockv-version",
        forFlashcard: "mock-iri",
        nextReview: "2000-02-04T00:00:00.000Z",
      },
    ]);
  });
});
