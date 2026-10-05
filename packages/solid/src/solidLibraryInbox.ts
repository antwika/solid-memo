import type { LibraryInbox } from "@solid-memo/application/ports";
import { AppError } from "@solid-memo/domain/appError";
import { turtleOfThings } from "./datasets";
import { toNoticeThings } from "./mappers/libraryStatsMapper";

/** Where a notice's subjects are named while it is built; it is sent with them relative (`<#notice>`). */
const DRAFT = "urn:solid-memo:library-notice";

/**
 * Notices to the deck library's inbox (docs/library-stats.md): each an
 * ActivityStreams activity in a Turtle document of its own, `<#notice>`
 * (with `<#like>`, the like an undo undoes), POSTed to the inbox
 * container with the user's authenticated fetch, so only people with a
 * Solid login can send one. The inbox's server names the document.
 */
export function createSolidLibraryInbox({ fetch }: { fetch: typeof globalThis.fetch }): LibraryInbox {
  return {
    async notify(inboxUrl, notice) {
      const response = await fetch(inboxUrl, {
        method: "POST",
        headers: { "Content-Type": "text/turtle" },
        body: turtleOfThings(toNoticeThings(`${DRAFT}#notice`, `${DRAFT}#like`, notice), DRAFT),
      });
      if (!response.ok) throw new AppError("libraryNoticeFailed", { url: inboxUrl, status: response.status });
    },
  };
}
