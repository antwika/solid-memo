import { vi } from "vitest";
import type { UseCases } from "../application/useCases";
import { DEFAULT_PREFERENCES } from "../domain/preferences";

/** A complete UseCases fake; override the methods a test cares about. */
export function makeUseCasesFake(overrides: Partial<UseCases> = {}): UseCases {
  return {
    restoreSession: vi.fn(async () => null),
    loginWithWebId: vi.fn(async () => undefined),
    logout: vi.fn(async () => undefined),
    onSessionExpired: vi.fn(() => () => undefined),
    viewWebIdDocument: vi.fn(async () => ({ url: "", subjects: [] })),
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
    listDecks: vi.fn(async () => []),
    createDeck: vi.fn(async () => {
      throw new Error("createDeck fake not configured");
    }),
    removeDeck: vi.fn(async () => undefined),
    listCards: vi.fn(async () => []),
    addCard: vi.fn(async () => {
      throw new Error("addCard fake not configured");
    }),
    updateCard: vi.fn(async () => {
      throw new Error("updateCard fake not configured");
    }),
    removeCard: vi.fn(async () => undefined),
    getPreferences: vi.fn(async () => DEFAULT_PREFERENCES),
    savePreferences: vi.fn(async () => undefined),
    getStudyQueue: vi.fn(async () => ({ due: [], newCards: [] })),
    recordReview: vi.fn(async () => ({
      cardId: "card-1",
      easeFactor: 2.6,
      intervalDays: 1,
      repetitions: 1,
      due: "2026-09-22",
      firstReviewedAt: "2026-09-21T10:00:00.000Z",
      lastReviewedAt: "2026-09-21T10:00:00.000Z",
    })),
    ...overrides,
  };
}
