import type { SolidAccount } from "../domain/account";
import {
  validateCardContent,
  type Card,
  type CardContent,
  type Deck,
  type DeckDirection,
  type Prompt,
} from "../domain/deck";
import type {
  Instance,
  RegistrationOptions,
  RegistrationTarget,
} from "../domain/instance";
import type { LibraryCard, LibraryDeck } from "../domain/library";
import {
  applyLibraryUpgrade,
  planLibraryUpgrade,
  type LibraryUpgradePlan,
} from "../domain/libraryUpgrade";
import {
  isDeckOutdated,
  isInstanceOutdated,
  isOutdated,
  isPreferencesOutdated,
  isReviewStateOutdated,
  planMigration,
  upgradeCard,
  upgradeDeck,
  upgradeReviewState,
  type MigrationPlan,
  type MigrationResult,
} from "../domain/migration";
import { instanceDocumentUrls } from "../domain/instanceLayout";
import { summarize, type ValidationReport } from "../domain/validation";
import {
  DEFAULT_PREFERENCES,
  type StudyPreferences,
} from "../domain/preferences";
import {
  REVIEW_STATE_FORMAT_VERSION,
  type ReviewQuality,
  type ReviewState,
} from "../domain/review";
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
  ShapeValidator,
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
  /**
   * Developer tool: every document of the instance checked against
   * Solid Memo's shapes (docs/validation.md). Reads only.
   */
  validateInstance(instanceUrl: string): Promise<ValidationReport>;
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
  /**
   * Change how the deck is studied. Review state is kept: a card's
   * front→back state waits, unused, while the deck is studied back→front.
   */
  setDeckDirection(deck: Deck, direction: DeckDirection): Promise<Deck>;
  removeDeck(deck: Deck): Promise<void>;
  /** The ready-made decks the app offers for import. */
  listLibraryDecks(): Promise<LibraryDeck[]>;
  /** Copy a library deck, cards included, into an instance as a new deck. */
  importLibraryDeck(instanceUrl: string, deck: LibraryDeck): Promise<Deck>;
  /** A library deck's cards, to look through before importing it. */
  listLibraryCards(deck: LibraryDeck): Promise<LibraryCard[]>;
  /**
   * Whether the library now publishes an imported deck in a newer format
   * this app can bring the copy up to, and what that would change. Null
   * for a deck not from the library, or when there is nothing (safe) to
   * offer. Reads the library document; writes nothing.
   */
  planLibraryUpgrade(deck: Deck): Promise<LibraryUpgradePlan | null>;
  /** Apply a planned upgrade: one write of the deck's catalog entry. */
  applyLibraryUpgrade(deck: Deck, plan: LibraryUpgradePlan): Promise<Deck>;
  listCards(deck: Deck): Promise<Card[]>;
  /**
   * Rejects, without any pod write, unless each side has text or an
   * http(s) image URL.
   */
  addCard(deck: Deck, content: CardContent): Promise<Card>;
  /** Same validation as addCard. */
  updateCard(deck: Deck, card: Card, content: CardContent): Promise<Card>;
  removeCard(deck: Deck, card: Card): Promise<void>;
  /**
   * What bringing the instance's cards up to this app's format would
   * touch — reads every deck's cards, writes nothing. Empty when there is
   * nothing to migrate.
   */
  planMigration(instanceUrl: string): Promise<MigrationPlan>;
  /**
   * Rewrite every outdated deck entry and card in the instance in the
   * current format, one write per document (cards are re-read first, so
   * an edit made since the plan is never overwritten). Resolves to what
   * was migrated. Only ever run after the user has agreed to the plan.
   */
  migrateInstance(instanceUrl: string): Promise<MigrationResult>;
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
   * Apply one SM-2 review: load the prompt's state (or start fresh),
   * transition it, persist it, and return the new state.
   */
  recordReview(
    instanceUrl: string,
    deck: Deck,
    prompt: Prompt,
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
  shapeValidator: ShapeValidator;
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
  shapeValidator,
}: Dependencies): UseCases {
  /** Normalized card content, or a throw naming what is missing. */
  function validContent(content: CardContent): CardContent {
    const validation = validateCardContent(content);
    if (!validation.ok) {
      throw new Error(validation.error);
    }
    return validation.content;
  }

  const preferenceReads = new Map<string, Promise<StudyPreferences>>();

  function getPreferences(instanceUrl: string): Promise<StudyPreferences> {
    const inFlight = preferenceReads.get(instanceUrl);
    if (inFlight !== undefined) return inFlight;
    const read = preferencesRepository
      .getPreferences(instanceUrl)
      .then((stored) => stored?.preferences ?? DEFAULT_PREFERENCES)
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
        sessionGateway
          .discoverOidcIssuer(session.webId)
          .catch(() => undefined),
      ]);
      return { webId: session.webId, podUrl: storages[0]?.url, oidcIssuer };
    },
    async validateInstance(instanceUrl) {
      const decks = await deckRepository.listDecks(instanceUrl);
      const documents = await Promise.all(
        instanceDocumentUrls(instanceUrl, decks).map((url) =>
          shapeValidator.validateDocument(url),
        ),
      );
      return summarize(instanceUrl, documents);
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
    setDeckDirection(deck, direction) {
      return deckRepository.saveDeck({ ...deck, direction });
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
    async listLibraryCards(deck) {
      return (await deckLibrary.fetchLibraryDeck(deck.url)).cards;
    },
    async planLibraryUpgrade(deck) {
      if (deck.sourceUrl === undefined) return null;
      const source = await deckLibrary.fetchLibraryDeck(deck.sourceUrl);
      return planLibraryUpgrade(deck, source);
    },
    applyLibraryUpgrade(deck, plan) {
      return deckRepository.saveDeck(applyLibraryUpgrade(deck, plan));
    },
    listCards(deck) {
      return deckRepository.listCards(deck);
    },
    async addCard(deck, content) {
      return deckRepository.addCard(deck, validContent(content));
    },
    async updateCard(deck, card, content) {
      return deckRepository.updateCard(deck, card, validContent(content));
    },
    removeCard(deck, card) {
      return deckRepository.removeCard(deck, card);
    },
    async planMigration(instanceUrl) {
      const [instance, preferences, decks] = await Promise.all([
        instanceRepository.readMeta(instanceUrl),
        preferencesRepository.getPreferences(instanceUrl),
        deckRepository.listDecks(instanceUrl),
      ]);
      const entries = await Promise.all(
        decks.map(async (deck) => {
          const [cards, reviews] = await Promise.all([
            deckRepository.listCards(deck),
            reviewStateRepository.listReviewStates(deck),
          ]);
          return { deck, cards, reviews };
        }),
      );
      return planMigration({ instance, preferences, entries });
    },
    async migrateInstance(instanceUrl) {
      const migrated: MigrationResult = {
        deckCount: 0,
        cardCount: 0,
        reviewCount: 0,
        preferencesMigrated: false,
        instanceMigrated: false,
      };
      const meta = await instanceRepository.readMeta(instanceUrl);
      if (meta !== null && isInstanceOutdated(meta)) {
        await instanceRepository.saveMeta(instanceUrl, meta);
        migrated.instanceMigrated = true;
      }
      const stored = await preferencesRepository.getPreferences(instanceUrl);
      if (stored !== null && isPreferencesOutdated(stored)) {
        await preferencesRepository.savePreferences(instanceUrl, stored.preferences);
        migrated.preferencesMigrated = true;
      }
      for (const deck of await deckRepository.listDecks(instanceUrl)) {
        if (isDeckOutdated(deck)) {
          await deckRepository.saveDeck(upgradeDeck(deck));
          migrated.deckCount += 1;
        }
        const cards = (await deckRepository.listCards(deck)).filter(isOutdated);
        if (cards.length > 0) {
          await deckRepository.saveCards(deck, cards.map(upgradeCard));
          migrated.cardCount += cards.length;
        }
        const reviews = (await reviewStateRepository.listReviewStates(deck)).filter(
          isReviewStateOutdated,
        );
        if (reviews.length > 0) {
          await reviewStateRepository.applyReviewChanges(deck, {
            save: reviews.map(upgradeReviewState),
            remove: [],
          });
          migrated.reviewCount += reviews.length;
        }
      }
      return migrated;
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
      return buildStudyQueue({
        cards,
        direction: deck.direction,
        reviews,
        prefs,
        now,
        random,
      });
    },
    async recordReview(instanceUrl, deck, prompt, quality, now) {
      const key = { cardId: prompt.card.id, direction: prompt.direction };
      const [prefs, current] = await Promise.all([
        getPreferences(instanceUrl),
        reviewStateRepository.getReviewState(deck, key),
      ]);
      const next = applySm2(current ?? INITIAL_SM2_STATE, quality);
      const previous = snapshotBeforeReview(
        current,
        now,
        prefs.dayBoundaryHour,
      );
      const state: ReviewState = {
        ...key,
        ...next,
        due: nextDueDate(now, next.intervalDays, prefs.dayBoundaryHour),
        firstReviewedAt: current?.firstReviewedAt ?? now.toISOString(),
        lastReviewedAt: now.toISOString(),
        formatVersion: REVIEW_STATE_FORMAT_VERSION,
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
      const count = reset.restore.length + reset.remove.length;
      if (count > 0) {
        await reviewStateRepository.applyReviewChanges(deck, {
          save: reset.restore,
          remove: reset.remove,
        });
      }
      return count;
    },
  };
}
