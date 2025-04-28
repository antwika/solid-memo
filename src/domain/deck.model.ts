import {
  getStringNoLocale,
  getUrl,
  getUrlAll,
  type Thing,
} from "@inrupt/solid-client";
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

export function parseDeckFromThing(thing: Thing) {
  return parseDeck({
    iri: thing.url,
    type: getUrl(thing, "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"),
    name: getStringNoLocale(thing, "http://antwika.com/ns/solid-memo#name"),
    version: getStringNoLocale(
      thing,
      "http://antwika.com/ns/solid-memo#version"
    ),
    isInSolidMemoDataInstance: getUrl(
      thing,
      "http://antwika.com/ns/solid-memo#isInSolidMemoDataInstance"
    ),
    hasCard: getUrlAll(thing, "http://antwika.com/ns/solid-memo#hasCard"),
  });
}
