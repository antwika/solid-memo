import {
  getStringNoLocale,
  getThingAll,
  getUrl,
  getUrlAll,
  type Thing,
} from "@inrupt/solid-client";
import useDatasets from "./useDatasets";
import { parseDeck, type DeckModel } from "@solid-memo/core";

function parseDeckFromThing(thing: Thing) {
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

export default function useDecks(deckUrls: string[]) {
  const { data: deckDatasets, mutate } = useDatasets(deckUrls);

  const decks = (deckDatasets ?? [])
    .map((dataset) => getThingAll(dataset))
    .flat()
    .filter((thing) => deckUrls.includes(thing.url))
    .map((thing) => parseDeckFromThing(thing));

  const deckMap = decks.reduce<Record<string, DeckModel>>((acc, deck) => {
    acc[deck.iri] = deck;
    return acc;
  }, {});

  return { deckDatasets, decks, deckMap, mutate };
}
