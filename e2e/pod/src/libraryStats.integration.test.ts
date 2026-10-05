// @vitest-environment node
/**
 * Library likes and downloads against a real Solid server
 * (docs/library-stats.md): a like kept in the instance's likes document
 * with conditional writes, notices POSTed into an inbox container, and
 * the counter reading, counting and deleting them, keeping its tally as
 * Turtle (ActivityStreams activities). Runs against each server globalSetup.ts starts.
 */
import { readFile } from "node:fs/promises";
import { describe, expect, inject, it } from "vitest";
import { countLibraryNotices } from "@solid-memo/application/libraryCounter";
import { VOCAB_ROOT } from "@solid-memo/vocab/tooling/root";
import { createShaclShapeValidator } from "@solid-memo/solid/shaclShapeValidator";
import { createSolidLibraryCounterStore } from "@solid-memo/solid/solidLibraryCounterStore";
import { createSolidLibraryInbox } from "@solid-memo/solid/solidLibraryInbox";
import { createSolidLibraryLikeRepository } from "@solid-memo/solid/solidLibraryLikeRepository";

const SERVERS = inject("solidServers");
const SITE = "https://solid-memo.test/";
const INDEX = "https://solid-memo.com/decks/index.ttl";
const FLAGS = `${INDEX}#world-flags`;
const CAPITALS = `${INDEX}#capitals-of-the-world`;

/** The likes as main.tsx wires them: every like checked against its shape before it is written. */
function libraryLikes() {
  const shapesFetch: typeof fetch = async (input) =>
    new Response(await readFile(`${VOCAB_ROOT}${new URL(String(input)).pathname.slice(1)}`, "utf8"), {
      headers: { "content-type": "text/turtle" },
    });
  const shapeValidator = createShaclShapeValidator({ fetch, shapesFetch, shapesBaseUrl: `${SITE}shapes/` });
  return createSolidLibraryLikeRepository({ fetch, checkWrite: shapeValidator.checkSubjects });
}

describe.each(SERVERS)("library likes and downloads on $name", ({ url: server }) => {
  it("keeps a like per deck in the instance, rewrites and removes it", async () => {
    const instanceUrl = new URL(`run-${crypto.randomUUID()}/solid-memo/main/`, server).href;
    const likes = libraryLikes();
    await expect(likes.listLikes(instanceUrl)).resolves.toEqual([]);
    const flags = { deckUrl: FLAGS, likedAt: "2026-10-05T10:00:00.000Z", announced: false };
    const capitals = { deckUrl: CAPITALS, likedAt: "2026-10-05T10:01:00.000Z", announced: true };
    await likes.saveLike(instanceUrl, flags);
    await likes.saveLike(instanceUrl, capitals);
    await likes.saveLike(instanceUrl, { ...flags, announced: true });
    await expect(likes.listLikes(instanceUrl)).resolves.toEqual(expect.arrayContaining([{ ...flags, announced: true }, capitals]));
    await likes.removeLike(instanceUrl, CAPITALS);
    await expect(likes.listLikes(instanceUrl)).resolves.toEqual([{ ...flags, announced: true }]);
  });

  it("takes notices into an inbox, which the counter counts once each and then empties", async () => {
    const base = new URL(`run-${crypto.randomUUID()}/library/`, server).href;
    const inboxUrl = `${base}inbox/`;
    const stateUrl = `${base}private/state.ttl`;
    // An inbox is a container that exists before notices come: here made by a document in it, which is no notice.
    const made = await fetch(`${inboxUrl}readme.ttl`, {
      method: "PUT",
      headers: { "Content-Type": "text/turtle" },
      body: '<#it> <http://purl.org/dc/terms/title> "The library\'s inbox" .',
    });
    expect(made.ok).toBe(true);
    const inbox = createSolidLibraryInbox({ fetch });
    // The counter counts https WebIDs only; whether these are ones is not asked here.
    const alice = "https://alice.example/profile/card#me";
    const bob = "https://bob.example/profile/card#me";
    await inbox.notify(inboxUrl, { action: "import", by: alice, deckUrl: FLAGS, at: "2026-10-05T10:00:00.000Z" });
    await inbox.notify(inboxUrl, { action: "import", by: alice, deckUrl: FLAGS, at: "2026-10-05T10:05:00.000Z" });
    await inbox.notify(inboxUrl, { action: "like", by: alice, deckUrl: FLAGS, at: "2026-10-05T10:10:00.000Z" });
    await inbox.notify(inboxUrl, { action: "like", by: bob, deckUrl: FLAGS, at: "2026-10-05T10:11:00.000Z" });
    await inbox.notify(inboxUrl, { action: "unlike", by: bob, deckUrl: FLAGS, at: "2026-10-05T10:12:00.000Z" });

    const store = createSolidLibraryCounterStore({ fetch });
    const count = () =>
      countLibraryNotices({
        store,
        inboxUrl,
        stateUrl,
        indexUrl: INDEX,
        personKey: (webId) => `key-${webId.length}-${webId.slice(-12)}`,
        isWebId: async () => true,
        now: () => new Date("2026-10-05T12:00:00.000Z"),
      });
    const first = await count();
    expect(first).toEqual({
      stats: { countedAt: "2026-10-05T12:00:00.000Z", decks: { [FLAGS]: { likes: 1, downloads: 1 } } },
      counted: 5,
      dropped: 1,
    });
    await expect(store.listNotices(inboxUrl)).resolves.toEqual([]);
    // Counting again, with nothing new, comes to the same.
    await expect(count()).resolves.toEqual({ ...first, counted: 0, dropped: 0 });
  });
});
