import { test, expect, describe, beforeAll } from "vitest";
import { sm2, SuperMemo2 } from "../../../src/lib/super-memo";
import type {
  Assessment,
  ISpacedRepetitionAlgorithm,
} from "../../../src/ISpacedRepetitionAlgorithm";
import type { FlashcardModel } from "../../../src/domain";

describe("super-memo", () => {
  test("sm2", () => {
    const mockFlashcardBase: FlashcardModel = {
      version: "mock-version",
      iri: "mock-iri",
      front: "mock-front",
      back: "mock-back",
      isInSolidMemoDataInstance: "mock-instance-iri",
      isInDeck: "mock-deck-iri",
      interval: 1,
      easeFactor: 2,
      repetition: 3,
    };
    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 1,
        easeFactor: 2.5,
        repetition: 1,
        q: 0,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 1,
      easeFactor: 1.7,
      repetition: 1,
    });

    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 1,
        easeFactor: 2.5,
        repetition: 1,
        q: 0,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 1,
      easeFactor: 1.7,
      repetition: 1,
    });
    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 1,
        easeFactor: 1.7,
        repetition: 1,
        q: 0,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 1,
      easeFactor: 1.3,
      repetition: 1,
    });
    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 1,
        easeFactor: 1.3,
        repetition: 1,
        q: 0,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 1,
      easeFactor: 1.3,
      repetition: 1,
    });

    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 1,
        easeFactor: 2.5,
        repetition: 1,
        q: 1,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 1,
      easeFactor: 1.96,
      repetition: 1,
    });
    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 1,
        easeFactor: 1.96,
        repetition: 1,
        q: 1,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 1,
      easeFactor: 1.42,
      repetition: 1,
    });
    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 1,
        easeFactor: 1.42,
        repetition: 1,
        q: 1,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 1,
      easeFactor: 1.3,
      repetition: 1,
    });
    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 1,
        easeFactor: 1.3,
        repetition: 1,
        q: 1,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 1,
      easeFactor: 1.3,
      repetition: 1,
    });

    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 1,
        easeFactor: 2.5,
        repetition: 1,
        q: 2,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 1,
      easeFactor: 2.18,
      repetition: 1,
    });
    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 1,
        easeFactor: 2.18,
        repetition: 1,
        q: 2,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 1,
      easeFactor: 1.86,
      repetition: 1,
    });
    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 1,
        easeFactor: 1.86,
        repetition: 1,
        q: 2,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 1,
      easeFactor: 1.54,
      repetition: 1,
    });
    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 1,
        easeFactor: 1.54,
        repetition: 1,
        q: 2,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 1,
      easeFactor: 1.3,
      repetition: 1,
    });

    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 1,
        easeFactor: 2.5,
        repetition: 1,
        q: 3,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 1,
      easeFactor: 2.36,
      repetition: 2,
    });
    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 1,
        easeFactor: 2.36,
        repetition: 2,
        q: 3,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 6,
      easeFactor: 2.22,
      repetition: 3,
    });
    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 6,
        easeFactor: 2.22,
        repetition: 3,
        q: 3,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 14,
      easeFactor: 2.08,
      repetition: 4,
    });
    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 14,
        easeFactor: 2.08,
        repetition: 4,
        q: 3,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 28,
      easeFactor: 1.94,
      repetition: 5,
    });

    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 1,
        easeFactor: 2.5,
        repetition: 1,
        q: 4,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 1,
      easeFactor: 2.5,
      repetition: 2,
    });
    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 1,
        easeFactor: 2.5,
        repetition: 2,
        q: 4,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 6,
      easeFactor: 2.5,
      repetition: 3,
    });
    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 6,
        easeFactor: 2.5,
        repetition: 3,
        q: 4,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 15,
      easeFactor: 2.5,
      repetition: 4,
    });
    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 15,
        easeFactor: 2.5,
        repetition: 4,
        q: 4,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 38,
      easeFactor: 2.5,
      repetition: 5,
    });

    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 1,
        easeFactor: 2.5,
        repetition: 1,
        q: 5,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 1,
      easeFactor: 2.6,
      repetition: 2,
    });
    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 1,
        easeFactor: 2.6,
        repetition: 2,
        q: 5,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 6,
      easeFactor: 2.7,
      repetition: 3,
    });
    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 6,
        easeFactor: 2.7,
        repetition: 3,
        q: 5,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 17,
      easeFactor: 2.8,
      repetition: 4,
    });
    expect(
      sm2({
        ...mockFlashcardBase,
        interval: 17,
        easeFactor: 2.8,
        repetition: 4,
        q: 5,
      })
    ).toStrictEqual({
      ...mockFlashcardBase,
      interval: 48,
      easeFactor: 2.9,
      repetition: 5,
    });
  });

  describe("SuperMemo2", () => {
    let superMemo2: ISpacedRepetitionAlgorithm;

    beforeAll(() => {
      superMemo2 = new SuperMemo2();
    });

    test("compute", () => {
      // Arrange
      const mockFlashcardBase: FlashcardModel = {
        version: "mock-version",
        iri: "mock-iri",
        front: "mock-front",
        back: "mock-back",
        isInSolidMemoDataInstance: "mock-instance-iri",
        isInDeck: "mock-deck-iri",
        interval: 1,
        easeFactor: 2,
        repetition: 3,
      };
      const mockAssessments: Assessment[] = [
        {
          ...mockFlashcardBase,
          interval: 1,
          easeFactor: 2.5,
          repetition: 1,
          q: 0,
        },
      ];

      // Act
      const items = superMemo2.compute(mockAssessments);

      // Assert
      expect(items).toStrictEqual([
        {
          ...mockFlashcardBase,
          interval: 1,
          easeFactor: 1.7,
          repetition: 1,
        },
      ]);
    });
  });
});
