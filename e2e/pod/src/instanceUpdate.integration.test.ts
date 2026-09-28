// @vitest-environment node
/**
 * The format update against a real Solid server (docs/migrations.md): the
 * app's own use cases and Solid adapters, wired as in main.tsx, with every
 * HTTP request recorded. `npm run test:pod` starts a Community Solid
 * Server for them (globalSetup.ts), unless SOLID_SERVER_URL names one
 * (see docs/testing.md).
 */
import { readFile } from "node:fs/promises";
import { describe, expect, inject, it } from "vitest";
import { VOCAB_ROOT } from "@solid-memo/vocab/tooling/root";
import { createUseCases, type UseCases } from "@solid-memo/application/useCases";
import type { Instance } from "@solid-memo/domain/instance";
import { createShaclShapeValidator } from "@solid-memo/solid/shaclShapeValidator";
import { createSolidDeckRepository } from "@solid-memo/solid/solidDeckRepository";
import { createSolidInstanceCopier } from "@solid-memo/solid/solidInstanceCopier";
import { createSolidInstanceRepository } from "@solid-memo/solid/solidInstanceRepository";
import { createSolidPreferencesRepository } from "@solid-memo/solid/solidPreferencesRepository";
import { createSolidRepairRepository } from "@solid-memo/solid/solidRepairRepository";
import { createSolidReviewStateRepository } from "@solid-memo/solid/solidReviewStateRepository";
import { createSolidWebIdDocumentRepository } from "@solid-memo/solid/solidWebIdDocumentRepository";
import { createWriteFence } from "@solid-memo/solid/writeFence";

const SERVER = inject("solidServerUrl");
const SITE = "https://solid-memo.test/";
const READS = new Set(["GET", "HEAD", "OPTIONS"]);
const PREFIXES = `@prefix sm: <https://solid-memo.com/vocab/v1#> .
@prefix dcterms: <http://purl.org/dc/terms/> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix acl: <http://www.w3.org/ns/auth/acl#> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix solid: <http://www.w3.org/ns/solid/terms#> .
`;
const FRIEND = "https://bob.example/profile/card#me";
/** A PNG's first bytes and some that are not valid UTF-8: a file Solid Memo does not know, which must survive byte for byte. */
const PICTURE = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0xff, 0xfe, 0x00, 0x80]);

interface Pod {
  base: string;
  webId: string;
  typeIndex: string;
  source: string;
  instance: Instance;
}

interface Recorded {
  method: string;
  url: string;
  ifMatch: string | null;
  ifNoneMatch: string | null;
  /** The pod's answer, once it came. */
  status?: number;
}

