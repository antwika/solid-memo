import { describe, expect, it } from "vitest";
import { createSolidLibraryCounterStore } from "./solidLibraryCounterStore";
import { createSolidLibraryInbox } from "./solidLibraryInbox";

const INBOX = "https://library.example/inbox/";
const STATE = "https://library.example/private/state.ttl";
const SM = "https://solid-memo.com/vocab/v1#";
const notice = {
  action: "like" as const,
  by: "https://alice.example/profile/card#me",
  deckUrl: "https://solid-memo.com/decks/index.ttl#world-flags",
  at: "2026-10-05T10:00:00.000Z",
};

/** An inbox container as an LDN inbox is: notices POSTed in, listed, read and deleted; and one JSON document. */
function libraryPod() {
  const resources = new Map<string, { type: string; body: string }>();
  let next = 0;
  const failures = new Map<string, number>();
  /** What else the inbox's listing names: itself, say, or something outside it. */
  const strays: string[] = [];
  const fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const method = init?.method ?? "GET";
    const respond = (status: number, body: string | null = null, type = "text/turtle") => {
      const response = new Response(body, { status, headers: body === null ? {} : { "Content-Type": type } });
      Object.defineProperty(response, "url", { value: url });
      return response;
    };
    const failure = failures.get(`${method} ${url}`);
    if (failure !== undefined) {
      failures.delete(`${method} ${url}`);
      return respond(failure, "");
    }
    if (method === "POST") {
      const created = `${url}notice-${++next}`;
      resources.set(created, { type: "text/turtle", body: String(init!.body) });
      return respond(201);
    }
    if (method === "PUT") {
      resources.set(url, { type: new Headers(init!.headers).get("Content-Type")!, body: String(init!.body) });
      return respond(201);
    }
    if (method === "DELETE") {
      if (!resources.delete(url)) return respond(404, "");
      return respond(205);
    }
    if (url === INBOX) {
      const contained = [...resources.keys()].filter((key) => key.startsWith(INBOX)).concat(strays);
      return respond(200, contained.map((child) => `<> <http://www.w3.org/ns/ldp#contains> <${child}> .`).join("\n"));
    }
    const resource = resources.get(url);
    return resource === undefined ? respond(404, "") : respond(200, resource.body, resource.type);
  }) as typeof globalThis.fetch;
  return {
    fetch,
    resources,
    strays,
    failNext(method: string, url: string, status: number) {
      failures.set(`${method} ${url}`, status);
    },
  };
}

describe("the library counter's store", () => {
  it("lists, reads and deletes the notices the app sends", async () => {
    const pod = libraryPod();
    await createSolidLibraryInbox({ fetch: pod.fetch }).notify(INBOX, notice);
    pod.resources.set(`${INBOX}junk`, { type: "text/turtle", body: `<#x> <${SM}formatVersion> 1 .` });
    const store = createSolidLibraryCounterStore({ fetch: pod.fetch });
    const urls = await store.listNotices(INBOX);
    expect(urls).toEqual([`${INBOX}junk`, `${INBOX}notice-1`]);
    expect(await store.readNotice(`${INBOX}notice-1`)).toEqual(notice);
    expect(await store.readNotice(`${INBOX}junk`)).toBeNull();
    expect(await store.readNotice(`${INBOX}gone`)).toBeNull();
    for (const url of urls) await store.deleteNotice(url);
    await store.deleteNotice(`${INBOX}notice-1`);
    expect(await store.listNotices(INBOX)).toEqual([]);
  });

  it("lists no notices of an inbox that is not there, and passes on any other failure to list it", async () => {
    const store = createSolidLibraryCounterStore({ fetch: libraryPod().fetch });
    expect(await store.listNotices("https://library.example/elsewhere/")).toEqual([]);
    const pod = libraryPod();
    pod.failNext("GET", INBOX, 500);
    await expect(createSolidLibraryCounterStore({ fetch: pod.fetch }).listNotices(INBOX)).rejects.toThrow();
  });

  it("lists only the documents directly in the inbox", async () => {
    const pod = libraryPod();
    pod.resources.set(`${INBOX}sub/`, { type: "text/turtle", body: "" });
    pod.strays.push(INBOX, "https://elsewhere.example/notice");
    expect(await createSolidLibraryCounterStore({ fetch: pod.fetch }).listNotices(INBOX)).toEqual([]);
  });

  it("passes on a failure to delete other than the notice being gone", async () => {
    const pod = libraryPod();
    pod.failNext("DELETE", `${INBOX}notice-1`, 403);
    await expect(createSolidLibraryCounterStore({ fetch: pod.fetch }).deleteNotice(`${INBOX}notice-1`)).rejects.toThrow();
  });

  it("keeps its tally as Turtle, empty until saved", async () => {
    const pod = libraryPod();
    const store = createSolidLibraryCounterStore({ fetch: pod.fetch });
    expect(await store.readTally(STATE)).toEqual([]);
    const tally = [{ person: "k", deckUrl: notice.deckUrl, importedAt: notice.at, like: { liked: false, at: notice.at } }];
    await store.saveTally(STATE, tally);
    expect(pod.resources.get(STATE)!.type).toBe("text/turtle");
    expect(pod.resources.get(STATE)!.body).toContain("<#person-k>");
    expect(await store.readTally(STATE)).toEqual(tally);
  });

  it("fails when its tally cannot be read or saved", async () => {
    const pod = libraryPod();
    const store = createSolidLibraryCounterStore({ fetch: pod.fetch });
    pod.failNext("GET", STATE, 500);
    await expect(store.readTally(STATE)).rejects.toThrow();
    pod.failNext("PUT", STATE, 403);
    await expect(store.saveTally(STATE, [])).rejects.toThrow("Saving the counter's tally at");
  });
});
