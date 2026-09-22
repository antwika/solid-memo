import type { SolidAccount } from "../domain/account";
import type { Card, Deck } from "../domain/deck";
import type {
  Instance,
  RegistrationOptions,
  RegistrationTarget,
} from "../domain/instance";
import type { LibraryDeck } from "../domain/library";
import {
  DEFAULT_PREFERENCES,
  type StudyPreferences,
} from "../domain/preferences";
import type { ReviewQuality, ReviewState } from "../domain/review";
import {
  buildStudyQueue,
  nextDueDate,
  resetStudyDay,
  snapshotBeforeReview,
  type StudyQueue,
} from "../domain/scheduling";
import type { EstablishedSession, Session } from "../domain/session";
import { applySm2, INITIAL_SM2_STATE } from "../domain/sm2";
import type { Storage } from "../domain/storage";
import { isSecureUrl, validateWebId } from "../domain/webId";
import type { WebIdDocument } from "../domain/webIdDocument";
import type {
  DeckLibrary,
  DeckRepository,
  InstanceRepository,
  PreferencesRepository,
  ReviewStateRepository,
  SessionGateway,
  StorageGateway,
  WebIdDocumentRepository,
} from "./ports";

export interface UseCases {
  restoreSession(): Promise<EstablishedSession | null>;
  /** Rejects, without any network request, unless the WebID is an https URL. */
  loginWithWebId(webId: string): Promise<void>;
  /** Log in at a chosen identity provider; rejects unless it is an https URL. */
  loginWithProvider(oidcIssuer: string): Promise<void>;
  logout(): Promise<void>;
  /** Subscribe to session expiry; returns an unsubscribe function. */
  onSessionExpired(listener: () => void): () => void;
  /**
   * The account behind a session: its Pod, discovered through the WebID
   * profile's storage link, and its identity provider.
   */
  discoverAccount(session: Session): Promise<SolidAccount>;
  viewWebIdDocument(session: Session): Promise<WebIdDocument>;
  listStorages(session: Session): Promise<Storage[]>;
  addManualStorage(url: string): Promise<Storage>;
  listInstances(session: Session): Promise<Instance[]>;
  getRegistrationOptions(session: Session): Promise<RegistrationOptions>;
  createInstance(
    session: Session,
    args: {
      containerUrl: string;
      name: string;
      registrationTarget: RegistrationTarget;
    },
  ): Promise<Instance>;
  attachInstanceByUrl(
    session: Session,
    instanceUrl: string,
    registrationTarget: RegistrationTarget,
  ): Promise<Instance>;
  /** Permanently delete an instance and all its decks and cards. */
  deleteInstance(session: Session, instance: Instance): Promise<void>;
  listDecks(instanceUrl: string): Promise<Deck[]>;
  createDeck(instanceUrl: string, name: string): Promise<Deck>;
  renameDeck(deck: Deck, name: string): Promise<Deck>;
  removeDeck(deck: Deck): Promise<void>;
  /** The ready-made decks the app offers for import. */
  listLibraryDecks(): Promise<LibraryDeck[]>;
  /** Copy a library deck, cards included, into an instance as a new deck. */
  importLibraryDeck(instanceUrl: string, deck: LibraryDeck): Promise<Deck>;
  listCards(deck: Deck): Promise<Card[]>;
  addCard(deck: Deck, front: string, back: string): Promise<Card>;
  updateCard(
    deck: Deck,
    card: Card,
    front: string,
    back: string,
  ): Promise<Card>;
  removeCard(deck: Deck, card: Card): Promise<void>;
  /** Stored preferences overlaid on the defaults. */
  getPreferences(instanceUrl: string): Promise<StudyPreferences>;
  savePreferences(
    instanceUrl: string,
    preferences: StudyPreferences,
  ): Promise<void>;
  /** Today's due and new cards for a deck, respecting the daily caps. */
  getStudyQueue(
    instanceUrl: string,
    deck: Deck,
    now: Date,
  ): Promise<StudyQueue>;
  /**
   * Apply one SM-2 review: load the card's state (or start fresh),
   * transition it, persist it, and return the new state.
   */
  recordReview(
    instanceUrl: string,
    deck: Deck,
    card: Card,
    quality: ReviewQuality,
    now: Date,
  ): Promise<ReviewState>;
  /**
   * Undo the current study day for a deck: cards reviewed today go back
   * to how they were before, cards introduced today become new again.
   * Resolves to the number of cards reset.
   */
  resetStudyDay(instanceUrl: string, deck: Deck, now: Date): Promise<number>;
}

export interface Dependencies {
  sessionGateway: SessionGateway;
  /** Uniform [0, 1) source; defaults to Math.random. Injected for tests. */
  random?: () => number;
  webIdDocumentRepository: WebIdDocumentRepository;
  storageGateway: StorageGateway;
  instanceRepository: InstanceRepository;
  deckRepository: DeckRepository;
  deckLibrary: DeckLibrary;
  preferencesRepository: PreferencesRepository;
  reviewStateRepository: ReviewStateRepository;
}