/** A user's pod in a fresh folder of the server: a profile, a private type index and a format-1/2 instance. */
async function seedPod(): Promise<Pod> {
  const base = new URL(`run-${crypto.randomUUID()}/`, SERVER).href;
  const webId = `${base}profile/card#me`;
  const typeIndex = `${base}settings/privateTypeIndex.ttl`;
  const source = `${base}solid-memo/main/`;
  const put = async (url: string, body: string | Blob, type = "text/turtle") => {
    const response = await fetch(url, { method: "PUT", headers: { "content-type": type }, body });
    if (!response.ok) throw new Error(`Seeding ${url}: ${response.status}`);
  };
  await put(
    `${base}profile/card`,
    `${PREFIXES}<#me> a foaf:Person ; foaf:name "Alice" ; solid:privateTypeIndex <${typeIndex}> .`,
  );
  await put(
    typeIndex,
    `${PREFIXES}<> a solid:TypeIndex, solid:UnlistedDocument .
<#main> a solid:TypeRegistration ; solid:forClass sm:Instance ;
    solid:instanceContainer <${source}> ; dcterms:title "Main" .`,
  );
  await put(
    `${source}meta.ttl`,
    `${PREFIXES}<#it> a sm:Instance ; dcterms:title "Main" ; sm:formatVersion 1 ;
    dcterms:created "2026-09-21T10:00:00Z"^^xsd:dateTime .`,
  );
  await put(
    `${source}catalog.ttl`,
    `${PREFIXES}<#deck-1> a sm:Deck ; dcterms:title "Capitals" ; sm:formatVersion 2 ;
    sm:direction "bidirectional" ;
    sm:cardsDocument <${source}decks/deck-1.ttl> ;
    sm:reviewsDocument <${source}reviews/deck-1.ttl> .`,
  );
  await put(
    `${source}decks/deck-1.ttl`,
    `${PREFIXES}<#se> a sm:Card ; sm:front "Sweden" ; sm:back "Stockholm" .
<#no> a sm:Card ; sm:front "Norway" ; sm:back "Oslo" ; sm:formatVersion 1 ;
    dcterms:created "2026-09-21T10:00:00Z"^^xsd:dateTime .`,
  );
  await put(
    `${source}reviews/deck-1.ttl`,
    `${PREFIXES}<#se> a sm:ReviewState ; sm:easeFactor 2.5 ; sm:intervalDays 6 ; sm:repetitions 2 ;
    sm:due "2026-09-28" ; sm:firstReviewedAt "2026-09-20T10:00:00Z"^^xsd:dateTime ;
    sm:lastReviewedAt "2026-09-22T10:00:00Z"^^xsd:dateTime .`,
  );
  await put(
    `${source}preferences.ttl`,
    `${PREFIXES}<#it> a sm:Preferences ; sm:newCardsPerDay 20 ; sm:maxReviewsPerDay 200 ; sm:dayBoundaryHour 4 .`,
  );
  await put(`${source}attachments/picture.png`, new Blob([PICTURE]), "image/png");
  // Shared: the instance with a friend, and one deck's cards with the friend alone.
  const everyone = (target: string, inherit: boolean) => `
<#public> a acl:Authorization ; acl:agentClass foaf:Agent ; acl:accessTo <${target}> ;
    ${inherit ? `acl:default <${target}> ;` : ""} acl:mode acl:Read, acl:Write, acl:Control .
<#friend> a acl:Authorization ; acl:agent <${FRIEND}> ; acl:accessTo <${target}> ;
    ${inherit ? `acl:default <${target}> ;` : ""} acl:mode acl:Read .`;
  await put(`${source}.acl`, `${PREFIXES}${everyone(source, true)}`);
  await put(`${source}decks/deck-1.ttl.acl`, `${PREFIXES}${everyone(`${source}decks/deck-1.ttl`, false)}`);
  return { base, webId, typeIndex, source, instance: { url: source, name: "Main" } };
}

/** The app as main.tsx wires it, over a fetch that records every request, with the shapes read from this repository. */
function app(pod: Pod, options: { failOn?: (request: Recorded) => boolean; onRequest?: (request: Recorded) => Promise<void> } = {}) {
  // The recording sits outside the fence: it sees what the app attempts, not only what gets through.
  const writeFence = createWriteFence(fetch);
  const attempts: Recorded[] = [];
  const attemptingFetch: typeof fetch = async (input, init) => {
    const request = input instanceof Request ? input : undefined;
    const headers = new Headers(init?.headers ?? request?.headers);
    const recorded: Recorded = {
      method: (init?.method ?? request?.method ?? "GET").toUpperCase(),
      url: request?.url ?? String(input),
      ifMatch: headers.get("If-Match"),
      ifNoneMatch: headers.get("If-None-Match"),
    };
    attempts.push(recorded);
    await options.onRequest?.(recorded);
    if (options.failOn?.(recorded)) return new Response("injected failure", { status: 500 });
    const response = await writeFence.fetch(input, init);
    recorded.status = response.status;
    return response;
  };
  const shapesFetch: typeof fetch = async (input) => {
    const path = new URL(String(input)).pathname.slice(1);
    return new Response(await readFile(`${VOCAB_ROOT}${path}`, "utf8"), {
      headers: { "content-type": "text/turtle" },
    });
  };
  const shapeValidator = createShaclShapeValidator({
    fetch: attemptingFetch,
    shapesFetch,
    shapesBaseUrl: `${SITE}shapes/`,
  });
  const checkWrite = shapeValidator.checkSubjects;
  const useCases: UseCases = createUseCases({
    sessionGateway: undefined as never,
    storageGateway: undefined as never,
    deckLibrary: undefined as never,
    webIdDocumentRepository: createSolidWebIdDocumentRepository({ fetch: attemptingFetch }),
    instanceRepository: createSolidInstanceRepository({
      fetch: attemptingFetch,
      checkWrite,
      now: () => new Date(),
      randomId: () => crypto.randomUUID(),
    }),
    deckRepository: createSolidDeckRepository({
      fetch: attemptingFetch,
      checkWrite,
      now: () => new Date(),
      randomId: () => crypto.randomUUID(),
    }),
    preferencesRepository: createSolidPreferencesRepository({ fetch: attemptingFetch, checkWrite }),
    reviewStateRepository: createSolidReviewStateRepository({ fetch: attemptingFetch, checkWrite }),
    shapeValidator,
    repairRepository: createSolidRepairRepository({ fetch: attemptingFetch }),
    instanceCopier: createSolidInstanceCopier({ fetch: attemptingFetch }),
    writeFence,
  });
  return { useCases, attempts, podFetch: attemptingFetch, session: { webId: pod.webId } };
}

