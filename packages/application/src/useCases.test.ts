import { AppError } from "@solid-memo/domain/appError";
import { describe, expect, it, vi } from "vitest";
import type {
  AnswerLog,
  DigestRepository,
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
} from "./ports";
import { createUseCases } from "./useCases";
import type { InstanceDigest } from "@solid-memo/domain/studyDigest";
import { CARD_FORMAT_VERSION, DECK_FORMAT_VERSION, type Card, type Deck } from "@solid-memo/domain/deck";
import type { Instance } from "@solid-memo/domain/instance";
import type { LibraryDeck, LibraryDeckContent } from "@solid-memo/domain/library";
import { DEFAULT_PREFERENCES } from "@solid-memo/domain/preferences";
import type { ReviewState } from "@solid-memo/domain/review";
import type { Answer } from "@solid-memo/domain/answer";
import type { Catalog } from "@solid-memo/domain/catalog";
import type { Session } from "@solid-memo/domain/session";
import type { Storage } from "@solid-memo/domain/storage";
import type { WebIdDocument } from "@solid-memo/domain/webIdDocument";
import { firstRelease } from "@solid-memo/domain/testing/libraryDeck";

const session: Session = { webId: "https://alice.example/profile/card#me" };
const document: WebIdDocument = {
  url: "https://alice.example/profile/card",
  subjects: [],
};
const storage: Storage = { url: "https://alice.example/", source: "profile" };
const catalog: Catalog = {
  title: "Main",
  description: "My decks.",
  publisher: { webId: session.webId, name: "Alice" },
};
const instance: Instance = {
  url: "https://alice.example/solid-memo/main/",
  name: "Main",
};
const deck: Deck = {
  id: "deck-1",
  url: `${instance.url}catalog.ttl#deck-1`,
  title: { en: "Kanji N5" },
  cardsDocumentUrl: `${instance.url}decks/deck-1.ttl`,
  reviewsDocumentUrl: `${instance.url}reviews/deck-1.ttl`,
  direction: "front-to-back",
  createdAt: "2026-09-21T10:00:00.000Z",
  formatVersion: DECK_FORMAT_VERSION,
  authors: [],
};
const card: Card = {
  id: "card-1",
  url: `${deck.cardsDocumentUrl}#card-1`,
  front: { "": "水" },
  back: { "": "water" },
  createdAt: "2026-09-21T10:00:00.000Z",
  formatVersion: 1,
};
const libraryDeck: LibraryDeck = {
  url: "https://solid-memo.com/decks/capitals.ttl",
  ...firstRelease("https://solid-memo.com/decks/capitals.ttl"),
  title: { en: "Capitals" },
  cardCount: 1,
  authors: ["Anton Wiklund"],
  license: "https://creativecommons.org/publicdomain/zero/1.0/",
  direction: "front-to-back",
  sources: [],
};
const libraryContent: LibraryDeckContent = {
  url: libraryDeck.url,
  title: { en: "Capitals" },
  formatVersion: 1,
  authors: ["Anton Wiklund"],
  license: "https://creativecommons.org/publicdomain/zero/1.0/",
  direction: "front-to-back",
  version: "1",
  seriesUrl: "https://solid-memo.com/decks/index.ttl#capitals",
  themes: [],
  keywords: [],
  cards: [{ id: "sweden", front: { "": "Sweden" }, back: { "": "Stockholm" }, formatVersion: 1 }],
};

function makeDeps() {
  const sessionGateway: SessionGateway = {
    restore: vi.fn(async () => ({ session, origin: "login" as const })),
    discoverOidcIssuer: vi.fn(async () => "https://issuer.example"),
    login: vi.fn(async () => undefined),
    loginWithIssuer: vi.fn(async () => undefined),
    logout: vi.fn(async () => undefined),
    onSessionExpired: vi.fn(() => () => undefined),
  };
  const webIdDocumentRepository: WebIdDocumentRepository = {
    fetchWebIdDocument: vi.fn(async () => document),
  };
  const storageGateway: StorageGateway = {
    discoverStorages: vi.fn(async () => [storage]),
    probeStorage: vi.fn(async () => storage),
  };
  const instanceRepository: InstanceRepository = {
    listInstances: vi.fn(async () => [instance]),
    getRegistrationOptions: vi.fn(async () => ({
      privateIndexExists: true,
      publicIndexExists: false,
    })),
    createInstance: vi.fn(async () => instance),
    attachInstance: vi.fn(async () => instance),
    deleteInstance: vi.fn(async () => undefined),
    readMeta: vi.fn(async () => null),
    saveMeta: vi.fn(async () => undefined),
    registerCatalog: vi.fn(async () => undefined),
    switchInstance: vi.fn(async () => undefined),
  };
  const deckRepository: DeckRepository = {
    listDecks: vi.fn(async () => [deck]),
    readCatalog: vi.fn(async () => catalog),
    saveCatalog: vi.fn(async () => undefined),
    createDeck: vi.fn(async () => deck),
    renameDeck: vi.fn(async () => deck),
    saveDeck: vi.fn(async (saved) => saved),
    removeDeck: vi.fn(async () => undefined),
    listCards: vi.fn(async () => [card]),
    addCard: vi.fn(async () => card),
    updateCard: vi.fn(async () => card),
    removeCard: vi.fn(async () => undefined),
    saveCards: vi.fn(async () => undefined),
    applyCardChanges: vi.fn(async () => undefined),
    importDeck: vi.fn(async () => deck),
    readCardsSince: vi.fn(async (d) => ({ unchanged: false as const, value: await deckRepository.listCards(d), version: null })),
  };
  const deckLibrary: DeckLibrary = {
    listLibraryDecks: vi.fn(async () => [libraryDeck]),
    fetchLibraryDeck: vi.fn(async () => libraryContent),
  };
  const preferencesRepository: PreferencesRepository = {
    getPreferences: vi.fn(async () => null),
    savePreferences: vi.fn(async () => undefined),
  };
  const reviewStateRepository: ReviewStateRepository = {
    listReviewStates: vi.fn(async () => []),
    getReviewState: vi.fn(async () => null),
    saveReviewState: vi.fn(async () => undefined),
    applyReviewChanges: vi.fn(async () => undefined),
    readReviewStatesSince: vi.fn(async (d) => ({
      unchanged: false as const,
      value: await reviewStateRepository.listReviewStates(d),
      version: null,
    })),
  };
  const shapeValidator: ShapeValidator = {
    validateDocument: vi.fn(async (url) => ({
      url,
      status: "checked" as const,
      subjects: [],
    })),
    validateDocumentSince: vi.fn(async (url) => ({
      unchanged: false as const,
      value: await shapeValidator.validateDocument(url),
      version: null,
    })),
  };
  const repairRepository: RepairRepository = {
    applyRepairs: vi.fn(async () => undefined),
  };
  const instanceCopier: InstanceCopier = {
    listResources: vi.fn(async () => [`${instance.url}decks/`, `${instance.url}meta.ttl`]),
    ensureAbsent: vi.fn(async () => undefined),
    createContainer: vi.fn(async () => undefined),
    copyAccessControl: vi.fn(async () => false),
    copyResource: vi.fn(async (from: string) => `version of ${from}`),
    isUnchanged: vi.fn(async () => true),
    deleteRecursively: vi.fn(async () => undefined),
  };
  const updateJournal = { begin: vi.fn(), end: vi.fn(), staging: vi.fn((): string | null => null) };
  return {
    sessionGateway,
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
    updateJournal,
    now: () => new Date("2026-09-28T10:00:00.000Z"),
    newId: () => "0f3a",
  };
}

