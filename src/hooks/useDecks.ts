import { getThingAll } from "@inrupt/solid-client";
import useDatasets from "@hooks/useDatasets";
import { parseDeckFromThing } from "@domain/index";
import { mapArrayToRecord } from "@lib/utils";

export default function useDecks(deckUrls: string[]) {
  const { data: deckDatasets, mutate } = useDatasets(deckUrls);

  const decks =
    deckDatasets
      ?.map((dataset) => getThingAll(dataset))
      .flat()
      .filter((thing) => deckUrls.includes(thing.url))
      .map((thing) => parseDeckFromThing(thing)) ?? [];

  const deckMap = mapArrayToRecord(decks, "iri");

  return { deckDatasets, decks, deckMap, mutate };
}
