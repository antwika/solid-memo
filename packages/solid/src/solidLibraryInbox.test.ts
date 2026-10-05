import { describe, expect, it, vi } from "vitest";
import { AppError } from "@solid-memo/domain/appError";
import { createSolidLibraryInbox } from "./solidLibraryInbox";

const INBOX = "https://library.example/inbox/";
const SM = "https://solid-memo.com/vocab/v1#";
const AS = "https://www.w3.org/ns/activitystreams#";
const notice = {
  action: "unlike" as const,
  by: "https://alice.example/profile/card#me",
  deckUrl: "https://solid-memo.com/decks/index.ttl#world-flags",
  at: "2026-10-05T10:00:00.000Z",
};

describe("the library's inbox", () => {
  it("is sent each notice as a Turtle document of its own: an as:Undo <#notice> of the as:Like <#like>", async () => {
    const fetch = vi.fn(async () => new Response("", { status: 201 }));
    await createSolidLibraryInbox({ fetch }).notify(INBOX, notice);
    expect(fetch).toHaveBeenCalledOnce();
    const [url, init] = fetch.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe(INBOX);
    expect(init.method).toBe("POST");
    expect(new Headers(init.headers).get("Content-Type")).toBe("text/turtle");
    const lines = String(init.body).trim().split("\n").sort();
    expect(lines).toEqual(
      [
        `<#notice> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <${AS}Undo> .`,
        `<#notice> <${SM}formatVersion> "1"^^<http://www.w3.org/2001/XMLSchema#integer> .`,
        `<#notice> <${AS}actor> <${notice.by}> .`,
        `<#notice> <${AS}object> <#like> .`,
        `<#notice> <${AS}published> "2026-10-05T10:00:00.000Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> .`,
        `<#like> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <${AS}Like> .`,
        `<#like> <${SM}formatVersion> "1"^^<http://www.w3.org/2001/XMLSchema#integer> .`,
        `<#like> <${AS}actor> <${notice.by}> .`,
        `<#like> <${AS}object> <${notice.deckUrl}> .`,
      ].sort(),
    );
  });

  it("fails when the inbox does not take it", async () => {
    const fetch = vi.fn(async () => new Response("", { status: 403 }));
    const sent = createSolidLibraryInbox({ fetch }).notify(INBOX, notice);
    await expect(sent).rejects.toBeInstanceOf(AppError);
    await expect(sent).rejects.toMatchObject({ code: "libraryNoticeFailed" });
  });
});