describe("createUseCases", () => {
  describe("language", () => {
    it("speaks the chosen language, and keeps a new choice", () => {
      let chosen: "en" | "sv" | null = "sv";
      const languagePreference = {
        chosen: () => chosen,
        choose: vi.fn((locale: "en" | "sv") => {
          chosen = locale;
        }),
      };
      const useCases = createUseCases({ ...makeDeps(), languagePreference });
      expect(useCases.language(["en-US"])).toBe("sv");
      useCases.chooseLanguage("en");
      expect(languagePreference.choose).toHaveBeenCalledWith("en");
      expect(useCases.language(["sv-SE"])).toBe("en");
    });

    it("speaks the browser's language when none is kept", () => {
      const useCases = createUseCases(makeDeps());
      useCases.chooseLanguage("en");
      expect(useCases.language(["sv-SE"])).toBe("sv");
    });
  });

  it("restoreSession delegates to the session gateway", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    await expect(useCases.restoreSession()).resolves.toEqual({
      session,
      origin: "login",
    });
    expect(deps.sessionGateway.restore).toHaveBeenCalledOnce();
  });

  it("loginWithWebId trims the WebID before delegating", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    await useCases.loginWithWebId("  https://alice.example/profile/card#me ");
    expect(deps.sessionGateway.login).toHaveBeenCalledWith(
      "https://alice.example/profile/card#me",
    );
  });

  it("loginWithWebId rejects an invalid WebID without contacting the gateway", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    await expect(
      useCases.loginWithWebId("http://alice.example/profile/card#me"),
    ).rejects.toThrow("A WebID must start with https://.");
    expect(deps.sessionGateway.login).not.toHaveBeenCalled();
  });

  it("loginWithProvider starts login at the chosen issuer", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    await useCases.loginWithProvider("https://login.inrupt.com");
    expect(deps.sessionGateway.loginWithIssuer).toHaveBeenCalledWith(
      "https://login.inrupt.com",
    );
    expect(deps.sessionGateway.login).not.toHaveBeenCalled();
  });

  it("loginWithProvider rejects an issuer that is not an https URL", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    await expect(
      useCases.loginWithProvider("http://idp.example"),
    ).rejects.toThrow("An identity provider must be an https:// URL.");
    expect(deps.sessionGateway.loginWithIssuer).not.toHaveBeenCalled();
  });

  it("discoverAccount combines the first storage with the profile's issuer", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    await expect(useCases.discoverAccount(session)).resolves.toEqual({
      webId: session.webId,
      name: undefined,
      podUrl: storage.url,
      oidcIssuer: "https://issuer.example",
    });
    expect(deps.storageGateway.discoverStorages).toHaveBeenCalledWith(
      session.webId,
    );
    expect(deps.sessionGateway.discoverOidcIssuer).toHaveBeenCalledWith(
      session.webId,
    );
  });

  it("discoverAccount takes the name from the profile's foaf:name", async () => {
    const deps = makeDeps();
    vi.mocked(deps.webIdDocumentRepository.fetchWebIdDocument).mockResolvedValue({
      url: document.url,
      subjects: [
        {
          url: session.webId,
          properties: [
            {
              predicate: "http://xmlns.com/foaf/0.1/name",
              values: [{ type: "langString", value: "Alice", language: "en" }],
            },
          ],
        },
      ],
    });
    const useCases = createUseCases(deps);
    const account = await useCases.discoverAccount(session);
    expect(account.name).toBe("Alice");
    expect(
      deps.webIdDocumentRepository.fetchWebIdDocument,
    ).toHaveBeenCalledWith(session.webId);
  });

  it("discoverAccount tolerates an unreadable profile document", async () => {
    const deps = makeDeps();
    vi.mocked(deps.webIdDocumentRepository.fetchWebIdDocument).mockRejectedValue(
      new Error("profile unreachable"),
    );
    const useCases = createUseCases(deps);
    const account = await useCases.discoverAccount(session);
    expect(account.name).toBeUndefined();
    expect(account.podUrl).toBe(storage.url);
  });

  it("discoverAccount leaves the Pod out when no storage is advertised", async () => {
    const deps = makeDeps();
    vi.mocked(deps.storageGateway.discoverStorages).mockResolvedValue([]);
    const useCases = createUseCases(deps);
    const account = await useCases.discoverAccount(session);
    expect(account.podUrl).toBeUndefined();
  });

  it("discoverAccount tolerates a failed issuer lookup", async () => {
    const deps = makeDeps();
    vi.mocked(deps.sessionGateway.discoverOidcIssuer).mockRejectedValue(
      new Error("no issuer"),
    );
    const useCases = createUseCases(deps);
    await expect(useCases.discoverAccount(session)).resolves.toEqual({
      webId: session.webId,
      name: undefined,
      podUrl: storage.url,
      oidcIssuer: undefined,
    });
  });

  it("discoverAccount fails when storage discovery fails", async () => {
    const deps = makeDeps();
    vi.mocked(deps.storageGateway.discoverStorages).mockRejectedValue(
      new Error("profile unreachable"),
    );
    const useCases = createUseCases(deps);
    await expect(useCases.discoverAccount(session)).rejects.toThrow(
      "profile unreachable",
    );
  });

  it("logout delegates to the session gateway", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    await useCases.logout();
    expect(deps.sessionGateway.logout).toHaveBeenCalledOnce();
  });

  it("onSessionExpired delegates to the session gateway", () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    const listener = () => undefined;
    const unsubscribe = useCases.onSessionExpired(listener);
    expect(deps.sessionGateway.onSessionExpired).toHaveBeenCalledWith(
      listener,
    );
    expect(typeof unsubscribe).toBe("function");
  });

  it("viewWebIdDocument fetches the document for the session's WebID", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    await expect(useCases.viewWebIdDocument(session)).resolves.toEqual(
      document,
    );
    expect(
      deps.webIdDocumentRepository.fetchWebIdDocument,
    ).toHaveBeenCalledWith(session.webId);
  });

  it("listStorages discovers storages for the session's WebID", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    await expect(useCases.listStorages(session)).resolves.toEqual([storage]);
    expect(deps.storageGateway.discoverStorages).toHaveBeenCalledWith(
      session.webId,
    );
  });

  it("addManualStorage trims the URL before probing", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    await expect(
      useCases.addManualStorage("  https://alice.example/ "),
    ).resolves.toEqual(storage);
    expect(deps.storageGateway.probeStorage).toHaveBeenCalledWith(
      "https://alice.example/",
    );
  });

  it("listInstances delegates with the session's WebID", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    await expect(useCases.listInstances(session)).resolves.toEqual([instance]);
    expect(deps.instanceRepository.listInstances).toHaveBeenCalledWith(
      session.webId,
    );
  });

  it("getRegistrationOptions delegates with the session's WebID", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    await expect(useCases.getRegistrationOptions(session)).resolves.toEqual({
      privateIndexExists: true,
      publicIndexExists: false,
    });
    expect(
      deps.instanceRepository.getRegistrationOptions,
    ).toHaveBeenCalledWith(session.webId);
  });

  it("describeDeck saves the deck's description, topics and keywords, refusing an empty description", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    await useCases.describeDeck(deck, { description: " Kanji. ", topics: [], keywords: ["kanji"] });
    expect(deps.deckRepository.saveDeck).toHaveBeenCalledWith({ ...deck, description: { en: "Kanji." }, keywords: ["kanji"] });
    await expect(useCases.describeDeck(deck, { description: "", topics: [], keywords: [] })).rejects.toThrow(
      "A deck needs a description.",
    );
  });

  it("setDeckPace saves the deck's own daily limits, refusing one that is not a whole number", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    await useCases.setDeckPace({ ...deck, maxReviewsPerDay: 50 }, { newCardsPerDay: 5 });
    expect(deps.deckRepository.saveDeck).toHaveBeenCalledWith({ ...deck, newCardsPerDay: 5 });
    await expect(useCases.setDeckPace(deck, { newCardsPerDay: 1.5 })).rejects.toThrow(
      "A daily limit is a whole number, 0 or more.",
    );
  });

  it("createInstance trims inputs and passes the WebID", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    await useCases.createInstance(session, {
      containerUrl: " https://alice.example/solid-memo/main/ ",
      name: " Main ",
      registrationTarget: "private",
    });
    expect(deps.instanceRepository.createInstance).toHaveBeenCalledWith({
      webId: session.webId,
      containerUrl: "https://alice.example/solid-memo/main/",
      name: "Main",
      registrationTarget: "private",
    });
    expect(deps.deckRepository.saveCatalog).toHaveBeenCalledWith(instance.url, {
      title: instance.name,
      description: `Flashcard decks of the Solid Memo instance ${instance.name}.`,
      publisher: { webId: session.webId, name: session.webId },
    });
  });

  it("attachInstanceByUrl trims the URL and passes the WebID", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    await useCases.attachInstanceByUrl(
      session,
      " https://alice.example/solid-memo/main/ ",
      "public",
    );
    expect(deps.instanceRepository.attachInstance).toHaveBeenCalledWith({
      webId: session.webId,
      instanceUrl: "https://alice.example/solid-memo/main/",
      registrationTarget: "public",
    });
  });

  it("deleteInstance passes the WebID and the instance", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    await useCases.deleteInstance(session, instance);
    expect(deps.instanceRepository.deleteInstance).toHaveBeenCalledWith({
      webId: session.webId,
      instance,
    });
  });

  it("deck use cases delegate to the deck repository", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);

    await expect(useCases.listDecks(instance.url)).resolves.toEqual([deck]);
    expect(deps.deckRepository.listDecks).toHaveBeenCalledWith(instance.url);

    await useCases.createDeck(instance.url, " Kanji N5 ");
    expect(deps.deckRepository.createDeck).toHaveBeenCalledWith(
      instance.url,
      "Kanji N5",
    );

    await useCases.renameDeck(deck, " Kanji N4 ");
    expect(deps.deckRepository.renameDeck).toHaveBeenCalledWith(
      deck,
      "Kanji N4",
    );

    await expect(
      useCases.setDeckDirection(deck, "bidirectional"),
    ).resolves.toEqual({ ...deck, direction: "bidirectional" });
    expect(deps.deckRepository.saveDeck).toHaveBeenCalledWith({
      ...deck,
      direction: "bidirectional",
    });

    await useCases.removeDeck(deck);
    expect(deps.deckRepository.removeDeck).toHaveBeenCalledWith(deck);

    await expect(useCases.listCards(deck)).resolves.toEqual([card]);
    expect(deps.deckRepository.listCards).toHaveBeenCalledWith(deck);

    await useCases.addCard(deck, { front: { "": " 火 " }, back: { "": " fire " } });
    expect(deps.deckRepository.addCard).toHaveBeenCalledWith(deck, {
      front: { "": "火" },
      back: { "": "fire" },
    });

    await useCases.updateCard(deck, card, {
      front: { "": " 水 " },
      back: { "": " water (mizu) " },
      frontImageUrl: " https://img.example/water.png ",
      backImageUrl: "",
    });
    expect(deps.deckRepository.updateCard).toHaveBeenCalledWith(deck, card, {
      front: { "": "水" },
      back: { "": "water (mizu)" },
      frontImageUrl: "https://img.example/water.png",
    });

    await useCases.removeCard(deck, card);
    expect(deps.deckRepository.removeCard).toHaveBeenCalledWith(deck, card);
  });

  it("addCard and updateCard reject incomplete content without writing", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    await expect(
      useCases.addCard(deck, { front: {}, back: { "": "fire" } }),
    ).rejects.toThrow("The front needs text or an image.");
    await expect(
      useCases.updateCard(deck, card, {
        front: { "": "f" },
        back: { "": "b" },
        backImageUrl: "javascript:alert(1)",
      }),
    ).rejects.toThrow("The back image must be an http(s) URL.");
    expect(deps.deckRepository.addCard).not.toHaveBeenCalled();
    expect(deps.deckRepository.updateCard).not.toHaveBeenCalled();
  });

  describe("format migration", () => {
    const other: Deck = {
      ...deck,
      id: "deck-2",
      url: `${instance.url}catalog.ttl#deck-2`,
      cardsDocumentUrl: `${instance.url}decks/deck-2.ttl`,
    };
    const old = (id: string): Card => ({
      ...card,
      id,
      url: `${deck.cardsDocumentUrl}#${id}`,
      formatVersion: 1,
    });
    const current = (id: string): Card => ({ ...old(id), formatVersion: CARD_FORMAT_VERSION });

    const oldReview = (cardId: string): ReviewState => ({
      cardId,
      direction: "front-to-back",
      easeFactor: 2.5,
      intervalDays: 1,
      repetitions: 1,
      due: "2026-09-22",
      firstReviewedAt: "2026-09-21T10:00:00.000Z",
      lastReviewedAt: "2026-09-21T10:00:00.000Z",
      formatVersion: 1,
    });

    it("planMigration reads every document and writes nothing", async () => {
      const deps = makeDeps();
      vi.mocked(deps.instanceRepository.readMeta).mockResolvedValue({
        name: "Main",
        createdAt: "2026-09-21T10:00:00.000Z",
        formatVersion: 2,
      });
      vi.mocked(deps.preferencesRepository.getPreferences).mockResolvedValue({
        preferences: DEFAULT_PREFERENCES,
        formatVersion: 1,
      });
      vi.mocked(deps.deckRepository.listDecks).mockResolvedValue([deck, other]);
      vi.mocked(deps.deckRepository.readCatalog).mockResolvedValue(null);
      vi.mocked(deps.deckRepository.listCards).mockImplementation(async (d) =>
        d === deck ? [old("a"), current("b"), old("c")] : [current("d")],
      );
      vi.mocked(deps.reviewStateRepository.listReviewStates).mockImplementation(
        async (d) => (d === other ? [oldReview("d")] : []),
      );
      const useCases = createUseCases(deps);

      await expect(useCases.planMigration(instance.url)).resolves.toEqual({
        catalogMissing: true,
        decks: [
          { deck, deckOutdated: false, cardCount: 2, reviewCount: 0 },
          { deck: other, deckOutdated: false, cardCount: 0, reviewCount: 1 },
        ],
        deckCount: 0,
        cardCount: 2,
        reviewCount: 1,
        preferencesOutdated: true,
        instanceOutdated: false,
      });
      expect(deps.deckRepository.listDecks).toHaveBeenCalledWith(instance.url);
      expect(deps.deckRepository.listCards).toHaveBeenCalledTimes(2);
      expect(deps.reviewStateRepository.listReviewStates).toHaveBeenCalledTimes(2);
      expect(deps.deckRepository.saveCards).not.toHaveBeenCalled();
      expect(deps.deckRepository.saveDeck).not.toHaveBeenCalled();
      expect(deps.reviewStateRepository.applyReviewChanges).not.toHaveBeenCalled();
      expect(deps.preferencesRepository.savePreferences).not.toHaveBeenCalled();
      expect(deps.instanceRepository.saveMeta).not.toHaveBeenCalled();
    });

    const COPY = "https://alice.example/solid-memo/main-0f3a/";

    it("updateInstance copies the instance, updates and checks the copy, then switches over, reporting its progress", async () => {
      const deps = makeDeps();
      vi.mocked(deps.deckRepository.listCards).mockResolvedValue([current("b")]);
      const progress: string[] = [];
      const outcome = await createUseCases(deps).updateInstance(session, instance, (p) =>
        progress.push(`${p.step} ${p.done}/${p.total}`),
      );
      expect(outcome).toEqual({ ok: true, instanceUrl: COPY, backupUrl: instance.url });
      const move = { from: instance.url, to: COPY };
      expect(deps.instanceCopier.ensureAbsent).toHaveBeenCalledWith(COPY);
      expect(deps.instanceCopier.createContainer).toHaveBeenCalledWith(COPY);
      expect(vi.mocked(deps.instanceCopier.copyResource).mock.calls).toEqual([
        [`${instance.url}decks/`, `${COPY}decks/`, move],
        [`${instance.url}meta.ttl`, `${COPY}meta.ttl`, move],
      ]);
      expect(vi.mocked(deps.instanceCopier.copyAccessControl).mock.calls.map((c) => c.slice(0, 2))).toEqual([
        [instance.url, COPY],
        [`${instance.url}decks/`, `${COPY}decks/`],
        [`${instance.url}meta.ttl`, `${COPY}meta.ttl`],
      ]);
      expect(deps.shapeValidator.validateDocument).toHaveBeenCalledWith(`${COPY}meta.ttl`);
      expect(deps.instanceRepository.switchInstance).toHaveBeenCalledWith({
        webId: session.webId,
        from: instance.url,
        to: COPY,
        title: instance.name,
      });
      expect(deps.updateJournal.begin).toHaveBeenCalledWith(instance.url, COPY);
      expect(deps.updateJournal.end).toHaveBeenCalledWith(instance.url);
      expect(deps.instanceCopier.deleteRecursively).not.toHaveBeenCalled();
      expect(progress).toEqual([
        "stage 0/0",
        "access 1/8",
        "copy 2/8",
        "copy 3/8",
        "copy 4/8",
        "upgrade 4/8",
        "validate 5/8",
        "verify 6/8",
        "switch 7/8",
        "switch 8/8",
      ]);
    });

    it("updateInstance writes only to the copy: its record says what it replaces, its preferences and decks are updated", async () => {
      const deps = makeDeps();
      const meta = { name: "Main", createdAt: "2026-09-21T10:00:00.000Z", formatVersion: 1 };
      vi.mocked(deps.instanceRepository.readMeta).mockResolvedValue(meta);
      vi.mocked(deps.preferencesRepository.getPreferences).mockResolvedValue({
        preferences: { ...DEFAULT_PREFERENCES, newCardsPerDay: 7 },
        formatVersion: 1,
      });
      const oldEntry: Deck = { ...other, formatVersion: 1 };
      vi.mocked(deps.deckRepository.listDecks).mockResolvedValue([deck, oldEntry]);
      vi.mocked(deps.deckRepository.listCards).mockImplementation(async (d) =>
        d === oldEntry ? [old("d")] : [old("a"), current("b")],
      );
      vi.mocked(deps.reviewStateRepository.listReviewStates).mockResolvedValue([
        oldReview("a"),
        { ...oldReview("b"), formatVersion: 2 },
      ]);
      await createUseCases(deps).updateInstance(session, instance);
      expect(deps.instanceRepository.readMeta).toHaveBeenCalledWith(COPY);
      expect(deps.instanceRepository.saveMeta).toHaveBeenCalledExactlyOnceWith(COPY, {
        ...meta,
        replaces: instance.url,
        replacedAt: "2026-09-28T10:00:00.000Z",
      });
      expect(deps.preferencesRepository.savePreferences).toHaveBeenCalledExactlyOnceWith(COPY, {
        ...DEFAULT_PREFERENCES,
        newCardsPerDay: 7,
      });
      expect(deps.deckRepository.saveDeck).toHaveBeenCalledExactlyOnceWith({ ...oldEntry, formatVersion: DECK_FORMAT_VERSION });
      expect(deps.deckRepository.saveCards).toHaveBeenNthCalledWith(1, deck, [current("a")]);
      expect(deps.deckRepository.saveCards).toHaveBeenNthCalledWith(2, oldEntry, [current("d")]);
      expect(deps.reviewStateRepository.applyReviewChanges).toHaveBeenCalledWith(deck, {
        save: [{ ...oldReview("a"), formatVersion: 2 }],
        remove: [],
      });
      expect(deps.deckRepository.saveCatalog).not.toHaveBeenCalled();
    });

    it("updateInstance gives a copy without a catalogue one, published by the owner, leaving its registration to the switch", async () => {
      const deps = makeDeps();
      vi.mocked(deps.deckRepository.readCatalog).mockResolvedValue(null);
      vi.mocked(deps.deckRepository.listCards).mockResolvedValue([]);
      vi.mocked(deps.instanceRepository.readMeta).mockResolvedValue({
        name: "Main",
        createdAt: "2026-09-21T10:00:00.000Z",
        formatVersion: 2,
      });
      vi.mocked(deps.webIdDocumentRepository.fetchWebIdDocument).mockResolvedValue({
        url: document.url,
        subjects: [
          {
            url: session.webId,
            properties: [{ predicate: "http://xmlns.com/foaf/0.1/name", values: [{ type: "literal", value: "Alice" }] }],
          },
        ],
      } as WebIdDocument);
      await createUseCases(deps).updateInstance(session, instance);
      expect(deps.deckRepository.saveCatalog).toHaveBeenCalledExactlyOnceWith(COPY, {
        title: "Main",
        description: "Flashcard decks of the Solid Memo instance Main.",
        publisher: { webId: session.webId, name: "Alice" },
      });
      expect(deps.instanceRepository.registerCatalog).not.toHaveBeenCalled();
      // Written after every deck is updated: it lists them as DCAT datasets, which older entries are not.
      expect(vi.mocked(deps.deckRepository.saveCatalog).mock.invocationCallOrder[0]).toBeGreaterThan(
        Math.max(...vi.mocked(deps.reviewStateRepository.listReviewStates).mock.invocationCallOrder),
      );
    });

    it("updateInstance names a catalogue after the copy's URL and its publisher after the WebID when nothing says more", async () => {
      const deps = makeDeps();
      vi.mocked(deps.deckRepository.readCatalog).mockResolvedValue(null);
      vi.mocked(deps.deckRepository.listCards).mockResolvedValue([]);
      vi.mocked(deps.webIdDocumentRepository.fetchWebIdDocument).mockRejectedValue(new Error("offline"));
      await createUseCases(deps).updateInstance(session, instance);
      expect(deps.deckRepository.saveCatalog).toHaveBeenCalledExactlyOnceWith(COPY, {
        title: COPY,
        description: `Flashcard decks of the Solid Memo instance ${COPY}.`,
        publisher: { webId: session.webId, name: session.webId },
      });
    });

    it.each([
      ["stage", (deps: ReturnType<typeof makeDeps>) => vi.mocked(deps.instanceCopier.listResources).mockRejectedValueOnce(new Error("boom")), false],
      ["stage", (deps: ReturnType<typeof makeDeps>) => vi.mocked(deps.instanceCopier.ensureAbsent).mockRejectedValueOnce(new Error("boom")), false],
      ["access", (deps: ReturnType<typeof makeDeps>) => vi.mocked(deps.instanceCopier.copyAccessControl).mockRejectedValueOnce(new Error("boom")), true],
      ["copy", (deps: ReturnType<typeof makeDeps>) => vi.mocked(deps.instanceCopier.copyResource).mockRejectedValueOnce(new Error("boom")), true],
      ["upgrade", (deps: ReturnType<typeof makeDeps>) => vi.mocked(deps.deckRepository.listDecks).mockRejectedValueOnce(new Error("boom")), true],
      ["switch", (deps: ReturnType<typeof makeDeps>) => vi.mocked(deps.instanceRepository.switchInstance).mockRejectedValueOnce(new Error("boom")), true],
    ] as const)("updateInstance failing at %s leaves the original as it was and removes the copy", async (step, fail, copied) => {
      const deps = makeDeps();
      vi.mocked(deps.deckRepository.listCards).mockResolvedValue([]);
      fail(deps);
      const outcome = await createUseCases(deps).updateInstance(session, instance);
      expect(outcome).toEqual({ ok: false, step, error: new Error("boom"), cleanedUp: true });
      expect(deps.instanceCopier.deleteRecursively).toHaveBeenCalledTimes(copied ? 1 : 0);
      if (copied) expect(deps.instanceCopier.deleteRecursively).toHaveBeenCalledWith(COPY);
      expect(deps.instanceRepository.saveMeta).not.toHaveBeenCalledWith(instance.url, expect.anything());
      expect(deps.updateJournal.end).toHaveBeenCalledWith(instance.url);
    });

    it("updateInstance refuses a copy that does not conform, naming how many violations", async () => {
      const deps = makeDeps();
      vi.mocked(deps.deckRepository.listCards).mockResolvedValue([]);
      const violation = { message: { en: "x" }, severity: "violation" as const, constraint: "MinCount" };
      vi.mocked(deps.shapeValidator.validateDocument).mockImplementation(async (url) => ({
        url,
        status: "checked" as const,
        subjects: [{ url: `${url}#x`, status: "checked" as const, shape: "deck" as const, version: 3, violations: [violation] }],
      }));
      const outcome = await createUseCases(deps).updateInstance(session, instance);
      expect(outcome).toMatchObject({ ok: false, step: "validate", cleanedUp: true });
      expect((outcome as { error: Error }).error.message).toMatch(/^The updated copy does not conform to Solid Memo's shapes \(\d+ violations\)/);
      vi.mocked(deps.deckRepository.listDecks).mockResolvedValue([]);
      vi.mocked(deps.shapeValidator.validateDocument).mockImplementation(async (url) =>
        url.endsWith("meta.ttl")
          ? { url, status: "checked" as const, subjects: [{ url: `${url}#it`, status: "checked" as const, shape: "instance" as const, version: 2, violations: [violation] }] }
          : { url, status: "missing" as const, subjects: [] },
      );
      expect(await createUseCases(deps).updateInstance(session, instance)).toMatchObject({
        error: new AppError("updatedCopyInvalid", { count: 1 }),
      });
    });

    it("updateInstance refuses to switch when the original changed while it was copied", async () => {
      const deps = makeDeps();
      vi.mocked(deps.deckRepository.listCards).mockResolvedValue([]);
      vi.mocked(deps.instanceCopier.isUnchanged).mockResolvedValueOnce(false);
      expect(await createUseCases(deps).updateInstance(session, instance)).toEqual({
        ok: false,
        step: "verify",
        error: new AppError("resourceChangedDuringCopy", { url: `${instance.url}decks/` }),
        cleanedUp: true,
      });
      // Asked of the version each copy was made from.
      expect(deps.instanceCopier.isUnchanged).toHaveBeenCalledWith(`${instance.url}decks/`, `version of ${instance.url}decks/`);
      const more = makeDeps();
      vi.mocked(more.deckRepository.listCards).mockResolvedValue([]);
      vi.mocked(more.instanceCopier.listResources)
        .mockResolvedValueOnce([`${instance.url}meta.ttl`])
        .mockResolvedValueOnce([`${instance.url}meta.ttl`, `${instance.url}new.ttl`]);
      expect(await createUseCases(more).updateInstance(session, instance)).toMatchObject({
        step: "verify",
        error: new AppError("instanceChangedDuringCopy"),
      });
      expect(more.instanceRepository.switchInstance).not.toHaveBeenCalled();
    });

    it("updateInstance names the copy it could not remove, and remembers it", async () => {
      const deps = makeDeps();
      vi.mocked(deps.instanceCopier.copyResource).mockRejectedValueOnce("offline");
      vi.mocked(deps.instanceCopier.deleteRecursively).mockRejectedValueOnce(new Error("still offline"));
      expect(await createUseCases(deps).updateInstance(session, instance)).toEqual({
        ok: false,
        step: "copy",
        error: "offline",
        cleanedUp: false,
        leftoverUrl: COPY,
      });
      expect(deps.updateJournal.end).not.toHaveBeenCalled();
    });

    it("updateInstance names its copy with a random UUID, dates the switch now, and runs without a journal", async () => {
      const { updateJournal: _j, now: _n, newId: _i, ...deps } = makeDeps();
      vi.mocked(deps.deckRepository.listCards).mockResolvedValue([]);
      vi.mocked(deps.instanceRepository.readMeta).mockResolvedValue({
        name: "Main",
        createdAt: "2026-09-21T10:00:00.000Z",
        formatVersion: 1,
      });
      const outcome = await createUseCases(deps).updateInstance(session, instance);
      expect(outcome).toMatchObject({ ok: true });
      expect((outcome as { instanceUrl: string }).instanceUrl).toMatch(
        /^https:\/\/alice\.example\/solid-memo\/main-[0-9a-f-]{36}\/$/,
      );
      const saved = vi.mocked(deps.instanceRepository.saveMeta).mock.calls[0]![1];
      expect(Date.parse(saved.replacedAt!)).not.toBeNaN();
      await expect(createUseCases(deps).findInterruptedUpdate(instance)).resolves.toBeNull();
    });

    it("updateInstance holds the original read-only for the whole run, whether it succeeds or fails", async () => {
      const release = vi.fn();
      const writeFence = { hold: vi.fn(() => release) };
      const deps = { ...makeDeps(), writeFence };
      vi.mocked(deps.deckRepository.listCards).mockResolvedValue([]);
      vi.mocked(deps.instanceCopier.listResources).mockImplementation(async () => {
        expect(writeFence.hold).toHaveBeenCalledWith(instance.url);
        return [];
      });
      vi.mocked(deps.instanceRepository.switchInstance).mockImplementation(async () => {
        expect(release).not.toHaveBeenCalled();
      });
      await createUseCases(deps).updateInstance(session, instance);
      expect(release).toHaveBeenCalledOnce();
      vi.mocked(deps.instanceCopier.copyAccessControl).mockRejectedValueOnce(new Error("boom"));
      await createUseCases(deps).updateInstance(session, instance);
      expect(release).toHaveBeenCalledTimes(2);
    });

    it("updateInstance writes only to the copy and, at the end, the type index", async () => {
      const deps = makeDeps();
      vi.mocked(deps.deckRepository.listDecks).mockImplementation(async (url) =>
        url === COPY ? [{ ...deck, url: `${COPY}catalog.ttl#deck-1`, formatVersion: 1 }] : [deck],
      );
      vi.mocked(deps.deckRepository.listCards).mockResolvedValue([old("a")]);
      vi.mocked(deps.reviewStateRepository.listReviewStates).mockResolvedValue([oldReview("a")]);
      vi.mocked(deps.instanceRepository.readMeta).mockResolvedValue({
        name: "Main",
        createdAt: "2026-09-21T10:00:00.000Z",
        formatVersion: 1,
      });
      vi.mocked(deps.preferencesRepository.getPreferences).mockResolvedValue({
        preferences: DEFAULT_PREFERENCES,
        formatVersion: 1,
      });
      await createUseCases(deps).updateInstance(session, instance);
      const writes: { name: string; order: number; urls: string[] }[] = [];
      const record = (name: string, fn: unknown, urlsOf: (args: never[]) => (string | undefined)[]) => {
        const mock = vi.mocked(fn as (...args: never[]) => unknown).mock;
        mock.calls.forEach((args, i) =>
          writes.push({ name, order: mock.invocationCallOrder[i]!, urls: urlsOf(args as never[]).filter((u) => u !== undefined) }),
        );
      };
      const d = deps;
      record("saveMeta", d.instanceRepository.saveMeta, ([url]) => [url]);
      record("saveCatalog", d.deckRepository.saveCatalog, ([url]) => [url]);
      record("savePreferences", d.preferencesRepository.savePreferences, ([url]) => [url]);
      record("saveDeck", d.deckRepository.saveDeck, ([deckArg]) => [(deckArg as Deck).url]);
      record("saveCards", d.deckRepository.saveCards, ([deckArg]) => [(deckArg as Deck).url]);
      record("applyReviewChanges", d.reviewStateRepository.applyReviewChanges, ([deckArg]) => [(deckArg as Deck).url]);
      record("createContainer", d.instanceCopier.createContainer, ([url]) => [url]);
      record("copyResource", d.instanceCopier.copyResource, ([, to]) => [to]);
      record("copyAccessControl", d.instanceCopier.copyAccessControl, ([, to]) => [to]);
      record("deleteRecursively", d.instanceCopier.deleteRecursively, ([url]) => [url]);
      record("switchInstance", d.instanceRepository.switchInstance, () => []);
      expect(writes.map((w) => w.name)).toEqual(expect.arrayContaining(["saveMeta", "saveDeck", "saveCards", "applyReviewChanges"]));
      for (const write of writes) for (const url of write.urls) expect(url.startsWith(COPY)).toBe(true);
      const last = writes.reduce((a, b) => (a.order > b.order ? a : b));
      expect(last.name).toBe("switchInstance");
      expect(d.repairRepository.applyRepairs).not.toHaveBeenCalled();
      expect(d.instanceRepository.registerCatalog).not.toHaveBeenCalled();
    });

    it("findInterruptedUpdate names a copy an interrupted update left, and forgets one that is gone", async () => {
      const deps = makeDeps();
      const useCases = createUseCases(deps);
      await expect(useCases.findInterruptedUpdate(instance)).resolves.toBeNull();
      deps.updateJournal.staging.mockReturnValue(COPY);
      vi.mocked(deps.instanceCopier.ensureAbsent).mockRejectedValueOnce(new Error("exists"));
      await expect(useCases.findInterruptedUpdate(instance)).resolves.toBe(COPY);
      await expect(useCases.findInterruptedUpdate(instance)).resolves.toBeNull();
      expect(deps.updateJournal.end).toHaveBeenCalledWith(instance.url);
    });

    it("removeInterruptedUpdate deletes the copy it remembers, then forgets it", async () => {
      const deps = makeDeps();
      await createUseCases(deps).removeInterruptedUpdate(instance);
      expect(deps.instanceCopier.deleteRecursively).not.toHaveBeenCalled();
      deps.updateJournal.staging.mockReturnValue(COPY);
      await createUseCases(deps).removeInterruptedUpdate(instance);
      expect(deps.instanceCopier.deleteRecursively).toHaveBeenCalledWith(COPY);
      expect(deps.updateJournal.end).toHaveBeenCalledWith(instance.url);
    });

    describe("the backup", () => {
      const updated: Instance = { url: COPY, name: "Main" };
      const meta = {
        name: "Main",
        createdAt: "2026-09-21T10:00:00.000Z",
        formatVersion: 2,
        replaces: instance.url,
        replacedAt: "2026-09-28T10:00:00.000Z",
      };

      it("is read from what the instance replaces, and forgotten once it is gone", async () => {
        const deps = makeDeps();
        const useCases = createUseCases(deps);
        await expect(useCases.readBackup(updated)).resolves.toBeNull();
        vi.mocked(deps.instanceRepository.readMeta).mockResolvedValue(meta);
        vi.mocked(deps.instanceCopier.ensureAbsent).mockRejectedValueOnce(new Error("exists"));
        await expect(useCases.readBackup(updated)).resolves.toEqual({ url: instance.url, replacedAt: meta.replacedAt });
        const { replacedAt: _r, ...undated } = meta;
        vi.mocked(deps.instanceRepository.readMeta).mockResolvedValue(undated);
        vi.mocked(deps.instanceCopier.ensureAbsent).mockRejectedValueOnce(new Error("exists"));
        await expect(useCases.readBackup(updated)).resolves.toEqual({ url: instance.url });
        await expect(useCases.readBackup(updated)).resolves.toBeNull();
        expect(deps.instanceRepository.saveMeta).toHaveBeenCalledWith(COPY, {
          name: "Main",
          createdAt: meta.createdAt,
          formatVersion: 2,
        });
      });

      it("is restored by switching back to it, then deleting the updated instance", async () => {
        const deps = makeDeps();
        vi.mocked(deps.instanceRepository.readMeta).mockResolvedValue(meta);
        await expect(createUseCases(deps).restoreBackup(session, updated)).resolves.toEqual(instance);
        expect(deps.instanceRepository.switchInstance).toHaveBeenCalledWith({
          webId: session.webId,
          from: COPY,
          to: instance.url,
          title: "Main",
        });
        expect(deps.instanceCopier.deleteRecursively).toHaveBeenCalledWith(COPY);
        vi.mocked(deps.instanceRepository.readMeta).mockResolvedValue(null);
        await expect(createUseCases(deps).restoreBackup(session, updated)).rejects.toThrow("Main has no backup to restore.");
      });

      it("is deleted, then forgotten; with none, nothing happens", async () => {
        const deps = makeDeps();
        await createUseCases(deps).deleteBackup(updated);
        expect(deps.instanceCopier.deleteRecursively).not.toHaveBeenCalled();
        vi.mocked(deps.instanceRepository.readMeta).mockResolvedValue(meta);
        await createUseCases(deps).deleteBackup(updated);
        expect(deps.instanceCopier.deleteRecursively).toHaveBeenCalledWith(instance.url);
        expect(deps.instanceRepository.saveMeta).toHaveBeenCalledWith(COPY, {
          name: "Main",
          createdAt: meta.createdAt,
          formatVersion: 2,
        });
      });
    });
  });

  it("planRepair plans from a report, and applyRepairs hands the repairs to the repository", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    expect(useCases.planRepair({ instanceUrl: instance.url, documents: [], violationCount: 0, conforms: true })).toEqual({
      repairs: [],
      unrepairable: [],
    });
    const repairs = [{ kind: "describe-deck" as const, documentUrl: "d", subjectUrl: "d#x", version: 3 }];
    await useCases.applyRepairs(repairs);
    expect(deps.repairRepository.applyRepairs).toHaveBeenCalledWith(repairs);
  });

  it("validateInstance checks every document of the instance", async () => {
    const deps = makeDeps();
    vi.mocked(deps.shapeValidator.validateDocument).mockImplementation(async (url) =>
      url.endsWith("catalog.ttl")
        ? {
            url,
            status: "checked",
            subjects: [
              {
                url: `${url}#deck-1`,
                status: "checked",
                shape: "deck",
                version: 2,
                violations: [{ message: { en: "no title" }, severity: "violation", constraint: "MinCount" }],
              },
            ],
          }
        : { url, status: "missing", subjects: [] },
    );
    const report = await createUseCases(deps).validateInstance(instance.url);
    expect(report).toMatchObject({ instanceUrl: instance.url, violationCount: 1, conforms: false });
    expect(report.documents.map((d) => d.url)).toEqual([
      `${instance.url}meta.ttl`,
      `${instance.url}preferences.ttl`,
      `${instance.url}catalog.ttl`,
      deck.cardsDocumentUrl,
      deck.reviewsDocumentUrl,
    ]);
  });

  it("listLibraryDecks delegates to the deck library", async () => {
    const deps = makeDeps();
    await expect(createUseCases(deps).listLibraryDecks()).resolves.toEqual([
      libraryDeck,
    ]);
  });

  it("listLibraryCards fetches the deck and returns its cards", async () => {
    const deps = makeDeps();
    await expect(
      createUseCases(deps).listLibraryCards(libraryDeck),
    ).resolves.toEqual(libraryContent.cards);
    expect(deps.deckLibrary.fetchLibraryDeck).toHaveBeenCalledWith(
      libraryDeck.url,
    );
    expect(deps.deckRepository.importDeck).not.toHaveBeenCalled();
  });

  it("planLibraryUpgrade compares the release a copy came from with the deck's current one, and writes nothing", async () => {
    const deps = makeDeps();
    const copy: Deck = { ...deck, sourceUrl: libraryDeck.url };
    const current: LibraryDeck = { ...libraryDeck, url: "https://solid-memo.com/decks/capitals/2.ttl", version: "2" };
    vi.mocked(deps.deckLibrary.listLibraryDecks).mockResolvedValue([
      { ...libraryDeck, seriesUrl: "https://solid-memo.com/decks/index.ttl#rivers", url: "https://solid-memo.com/decks/rivers/1.ttl" },
      current,
    ]);
    vi.mocked(deps.deckLibrary.fetchLibraryDeck).mockImplementation(async (url) =>
      url === current.url
        ? { ...libraryContent, url, version: "2", cards: [...libraryContent.cards, { id: "norway", front: { "": "Norway" }, back: { "": "Oslo" }, formatVersion: 1 }] }
        : libraryContent,
    );
    vi.mocked(deps.deckRepository.listCards).mockResolvedValue([]);
    await expect(createUseCases(deps).planLibraryUpgrade(copy)).resolves.toMatchObject({
      fromVersion: "1",
      toVersion: "2",
      add: [{ id: "norway" }],
    });
    expect(deps.deckLibrary.fetchLibraryDeck).toHaveBeenCalledWith(copy.sourceUrl);
    expect(deps.deckLibrary.fetchLibraryDeck).toHaveBeenCalledWith(current.url);
    expect(deps.deckRepository.saveDeck).not.toHaveBeenCalled();
  });

  it("planLibraryUpgrade offers nothing for a home-made deck, or one whose deck the library no longer has", async () => {
    const deps = makeDeps();
    await expect(createUseCases(deps).planLibraryUpgrade(deck)).resolves.toBeNull();
    const stray: Deck = { ...deck, sourceUrl: "https://solid-memo.com/decks/gone/1.ttl" };
    await expect(createUseCases(deps).planLibraryUpgrade(stray)).resolves.toBeNull();
    expect(deps.deckLibrary.fetchLibraryDeck).not.toHaveBeenCalled();
  });

  it("addReleaseLanguages gives a copy the languages its release adds, and saves it; nothing for a home-made deck or nothing to add", async () => {
    const deps = makeDeps();
    const copy: Deck = { ...deck, title: { en: "Capitals" }, sourceUrl: libraryDeck.url };
    vi.mocked(deps.deckLibrary.fetchLibraryDeck).mockResolvedValueOnce({ ...libraryContent, title: { en: "Capitals", sv: "Huvudstäder" } });
    await expect(createUseCases(deps).addReleaseLanguages(copy)).resolves.toMatchObject({ title: { en: "Capitals", sv: "Huvudstäder" } });
    expect(deps.deckLibrary.fetchLibraryDeck).toHaveBeenCalledWith(libraryDeck.url);
    expect(deps.deckRepository.saveDeck).toHaveBeenCalledOnce();
    await expect(createUseCases(deps).addReleaseLanguages(copy)).resolves.toBeNull();
    await expect(createUseCases(deps).addReleaseLanguages({ ...deck, sourceUrl: undefined })).resolves.toBeNull();
    expect(deps.deckRepository.saveDeck).toHaveBeenCalledOnce();
  });

  it("applyLibraryUpgrade writes the cards, drops the removed cards' review states, and moves the deck to the release", async () => {
    const deps = makeDeps();
    const copy: Deck = { ...deck, sourceUrl: libraryDeck.url };
    const retired = { ...card, id: "yugoslavia" };
    const plan = {
      fromVersion: "1",
      toVersion: "2",
      releaseUrl: "https://solid-memo.com/decks/capitals/2.ttl",
      notes: [],
      add: [{ id: "norway", front: { "": "Norway" }, back: { "": "Oslo" }, formatVersion: 1 }],
      change: [{ id: "sweden", front: { "": "Sweden" }, back: { "": "Stockholm" }, formatVersion: 1 }],
      retire: [retired],
      restore: [],
      remove: [card],
      kept: [],
    };
    await expect(createUseCases(deps).applyLibraryUpgrade(copy, plan)).resolves.toEqual({
      ...copy,
      sourceUrl: plan.releaseUrl,
    });
    expect(deps.deckRepository.applyCardChanges).toHaveBeenCalledWith(copy, {
      save: [...plan.add, ...plan.change, { ...retired, retired: true }],
      remove: [card.id],
    });
    expect(deps.reviewStateRepository.applyReviewChanges).toHaveBeenCalledWith(copy, {
      save: [],
      remove: [
        { cardId: card.id, direction: "front-to-back" },
        { cardId: card.id, direction: "back-to-front" },
      ],
    });
    await createUseCases(deps).applyLibraryUpgrade(copy, { ...plan, remove: [] });
    expect(deps.reviewStateRepository.applyReviewChanges).toHaveBeenCalledOnce();
  });

  it("importLibraryDeck fetches the deck's content and imports it", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    await expect(
      useCases.importLibraryDeck(instance.url, libraryDeck),
    ).resolves.toEqual(deck);
    expect(deps.deckLibrary.fetchLibraryDeck).toHaveBeenCalledWith(
      libraryDeck.url,
    );
    expect(deps.deckRepository.importDeck).toHaveBeenCalledWith(
      instance.url,
      libraryContent,
    );
  });

  it("getPreferences overlays defaults when nothing is stored", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    await expect(useCases.getPreferences(instance.url)).resolves.toEqual({
      newCardsPerDay: 20,
      maxReviewsPerDay: 200,
      dayBoundaryHour: 4,
      answerScale: "sm2",
      developerMode: false,
      invalidDataPolicy: "block-instance" as const,
    });
  });

  it("getPreferences shares one read between concurrent callers, but never caches", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);

    await Promise.all([
      useCases.getPreferences(instance.url),
      useCases.getPreferences(instance.url),
      useCases.getStudyQueue(instance.url, deck, new Date()),
    ]);
    expect(deps.preferencesRepository.getPreferences).toHaveBeenCalledOnce();

    await useCases.getPreferences(instance.url);
    expect(deps.preferencesRepository.getPreferences).toHaveBeenCalledTimes(2);
  });

  it("getPreferences does not share reads across instances, nor keep a failed one", async () => {
    const deps = makeDeps();
    vi.mocked(deps.preferencesRepository.getPreferences).mockRejectedValueOnce(
      new Error("preferences unreachable"),
    );
    const useCases = createUseCases(deps);

    await expect(useCases.getPreferences(instance.url)).rejects.toThrow(
      "preferences unreachable",
    );
    await expect(
      useCases.getPreferences("https://alice.example/solid-memo/other/"),
    ).resolves.toEqual(expect.objectContaining({ dayBoundaryHour: 4 }));
    await expect(useCases.getPreferences(instance.url)).resolves.toBeDefined();
    expect(deps.preferencesRepository.getPreferences).toHaveBeenCalledTimes(3);
  });

  it("getPreferences returns stored preferences unchanged", async () => {
    const deps = makeDeps();
    const stored = {
      newCardsPerDay: 5,
      maxReviewsPerDay: 50,
      dayBoundaryHour: 0,
      answerScale: "minimal" as const,
      developerMode: true,
      invalidDataPolicy: "block-instance" as const,
    };
    vi.mocked(deps.preferencesRepository.getPreferences).mockResolvedValue({
      preferences: stored,
      formatVersion: 2,
    });
    const useCases = createUseCases(deps);
    await expect(useCases.getPreferences(instance.url)).resolves.toEqual(
      stored,
    );
  });

  it("savePreferences delegates to the repository", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    const preferences = {
      newCardsPerDay: 5,
      maxReviewsPerDay: 50,
      dayBoundaryHour: 0,
      answerScale: "minimal" as const,
      developerMode: true,
      invalidDataPolicy: "block-instance" as const,
    };
    await useCases.savePreferences(instance.url, preferences);
    expect(deps.preferencesRepository.savePreferences).toHaveBeenCalledWith(
      instance.url,
      preferences,
    );
  });

  it("getStudyQueue draws new cards with the injected random source", async () => {
    const deps = makeDeps();
    const newCards = ["n1", "n2", "n3"].map((id) => ({
      ...card,
      id,
      url: `${deck.cardsDocumentUrl}#${id}`,
    }));
    vi.mocked(deps.deckRepository.listCards).mockResolvedValue(newCards);
    vi.mocked(deps.reviewStateRepository.listReviewStates).mockResolvedValue([]);
    const useCases = createUseCases({ ...deps, random: () => 0 });

    const queue = await useCases.getStudyQueue(
      instance.url,
      deck,
      new Date(2026, 8, 21, 12, 0),
    );
    expect(queue.newPrompts.map((p) => p.card.id)).toEqual(["n2", "n3", "n1"]);
  });

  it("getStudyQueue composes cards, review states and preferences", async () => {
    const deps = makeDeps();
    const dueCard = { ...card, id: "card-due", url: `${deck.cardsDocumentUrl}#card-due` };
    const newCard = { ...card, id: "card-new", url: `${deck.cardsDocumentUrl}#card-new` };
    vi.mocked(deps.deckRepository.listCards).mockResolvedValue([
      dueCard,
      newCard,
    ]);
    vi.mocked(deps.reviewStateRepository.listReviewStates).mockResolvedValue([
      {
        cardId: "card-due",
        direction: "front-to-back",
        easeFactor: 2.5,
        intervalDays: 1,
        repetitions: 1,
        due: "2026-09-20",
        firstReviewedAt: "2026-09-19T10:00:00.000Z",
        lastReviewedAt: "2026-09-19T10:00:00.000Z",
        formatVersion: 2,
      },
    ]);
    const useCases = createUseCases(deps);

    const queue = await useCases.getStudyQueue(
      instance.url,
      deck,
      new Date(2026, 8, 21, 12, 0),
    );
    expect(queue.due.map((p) => p.card.id)).toEqual(["card-due"]);
    expect(queue.newPrompts.map((p) => p.card.id)).toEqual(["card-new"]);

    const capped = await useCases.getStudyQueue(
      instance.url,
      { ...deck, newCardsPerDay: 0, maxReviewsPerDay: 0 },
      new Date(2026, 8, 21, 12, 0),
    );
    expect(capped.due).toEqual([]);
    expect(capped.newPrompts).toEqual([]);
  });

  it("recordReview starts fresh for a never-reviewed card", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    const now = new Date(2026, 8, 21, 12, 0);

    const state = await useCases.recordReview(
      instance.url,
      deck,
      { card, direction: "front-to-back" },
      5,
      now,
    );

    expect(state).toEqual({
      cardId: card.id,
      direction: "front-to-back",
      easeFactor: 2.6,
      intervalDays: 1,
      repetitions: 1,
      due: "2026-09-22",
      firstReviewedAt: now.toISOString(),
      lastReviewedAt: now.toISOString(),
      formatVersion: 2,
    });
    expect(deps.reviewStateRepository.saveReviewState).toHaveBeenCalledWith(
      deck,
      state,
    );
  });

  it("recordReview transitions an existing state and keeps firstReviewedAt", async () => {
    const deps = makeDeps();
    vi.mocked(deps.reviewStateRepository.getReviewState).mockResolvedValue({
      cardId: card.id,
      direction: "front-to-back",
      easeFactor: 2.5,
      intervalDays: 6,
      repetitions: 2,
      due: "2026-09-21",
      firstReviewedAt: "2026-09-10T10:00:00.000Z",
      lastReviewedAt: "2026-09-15T10:00:00.000Z",
      formatVersion: 2,
    });
    const useCases = createUseCases(deps);
    const now = new Date(2026, 8, 21, 12, 0);

    const state = await useCases.recordReview(
      instance.url,
      deck,
      { card, direction: "front-to-back" },
      4,
      now,
    );

    expect(state.easeFactor).toBeCloseTo(2.5);
    expect(state.repetitions).toBe(3);
    expect(state.intervalDays).toBe(15);
    expect(state.due).toBe("2026-10-06");
    expect(state.firstReviewedAt).toBe("2026-09-10T10:00:00.000Z");
    expect(state.lastReviewedAt).toBe(now.toISOString());
    expect(state.previous).toEqual({
      easeFactor: 2.5,
      intervalDays: 6,
      repetitions: 2,
      due: "2026-09-21",
      lastReviewedAt: "2026-09-15T10:00:00.000Z",
    });
  });

  it("recordReview stores no snapshot for a never-reviewed card", async () => {
    const deps = makeDeps();
    const useCases = createUseCases(deps);
    const state = await useCases.recordReview(
      instance.url,
      deck,
      { card, direction: "front-to-back" },
      4,
      new Date(2026, 8, 21, 12, 0),
    );
    expect(state).not.toHaveProperty("previous");
  });

  describe("resetStudyDay", () => {
    const now = new Date(2026, 8, 21, 12, 0);
    const earlier = new Date(2026, 8, 15, 12, 0).toISOString();
    const morning = {
      easeFactor: 2.5,
      intervalDays: 6,
      repetitions: 2,
      due: "2026-09-21",
      lastReviewedAt: earlier,
    };

    it("restores reviewed cards and forgets cards introduced today, in one write", async () => {
      const deps = makeDeps();
      vi.mocked(deps.reviewStateRepository.listReviewStates).mockResolvedValue([
        {
          cardId: "reviewed",
          direction: "front-to-back",
          easeFactor: 2.6,
          intervalDays: 15,
          repetitions: 3,
          due: "2026-10-06",
          firstReviewedAt: earlier,
          lastReviewedAt: now.toISOString(),
          formatVersion: 2,
          previous: morning,
        },
        {
          cardId: "introduced",
          direction: "front-to-back",
          easeFactor: 2.5,
          intervalDays: 1,
          repetitions: 1,
          due: "2026-09-22",
          firstReviewedAt: now.toISOString(),
          lastReviewedAt: now.toISOString(),
          formatVersion: 2,
        },
        {
          cardId: "untouched",
          direction: "front-to-back",
          easeFactor: 2.5,
          intervalDays: 6,
          repetitions: 2,
          due: "2026-09-30",
          firstReviewedAt: earlier,
          lastReviewedAt: earlier,
          formatVersion: 2,
        },
      ]);
      const useCases = createUseCases(deps);

      await expect(
        useCases.resetStudyDay(instance.url, deck, now),
      ).resolves.toBe(2);

      expect(
        deps.reviewStateRepository.applyReviewChanges,
      ).toHaveBeenCalledExactlyOnceWith(deck, {
        save: [{ cardId: "reviewed", direction: "front-to-back", firstReviewedAt: earlier, formatVersion: 2, ...morning }],
        remove: [{ cardId: "introduced", direction: "front-to-back" }],
      });
    });

    it("writes nothing when nothing was studied today", async () => {
      const deps = makeDeps();
      const useCases = createUseCases(deps);
      await expect(
        useCases.resetStudyDay(instance.url, deck, now),
      ).resolves.toBe(0);
      expect(
        deps.reviewStateRepository.applyReviewChanges,
      ).not.toHaveBeenCalled();
    });

    it("uses the instance's day boundary", async () => {
      const deps = makeDeps();
      const lateNight = new Date(2026, 8, 21, 3, 0).toISOString();
      vi.mocked(deps.reviewStateRepository.listReviewStates).mockResolvedValue([
        {
          cardId: "night-owl",
          direction: "front-to-back",
          easeFactor: 2.5,
          intervalDays: 1,
          repetitions: 1,
          due: "2026-09-22",
          firstReviewedAt: lateNight,
          lastReviewedAt: lateNight,
          formatVersion: 2,
        },
      ]);
      const useCases = createUseCases(deps);
      await expect(
        useCases.resetStudyDay(instance.url, deck, now),
      ).resolves.toBe(0);

      vi.mocked(deps.preferencesRepository.getPreferences).mockResolvedValue({
        preferences: {
          newCardsPerDay: 20,
          maxReviewsPerDay: 200,
          dayBoundaryHour: 0,
          answerScale: "sm2",
          developerMode: false,
          invalidDataPolicy: "block-instance" as const,
        },
        formatVersion: 2,
      });
      await expect(
        useCases.resetStudyDay(instance.url, deck, now),
      ).resolves.toBe(1);
    });
  });

  it("recordReview resets on a lapse and reschedules for tomorrow", async () => {
    const deps = makeDeps();
    vi.mocked(deps.reviewStateRepository.getReviewState).mockResolvedValue({
      cardId: card.id,
      direction: "front-to-back",
      easeFactor: 2.2,
      intervalDays: 30,
      repetitions: 5,
      due: "2026-09-21",
      firstReviewedAt: "2026-08-01T10:00:00.000Z",
      lastReviewedAt: "2026-09-15T10:00:00.000Z",
      formatVersion: 2,
    });
    const useCases = createUseCases(deps);

    const state = await useCases.recordReview(
      instance.url,
      deck,
      { card, direction: "front-to-back" },
      0,
      new Date(2026, 8, 21, 12, 0),
    );

    expect(state.repetitions).toBe(0);
    expect(state.intervalDays).toBe(1);
    expect(state.easeFactor).toBeCloseTo(2.2);
    expect(state.due).toBe("2026-09-22");
  });
});

