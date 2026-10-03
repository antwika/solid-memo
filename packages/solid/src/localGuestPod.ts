import type { GuestPod, ResourceStore } from "@solid-memo/application/ports";
import { AppError } from "@solid-memo/domain/appError";
import { GUEST_ORIGIN, GUEST_WEBID } from "@solid-memo/domain/guest";

const PROFILE_URL = GUEST_WEBID.split("#")[0]!;

/**
 * The guest's pod (docs/guest-mode.md), kept in `store` and served by
 * `fetch` (createLocalPod over the same store). Starting it writes the
 * guest's WebID profile, naming the pod's root as its storage; the
 * instance and its type index are made as on any pod, by the use cases.
 */
export function createLocalGuestPod({
  fetch,
  store,
}: {
  fetch: typeof globalThis.fetch;
  store: ResourceStore;
}): GuestPod {
  return {
    async exists() {
      return (await store.get(PROFILE_URL)) !== undefined;
    },
    async start() {
      const response = await fetch(PROFILE_URL, {
        method: "PUT",
        headers: { "Content-Type": "text/turtle", "If-None-Match": "*" },
        body: [
          "@prefix foaf: <http://xmlns.com/foaf/0.1/> .",
          "@prefix pim: <http://www.w3.org/ns/pim/space#> .",
          `<#me> a foaf:Person ; foaf:name "Guest" ; pim:storage <${GUEST_ORIGIN}> .`,
        ].join("\n"),
      });
      // 412: started already (in another tab, say).
      if (!response.ok && response.status !== 412) {
        throw new AppError("guestPodStartFailed", { status: response.status });
      }
    },
    discard: () => store.clear(),
  };
}
