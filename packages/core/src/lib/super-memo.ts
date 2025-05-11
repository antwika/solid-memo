import type { FlashcardModel } from "../domain";
import type {
  Assessment,
  ISpacedRepetitionAlgorithm,
  Quality,
} from "../ISpacedRepetitionAlgorithm";

type EaseFactor = number;

type Repetition = number;

function nextInterval(repetition: Repetition, easeFactor: EaseFactor): number {
  repetition = Math.ceil(repetition);
  if (repetition === 1) return 1;
  if (repetition === 2) return 6;
  return Math.ceil(nextInterval(repetition - 1, easeFactor) * easeFactor);
}

function nextEaseFactor(easeFactor: EaseFactor, quality: Quality) {
  return Math.max(
    parseFloat(
      (
        Math.max(easeFactor, 1.3) -
        0.8 +
        0.28 * quality -
        0.02 * quality * quality
      ).toFixed(2)
    ),
    1.3
  );
}

function nextRepetition(repetition: Repetition, quality: Quality): number {
  repetition = Math.ceil(repetition);
  if (quality >= 3) return repetition + 1;
  else return 1;
}

export function sm2(assessment: Assessment): FlashcardModel {
  return {
    iri: assessment.iri,
    version: assessment.version,
    front: assessment.front,
    back: assessment.back,
    isInSolidMemoDataInstance: assessment.isInSolidMemoDataInstance,
    isInDeck: assessment.isInDeck,
    interval: nextInterval(assessment.repetition, assessment.easeFactor),
    easeFactor: nextEaseFactor(assessment.easeFactor, assessment.q),
    repetition: nextRepetition(assessment.repetition, assessment.q),
    lastReviewed: new Date(),
  };
}

export class SuperMemo2 implements ISpacedRepetitionAlgorithm {
  compute(assessments: Assessment[]) {
    return assessments.map((assessment) => sm2(assessment));
  }
}
