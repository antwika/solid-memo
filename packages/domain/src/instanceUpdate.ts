import { ensureTrailingSlash } from "./instanceLayout";

/**
 * The format update of an instance, done safely (see docs/migrations.md):
 * the instance is copied into a new sibling container, the copy is
 * brought up to this app's formats and validated, and only then are the
 * type index registrations switched to it. The original is never
 * written; it stays in the pod as a backup. A failure before the switch
 * deletes the copy.
 */

export type UpdateStep =
  | "stage"
  | "access"
  | "copy"
  | "upgrade"
  | "validate"
  | "verify"
  | "switch";

export const UPDATE_STEP_LABELS: Record<UpdateStep, string> = {
  stage: "Preparing a new copy",
  access: "Copying who may access it",
  copy: "Copying documents",
  upgrade: "Updating the copy's formats",
  validate: "Checking the new copy",
  verify: "Checking nothing changed meanwhile",
  switch: "Switching over to the new copy",
};

export interface UpdateProgress {
  step: UpdateStep;
  /** Units of work done, out of `total`: documents copied, steps finished. */
  done: number;
  total: number;
}

export type UpdateOutcome =
  /** Switched over: the instance now lives at `instanceUrl`; `backupUrl` is the original. */
  | { ok: true; instanceUrl: string; backupUrl: string }
  /**
   * Failed before switching over, at `step`: the original is untouched.
   * `cleanedUp` says whether the partial copy was deleted; when it was
   * not, `leftoverUrl` is where it remains. `error` is what went wrong: an
   * AppError the app can show in the reader's language, or any other error.
   */
  | { ok: false; step: UpdateStep; error: unknown; cleanedUp: boolean; leftoverUrl?: string };

/** The container an update copies an instance into: a sibling, `…/main/` → `…/main-<uuid>/`. */
export function stagingUrlOf(sourceUrl: string, uuid: string): string {
  return `${ensureTrailingSlash(sourceUrl).replace(/\/$/, "")}-${uuid}/`;
}

/** An IRI under the `from` container moved under `to`; any other IRI as it is. */
export function rebaseIri(iri: string, from: string, to: string): string {
  const source = ensureTrailingSlash(from);
  return iri.startsWith(source) ? `${ensureTrailingSlash(to)}${iri.slice(source.length)}` : iri;
}
