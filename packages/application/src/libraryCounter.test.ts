import { describe, expect, it, vi } from "vitest";
import type { LibraryNotice, Tally } from "@solid-memo/domain/libraryStats";
import { countLibraryNotices } from "./libraryCounter";
import type { LibraryCounterStore } from "./ports";

const INBOX = "https://library.example/inbox/";
const STATE = "https://library.example/private/state.ttl";
const INDEX = "https://solid-memo.com/decks/index.ttl";
const FLAGS = `${INDEX}#world-flags`;
const ALICE = "https://alice.example/profile/card#me";
const BOB = "https://bob.example/profile/card#me";

function notice(action: LibraryNotice["action"], by = ALICE, deckUrl = FLAGS, at = "2026-10-05T10:00:00.000Z"): LibraryNotice {
  return { action, by, deckUrl, at };
}

function memoryStore(notices: Record<string, LibraryNotice | null>, state: Tally = []) {
  const inbox = new Map(Object.entries(notices));
  let kept = state;
  const store: LibraryCounterStore = {
    listNotices: vi.fn(async () => [...inbox.keys()]),
    readNotice: vi.fn(async (url: string) => inbox.get(url) ?? null),
    deleteNotice: vi.fn(async (url: string) => {
      inbox.delete(url);
    }),
    readTally: vi.fn(async () => kept),
    saveTally: vi.fn(async (_url: string, next: Tally) => {
      kept = next;
    }),
  };
  return { store, inbox, state: () => kept };
}

const deps = (store: LibraryCounterStore, isWebId: (webId: string) => Promise<boolean> = async () => true) => ({
  store,
  inboxUrl: INBOX,
  stateUrl: STATE,
  indexUrl: INDEX,
  personKey: (webId: string) => `key:${webId}`,
  isWebId,
  now: () => new Date("2026-10-05T12:00:00.000Z"),
});

describe("countLibraryNotices", () => {
  it("counts the notices into the kept tally, saves it, then empties the inbox", async () => {
    const { store, inbox, state } = memoryStore({
      [`${INBOX}1`]: notice("import"),
      [`${INBOX}2`]: notice("like"),
      [`${INBOX}3`]: notice("import", BOB),
    });
    const outcome = await countLibraryNotices(deps(store));
    expect(outcome).toEqual({
      stats: { countedAt: "2026-10-05T12:00:00.000Z", decks: { [FLAGS]: { likes: 1, downloads: 2 } } },
      counted: 3,
      dropped: 0,
    });
    expect(inbox.size).toBe(0);
    expect(new Set(state().map((entry) => entry.person))).toEqual(new Set([`key:${ALICE}`, `key:${BOB}`]));
    expect(vi.mocked(store.saveTally).mock.invocationCallOrder[0]).toBeLessThan(vi.mocked(store.deleteNotice).mock.invocationCallOrder[0]!);
  });

  it("builds on the tally of earlier runs, asking only of new people whether they have a WebID", async () => {
    const first = memoryStore({ [`${INBOX}1`]: notice("like") });
    await countLibraryNotices(deps(first.store));
    const second = memoryStore({ [`${INBOX}2`]: notice("unlike", ALICE, FLAGS, "2026-10-06T10:00:00.000Z"), [`${INBOX}3`]: notice("like", BOB) }, first.state());
    const isWebId = vi.fn(async (_webId: string) => true);
    const outcome = await countLibraryNotices(deps(second.store, isWebId));
    expect(outcome.stats.decks[FLAGS]).toEqual({ likes: 1, downloads: 0 });
    expect(isWebId).toHaveBeenCalledExactlyOnceWith(BOB);
  });

  it("leaves out, and deletes, what is no notice, is about another library's deck, or is not from a WebID", async () => {
    const isWebId = vi.fn(async (webId: string) => webId !== BOB);
    const { store, inbox } = memoryStore({
      [`${INBOX}1`]: null,
      [`${INBOX}2`]: notice("like", ALICE, "https://elsewhere.example/decks/index.ttl#world-flags"),
      [`${INBOX}3`]: notice("like", ALICE, `${INDEX}-old#world-flags`),
      [`${INBOX}4`]: notice("like", "http://alice.example/profile/card#me"),
      [`${INBOX}5`]: notice("like", BOB),
      [`${INBOX}6`]: notice("like"),
    });
    const outcome = await countLibraryNotices(deps(store, isWebId));
    expect(outcome).toMatchObject({ counted: 1, dropped: 5 });
    expect(outcome.stats.decks).toEqual({ [FLAGS]: { likes: 1, downloads: 0 } });
    expect(inbox.size).toBe(0);
  });

  it("keeps the inbox when the state cannot be saved", async () => {
    const { store, inbox } = memoryStore({ [`${INBOX}1`]: notice("like") });
    vi.mocked(store.saveTally).mockRejectedValue(new Error("offline"));
    await expect(countLibraryNotices(deps(store))).rejects.toThrow("offline");
    expect(inbox.size).toBe(1);
  });
});
