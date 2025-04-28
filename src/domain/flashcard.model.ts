import { getStringNoLocale, getUrl, type Thing } from "@inrupt/solid-client";
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

export function parseFlashcardFromThing(thing: Thing) {
  return parseFlashcard({
    iri: thing.url,
    type: getUrl(thing, "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"),
    name: getStringNoLocale(thing, "http://antwika.com/ns/solid-memo#name"),
    version: getStringNoLocale(
      thing,
      "http://antwika.com/ns/solid-memo#version"
    ),
    isInDeck: getUrl(thing, "http://antwika.com/ns/solid-memo#isInDeck"),
    front: getStringNoLocale(thing, "http://antwika.com/ns/solid-memo#front"),
    back: getStringNoLocale(thing, "http://antwika.com/ns/solid-memo#back"),
  });
}
