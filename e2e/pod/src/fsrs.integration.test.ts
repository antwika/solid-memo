// @vitest-environment node
/**
 * FSRS against a real Solid server (docs/srs.md): a new instance states
 * FSRS in its preferences (format 4); every review writes the FSRS-7
 * memory with the SM-2 fields (review-state format 3), each write checked
 * against its shape; the memory's decimals come back as written, and a
 * whole-number one can be rewritten (node-solid-server serves "10" as
 * 10.0, and deletes only "10": datasets.ts patchBody); a reset
 * restores the morning's memory; rescheduling moves due days and nothing
 * else. Runs against each server globalSetup.ts starts.
 */
import { readFile } from "node:fs/promises";
import { describe, expect, inject, it } from "vitest";
import { VOCAB_ROOT } from "@solid-memo/vocab/tooling/root";
import { createUseCases } from "@solid-memo/application/useCases";
import type { Deck, Prompt } from "@solid-memo/domain/deck";
import { REVIEW_STATE_FORMAT_VERSION } from "@solid-memo/domain/review";
import { createShaclShapeValidator } from "@solid-memo/solid/shaclShapeValidator";
import { createSolidDeckRepository } from "@solid-memo/solid/solidDeckRepository";
import { createSolidInstanceRepository } from "@solid-memo/solid/solidInstanceRepository";
import { createSolidPreferencesRepository } from "@solid-memo/solid/solidPreferencesRepository";
import { createSolidReviewStateRepository } from "@solid-memo/solid/solidReviewStateRepository";
import { createSolidWebIdDocumentRepository } from "@solid-memo/solid/solidWebIdDocumentRepository";
import { createWriteFence } from "@solid-memo/solid/writeFence";

const SERVERS = inject("solidServers");
const SITE = "https://solid-memo.test/";

/** The app as main.tsx wires it, every write checked against its shape. */
function app() {
  const writeFence = createWriteFence(fetch);
  const podFetch = writeFence.fetch;
  const shapesFetch: typeof fetch = async (input) =>
    new Response(await readFile(`${VOCAB_ROOT}${new URL(String(input)).pathname.slice(1)}`, "utf8"), {
      headers: { "content-type": "text/turtle" },
    });
  const shapeValidator = createShaclShapeValidator({ fetch: podFetch, shapesFetch, shapesBaseUrl: `${SITE}shapes/` });
  const checkWrite = shapeValidator.checkSubjects;
  const deps = { fetch: podFetch, checkWrite, now: () => new Date(), randomId: () => crypto.randomUUID() };
  const reviewStateRepository = createSolidReviewStateRepository({ fetch: podFetch, checkWrite });
  const useCases = createUseCases({
    sessionGateway: undefined as never,
    storageGateway: undefined as never,
    deckLibrary: undefined as never,
    webIdDocumentRepository: createSolidWebIdDocumentRepository({ fetch: podFetch }),
    instanceRepository: createSolidInstanceRepository(deps),
    deckRepository: createSolidDeckRepository(deps),
    preferencesRepository: createSolidPreferencesRepository({ fetch: podFetch, checkWrite }),
    reviewStateRepository,
    shapeValidator,
    repairRepository: undefined as never,
    instanceCopier: undefined as never,
    writeFence,
    random: () => 0.5,
  });
  return { useCases, reviewStateRepository };
}

