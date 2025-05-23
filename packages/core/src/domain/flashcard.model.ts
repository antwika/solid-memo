import { z } from "zod";

export const flashcardSchema = z.object({
  version: z.string(),
  iri: z.string(),
  front: z.string(),
  back: z.string(),
  isInSolidMemoDataInstance: z.string(),
  isInDeck: z.string(),
  interval: z.number(),
  easeFactor: z.number(),
  repetition: z.number(),
  lastReviewed: z.date().optional().nullable(),
});

export type FlashcardModel = z.infer<typeof flashcardSchema>;

export function parseFlashcard(obj: object) {
  return flashcardSchema.parse(obj);
}
