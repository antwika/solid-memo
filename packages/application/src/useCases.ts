import { profileNameOf, type SolidAccount } from "@solid-memo/domain/account";
import { defaultCatalogDescription, type Catalog } from "@solid-memo/domain/catalog";
import { withAbout, type DeckAbout } from "@solid-memo/domain/deckAbout";
import { deckPreferences, withPace, type DeckPace } from "@solid-memo/domain/deckPace";
import { isCopyOf } from "@solid-memo/domain/library";
import { planRepair, type Repair, type RepairPlan } from "@solid-memo/domain/repair";
import {
  rebaseIri,
  stagingUrlOf,
  type UpdateOutcome,
  type UpdateProgress,
  type UpdateStep,
} from "@solid-memo/domain/instanceUpdate";
import {
  validateCardContent,
  type Card,
  type CardContent,
  type Deck,
  type DeckDirection,
  type Prompt,
} from "@solid-memo/domain/deck";
import type {
  Instance,
  RegistrationOptions,
  RegistrationTarget,
} from "@solid-memo/domain/instance";
import type { LibraryCard, LibraryDeck } from "@solid-memo/domain/library";
import {
  applyLibraryUpgrade,
  planLibraryUpgrade,
  upgradedCards,
  type LibraryUpgradePlan,
} from "@solid-memo/domain/libraryUpgrade";
import {
  isDeckOutdated,
  isOutdated,
  isPreferencesOutdated,
  isReviewStateOutdated,
  planMigration,
  upgradeCard,
  upgradeDeck,
  upgradeReviewState,
  type MigrationPlan,
} from "@solid-memo/domain/migration";
import { ensureTrailingSlash, instanceDocumentUrls } from "@solid-memo/domain/instanceLayout";
import { summarize, type ValidationReport } from "@solid-memo/domain/validation";
import {
  DEFAULT_PREFERENCES,
  type StudyPreferences,
} from "@solid-memo/domain/preferences";
import {
  REVIEW_STATE_FORMAT_VERSION,
  type ReviewQuality,
  type ReviewState,
} from "@solid-memo/domain/review";
import {
  buildStudyQueue,
  nextDueDate,
  resetStudyDay,
  snapshotBeforeReview,
  type StudyQueue,
} from "@solid-memo/domain/scheduling";
import type { EstablishedSession, Session } from "@solid-memo/domain/session";
import { applySm2, INITIAL_SM2_STATE } from "@solid-memo/domain/sm2";
import type { Storage } from "@solid-memo/domain/storage";
import { isSecureUrl, validateWebId } from "@solid-memo/domain/webId";
import type { WebIdDocument } from "@solid-memo/domain/webIdDocument";
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
  RepairRepository,
  InstanceCopier,
  UpdateJournal,
  WriteFence,
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
   * profile's storage link, its identity provider and its foaf:name.
   */
  discoverAccount(session: Session): Promise<SolidAccount>;
  viewWebIdDocument(session: Session): Promise<WebIdDocument>;
  /**
   * Developer tool: every document of the instance checked against
   * Solid Memo's shapes (docs/validation.md). Reads only.
   */
  validateInstance(instanceUrl: string): Promise<ValidationReport>;
  /** What the app can repair of what a check found, and what it leaves to the user. */
  planRepair(report: ValidationReport): RepairPlan;
  /** Apply repairs (the planned ones, or removals the user chose). */
  applyRepairs(repairs: readonly Repair[]): Promise<void>;
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
  /** Replace what a deck says about itself: its description, topics and keywords. */
  describeDeck(deck: Deck, about: DeckAbout): Promise<Deck>;
  /**
   * Set the deck's own daily limits; a limit left out follows the
   * instance's preferences again.
   */
  setDeckPace(deck: Deck, pace: DeckPace): Promise<Deck>;
  removeDeck(deck: Deck): Promise<void>;
  /** The ready-made decks the app offers for import. */
  listLibraryDecks(): Promise<LibraryDeck[]>;
  /** Copy a library deck, cards included, into an instance as a new deck. */
  importLibraryDeck(instanceUrl: string, deck: LibraryDeck): Promise<Deck>;
  /** A library deck's cards, to look through before importing it. */
  listLibraryCards(deck: LibraryDeck): Promise<LibraryCard[]>;
  /**
   * What upgrading an imported deck to its library deck's current
   * release would do; null for a deck not from the library, or when
   * there is nothing (safe) to offer. Reads the library's index and the
   * two releases, and the copy's cards; writes nothing.
   */
  planLibraryUpgrade(deck: Deck): Promise<LibraryUpgradePlan | null>;
  /**
   * Apply a planned upgrade: one write of the cards, one of the review
   * states of cards it removes, one of the deck's catalog entry.
   */
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
  /**
   * Bring the instance up to this app's formats without writing it
   * (docs/migrations.md): copy it into a new sibling container, update
   * and validate the copy, check the original did not change meanwhile,
   * then switch the type index registrations over. The original stays as
   * the backup; a failure before the switch deletes the copy.
   */
  updateInstance(
    session: Session,
    instance: Instance,
    onProgress?: (progress: UpdateProgress) => void,
  ): Promise<UpdateOutcome>;
  /** The partial copy an update cut off half-way left behind; null when none. */
  findInterruptedUpdate(instance: Instance): Promise<string | null>;
  /** Delete the partial copy an interrupted update left behind. */
  removeInterruptedUpdate(instance: Instance): Promise<void>;
  /** The instance an update replaced, kept as a backup; null when there is none (any more). */
  readBackup(instance: Instance): Promise<{ url: string; replacedAt?: string } | null>;
  /** Switch back to the backup, then delete the updated instance. Returns the backup. */
  restoreBackup(session: Session, instance: Instance): Promise<Instance>;
  /** Delete the backup, and forget it. */
  deleteBackup(instance: Instance): Promise<void>;
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
  repairRepository: RepairRepository;
  instanceCopier: InstanceCopier;
  /** A note of updates in progress; by default none is kept. */
  updateJournal?: UpdateJournal;
  /** The clock; injected for tests. */
  now?: () => Date;
  /** Fresh identifiers (the UUID of an update's copy); injected for tests. */
  newId?: () => string;
  /** Keeps the instance an update copies read-only while it runs. */
  writeFence?: WriteFence;
}

