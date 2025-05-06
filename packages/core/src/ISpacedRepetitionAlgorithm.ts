import { FlashcardModel } from "./domain";

export type Quality = number;

export type Assessment = FlashcardModel & { q: Quality };

export interface ISpacedRepetitionAlgorithm {
  compute(assessments: Assessment[]): FlashcardModel[];
}
