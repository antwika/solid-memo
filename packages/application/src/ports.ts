import type { Catalog } from "@solid-memo/domain/catalog";
import type { Repair } from "@solid-memo/domain/repair";
import type { Card, CardContent, Deck } from "@solid-memo/domain/deck";
import type {
  Instance,
  InstanceMeta,
  RegistrationOptions,
  RegistrationTarget,
} from "@solid-memo/domain/instance";
import type { LibraryDeck, LibraryDeckContent } from "@solid-memo/domain/library";
import type { StoredPreferences, StudyPreferences } from "@solid-memo/domain/preferences";
import type { ReviewKey, ReviewState } from "@solid-memo/domain/review";
import type { EstablishedSession } from "@solid-memo/domain/session";
import type { Storage } from "@solid-memo/domain/storage";
import type { DocumentReport } from "@solid-memo/domain/validation";
import type { WebIdDocument } from "@solid-memo/domain/webIdDocument";

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
  /**
   * Register the instance's catalogue (a dcat:Catalog) beside the
   * instance in every type index that registers the instance, so other
   * applications find its decks; nothing where it already is.
   */
  registerCatalog(args: { webId: string; instanceUrl: string; title: string }): Promise<void>;
  /**
   * Point every type index registration of the instance at another
   * container (docs/migrations.md): all indexes or none — when a later
   * index fails, the earlier ones are switched back before rethrowing.
   * An instance registered in no index is an error.
   */
  switchInstance(args: { webId: string; from: string; to: string; title: string }): Promise<void>;
  /** What the instance's meta document says; null when there is none. */
  readMeta(instanceUrl: string): Promise<InstanceMeta | null>;
  /**
   * Rewrite the meta document's subject in place, in this app's format.
   * Fails when the document is missing: a meta document is created with
   * its instance, never on its own.
   */
  saveMeta(instanceUrl: string, meta: InstanceMeta): Promise<void>;
}

/** Driven port: decks and their cards inside one instance. */
export interface DeckRepository {
  listDecks(instanceUrl: string): Promise<Deck[]>;
  /** The instance's catalogue (catalog.ttl#catalog); null when it has none yet. */
  readCatalog(instanceUrl: string): Promise<Catalog | null>;
  /** Write the instance's catalogue, listing every deck, creating the catalog document if need be. */
  saveCatalog(instanceUrl: string, catalog: Catalog): Promise<void>;
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
  /**
   * Write cards by fragment id, new or existing (an existing card keeps
   * its creation time and triples this app does not know), retired or
   * not, and remove others, in one write of the cards document.
   */
  applyCardChanges(
    deck: Deck,
    changes: { save: (CardContent & { id: string; retired?: true })[]; remove: string[] },
  ): Promise<void>;
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
  /**
   * The stored preferences with their format version; null when the
   * instance has no preferences document yet.
   */
  getPreferences(instanceUrl: string): Promise<StoredPreferences | null>;
  savePreferences(
    instanceUrl: string,
    preferences: StudyPreferences,
  ): Promise<void>;
}

/**
 * Driven port: one pod document checked against Solid Memo's shapes
 * (docs/validation.md). A document that does not exist is reported as
 * missing, not failed; any other failure to read it throws.
 */
export interface ShapeValidator {
  validateDocument(url: string): Promise<DocumentReport>;
}

/** Where an update moves an instance: every IRI under `from` becomes one under `to`. */
export interface ContainerMove {
  from: string;
  to: string;
}

/**
 * Driven port: copying an instance's container, for the format update
 * that never writes the original (docs/migrations.md).
 */
export interface InstanceCopier {
  /** Every resource below the container, depth first; containers end with a slash. */
  listResources(containerUrl: string): Promise<string[]>;
  /** Throws unless nothing is at the URL yet. */
  ensureAbsent(url: string): Promise<void>;
  createContainer(url: string): Promise<void>;
  /**
   * Copy a resource's own access control (WAC .acl or ACP .acr),
   * rebased; false when it has none of its own (it inherits).
   */
  copyAccessControl(from: string, to: string, move: ContainerMove): Promise<boolean>;
  /**
   * Copy one resource: a container is created, RDF rebased, anything
   * else byte for byte; the target must not exist yet (If-None-Match: *).
   * Resolves to the version that was copied (opaque: its ETag, else its
   * Last-Modified, else a hash of its content), taken from the very
   * response the copy was made from.
   */
  copyResource(from: string, to: string, move: ContainerMove): Promise<string>;
  /**
   * Whether the resource is still at that version: asked of the pod with
   * a conditional request (If-None-Match / If-Modified-Since), which
   * answers 304 when it is.
   */
  isUnchanged(url: string, version: string): Promise<boolean>;
  /** Delete a container and everything below it; one that is gone counts as deleted. */
  deleteRecursively(url: string): Promise<void>;
}

/**
 * Driven port: a note of an update in progress, kept where the app runs
 * (the browser), so an update cut off half-way (a closed tab) can be
 * found and its partial copy removed. Best effort: it may forget.
 */
export interface UpdateJournal {
  begin(sourceUrl: string, stagingUrl: string): void;
  end(sourceUrl: string): void;
  /** The copy an unfinished update of the instance was making; null when none. */
  staging(sourceUrl: string): string | null;
}

/**
 * Driven port: makes a container read-only for a while. The format update
 * holds the instance it copies, so nothing — neither the update nor
 * anything else in this tab — writes to it until the update is over.
 */
export interface WriteFence {
  /** Refuse every write under the container until the returned release is called. */
  hold(containerUrl: string): () => void;
}

/** Driven port: repairs of what an instance check found (docs/validation.md). */
export interface RepairRepository {
  /** Apply the repairs, one read and one write per document. */
  applyRepairs(repairs: readonly Repair[]): Promise<void>;
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