/** A new instance with one deck of two cards, made by the app. */
async function seed(server: string): Promise<{ instanceUrl: string; deck: Deck; prompts: Prompt[] }> {
  const base = new URL(`fsrs-${crypto.randomUUID()}/`, server).href;
  const webId = `${base}profile/card#me`;
  const typeIndex = `${base}settings/privateTypeIndex.ttl`;
  const put = async (url: string, body: string) => {
    const response = await fetch(url, { method: "PUT", headers: { "content-type": "text/turtle" }, body });
    if (!response.ok) throw new Error(`Seeding ${url}: ${response.status}`);
  };
  await put(`${base}profile/card`, `<#me> <http://www.w3.org/ns/solid/terms#privateTypeIndex> <${typeIndex}> .`);
  await put(typeIndex, `<> a <http://www.w3.org/ns/solid/terms#TypeIndex>, <http://www.w3.org/ns/solid/terms#UnlistedDocument> .`);
  const { useCases } = app();
  const instance = await useCases.createInstance({ webId }, { containerUrl: `${base}solid-memo/`, name: "Main", registrationTarget: "private" });
  const deck = await useCases.createDeck(instance.url, "Capitals");
  const cards = [];
  for (const [front, back] of [["Sweden", "Stockholm"], ["Norway", "Oslo"]]) {
    cards.push(await useCases.addCard(deck, { front: { "": front }, back: { "": back } }));
  }
  return { instanceUrl: instance.url, deck, prompts: cards.map((card) => ({ card, direction: "front-to-back" as const })) };
}

const DAY = 86_400_000;

describe.each(SERVERS)("FSRS on $name", ({ url: server }) => {
  it("schedules a new instance by FSRS, and keeps each review's memory as written", async () => {
    const { instanceUrl, deck, prompts } = await seed(server);
    const { useCases, reviewStateRepository } = app();
    await expect(useCases.getPreferences(instanceUrl)).resolves.toMatchObject({ scheduler: "fsrs", answerScale: "minimal", desiredRetention: 0.9 });

    const now = new Date();
    const first = await useCases.recordReview(instanceUrl, deck, prompts[0]!, 4, new Date(now.getTime() - 3 * DAY));
    const again = await useCases.recordReview(instanceUrl, deck, prompts[0]!, 1, now);
    const repeat = await useCases.recordReview(instanceUrl, deck, prompts[0]!, 4, new Date(now.getTime() + 10 * 60_000));
    expect(again.memory!.stability).toBeLessThan(first.memory!.stability);
    expect(repeat.previous!.memory).toEqual(first.memory);

    const [stored] = await reviewStateRepository.listReviewStates(deck);
    expect(stored).toEqual({ ...repeat, formatVersion: REVIEW_STATE_FORMAT_VERSION });

    // A whole-number decimal (a difficulty at its bound) is rewritten too: node-solid-server serves "10" as 10.0.
    const atBound = { ...repeat, memory: { ...repeat.memory!, difficulty: 10 } };
    await reviewStateRepository.saveReviewState(deck, atBound);
    await reviewStateRepository.saveReviewState(deck, repeat);
    await expect(reviewStateRepository.listReviewStates(deck)).resolves.toEqual([repeat]);
  });

  it("restores the morning's memory on a reset, and reschedules only due days", async () => {
    const { instanceUrl, deck, prompts } = await seed(server);
    const { useCases, reviewStateRepository } = app();
    const now = new Date();
    const morning = await useCases.recordReview(instanceUrl, deck, prompts[0]!, 4, new Date(now.getTime() - 5 * DAY));
    await useCases.recordReview(instanceUrl, deck, prompts[0]!, 5, now);
    await useCases.recordReview(instanceUrl, deck, prompts[1]!, 3, now);

    await expect(useCases.resetStudyDay(instanceUrl, deck, now)).resolves.toBe(2);
    const [restored, ...rest] = await reviewStateRepository.listReviewStates(deck);
    expect(rest).toEqual([]);
    expect(restored).toEqual(morning);

    await useCases.savePreferences(instanceUrl, { ...(await useCases.getPreferences(instanceUrl)), desiredRetention: 0.97 });
    const moved = await useCases.rescheduleWithFsrs(instanceUrl);
    expect(moved.sooner).toBe(1);
    const [rescheduled] = await reviewStateRepository.listReviewStates(deck);
    expect(rescheduled!.due < morning.due).toBe(true);
    expect({ ...rescheduled, due: morning.due, intervalDays: morning.intervalDays }).toEqual(morning);
  });
});
