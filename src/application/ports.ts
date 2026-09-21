import type { Card, Deck } from "../domain/deck";
import type {
  Instance,
  RegistrationOptions,
  RegistrationTarget,
} from "../domain/instance";
import type { StudyPreferences } from "../domain/preferences";
import type { ReviewState } from "../domain/review";
import type { Session } from "../domain/session";
import type { Storage } from "../domain/storage";
import type { WebIdDocument } from "../domain/webIdDocument";

/**
 * Driven port: authentication against a Solid identity provider.
 * Implemented by the Solid infrastructure layer.
 */
export interface SessionGateway {
  /** Complete a pending login redirect or restore a stored session. */
  restore(): Promise<Session | null>;
  /**
   * Subscribe to session expiry (e.g. a 401 from the pod). Returns an
   * unsubscribe function.
   */
  onSessionExpired(listener: () => void): () => void;
  /**
   * Start the login flow for the given WebID. On success the browser
   * navigates away to the identity provider, so this never resolves
   * normally; it only rejects on failure.
   */
  login(webId: string): Promise<void>;
  logout(): Promise<void>;
}

/** Driven port: read access to WebID documents. */
export interface WebIdDocumentRepository {
  fetchWebIdDocument(webId: string): Promise<WebIdDocument>;
}

/** Driven port: Solid Memo instances registered in the user's type indexes. */
export interface InstanceRepository {
  /** All instances registered in the private and public type indexes. */
  listInstances(webId: string): Promise<Instance[]>;
  /** Which type indexes exist, for the UI's warn-and-choose flow. */
  getRegistrationOptions(webId: string): Promise<RegistrationOptions>;
  /**
   * Create the instance container + meta document and register it in the
   * chosen type index (creating the index if needed). Fails loudly and
   * cleans up the container when registration fails.
   */
  createInstance(args: {
    webId: string;
    containerUrl: string;
    name: string;
    registrationTarget: RegistrationTarget;
  }): Promise<Instance>;
  /** Register an existing instance container in a type index (recovery). */
  attachInstance(args: {
    webId: string;
    instanceUrl: string;
    registrationTarget: RegistrationTarget;
  }): Promise<Instance>;
}

/** Driven port: decks and their cards inside one instance. */
export interface DeckRepository {
  listDecks(instanceUrl: string): Promise<Deck[]>;
  createDeck(instanceUrl: string, name: string): Promise<Deck>;
  /** Removes the deck's catalog entry, cards document and reviews document. */
  removeDeck(deck: Deck): Promise<void>;
  listCards(deck: Deck): Promise<Card[]>;
  addCard(deck: Deck, front: string, back: string): Promise<Card>;
  /** Replaces the card's front and back; review state is untouched. */
  updateCard(
    deck: Deck,
    card: Card,
    front: string,
    back: string,
  ): Promise<Card>;
  /** Removes the card and its review state. */
  removeCard(deck: Deck, card: Card): Promise<void>;
}

/** Driven port: SM-2 review state, stored separately from card content. */
export interface ReviewStateRepository {
  listReviewStates(deck: Deck): Promise<ReviewState[]>;
  /** null when the card has never been reviewed. */
  getReviewState(deck: Deck, cardId: string): Promise<ReviewState | null>;
  saveReviewState(deck: Deck, state: ReviewState): Promise<void>;
}

/** Driven port: per-instance study preferences. */
export interface PreferencesRepository {
  /** null when the instance has no preferences document yet. */
  getPreferences(instanceUrl: string): Promise<StudyPreferences | null>;
  savePreferences(
    instanceUrl: string,
    preferences: StudyPreferences,
  ): Promise<void>;
}

/** Driven port: discovery of storage roots in the user's pod(s). */
export interface StorageGateway {
  /**
   * All storages advertised for the WebID (profile pim:storage triples,
   * falling back to the server's Link-header discovery). May be empty.
   */
  discoverStorages(webId: string): Promise<Storage[]>;
  /** Validate a manually entered storage URL; rejects if unreachable. */
  probeStorage(url: string): Promise<Storage>;
}
