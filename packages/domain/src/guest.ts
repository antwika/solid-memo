import type { StepPart } from "./deckUpgrade";
import type { Instance } from "./instance";
import { ensureTrailingSlash } from "./instanceLayout";
import type { Session } from "./session";

/**
 * Trying Solid Memo before logging in (docs/guest-mode.md): a guest
 * studies in a pod kept on their device, at an origin of its own. `.invalid`
 * is reserved and never resolves, so a guest URL that reached the network
 * by mistake would fail rather than go anywhere.
 */

/** Where the guest's pod lives: every guest URL starts with it. */
export const GUEST_ORIGIN = "https://guest.solid-memo.invalid/";

/** The guest's WebID, in a profile document of the guest's pod. */
export const GUEST_WEBID = `${GUEST_ORIGIN}profile/card#me`;

/** A guest's session: no login, the guest's WebID. */
export const GUEST_SESSION: Session = { webId: GUEST_WEBID, guest: true };

/** The instance a guest studies in, made when they start. */
export const GUEST_INSTANCE_URL = `${GUEST_ORIGIN}solid-memo/`;

/** Whether a URL is one of the guest's pod. */
export function isGuestUrl(url: string): boolean {
  return url.startsWith(GUEST_ORIGIN);
}

/**
 * Keeping a guest's study: their instance is copied into the pod they
 * logged in to, every IRI under it moved there and their WebID made the
 * guest's, then checked, registered in their type index, and only then
 * deleted from the device. A failure before the registration deletes the
 * copy and leaves the guest's study as it was.
 */
export const GUEST_TRANSFER_STEPS = ["stage", "copy", "adopt", "validate", "verify", "register", "tidy"] as const;

export type GuestTransferStep = (typeof GUEST_TRANSFER_STEPS)[number];

export interface GuestTransferProgress {
  step: GuestTransferStep;
  /** Steps finished, out of `total`. */
  done: number;
  total: number;
  /** How far into `step` it is; absent for a step done in one go. */
  part?: StepPart;
}

export type GuestTransferOutcome =
  /** The study is in the user's pod at `instance`; `tidied` says whether the guest's copy was deleted. */
  | { ok: true; instance: Instance; tidied: boolean }
  /**
   * Failed before the registration, at `step`: the guest's study is as it
   * was. `cleanedUp` says whether the partial copy was deleted; when it
   * was not, `leftoverUrl` is where it remains.
   */
  | { ok: false; step: GuestTransferStep; error: unknown; cleanedUp: boolean; leftoverUrl?: string };

/**
 * Where to suggest keeping a guest's study in a storage: `solid-memo/main/`,
 * as for any first instance, unless one of the user's instances is there
 * already; then a folder named for the day (YYYY-MM-DD).
 */
export function suggestedGuestLocation(storageUrl: string, taken: readonly string[], day: string): string {
  const base = ensureTrailingSlash(storageUrl);
  const main = `${base}solid-memo/main/`;
  return taken.map(ensureTrailingSlash).includes(main) ? `${base}solid-memo/guest-${day}/` : main;
}

/** What a guest has studied, to offer keeping: each of their instances, with its number of decks. */
export interface GuestStudy {
  instances: { instance: Instance; deckCount: number }[];
}
