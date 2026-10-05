// @vitest-environment node
/**
 * Library likes and downloads against a real Solid server
 * (docs/library-stats.md): a like kept in the instance's likes document
 * with conditional writes, and notices POSTed into an inbox container,
 * each a document of its own that its owner reads back as sent, as the
 * library's inbox processor (the solid-memo/inbox repository) reads
 * them. Runs against each server globalSetup.ts starts.
 */
import { readFile } from "node:fs/promises";
import { describe, expect, inject, it } from "vitest";
import { VOCAB_ROOT } from "@solid-memo/vocab/tooling/root";
import { createShaclShapeValidator } from "@solid-memo/solid/shaclShapeValidator";
import { getSolidDatasetOrNull } from "@solid-memo/solid/datasets";
import { toNotices } from "@solid-memo/solid/mappers/libraryStatsMapper";
import { createSolidInstanceCopier } from "@solid-memo/solid/solidInstanceCopier";
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

  it("takes each notice into the inbox as a document of its own, read back as it was sent", async () => {
    const inboxUrl = new URL(`run-${crypto.randomUUID()}/library/inbox/`, server).href;
    // An inbox is a container that exists before notices come: here made by a document in it, which is no notice.
    const readme = `${inboxUrl}readme.ttl`;
    const made = await fetch(readme, {
      method: "PUT",
      headers: { "Content-Type": "text/turtle" },
      body: '<#it> <http://purl.org/dc/terms/title> "The library\'s inbox" .',
    });
    expect(made.ok).toBe(true);
    const inbox = createSolidLibraryInbox({ fetch });
    const alice = "https://alice.example/profile/card#me";
    const sent = [
      { action: "import" as const, by: alice, deckUrl: FLAGS, at: "2026-10-05T10:00:00.000Z" },
      { action: "like" as const, by: alice, deckUrl: FLAGS, at: "2026-10-05T10:10:00.000Z" },
      { action: "unlike" as const, by: alice, deckUrl: CAPITALS, at: "2026-10-05T10:12:00.000Z" },
    ];
    for (const notice of sent) await inbox.notify(inboxUrl, notice);

    const documents = (await createSolidInstanceCopier({ fetch }).listResources(inboxUrl)).filter((url) => url !== readme);
    expect(documents).toHaveLength(sent.length);
    const received = [];
    for (const url of documents) {
      const notices = toNotices((await getSolidDatasetOrNull(url, fetch))!);
      expect(notices).toHaveLength(1);
      received.push(...notices);
    }
    expect(received).toEqual(expect.arrayContaining(sent));
  });
});
