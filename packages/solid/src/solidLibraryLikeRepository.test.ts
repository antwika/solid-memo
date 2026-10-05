import { describe, expect, it, vi } from "vitest";
import type { LibraryLike } from "@solid-memo/domain/libraryStats";
import { createSolidLibraryLikeRepository } from "./solidLibraryLikeRepository";
import { fakePod } from "./testing/fakePod";
import { PreconditionFailedError } from "./datasets";

const INSTANCE = "https://pod.example/solid-memo/main/";
const LIKES = `${INSTANCE}likes.ttl`;
const SM = "https://solid-memo.com/vocab/v1#";
const FLAGS = "https://solid-memo.com/decks/index.ttl#world-flags";
const CAPITALS = "https://solid-memo.com/decks/index.ttl#capitals-of-the-world";

const like = (deckUrl: string, announced = false): LibraryLike => ({ deckUrl, likedAt: "2026-10-05T10:00:00.000Z", announced });

describe("the likes document", () => {
  it("is empty until a like is kept, then holds one subject per deck", async () => {
    const pod = fakePod();
    const likes = createSolidLibraryLikeRepository({ fetch: pod.fetch });
    expect(await likes.listLikes(INSTANCE)).toEqual([]);
    await likes.saveLike(INSTANCE, like(FLAGS));
    await likes.saveLike(INSTANCE, like(CAPITALS));
    await likes.saveLike(INSTANCE, like(FLAGS, true));
    expect(await likes.listLikes(INSTANCE)).toEqual([like(FLAGS, true), like(CAPITALS)]);
    expect(pod.triples(LIKES)).toContain(`<${LIKES}#like-world-flags> <${SM}announced> "true"^^<http://www.w3.org/2001/XMLSchema#boolean> .`);
  });

  it("removes a like, and leaves the document alone when there is none of the deck", async () => {
    const pod = fakePod();
    const likes = createSolidLibraryLikeRepository({ fetch: pod.fetch });
    await likes.removeLike(INSTANCE, FLAGS);
    expect(pod.requests.map((r) => r.method)).toEqual(["GET"]);
    await likes.saveLike(INSTANCE, like(FLAGS));
    await likes.saveLike(INSTANCE, like(CAPITALS));
    await likes.removeLike(INSTANCE, FLAGS);
    expect(await likes.listLikes(INSTANCE)).toEqual([like(CAPITALS)]);
  });

  it("leaves out what does not fit the shape", async () => {
    const pod = fakePod();
    await pod.put(LIKES, `<#like-x> a <https://www.w3.org/ns/activitystreams#Like> ; <https://www.w3.org/ns/activitystreams#object> "not an IRI" .\n<#other> <${SM}x> 1 .`);
    expect(await createSolidLibraryLikeRepository({ fetch: pod.fetch }).listLikes(INSTANCE)).toEqual([]);
  });

  it("checks what it writes", async () => {
    const pod = fakePod();
    const checkWrite = vi.fn(async () => undefined);
    await createSolidLibraryLikeRepository({ fetch: pod.fetch, checkWrite }).saveLike(INSTANCE, like(FLAGS));
    expect(checkWrite).toHaveBeenCalledWith(expect.anything(), [`${LIKES}#like-world-flags`]);
  });

  it("writes again when the document changed meanwhile, and gives up after three tries", async () => {
    const pod = fakePod();
    const likes = createSolidLibraryLikeRepository({ fetch: pod.fetch });
    await likes.saveLike(INSTANCE, like(FLAGS));
    pod.failNext("PUT", LIKES, 412);
    await likes.saveLike(INSTANCE, like(CAPITALS));
    expect(await likes.listLikes(INSTANCE)).toHaveLength(2);
    for (let i = 0; i < 3; i++) pod.failNext("PUT", LIKES, 412);
    await expect(likes.removeLike(INSTANCE, FLAGS)).rejects.toBeInstanceOf(PreconditionFailedError);
  });

  it("passes on any other failure at once", async () => {
    const pod = fakePod();
    pod.failNext("PUT", LIKES, 500);
    await expect(createSolidLibraryLikeRepository({ fetch: pod.fetch }).saveLike(INSTANCE, like(FLAGS))).rejects.toThrow();
    expect(pod.requests.filter((r) => r.method === "PUT")).toHaveLength(1);
  });

  it("writes the document whole, only if unchanged since it was read", async () => {
    const pod = fakePod();
    const likes = createSolidLibraryLikeRepository({ fetch: pod.fetch });
    await likes.saveLike(INSTANCE, like(FLAGS));
    const etag = pod.etag(LIKES);
    pod.clearRequests();
    await likes.saveLike(INSTANCE, like(FLAGS, true));
    expect(pod.requests.filter((r) => r.method !== "GET")).toEqual([expect.objectContaining({ method: "PUT", ifMatch: etag })]);
  });
});
