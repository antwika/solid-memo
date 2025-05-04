import { z } from "zod";

export const flashcardSchema = z.object({
  version: z.string(),
  iri: z.string(),
  front: z.string(),
  back: z.string(),
  isInDeck: z.string(),
});

export type FlashcardModel = z.infer<typeof flashcardSchema>;

export function parseFlashcard(obj: object) {
  return flashcardSchema.parse(obj);
}