/** Every resource under a container, ACL documents included, as the server serves it: bytes, type and ETag. */
async function snapshot(container: string): Promise<Map<string, string>> {
  const result = new Map<string, string>();
  const visit = async (url: string) => {
    const response = await fetch(url, { headers: { accept: "text/turtle" } });
    if (response.status === 404) return;
    const body = new Uint8Array(await response.arrayBuffer());
    result.set(url, `${response.headers.get("content-type")} ${response.headers.get("etag")} ${Buffer.from(body).toString("base64")}`);
    const acl = /<([^>]+)>;\s*rel="acl"/.exec(response.headers.get("link") ?? "")?.[1];
    if (acl !== undefined && !result.has(acl)) {
      const aclResponse = await fetch(acl);
      if (aclResponse.ok) result.set(acl, await aclResponse.text());
    }
    if (url.endsWith("/")) {
      const listing = new TextDecoder().decode(body);
      const children = [...listing.matchAll(/<([^>]+)>/g)]
        .map((match) => new URL(match[1]!, url).href)
        .filter((child) => child.startsWith(url) && child !== url && !child.includes("#"));
      for (const child of [...new Set(children)].sort()) await visit(child);
    }
  };
  await visit(container);
  return result;
}

const isWrite = (request: Recorded) => !READS.has(request.method);
const under = (container: string) => (request: Recorded) => decodeURI(new URL(request.url).href).startsWith(container);

/** A document as N-Triples: every IRI written out in full, whatever the server's Turtle abbreviates. */
async function triples(url: string): Promise<string> {
  return fetch(url, { headers: { accept: "application/n-triples" } }).then((response) => response.text());
}

async function registeredContainers(pod: Pod): Promise<string> {
  return triples(pod.typeIndex);
}

