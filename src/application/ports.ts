import type { Card, CardContent, Deck } from "../domain/deck";
import type {
  Instance,
  RegistrationOptions,
  RegistrationTarget,
} from "../domain/instance";
import type { LibraryDeck, LibraryDeckContent } from "../domain/library";
import type { StudyPreferences } from "../domain/preferences";
import type { ReviewKey, ReviewState } from "../domain/review";
import type { EstablishedSession } from "../domain/session";
import type { Storage } from "../domain/storage";
import type { WebIdDocument } from "../domain/webIdDocument";

/**
 * Driven port: authentication against a Solid identity provider.
 * Implemented by the Solid infrastructure layer.
 */
export interface SessionGateway {
  /**
   * Complete a pending login redirect or restore a stored session. The
   * origin tells a just-completed login from a silent restore.
   */
  restore(): Promise<EstablishedSession | null>;
  /**
   * Subscribe to session expiry (e.g. a 401 from the pod). Returns an
   * unsubscribe function.
   */
  onSessionExpired(listener: () => void): () => void;
  /**
   * The identity provider the WebID profile declares (solid:oidcIssuer).
   * Never derived from the WebID's own origin: the two may differ.
   */
  discoverOidcIssuer(webId: string): Promise<string>;
  /**
   * Start the login flow for the given WebID. On success the browser
   * navigates away to the identity provider, so this never resolves
   * normally; it only rejects on failure.
   */
  login(webId: string): Promise<void>;
  /**
   * Start the login flow at a known identity provider, for users who pick
   * a provider instead of typing their WebID. Like login(), it only ever
   * rejects; the WebID arrives with the session after the redirect.
   */
  loginWithIssuer(oidcIssuer: string): Promise<void>;
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
  /**
   * Delete the instance container with everything in it (decks, cards,
   * review state, preferences) and drop its type index registrations.
   * Data goes first: a failure part-way leaves the instance registered,
   * so the user can retry rather than lose track of a half-deleted pod
   * container.
   */
  deleteInstance(args: { webId: string; instance: Instance }): Promise<void>;
}

/** Driven port: decks and their cards inside one instance. */
export interface DeckRepository {
  listDecks(instanceUrl: string): Promise<Deck[]>;
  createDeck(instanceUrl: string, name: string): Promise<Deck>;
  /** Replaces the deck's name; cards and review state are untouched. */
  renameDeck(deck: Deck, name: string): Promise<Deck>;
  /**
   * Rewrite the deck's catalog entry — name, direction and format
   * version — in place, so triples this app does not know survive.
   * Cards and review state are untouched.
   */
  saveDeck(deck: Deck): Promise<Deck>;
  /** Removes the deck's catalog entry, cards document and reviews document. */
  removeDeck(deck: Deck): Promise<void>;
  /**
   * Create a deck with all its cards at once — one write of the cards
   * document rather than one per card — remembering the library deck it
   * came from. The cards keep their library ids.
   */
  importDeck(instanceUrl: string, content: LibraryDeckContent): Promise<Deck>;
  listCards(deck: Deck): Promise<Card[]>;
  addCard(deck: Deck, content: CardContent): Promise<Card>;
  /**
   * Replaces the card's content, writing it in this app's format; review
   * state is untouched.
   */
  updateCard(deck: Deck, card: Card, content: CardContent): Promise<Card>;
  /** Removes the card and its review state. */
  removeCard(deck: Deck, card: Card): Promise<void>;
  /**
   * Rewrite the given cards — content and format version — in ONE save of
   * the cards document, for format migrations. Each card is edited in
   * place, so triples this app does not know survive; a card that no
   * longer exists is skipped.
   */
  saveCards(deck: Deck, cards: Card[]): Promise<void>;
}

/** Driven port: the app's read-only library of ready-made decks. */
export interface DeckLibrary {
  /** Every deck the library's index lists; empty when the library is. */
  listLibraryDecks(): Promise<LibraryDeck[]>;
  /** The deck document with its cards. */
  fetchLibraryDeck(url: string): Promise<LibraryDeckContent>;
}

/** Driven port: SM-2 review state, stored separately from card content. */
export interface ReviewStateRepository {
  listReviewStates(deck: Deck): Promise<ReviewState[]>;
  /** null when the card has never been reviewed in that direction. */
  getReviewState(deck: Deck, key: ReviewKey): Promise<ReviewState | null>;
  saveReviewState(deck: Deck, state: ReviewState): Promise<void>;
  /**
   * Write several states and drop others in ONE save of the reviews
   * document, so a day reset cannot be left half-applied.
   */
  applyReviewChanges(
    deck: Deck,
    changes: { save: ReviewState[]; remove: ReviewKey[] },
  ): Promise<void>;
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