const NO_JOURNAL: UpdateJournal = { begin: () => undefined, end: () => undefined, staging: () => null };
const NO_FENCE: WriteFence = { hold: () => () => undefined };

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
  repairRepository,
  instanceCopier,
  updateJournal = NO_JOURNAL,
  now = () => new Date(),
  newId = () => crypto.randomUUID(),
  writeFence = NO_FENCE,
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


  /**
   * A new catalogue for an instance: published by the session's owner,
   * named as their profile names them (the WebID when it does not say).
   */
  /**
   * Bring an instance's documents up to this app's formats, in place: its
   * meta document (saying what it replaces, for an updated copy), its
   * preferences, every deck's entry, cards and review states, and last
   * its catalogue (written when missing), one write per document. Only ever
   * run on the copy an update makes (see updateInstance).
   */
  async function upgradeInPlace(
    session: Session,
    instanceUrl: string,
    replacing: { replaces: string; replacedAt: string },
  ): Promise<void> {
    const meta = await instanceRepository.readMeta(instanceUrl);
    if (meta !== null) await instanceRepository.saveMeta(instanceUrl, { ...meta, ...replacing });
    const stored = await preferencesRepository.getPreferences(instanceUrl);
    if (stored !== null && isPreferencesOutdated(stored)) {
      await preferencesRepository.savePreferences(instanceUrl, stored.preferences);
    }
    for (const deck of await deckRepository.listDecks(instanceUrl)) {
      if (isDeckOutdated(deck)) await deckRepository.saveDeck(upgradeDeck(deck));
      const cards = (await deckRepository.listCards(deck)).filter(isOutdated);
      if (cards.length > 0) await deckRepository.saveCards(deck, cards.map(upgradeCard));
      const reviews = (await reviewStateRepository.listReviewStates(deck)).filter(isReviewStateOutdated);
      if (reviews.length > 0) {
        await reviewStateRepository.applyReviewChanges(deck, {
          save: reviews.map(upgradeReviewState),
          remove: [],
        });
      }
    }
    // Last: the catalogue lists the decks as DCAT datasets, which they are only once updated.
    if ((await deckRepository.readCatalog(instanceUrl)) === null) {
      await deckRepository.saveCatalog(instanceUrl, await catalogOf(session, meta?.name ?? instanceUrl));
    }
  }

  async function validateInstance(instanceUrl: string): Promise<ValidationReport> {
    const decks = await deckRepository.listDecks(instanceUrl);
    const documents = await Promise.all(
      instanceDocumentUrls(instanceUrl, decks).map((url) => shapeValidator.validateDocument(url)),
    );
    return summarize(instanceUrl, documents);
  }

  async function catalogOf(session: Session, title: string): Promise<Catalog> {
    const name = await webIdDocumentRepository
      .fetchWebIdDocument(session.webId)
      .then((document) => profileNameOf(document, session.webId))
      .catch(() => undefined);
    return {
      title,
      description: defaultCatalogDescription(title),
      publisher: { webId: session.webId, name: name ?? session.webId },
    };
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
      const [storages, oidcIssuer, name] = await Promise.all([
        storageGateway.discoverStorages(session.webId),
        sessionGateway
          .discoverOidcIssuer(session.webId)
          .catch(() => undefined),
        webIdDocumentRepository
          .fetchWebIdDocument(session.webId)
          .then((document) => profileNameOf(document, session.webId))
          .catch(() => undefined),
      ]);
      return { webId: session.webId, name, podUrl: storages[0]?.url, oidcIssuer };
    },
    planRepair(report) {
      return planRepair(report);
    },
    applyRepairs(repairs) {
      return repairRepository.applyRepairs(repairs);
    },
    validateInstance,
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
    async createInstance(session, { containerUrl, name, registrationTarget }) {
      const instance = await instanceRepository.createInstance({
        webId: session.webId,
        containerUrl: containerUrl.trim(),
        name: name.trim(),
        registrationTarget,
      });
      await deckRepository.saveCatalog(instance.url, await catalogOf(session, instance.name));
      return instance;
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
    async describeDeck(deck, about) {
      return deckRepository.saveDeck(withAbout(deck, about));
    },
    async setDeckPace(deck, pace) {
      return deckRepository.saveDeck(withPace(deck, pace));
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
      const series = (await deckLibrary.listLibraryDecks()).find((libraryDeck) =>
        isCopyOf(deck, libraryDeck),
      );
      if (series === undefined) return null;
      const [from, to, cards] = await Promise.all([
        deckLibrary.fetchLibraryDeck(deck.sourceUrl),
        deckLibrary.fetchLibraryDeck(series.url),
        deckRepository.listCards(deck),
      ]);
      return planLibraryUpgrade({ deck, cards, from, to, releases: series.releases });
    },
    async applyLibraryUpgrade(deck, plan) {
      await deckRepository.applyCardChanges(deck, {
        save: upgradedCards(plan),
        remove: plan.remove.map((card) => card.id),
      });
      if (plan.remove.length > 0) {
        await reviewStateRepository.applyReviewChanges(deck, {
          save: [],
          remove: plan.remove.flatMap((card) =>
            (["front-to-back", "back-to-front"] as const).map((direction) => ({
              cardId: card.id,
              direction,
            })),
          ),
        });
      }
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
      const [instance, preferences, catalog, decks] = await Promise.all([
        instanceRepository.readMeta(instanceUrl),
        preferencesRepository.getPreferences(instanceUrl),
        deckRepository.readCatalog(instanceUrl),
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
      return planMigration({ instance, preferences, catalog, entries });
    },
    async updateInstance(session, instance, onProgress = () => undefined) {
      const source = ensureTrailingSlash(instance.url);
      const target = stagingUrlOf(source, newId());
      const move = { from: source, to: target };
      let step: UpdateStep = "stage";
      let done = 0;
      let total = 0;
      let created = false;
      // The original is read-only from here until the update is over: a
      // write aimed at it by mistake fails instead of changing it.
      const release = writeFence.hold(source);
      const finished = (next?: UpdateStep) => {
        done += 1;
        if (next !== undefined) step = next;
        onProgress({ step, done, total });
      };
      try {
        onProgress({ step, done, total });
        const resources = await instanceCopier.listResources(source);
        total = resources.length + 6;
        await instanceCopier.ensureAbsent(target);
        updateJournal.begin(source, target);
        await instanceCopier.createContainer(target);
        created = true;
        finished("access");
        await instanceCopier.copyAccessControl(source, target, move);
        finished("copy");
        const versions = new Map<string, string>();
        for (const resource of resources) {
          const copy = rebaseIri(resource, source, target);
          versions.set(resource, await instanceCopier.copyResource(resource, copy, move));
          await instanceCopier.copyAccessControl(resource, copy, move);
          finished();
        }
        step = "upgrade";
        onProgress({ step, done, total });
        await upgradeInPlace(session, target, { replaces: source, replacedAt: now().toISOString() });
        finished("validate");
        const report = await validateInstance(target);
        if (!report.conforms) {
          throw new Error(
            `The updated copy does not conform to Solid Memo's shapes (${report.violationCount} ${
              report.violationCount === 1 ? "violation" : "violations"
            }); your data is left as it was.`,
          );
        }
        finished("verify");
        const listedAgain = await instanceCopier.listResources(source);
        if (listedAgain.join("\n") !== resources.join("\n")) {
          throw new Error("The instance changed while it was being copied (in another tab or app?); try again.");
        }
        for (const resource of resources) {
          if (!(await instanceCopier.isUnchanged(resource, versions.get(resource)!))) {
            throw new Error(`<${resource}> changed while it was being copied (in another tab or app?); try again.`);
          }
        }
        finished("switch");
        await instanceRepository.switchInstance({ webId: session.webId, from: source, to: target, title: instance.name });
        finished();
        updateJournal.end(source);
        return { ok: true, instanceUrl: target, backupUrl: source };
      } catch (error) {
        let cleanedUp = !created;
        if (created) {
          cleanedUp = await instanceCopier.deleteRecursively(target).then(
            () => true,
            () => false,
          );
        }
        if (cleanedUp) updateJournal.end(source);
        return {
          ok: false,
          step,
          error: error instanceof Error ? error.message : String(error),
          cleanedUp,
          ...(cleanedUp ? {} : { leftoverUrl: target }),
        };
      } finally {
        release();
      }
    },
    async findInterruptedUpdate(instance) {
      const staging = updateJournal.staging(ensureTrailingSlash(instance.url));
      if (staging === null) return null;
      const gone = await instanceCopier.ensureAbsent(staging).then(
        () => true,
        () => false,
      );
      if (gone) updateJournal.end(ensureTrailingSlash(instance.url));
      return gone ? null : staging;
    },
    async removeInterruptedUpdate(instance) {
      const source = ensureTrailingSlash(instance.url);
      const staging = updateJournal.staging(source);
      if (staging !== null) await instanceCopier.deleteRecursively(staging);
      updateJournal.end(source);
    },
    async readBackup(instance) {
      const meta = await instanceRepository.readMeta(instance.url);
      if (meta?.replaces === undefined) return null;
      const gone = await instanceCopier.ensureAbsent(meta.replaces).then(
        () => true,
        () => false,
      );
      if (gone) {
        const { replaces: _replaces, replacedAt: _replacedAt, ...rest } = meta;
        await instanceRepository.saveMeta(instance.url, rest);
        return null;
      }
      return { url: meta.replaces, ...(meta.replacedAt === undefined ? {} : { replacedAt: meta.replacedAt }) };
    },
    async restoreBackup(session, instance) {
      const meta = await instanceRepository.readMeta(instance.url);
      if (meta?.replaces === undefined) throw new Error(`${instance.name} has no backup to restore.`);
      await instanceRepository.switchInstance({
        webId: session.webId,
        from: instance.url,
        to: meta.replaces,
        title: instance.name,
      });
      await instanceCopier.deleteRecursively(instance.url);
      return { url: meta.replaces, name: instance.name };
    },
    async deleteBackup(instance) {
      const meta = await instanceRepository.readMeta(instance.url);
      if (meta?.replaces === undefined) return;
      await instanceCopier.deleteRecursively(meta.replaces);
      const { replaces: _replaces, replacedAt: _replacedAt, ...rest } = meta;
      await instanceRepository.saveMeta(instance.url, rest);
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
        prefs: deckPreferences(prefs, deck),
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
