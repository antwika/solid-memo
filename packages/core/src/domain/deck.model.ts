import { z } from "zod";

export const deckSchema = z.object({
  iri: z.string(),
  version: z.string(),
  name: z.string(),
  hasCard: z.array(z.string()),
  isInSolidMemoDataInstance: z.string(),
});

export type DeckModel = z.infer<typeof deckSchema>;

export function parseDeck(obj: object) {
  return deckSchema.parse(obj);
}
