/**
 * A guest's study, end to end, through the app's own use cases and Solid
 * adapters wired as in main.tsx (docs/guest-mode.md): the guest studies in
 * the pod kept on their device, then logs in and keeps it. Their pod is a
 * second local pod here; e2e/pod moves a guest's study into real servers.
 */
import { readFile } from "node:fs/promises";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { VOCAB_ROOT } from "@solid-memo/vocab/tooling/root";
import { createUseCases } from "@solid-memo/application/useCases";
import type { ResourceStore } from "@solid-memo/application/ports";
import { GUEST_ORIGIN, GUEST_SESSION } from "@solid-memo/domain/guest";
import { createLocalGuestPod } from "./localGuestPod";
import { createLocalPod } from "./localPod";
import { createMemoryResourceStore } from "./memoryResourceStore";
import { routedFetch } from "./routedFetch";
import { createShaclShapeValidator } from "./shaclShapeValidator";
import { createSolidAnswerLog } from "./solidAnswerLog";
import { createSolidDeckRepository } from "./solidDeckRepository";
import { createSolidDigestRepository } from "./solidDigestRepository";
import { createSolidInstanceCopier } from "./solidInstanceCopier";
import { createSolidInstanceRepository } from "./solidInstanceRepository";
import { createSolidPreferencesRepository } from "./solidPreferencesRepository";
import { createSolidRepairRepository } from "./solidRepairRepository";
import { createSolidReviewStateRepository } from "./solidReviewStateRepository";
import { createSolidStorageGateway } from "./solidStorageGateway";
import { createSolidWebIdDocumentRepository } from "./solidWebIdDocumentRepository";
import { createWriteFence } from "./writeFence";

const ALICE_POD = "https://alice.example/";
const ALICE = { webId: `${ALICE_POD}profile/card#me` };
const TARGET = `${ALICE_POD}solid-memo/main/`;
const SITE = "https://solid-memo.test/";

/** Every RDF document of a store, as N-Triples lines. */
async function everyTriple(store: ResourceStore): Promise<string[]> {
  const lines: string[] = [];
  for (const url of await store.urls()) {
    const resource = await store.get(url);
    if (resource?.kind === "rdf") lines.push(...resource.triples);
  }
  return lines;
}

async function app() {
  const newEtag = () => `"${crypto.randomUUID()}"`;
  const guestStore = createMemoryResourceStore();
  const guestFetch = createLocalPod({ root: GUEST_ORIGIN, store: guestStore, newEtag });
  const aliceStore = createMemoryResourceStore();
  const aliceFetch = createLocalPod({ root: ALICE_POD, store: aliceStore, newEtag });
  await aliceFetch(`${ALICE_POD}profile/card`, {
    method: "PUT",
    headers: { "Content-Type": "text/turtle" },
    body: `<#me> <http://xmlns.com/foaf/0.1/name> "Alice" ; <http://www.w3.org/ns/pim/space#storage> <${ALICE_POD}> .`,
  });
  const requests: string[] = [];
  const recorded: typeof fetch = (input, init) => {
    requests.push(input instanceof Request ? input.url : String(input));
    return aliceFetch(input, init);
  };
  const writeFence = createWriteFence(routedFetch({ origin: GUEST_ORIGIN, local: guestFetch, remote: recorded }));
  const podFetch = writeFence.fetch;
  const shapeValidator = createShaclShapeValidator({
    fetch: podFetch,
    shapesFetch: async (input) =>
      new Response(await readFile(`${VOCAB_ROOT}${new URL(String(input)).pathname.slice(1)}`, "utf8"), {
        headers: { "content-type": "text/turtle" },
      }),
    shapesBaseUrl: `${SITE}shapes/`,
  });
  const checkWrite = shapeValidator.checkSubjects;
  const ids = { now: () => new Date(), randomId: () => crypto.randomUUID() };
  const useCases = createUseCases({
    sessionGateway: { restore: async () => null, discoverOidcIssuer: async () => Promise.reject(new Error("none")) } as never,
    deckLibrary: undefined as never,
    webIdDocumentRepository: createSolidWebIdDocumentRepository({ fetch: podFetch }),
    storageGateway: createSolidStorageGateway({ fetch: podFetch }),
    instanceRepository: createSolidInstanceRepository({ fetch: podFetch, checkWrite, ...ids }),
    deckRepository: createSolidDeckRepository({ fetch: podFetch, checkWrite, ...ids }),
    preferencesRepository: createSolidPreferencesRepository({ fetch: podFetch, checkWrite }),
    reviewStateRepository: createSolidReviewStateRepository({ fetch: podFetch, checkWrite }),
    shapeValidator,
    repairRepository: createSolidRepairRepository({ fetch: podFetch }),
    instanceCopier: createSolidInstanceCopier({ fetch: podFetch }),
    digestRepository: createSolidDigestRepository({ fetch: podFetch, checkWrite }),
    answerLog: createSolidAnswerLog({ fetch: podFetch, checkWrite }),
    guestPod: createLocalGuestPod({ fetch: guestFetch, store: guestStore }),
    writeFence,
  });
  return { useCases, guestStore, aliceStore, requests };
}

