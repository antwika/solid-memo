import { TOPICS } from "./concepts.generated";
import { DATA_THEME_SCHEME } from "./dcat";
import type { AgentV1, CatalogV1 } from "./shapes/generated";

/**
 * An instance's catalogue: the dcat:Catalog of its decks, the subject
 * <catalog.ttl#catalog> (see docs/data-model.md). It says whose decks
 * they are — the pod's owner publishes them — so other applications can
 * read the instance as a DCAT catalogue; its datasets are the decks.
 */
export interface Catalog {
  title: string;
  description: string;
  /** The pod's owner: their WebID, named by their profile's foaf:name. */
  publisher: { webId: string; name: string };
}

/** The description a catalogue gets: DCAT-AP asks one of every catalogue. */
export function defaultCatalogDescription(title: string): string {
  return `Flashcard decks of the Solid Memo instance ${title}.`;
}

/** The catalogue's record, listing the decks as its datasets. */
export function catalogToRecord(catalog: Catalog, deckUrls: readonly string[]): CatalogV1 {
  return {
    title: catalog.title,
    description: catalog.description,
    publisher: catalog.publisher.webId,
    themeTaxonomy: [TOPICS.iri, DATA_THEME_SCHEME],
    dataset: [...deckUrls],
  };
}

/** The publisher as the agent node the catalogue names. */
export function publisherToRecord(catalog: Catalog): AgentV1 {
  return { name: catalog.publisher.name };
}

export function catalogFromRecord(data: CatalogV1, publisherName: string): Catalog {
  return {
    title: data.title,
    description: data.description,
    publisher: { webId: data.publisher, name: publisherName },
  };
}
