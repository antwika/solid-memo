import { getThingAll } from "@inrupt/solid-client";
import useDatasets from "@hooks/useDatasets";
import { parseFlashcardFromThing } from "@domain/index";
import { mapArrayToRecord } from "@lib/utils";

export default function useFlashcards(flashcardUrls: string[]) {
  const { data: flashcardDatasets, mutate } = useDatasets(flashcardUrls);

  const flashcards =
    flashcardDatasets
      ?.map((dataset) => getThingAll(dataset))
      .flat()
      .filter((thing) => flashcardUrls.includes(thing.url))
      .map((thing) => parseFlashcardFromThing(thing)) ?? [];

  const flashcardMap = mapArrayToRecord(flashcards, "iri");

  return { flashcardDatasets, flashcards, flashcardMap, mutate };
}