describe("the instance digest", () => {
  const now = new Date("2026-09-28T10:00:00.000Z");
  const RULES = "rules-1";
  const review: ReviewState = {
    cardId: "card-1",
    direction: "front-to-back",
    easeFactor: 2.5,
    intervalDays: 1,
    repetitions: 1,
    due: "2026-09-27",
    firstReviewedAt: "2026-09-26T10:00:00.000Z",
    lastReviewedAt: "2026-09-26T10:00:00.000Z",
    formatVersion: 2,
  };
  const current: Card = { ...card, formatVersion: CARD_FORMAT_VERSION };
  const card2: Card = { ...current, id: "card-2", url: `${deck.cardsDocumentUrl}#card-2` };

  /** The deps, with documents at versions "c1" (cards) and "r1" (reviews) and a digest kept in memory. */
  function setup(initial: InstanceDigest | null = null) {
    const deps = makeDeps();
    let stored = initial;
    const digestRepository: DigestRepository = {
      readDigest: vi.fn(async () => stored),
      updateDigest: vi.fn(async (_instanceUrl, change) => {
        stored = change(stored);
      }),
    };
    const at = (version: string, value: unknown) =>
      vi.fn(async (_target: unknown, since: string | undefined) =>
        since === version ? { unchanged: true as const } : { unchanged: false as const, value, version },
      );
    deps.deckRepository.readCardsSince = at("c1", [current, card2]) as DeckRepository["readCardsSince"];
    deps.reviewStateRepository.readReviewStatesSince = at("r1", [review]) as ReviewStateRepository["readReviewStatesSince"];
    deps.shapeValidator.validateDocumentSince = vi.fn(async (url: string, since: string | undefined) =>
      since === `v-${url}` ? { unchanged: true as const } : { unchanged: false as const, value: { url, status: "checked" as const, subjects: [] }, version: `v-${url}` },
    );
    const useCases = createUseCases({ ...deps, digestRepository, ruleset: RULES });
    return { deps, useCases, digestRepository, stored: () => stored };
  }

  /** What the digest learns from the documents above. */
  async function learned() {
    const { useCases, stored, digestRepository } = setup();
    await useCases.getStudyCounts(instance.url, deck, now);
    await vi.waitFor(() => expect(digestRepository.updateDigest).toHaveBeenCalled());
    return stored()!;
  }

  it("counts today's study from the documents the first time, and keeps the deck's schedule", async () => {
    const { useCases, stored, digestRepository } = setup();
    await expect(useCases.getStudyCounts(instance.url, deck, now)).resolves.toEqual({ dueCount: 1, newCount: 1 });
    await vi.waitFor(() => expect(digestRepository.updateDigest).toHaveBeenCalledOnce());
    expect(stored()!.schedules[deck.url]).toMatchObject({ cardsVersion: "c1", reviewsVersion: "r1" });
    expect(stored()!.receipts[deck.cardsDocumentUrl]).toEqual({ document: deck.cardsDocumentUrl, version: "c1", latestFormat: true });
    expect(stored()!.receipts[deck.reviewsDocumentUrl]).toEqual({ document: deck.reviewsDocumentUrl, version: "r1", latestFormat: true });
  });

  it("counts from the schedule while neither document changed", async () => {
    const { deps, useCases } = setup(await learned());
    await expect(useCases.getStudyCounts(instance.url, deck, now)).resolves.toEqual({ dueCount: 1, newCount: 1 });
    expect(deps.deckRepository.readCardsSince).toHaveBeenCalledExactlyOnceWith(deck, "c1");
    expect(deps.reviewStateRepository.readReviewStatesSince).toHaveBeenCalledExactlyOnceWith(deck, "r1");
  });

  it("counts from the documents again when one changed, or the deck is studied another way", async () => {
    const digest = await learned();
    const changed = setup({ ...digest, schedules: { [deck.url]: { ...digest.schedules[deck.url]!, cardsVersion: "c0" } } });
    await expect(changed.useCases.getStudyCounts(instance.url, deck, now)).resolves.toEqual({ dueCount: 1, newCount: 1 });
    expect(changed.deps.deckRepository.readCardsSince).toHaveBeenCalledExactlyOnceWith(deck, "c0");

    const otherWay = setup(digest);
    await expect(otherWay.useCases.getStudyCounts(instance.url, { ...deck, direction: "bidirectional" }, now)).resolves.toEqual({
      dueCount: 1,
      newCount: 3,
    });
    expect(otherWay.deps.deckRepository.readCardsSince).toHaveBeenLastCalledWith(expect.anything(), undefined);
  });

  it("notes no format receipt for a document holding something outdated, and nothing of a document without a version", async () => {
    const outdated = setup();
    outdated.deps.deckRepository.readCardsSince = vi.fn(async () => ({ unchanged: false as const, value: [{ ...card, formatVersion: 0 }], version: "c1" }));
    outdated.deps.reviewStateRepository.readReviewStatesSince = vi.fn(async () => ({
      unchanged: false as const,
      value: [{ ...review, formatVersion: 1 }],
      version: "r1",
    }));
    await outdated.useCases.getStudyCounts(instance.url, deck, now);
    await vi.waitFor(() => expect(outdated.digestRepository.updateDigest).toHaveBeenCalled());
    expect(outdated.stored()!.receipts).toEqual({});

    const unversioned = setup();
    unversioned.deps.deckRepository.readCardsSince = vi.fn(async () => ({ unchanged: false as const, value: [card], version: null }));
    await unversioned.useCases.getStudyCounts(instance.url, deck, now);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(unversioned.digestRepository.updateDigest).not.toHaveBeenCalled();
  });

  it("goes on without a digest it cannot read or write", async () => {
    const { deps, useCases, digestRepository } = setup();
    vi.mocked(digestRepository.readDigest).mockRejectedValue(new Error("offline"));
    vi.mocked(digestRepository.updateDigest).mockRejectedValue(new Error("offline"));
    await expect(useCases.getStudyCounts(instance.url, deck, now)).resolves.toEqual({ dueCount: 1, newCount: 1 });
    await expect(createUseCases(deps).getStudyCounts(instance.url, deck, now)).resolves.toEqual({ dueCount: 1, newCount: 1 });
  });

  it("refuses a read without a version that says unchanged", async () => {
    const { deps, useCases } = setup(await learned());
    deps.deckRepository.readCardsSince = vi.fn(async () => ({ unchanged: true as const }));
    await expect(useCases.getStudyCounts(instance.url, { ...deck, direction: "bidirectional" }, now)).rejects.toThrow("came back unchanged");
    await expect(useCases.refreshStudyDigest(instance.url, deck)).resolves.toBeUndefined();
  });

  it("keeps the schedule and checks the reviews document when a study session ends", async () => {
    const { useCases, stored, digestRepository } = setup();
    await useCases.refreshStudyDigest(instance.url, deck);
    await vi.waitFor(() => expect(digestRepository.updateDigest).toHaveBeenCalledTimes(2));
    expect(stored()!.schedules[deck.url]).toMatchObject({ cardsVersion: "c1", reviewsVersion: "r1" });
    expect(stored()!.receipts[deck.reviewsDocumentUrl]).toEqual({
      document: deck.reviewsDocumentUrl,
      version: `v-${deck.reviewsDocumentUrl}`,
      conformedTo: RULES,
    });
  });

  it("keeps no receipt of a reviews document that does not conform, or has no version", async () => {
    const { deps, useCases, stored, digestRepository } = setup();
    deps.shapeValidator.validateDocumentSince = vi.fn(async (url: string) => ({
      unchanged: false as const,
      value: { url, status: "checked" as const, subjects: [{ url: `${url}#x`, status: "checked" as const, shape: "reviewState" as const, version: 2, violations: [{ message: { en: "no" }, severity: "violation" as const, constraint: "MinCount" }] }] },
      version: "r1",
    }));
    await useCases.refreshStudyDigest(instance.url, deck);
    await vi.waitFor(() => expect(digestRepository.updateDigest).toHaveBeenCalledOnce());
    expect(stored()!.receipts[deck.reviewsDocumentUrl]).toEqual({ document: deck.reviewsDocumentUrl, version: "r1", latestFormat: true });
    deps.shapeValidator.validateDocumentSince = vi.fn(async (url: string) => ({
      unchanged: false as const,
      value: { url, status: "checked" as const, subjects: [] },
      version: null,
    }));
    await useCases.refreshStudyDigest(instance.url, deck);
    expect(stored()!.receipts[deck.reviewsDocumentUrl]!.conformedTo).toBeUndefined();
  });

  it("checks only documents changed since they conformed, by these rules", async () => {
    const urls = [`${instance.url}meta.ttl`, `${instance.url}preferences.ttl`, `${instance.url}catalog.ttl`, deck.cardsDocumentUrl, deck.reviewsDocumentUrl];
    const first = setup();
    await expect(first.useCases.checkInstance(instance.url)).resolves.toMatchObject({ conforms: true });
    await vi.waitFor(() => expect(Object.keys(first.stored()!.receipts)).toHaveLength(urls.length));
    expect(first.deps.shapeValidator.validateDocumentSince).toHaveBeenCalledWith(urls[0], undefined);

    const digest = first.stored()!;
    const again = setup({ ...digest, receipts: { ...digest.receipts, [urls[0]!]: { ...digest.receipts[urls[0]!]!, conformedTo: "older-rules" } } });
    const report = await again.useCases.checkInstance(instance.url);
    expect(report.documents.map((d) => d.subjects.length)).toEqual([0, 0, 0, 0, 0]);
    expect(again.deps.shapeValidator.validateDocumentSince).toHaveBeenCalledWith(urls[0], undefined);
    expect(again.deps.shapeValidator.validateDocumentSince).toHaveBeenCalledWith(urls[1], `v-${urls[1]}`);
  });

  it("keeps no receipt of a document that does not conform or has no version", async () => {
    const { deps, useCases, digestRepository } = setup();
    deps.shapeValidator.validateDocumentSince = vi.fn(async (url: string) => ({
      unchanged: false as const,
      value: { url, status: "missing" as const, subjects: [] },
      version: null,
    }));
    await useCases.checkInstance(instance.url);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(digestRepository.updateDigest).not.toHaveBeenCalled();
  });

  it("plans the format update without reading again documents with nothing outdated, and writes no digest", async () => {
    const { deps, useCases, digestRepository } = setup(await learned());
    const plan = await useCases.planMigration(instance.url);
    expect(plan.cardCount).toBe(0);
    expect(deps.deckRepository.readCardsSince).toHaveBeenCalledWith(deck, "c1");
    expect(deps.reviewStateRepository.readReviewStatesSince).toHaveBeenCalledWith(deck, "r1");
    expect(digestRepository.updateDigest).not.toHaveBeenCalled();
  });
});

