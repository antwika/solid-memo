import {
  getStringNoLocale,
  getThingAll,
  getUrl,
  type Thing,
} from "@inrupt/solid-client";
import useDatasets from "./useDatasets";
import { parseFlashcard, type FlashcardModel } from "@domain/index";

function parseFlashcardFromThing(thing: Thing) {
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

export default function useFlashcards(flashcardUrls: string[]) {
  const { data: flashcardDatasets, mutate } = useDatasets(flashcardUrls);

  const flashcards = flashcardDatasets
    ?.map((dataset) => getThingAll(dataset))
    .flat()
    .filter((thing) => flashcardUrls.includes(thing.url))
    .map((thing) => parseFlashcardFromThing(thing));

  const flashcardMap =
    flashcards?.reduce<Record<string, FlashcardModel>>((acc, flashcard) => {
      acc[flashcard.iri] = flashcard;
      return acc;
    }, {}) ?? {};

  return { flashcardDatasets, flashcards, flashcardMap, mutate };
}