export function createUseCases({
  sessionGateway,
  random = Math.random,
  webIdDocumentRepository,
  storageGateway,
  instanceRepository,
  deckRepository,
  deckLibrary,
  preferencesRepository,
  reviewStateRepository,
}: Dependencies): UseCases {
  // Concurrent reads of one instance's preferences share a single request
  // (every deck-list row asks at once). Only in-flight reads are shared:
  // nothing is cached once a read settles, so saves are seen immediately.
  const preferenceReads = new Map<string, Promise<StudyPreferences>>();

  function getPreferences(instanceUrl: string): Promise<StudyPreferences> {
    const inFlight = preferenceReads.get(instanceUrl);
    if (inFlight !== undefined) return inFlight;
    const read = preferencesRepository
      .getPreferences(instanceUrl)
      .then((stored) => stored ?? DEFAULT_PREFERENCES)
      .finally(() => preferenceReads.delete(instanceUrl));
    preferenceReads.set(instanceUrl, read);
    return read;
  }

  return {
    restoreSession() {
      return sessionGateway.restore();
    },
    async loginWithWebId(webId) {
      const validation = validateWebId(webId);
      if (!validation.ok) {
        throw new Error(validation.error);
      }
      return sessionGateway.login(validation.webId);
    },
    async loginWithProvider(oidcIssuer) {
      if (!isSecureUrl(oidcIssuer)) {
        throw new Error("An identity provider must be an https:// URL.");
      }
      return sessionGateway.loginWithIssuer(oidcIssuer);
    },
    logout() {
      return sessionGateway.logout();
    },
    onSessionExpired(listener) {
      return sessionGateway.onSessionExpired(listener);
    },
    async discoverAccount(session) {
      const [storages, oidcIssuer] = await Promise.all([
        storageGateway.discoverStorages(session.webId),
        // Informational only: the Pod matters, the issuer is a nicety.
        sessionGateway
          .discoverOidcIssuer(session.webId)
          .catch(() => undefined),
      ]);
      return { webId: session.webId, podUrl: storages[0]?.url, oidcIssuer };
    },
    viewWebIdDocument(session) {
      return webIdDocumentRepository.fetchWebIdDocument(session.webId);
    },
    listStorages(session) {
      return storageGateway.discoverStorages(session.webId);
    },
    addManualStorage(url) {
      return storageGateway.probeStorage(url.trim());
    },
    listInstances(session) {
      return instanceRepository.listInstances(session.webId);
    },
    getRegistrationOptions(session) {
      return instanceRepository.getRegistrationOptions(session.webId);
    },
    createInstance(session, { containerUrl, name, registrationTarget }) {
      return instanceRepository.createInstance({
        webId: session.webId,
        containerUrl: containerUrl.trim(),
        name: name.trim(),
        registrationTarget,
      });
    },
    attachInstanceByUrl(session, instanceUrl, registrationTarget) {
      return instanceRepository.attachInstance({
        webId: session.webId,
        instanceUrl: instanceUrl.trim(),
        registrationTarget,
      });
    },
    deleteInstance(session, instance) {
      return instanceRepository.deleteInstance({
        webId: session.webId,
        instance,
      });
    },
    listDecks(instanceUrl) {
      return deckRepository.listDecks(instanceUrl);
    },
    createDeck(instanceUrl, name) {
      return deckRepository.createDeck(instanceUrl, name.trim());
    },
    renameDeck(deck, name) {
      return deckRepository.renameDeck(deck, name.trim());
    },
    removeDeck(deck) {
      return deckRepository.removeDeck(deck);
    },
    listLibraryDecks() {
      return deckLibrary.listLibraryDecks();
    },
    async importLibraryDeck(instanceUrl, deck) {
      const content = await deckLibrary.fetchLibraryDeck(deck.url);
      return deckRepository.importDeck(instanceUrl, content);
    },
    listCards(deck) {
      return deckRepository.listCards(deck);
    },
    addCard(deck, front, back) {
      return deckRepository.addCard(deck, front.trim(), back.trim());
    },
    updateCard(deck, card, front, back) {
      return deckRepository.updateCard(deck, card, front.trim(), back.trim());
    },
    removeCard(deck, card) {
      return deckRepository.removeCard(deck, card);
    },
    getPreferences,
    savePreferences(instanceUrl, preferences) {
      return preferencesRepository.savePreferences(instanceUrl, preferences);
    },
    async getStudyQueue(instanceUrl, deck, now) {
      const [cards, reviews, prefs] = await Promise.all([
        deckRepository.listCards(deck),
        reviewStateRepository.listReviewStates(deck),
        getPreferences(instanceUrl),
      ]);
      return buildStudyQueue({ cards, reviews, prefs, now, random });
    },
    async recordReview(instanceUrl, deck, card, quality, now) {
      const [prefs, current] = await Promise.all([
        getPreferences(instanceUrl),
        reviewStateRepository.getReviewState(deck, card.id),
      ]);
      const next = applySm2(current ?? INITIAL_SM2_STATE, quality);
      // What a reset of today would restore.
      const previous = snapshotBeforeReview(
        current,
        now,
        prefs.dayBoundaryHour,
      );
      const state: ReviewState = {
        cardId: card.id,
        ...next,
        due: nextDueDate(now, next.intervalDays, prefs.dayBoundaryHour),
        firstReviewedAt: current?.firstReviewedAt ?? now.toISOString(),
        lastReviewedAt: now.toISOString(),
        ...(previous === undefined ? {} : { previous }),
      };
      await reviewStateRepository.saveReviewState(deck, state);
      return state;
    },
    async resetStudyDay(instanceUrl, deck, now) {
      const [prefs, reviews] = await Promise.all([
        getPreferences(instanceUrl),
        reviewStateRepository.listReviewStates(deck),
      ]);
      const reset = resetStudyDay(reviews, now, prefs.dayBoundaryHour);
      const count = reset.restore.length + reset.removeCardIds.length;
      if (count > 0) {
        await reviewStateRepository.applyReviewChanges(deck, {
          save: reset.restore,
          removeCardIds: reset.removeCardIds,
        });
      }
      return count;
    },
  };
}