describe("the answer log", () => {
  /** An answer log kept in memory, by study month. */
  function memoryLog() {
    const byMonth = new Map<string, Answer[]>();
    const log = {
      append: vi.fn(async (_instanceUrl: string, answer: Answer) => {
        const month = answer.studyDay.slice(0, 7);
        byMonth.set(month, [...(byMonth.get(month) ?? []), answer]);
      }),
      months: vi.fn(async () => [...byMonth.keys()].sort()),
      readMonth: vi.fn(async (_instanceUrl: string, month: string) => byMonth.get(month) ?? []),
      removeDay: vi.fn(async (_instanceUrl: string, deckUrl: string, studyDay: string) => {
        for (const [month, answers] of byMonth) {
          byMonth.set(month, answers.filter((a) => a.deckUrl !== deckUrl || a.studyDay !== studyDay));
        }
      }),
    } satisfies AnswerLog;
    return { log, byMonth };
  }
  const noon = new Date(2026, 8, 21, 12, 0);
  const setup = () => {
    const deps = makeDeps();
    const { log, byMonth } = memoryLog();
    let id = 0;
    const useCases = createUseCases({ ...deps, answerLog: log, newId: () => `id${++id}-0000-0000` });
    return { deps, log, byMonth, useCases };
  };

  it("keeps every answer with what the statistics need, the prior interval from the second on", async () => {
    const { deps, byMonth, useCases } = setup();
    await useCases.recordReview(instance.url, deck, { card, direction: "front-to-back" }, 4, noon);
    vi.mocked(deps.reviewStateRepository.getReviewState).mockResolvedValue({
      cardId: card.id, direction: "back-to-front", easeFactor: 2.5, intervalDays: 6, repetitions: 2,
      due: "2026-09-21", firstReviewedAt: "2026-09-01T10:00:00.000Z", lastReviewedAt: "2026-09-15T10:00:00.000Z", formatVersion: 2,
    });
    await useCases.recordReview(instance.url, deck, { card, direction: "back-to-front" }, 1, noon);
    await useCases.getStatistics(instance.url, noon);
    expect(byMonth.get("2026-09")).toEqual([
      {
        id: `answer-${noon.toISOString().replace(/[-:.]/g, "")}-id1-0000`,
        deckUrl: deck.url, cardUrl: card.url, direction: "front-to-back", grade: 4,
        answeredAt: noon.toISOString(), studyDay: "2026-09-21", nextIntervalDays: 1,
      },
      {
        id: `answer-${noon.toISOString().replace(/[-:.]/g, "")}-id2-0000`,
        deckUrl: deck.url, cardUrl: card.url, direction: "back-to-front", grade: 1,
        answeredAt: noon.toISOString(), studyDay: "2026-09-21", priorIntervalDays: 6, nextIntervalDays: 1,
      },
    ]);
  });

  it("keeps an answer it could not add for later, in order, and does not fail the review", async () => {
    const { log, byMonth, useCases } = setup();
    log.append.mockRejectedValueOnce(new Error("offline")).mockRejectedValueOnce(new Error("still offline"));
    await expect(useCases.recordReview(instance.url, deck, { card, direction: "front-to-back" }, 4, noon)).resolves.toBeDefined();
    await useCases.refreshStudyDigest(instance.url, deck);
    expect(byMonth.size).toBe(0);
    await useCases.recordReview(instance.url, deck, { card, direction: "back-to-front" }, 5, noon);
    await useCases.refreshStudyDigest(instance.url, deck);
    expect(byMonth.get("2026-09")!.map((answer) => [answer.direction, answer.grade])).toEqual([
      ["front-to-back", 4],
      ["back-to-front", 5],
    ]);
  });

  it("forgets a reset day's answers of the deck, those still on their way too", async () => {
    const { deps, log, byMonth, useCases } = setup();
    await useCases.recordReview(instance.url, deck, { card, direction: "front-to-back" }, 4, noon);
    vi.mocked(deps.reviewStateRepository.listReviewStates).mockResolvedValue([
      { cardId: card.id, direction: "front-to-back", easeFactor: 2.6, intervalDays: 1, repetitions: 1, due: "2026-09-22",
        firstReviewedAt: noon.toISOString(), lastReviewedAt: noon.toISOString(), formatVersion: 2 },
    ]);
    await expect(useCases.resetStudyDay(instance.url, deck, noon)).resolves.toBe(1);
    expect(log.removeDay).toHaveBeenCalledWith(instance.url, deck.url, "2026-09-21");
    expect(log.append.mock.invocationCallOrder[0]).toBeLessThan(log.removeDay.mock.invocationCallOrder[0]!);
    expect(byMonth.get("2026-09")).toEqual([]);
  });

  it("computes the statistics of the months asked for, of every deck or of one", async () => {
    const { byMonth, useCases } = setup();
    const answer = (studyDay: string, deckUrl = deck.url): Answer => ({
      id: `answer-${studyDay}`, deckUrl, cardUrl: card.url, direction: "front-to-back", grade: 4,
      answeredAt: `${studyDay}T10:00:00.000Z`, studyDay, nextIntervalDays: 1,
    });
    byMonth.set("2025-09", [answer("2025-09-30")]);
    byMonth.set("2025-10", [answer("2025-10-01")]);
    byMonth.set("2026-09", [answer("2026-09-20"), answer("2026-09-21", "https://pod.example/other#deck")]);
    const all = await useCases.getStatistics(instance.url, noon);
    expect(all.days.map((day) => day.studyDay)).toEqual(["2025-10-01", "2026-09-20", "2026-09-21"]);
    expect(all.streaks).toEqual({ current: 2, longest: 2 });
    const one = await useCases.getStatistics(instance.url, noon, { months: 1, deckUrl: deck.url });
    expect(one.days.map((day) => day.studyDay)).toEqual(["2026-09-20"]);
  });

  it("is checked in the full check, one document a month, and is empty without a log", async () => {
    const { deps, byMonth, useCases } = setup();
    byMonth.set("2026-09", []);
    await useCases.validateInstance(instance.url);
    expect(deps.shapeValidator.validateDocument).toHaveBeenCalledWith(`${instance.url}history/2026-09.ttl`);
    const plain = createUseCases(makeDeps());
    await expect(plain.getStatistics(instance.url, noon)).resolves.toMatchObject({ totals: { answers: 0, studyDays: 0, cards: 0 } });
  });
});
