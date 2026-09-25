import { vi } from "vitest";
import type { UseCases } from "../application/useCases";
import { DEFAULT_PREFERENCES } from "../domain/preferences";

/** A complete UseCases fake; override the methods a test cares about. */
export function makeUseCasesFake(overrides: Partial<UseCases> = {}): UseCases {
  return {
    restoreSession: vi.fn(async () => null),
    loginWithWebId: vi.fn(async () => undefined),
    loginWithProvider: vi.fn(async () => undefined),
    logout: vi.fn(async () => undefined),
    onSessionExpired: vi.fn(() => () => undefined),
    discoverAccount: vi.fn(async (session) => ({
      webId: session.webId,
      podUrl: "https://pod.example/",
      oidcIssuer: "https://issuer.example",
    })),
    viewWebIdDocument: vi.fn(async () => ({ url: "", subjects: [] })),
    validateInstance: vi.fn(async (instanceUrl) => ({
      instanceUrl,
      documents: [],
      violationCount: 0,
      conforms: true,
    })),
    listStorages: vi.fn(async () => []),
    addManualStorage: vi.fn(async () => ({
      url: "https://pod.example/",
      source: "manual" as const,
    })),
    listInstances: vi.fn(async () => []),
    getRegistrationOptions: vi.fn(async () => ({
      privateIndexExists: true,
      publicIndexExists: true,
    })),
    createInstance: vi.fn(async () => ({
      url: "https://pod.example/solid-memo/main/",
      name: "Main",
    })),
    attachInstanceByUrl: vi.fn(async () => ({
      url: "https://pod.example/solid-memo/main/",
      name: "Main",
    })),
    deleteInstance: vi.fn(async () => undefined),
    listDecks: vi.fn(async () => []),
    createDeck: vi.fn(async () => {
      throw new Error("createDeck fake not configured");
    }),
    renameDeck: vi.fn(async (deck, name) => ({ ...deck, name })),
    setDeckDirection: vi.fn(async (deck, direction) => ({ ...deck, direction })),
    removeDeck: vi.fn(async () => undefined),
    listLibraryDecks: vi.fn(async () => []),
    importLibraryDeck: vi.fn(async () => {
      throw new Error("importLibraryDeck fake not configured");
    }),
    listLibraryCards: vi.fn(async () => []),
    planLibraryUpgrade: vi.fn(async () => null),
    applyLibraryUpgrade: vi.fn(async (deck, plan) => ({
      ...deck,
      direction: plan.direction,
      formatVersion: plan.toVersion,
    })),
    listCards: vi.fn(async () => []),
    addCard: vi.fn(async () => {
      throw new Error("addCard fake not configured");
    }),
    updateCard: vi.fn(async () => {
      throw new Error("updateCard fake not configured");
    }),
    removeCard: vi.fn(async () => undefined),
    planMigration: vi.fn(async () => ({
      decks: [],
      deckCount: 0,
      cardCount: 0,
      reviewCount: 0,
      preferencesOutdated: false,
      instanceOutdated: false,
    })),
    migrateInstance: vi.fn(async () => ({
      deckCount: 0,
      cardCount: 0,
      reviewCount: 0,
      preferencesMigrated: false,
      instanceMigrated: false,
    })),
    getPreferences: vi.fn(async () => DEFAULT_PREFERENCES),
    savePreferences: vi.fn(async () => undefined),
    getStudyQueue: vi.fn(async () => ({
      due: [],
      newPrompts: [],
      studiedToday: 0,
    })),
    resetStudyDay: vi.fn(async () => 0),
    recordReview: vi.fn(async () => ({
      cardId: "card-1",
      direction: "front-to-back" as const,
      easeFactor: 2.6,
      intervalDays: 1,
      repetitions: 1,
      due: "2026-09-22",
      firstReviewedAt: "2026-09-21T10:00:00.000Z",
      lastReviewedAt: "2026-09-21T10:00:00.000Z",
      formatVersion: 2,
    })),
    ...overrides,
  };
}