describe("the format update on a real Solid server", () => {
  it("writes nothing to the instance it updates: the copy is completed and checked before the type index moves", async () => {
    const pod = await seedPod();
    const before = await snapshot(pod.source);
    const indexBefore = await registeredContainers(pod);
    const { useCases, attempts, session } = app(pod);

    expect((await useCases.planMigration(pod.source)).deckCount).toBe(1);
    const outcome = await useCases.updateInstance(session, pod.instance);
    expect(outcome, JSON.stringify(outcome)).toMatchObject({ ok: true, backupUrl: pod.source });
    const target = (outcome as { instanceUrl: string }).instanceUrl;
    expect(target).toMatch(new RegExp(`^${pod.base}solid-memo/main-[0-9a-f-]{36}/$`));

    // Not one write was so much as attempted on the original…
    expect(attempts.filter(isWrite).filter(under(pod.source))).toEqual([]);
    // …which is byte for byte what it was, ACLs included.
    expect(await snapshot(pod.source)).toEqual(before);

    // Every write went to the copy, but for the type index; and the type index was written last.
    const writes = attempts.filter(isWrite);
    const indexWrites = writes.filter((request) => request.url === pod.typeIndex);
    expect(writes.filter((request) => !under(target)(request) && request.url !== pod.typeIndex)).toEqual([]);
    expect(indexWrites.length).toBeGreaterThan(0);
    const firstIndexWrite = attempts.indexOf(indexWrites[0]!);
    expect(attempts.slice(firstIndexWrite).filter(isWrite).every((request) => request.url === pod.typeIndex)).toBe(true);
    // The copy was checked in full before the switch: its documents were read after the last write to it.
    const lastCopyWrite = attempts.lastIndexOf(writes.filter(under(target)).at(-1)!);
    const checked = attempts.slice(lastCopyWrite, firstIndexWrite).filter((request) => request.method === "GET").map((r) => r.url);
    expect(checked).toEqual(expect.arrayContaining([`${target}meta.ttl`, `${target}catalog.ttl`, `${target}decks/deck-1.ttl`]));

    // Every write was conditional: a creation only where nothing was
    // (If-None-Match: *), an edit only of the version read (If-Match).
    for (const write of writes) {
      if (write.method === "PUT") expect(write.ifNoneMatch, `${write.method} ${write.url}`).toBe("*");
      if (write.method === "PATCH") expect(write.ifMatch, `${write.method} ${write.url}`).toMatch(/^"/);
    }
    // And the check that nothing changed asked the pod about each version copied, which said 304.
    const verified = attempts.filter((r) => r.method === "HEAD" && r.ifNoneMatch !== null && r.ifNoneMatch !== "*");
    expect(verified.length).toBeGreaterThan(0);
    expect(verified.every((r) => r.status === 304 && under(pod.source)(r))).toBe(true);

    // The type index now names the copy, and the original is gone from it.
    const indexAfter = await registeredContainers(pod);
    expect(indexBefore).toContain(pod.source);
    expect(indexAfter).toContain(target);
    expect(indexAfter).not.toContain(`<${pod.source}>`);

    // The copy: updated, conforming, what it replaces recorded, the unknown file intact, access rebased.
    expect(await useCases.planMigration(target)).toMatchObject({ deckCount: 0, cardCount: 0, reviewCount: 0 });
    expect((await useCases.validateInstance(target)).conforms).toBe(true);
    expect(await triples(`${target}meta.ttl`)).toContain(`<http://purl.org/dc/terms/replaces> <${pod.source}>`);
    const picture: ArrayBuffer = await (await fetch(`${target}attachments/picture.png`)).arrayBuffer();
    expect(new Uint8Array(picture)).toEqual(PICTURE);
    for (const acl of [`${target}.acl`, `${target}decks/deck-1.ttl.acl`]) {
      const text = await triples(acl);
      expect(text).toContain(FRIEND);
      expect(text).toContain(target);
      expect(text).not.toContain(pod.source);
    }
    expect(await fetch(`${target}reviews/deck-1.ttl.acl`).then((r) => r.status)).toBe(404);

    // The backup is the original; restoring it switches back and removes the copy.
    await expect(useCases.readBackup({ url: target, name: "Main" })).resolves.toMatchObject({ url: pod.source });
    await expect(useCases.restoreBackup(session, { url: target, name: "Main" })).resolves.toEqual(pod.instance);
    expect(await registeredContainers(pod)).toContain(pod.source);
    expect(await fetch(target).then((r) => r.status)).toBe(404);
    expect(await snapshot(pod.source)).toEqual(before);
  }, 60_000);

  it("refuses, in this tab, any write to the original while the update runs", async () => {
    const pod = await seedPod();
    let refused: unknown = null;
    let tried = false;
    const { useCases, session, podFetch } = app(pod, {
      onRequest: async (request) => {
        if (tried || !request.url.includes("/solid-memo/main-")) return;
        tried = true;
        refused = await podFetch(`${pod.source}meta.ttl`, { method: "DELETE" }).then(
          () => null,
          (error: unknown) => error,
        );
      },
    });
    expect(await useCases.updateInstance(session, pod.instance)).toMatchObject({ ok: true });
    expect(String(refused)).toContain("writes nothing to it until the update is over");
    expect(await fetch(`${pod.source}meta.ttl`).then((r) => r.status)).toBe(200);
  }, 60_000);

  it.each([
    ["copying a document", (target: string) => (r: Recorded) => r.method === "PUT" && r.url === `${target}decks/deck-1.ttl`],
    ["copying access control", (target: string) => (r: Recorded) => r.method === "PUT" && r.url === `${target}decks/deck-1.ttl.acl`],
    ["updating the copy", (target: string) => (r: Recorded) => r.method === "PATCH" && r.url.startsWith(`${target}reviews/`)],
    ["switching the type index", () => (r: Recorded) => isWrite(r) && r.url.includes("/settings/")],
  ])("leaves no trace when %s fails", async (_what, failOn) => {
    const pod = await seedPod();
    const before = await snapshot(pod.source);
    const indexBefore = await registeredContainers(pod);
    let target = "";
    const { useCases, session, attempts } = app(pod, {
      failOn: (request) => {
        const staging = /^(.*\/solid-memo\/main-[0-9a-f-]{36}\/)/.exec(request.url)?.[1];
        if (staging !== undefined) target = staging;
        return target !== "" && failOn(target)(request);
      },
    });
    const outcome = await useCases.updateInstance(session, pod.instance);
    expect(outcome).toMatchObject({ ok: false, cleanedUp: true });
    expect(target).not.toBe("");
    expect(attempts.filter(isWrite).filter(under(pod.source))).toEqual([]);
    expect(await snapshot(pod.source)).toEqual(before);
    expect(await registeredContainers(pod)).toBe(indexBefore);
    expect(await fetch(target).then((r) => r.status)).toBe(404);
  }, 60_000);

  it("gives up, and leaves no trace, when another app changes what was already copied", async () => {
    const pod = await seedPod();
    const indexBefore = await registeredContainers(pod);
    let changed = false;
    const { useCases, session } = app(pod, {
      onRequest: async (request) => {
        // While the last document is copied, another tab studies: a write straight to the pod, which
        // this tab's fence knows nothing of, to a document the update has copied already.
        if (changed || !(isWrite(request) && /main-[0-9a-f-]{36}\/reviews\/deck-1\.ttl$/.test(request.url))) return;
        changed = true;
        const response = await fetch(`${pod.source}decks/deck-1.ttl`, {
          method: "PATCH",
          headers: { "content-type": "text/n3" },
          body: `@prefix solid: <http://www.w3.org/ns/solid/terms#>. _:p a solid:InsertDeletePatch; solid:inserts { <#se> <https://solid-memo.com/vocab/v1#note> "studied in another tab" . }.`,
        });
        expect(response.ok).toBe(true);
      },
    });
    const outcome = await useCases.updateInstance(session, pod.instance);
    expect(changed).toBe(true);
    expect(outcome).toMatchObject({ ok: false, step: "verify", cleanedUp: true });
    expect((outcome as { error: string }).error).toContain("decks/deck-1.ttl> changed while it was being copied");
    expect(await registeredContainers(pod)).toBe(indexBefore);
    expect(await triples(`${pod.source}decks/deck-1.ttl`)).toContain("studied in another tab");
  }, 60_000);

  it("refuses a copy where something appeared meanwhile, and leaves no trace", async () => {
    const pod = await seedPod();
    const before = await snapshot(pod.source);
    const indexBefore = await registeredContainers(pod);
    let squatted = "";
    const { useCases, session } = app(pod, {
      onRequest: async (request) => {
        const target = /^(.*\/solid-memo\/main-[0-9a-f-]{36}\/)catalog\.ttl$/.exec(request.url)?.[1];
        if (squatted !== "" || target === undefined || request.method !== "PUT") return;
        squatted = `${target}catalog.ttl`;
        await fetch(squatted, { method: "PUT", headers: { "content-type": "text/turtle" }, body: "<#x> <#y> <#z> ." });
      },
    });
    const outcome = await useCases.updateInstance(session, pod.instance);
    expect(outcome).toMatchObject({ ok: false, step: "copy", cleanedUp: true });
    expect((outcome as { error: string }).error).toBe(
      `${squatted} was created elsewhere (in another tab or app?) while Solid Memo was about to create it, so nothing was saved. Reload and try again.`,
    );
    expect(await snapshot(pod.source)).toEqual(before);
    expect(await registeredContainers(pod)).toBe(indexBefore);
  });

  it("never overwrites a change made since the document was read: the save fails, the change stays", async () => {
    const pod = await seedPod();
    let interfered = false;
    const { useCases } = app(pod, {
      onRequest: async (request) => {
        if (interfered || request.method !== "PATCH" || request.url !== `${pod.source}preferences.ttl`) return;
        interfered = true;
        // Another tab saves the preferences first.
        const response = await fetch(`${pod.source}preferences.ttl`, {
          method: "PATCH",
          headers: { "content-type": "text/n3" },
          body: `@prefix solid: <http://www.w3.org/ns/solid/terms#>. _:p a solid:InsertDeletePatch; solid:inserts { <#it> <https://solid-memo.com/vocab/v1#note> "saved in another tab" . }.`,
        });
        expect(response.ok).toBe(true);
      },
    });
    const preferences = await useCases.getPreferences(pod.source);
    await expect(useCases.savePreferences(pod.source, { ...preferences, newCardsPerDay: 7 })).rejects.toThrow(
      `${pod.source}preferences.ttl was changed elsewhere (in another tab or app?) since Solid Memo read it, so nothing was saved.`,
    );
    const stored = await triples(`${pod.source}preferences.ttl`);
    expect(stored).toContain("saved in another tab");
    expect(stored).not.toContain('"7"');
    // Read again, the save goes through.
    await useCases.savePreferences(pod.source, { ...preferences, newCardsPerDay: 7 });
    expect(await triples(`${pod.source}preferences.ttl`)).toMatch(/newCardsPerDay> "?7/);
  });
});
