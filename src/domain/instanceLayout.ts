import type { Deck } from "./deck";

/**
 * Where an instance keeps its documents (see docs/data-model.md): the
 * meta, preferences and catalog documents at fixed names in the
 * container, and one cards and one reviews document per deck, named in
 * the deck's catalog entry.
 */

export function ensureTrailingSlash(url: string): string {
  return url.endsWith("/") ? url : `${url}/`;
}

export function metaUrlOf(instanceUrl: string): string {
  return `${ensureTrailingSlash(instanceUrl)}meta.ttl`;
}

export function preferencesUrlOf(instanceUrl: string): string {
  return `${ensureTrailingSlash(instanceUrl)}preferences.ttl`;
}

export function catalogUrlOf(instanceUrl: string): string {
  return `${ensureTrailingSlash(instanceUrl)}catalog.ttl`;
}

/** Every document an instance may hold, given its decks: fixed ones first. */
export function instanceDocumentUrls(instanceUrl: string, decks: readonly Deck[]): string[] {
  return [
    metaUrlOf(instanceUrl),
    preferencesUrlOf(instanceUrl),
    catalogUrlOf(instanceUrl),
    ...decks.flatMap((deck) => [deck.cardsDocumentUrl, deck.reviewsDocumentUrl]),
  ];
}
