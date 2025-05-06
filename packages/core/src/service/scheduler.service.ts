import type { DeckModel, FlashcardModel, ScheduleModel } from "../domain";
import type {
  Assessment,
  ISpacedRepetitionAlgorithm,
} from "../ISpacedRepetitionAlgorithm";
import { v4 as uuid } from "uuid";
import { addDays, startOfDay } from "date-fns";

export type ScheduleInput = {
  decks: DeckModel[];
  flashcards: FlashcardModel[];
  assessments: Assessment[];
  schedules: ScheduleModel[];
};

export interface ISchedulerService {
  schedule(
    instanceIri: string,
    resourceIri: string,
    assessments: Assessment[]
  ): ScheduleModel[];
}

export class SchedulerService implements ISchedulerService {
  private readonly spacedRepetitonAlgorithm: ISpacedRepetitionAlgorithm;

  constructor(spacedRepetitionAlgorithm: ISpacedRepetitionAlgorithm) {
    this.spacedRepetitonAlgorithm = spacedRepetitionAlgorithm;
  }

  schedule(
    instanceIri: string,
    resourceIri: string,
    assessments: Assessment[]
  ): ScheduleModel[] {
    const flashcards = this.spacedRepetitonAlgorithm.compute(assessments);

    const schedules = flashcards.map((flashcard) => {
      const scheduleName = uuid().toString();

      const nextReview = startOfDay(addDays(new Date(), flashcard.interval));

      return {
        iri: `${resourceIri}#${scheduleName}`,
        version: flashcard.version,
        isInSolidMemoDataInstance: instanceIri,
        forFlashcard: flashcard.iri,
        nextReview,
      };
    });

    return schedules;
  }
}