describe("a guest's study", () => {
  // Nothing reaches the network: every request goes to one of the two local pods.
  beforeEach(() => {
    vi.stubGlobal("fetch", async (input: unknown) => {
      throw new Error(`Sent to the network: ${String(input)}`);
    });
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("is kept on the device, with nothing sent anywhere, until the guest logs in", { timeout: 30_000 }, async () => {
    const { useCases, guestStore, requests } = await app();
    expect(await useCases.restoreSession()).toBeNull();
    expect(await useCases.startGuest("My study")).toEqual(GUEST_SESSION);
    expect(await useCases.restoreSession()).toEqual({ session: GUEST_SESSION, origin: "restored" });
    const [instance] = await useCases.listInstances(GUEST_SESSION);
    expect(instance!.url.startsWith(GUEST_ORIGIN)).toBe(true);
    const deck = await useCases.createDeck(instance!.url, "Capitals");
    await useCases.addCard(deck, { front: { "": "Sweden" }, back: { "": "Stockholm" } });
    const now = new Date();
    const queue = await useCases.getStudyQueue(instance!.url, deck, now);
    await useCases.recordReview(instance!.url, deck, queue.newPrompts[0]!, 4, now);
    expect((await useCases.getStatistics(instance!.url, now)).totals.answers).toBe(1);
    expect((await useCases.checkInstance(instance!.url)).conforms).toBe(true);
    expect(requests).toEqual([]);
    expect((await useCases.discoverAccount(GUEST_SESSION)).podUrl).toBe(GUEST_ORIGIN);
    expect(await useCases.findGuestStudy()).toEqual({ instances: [{ instance, deckCount: 1 }] });
    expect((await guestStore.urls()).length).toBeGreaterThan(5);
  });

  it("moves into the pod the guest logs in to, as theirs, and leaves the device", { timeout: 30_000 }, async () => {
    const { useCases, guestStore, aliceStore } = await app();
    await useCases.startGuest("My study");
    const [guestInstance] = await useCases.listInstances(GUEST_SESSION);
    const deck = await useCases.createDeck(guestInstance!.url, "Capitals");
    await useCases.addCard(deck, { front: { "": "Sweden" }, back: { "": "Stockholm" } });
    const now = new Date();
    const queue = await useCases.getStudyQueue(guestInstance!.url, deck, now);
    await useCases.recordReview(guestInstance!.url, deck, queue.newPrompts[0]!, 4, now);

    const outcome = await useCases.transferGuestStudy(ALICE, guestInstance!, {
      containerUrl: TARGET,
      registrationTarget: "private",
    });

    expect(outcome).toEqual({ ok: true, instance: { url: TARGET, name: "My study" }, tidied: true });
    expect(await useCases.listInstances(ALICE)).toEqual([{ url: TARGET, name: "My study" }]);
    const [moved] = await useCases.listDecks(TARGET);
    expect(moved!.url).toBe(`${TARGET}catalog.ttl#${deck.id}`);
    const cards = await useCases.listCards(moved!);
    expect(cards.map((card) => card.front)).toEqual([{ "": "Sweden" }]);
    const studied = await useCases.getStudyQueue(TARGET, moved!, now);
    expect(studied.newPrompts).toEqual([]);
    expect((await useCases.getStatistics(TARGET, now)).totals.answers).toBe(1);
    expect((await useCases.validateInstance(TARGET)).conforms).toBe(true);
    const triples = await everyTriple(aliceStore);
    expect(triples.filter((line) => line.includes(GUEST_ORIGIN))).toEqual([]);
    expect(triples).toContain(`<${TARGET}catalog.ttl#catalog> <http://purl.org/dc/terms/publisher> <${ALICE.webId}> .`);
    expect(triples).toContain(`<${ALICE.webId}> <http://xmlns.com/foaf/0.1/name> "Alice" .`);
    expect(await guestStore.urls()).toEqual([]);
    expect(await useCases.findGuestStudy()).toBeNull();
  });
});
