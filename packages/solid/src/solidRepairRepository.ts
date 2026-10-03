import {
  buildThing,
  getDatetime,
  getInteger,
  getStringNoLocale,
  getStringWithLocale,
  getTermAll,
  getThing,
  removeThing,
  setThing,
  type SolidDataset,
  type Thing,
} from "@inrupt/solid-client";
import type { RepairRepository } from "@solid-memo/application/ports";
import { defaultDeckDescription, defaultDeckDescriptionText } from "@solid-memo/domain/dcat";
import type { Repair, RepairKind } from "@solid-memo/domain/repair";
import { getSolidDatasetOrNull, saveDataset } from "./datasets";
import { DCTERMS, SM } from "./vocab";

const FOAF_NAME = "http://xmlns.com/foaf/0.1/name";
const SNAPSHOT = [
  SM.previousEaseFactor,
  SM.previousIntervalDays,
  SM.previousRepetitions,
  SM.previousDue,
  SM.previousLastReviewedAt,
];
const SNAPSHOT_MEMORY = [SM.previousStability, SM.previousStabilityFast, SM.previousDifficulty];
const MEMORY = [SM.stability, SM.stabilityFast, SM.difficulty];

/**
 * Repairs written to the pod (see docs/validation.md): each document is
 * read once, every repair of its subjects applied, and written once. A
 * repair only fills in or removes what its problem is about, so what
 * else a subject says survives; a subject that is gone is skipped.
 */
export function createSolidRepairRepository({
  fetch,
}: {
  fetch: typeof globalThis.fetch;
}): RepairRepository {
  return {
    async applyRepairs(repairs) {
      for (const documentUrl of [...new Set(repairs.map((r) => r.documentUrl))]) {
        const dataset = await getSolidDatasetOrNull(documentUrl, fetch);
        if (dataset === null) continue;
        const repaired = repairs
          .filter((r) => r.documentUrl === documentUrl)
          .reduce<SolidDataset>((current, repair) => applyRepair(current, repair), dataset);
        await saveDataset(documentUrl, repaired, fetch);
      }
    },
  };
}

function applyRepair(dataset: SolidDataset, repair: Repair): SolidDataset {
  const thing = getThing(dataset, repair.subjectUrl);
  if (thing === null) return dataset;
  if (repair.kind === "remove-subject") return removeThing(dataset, thing);
  return setThing(dataset, repairedThing(thing, { ...repair, kind: repair.kind }));
}

function repairedThing(
  thing: Thing,
  repair: Repair & { kind: Exclude<RepairKind, "remove-subject"> },
): Thing {
  const builder = buildThing(thing);
  switch (repair.kind) {
    case "describe-deck": {
      // Format 4 states text language-tagged, the app's own in English and Swedish.
      if (repair.version >= 4) {
        const en = getStringWithLocale(thing, DCTERMS.title, "en") ?? "a deck";
        const sv = getStringWithLocale(thing, DCTERMS.title, "sv");
        const description = defaultDeckDescriptionText(sv === null ? { en } : { en, sv });
        builder.removeAll(DCTERMS.description);
        for (const [language, text] of Object.entries(description)) {
          builder.addStringWithLocale(DCTERMS.description, text, language);
        }
        return builder.build();
      }
      const title = getStringNoLocale(thing, DCTERMS.title) ?? "a deck";
      return builder.setStringNoLocale(DCTERMS.description, defaultDeckDescription(title)).build();
    }
    case "direct-deck":
      // Format 2 said the direction as a string; format 3 as a concept.
      return repair.version < 3
        ? builder.setStringNoLocale(SM.direction, "front-to-back").build()
        : builder.removeAll(SM.direction).setIri(SM.studyDirection, SM.frontToBack).build();
    case "drop-snapshot": {
      // Whichever is half-written goes: the snapshot (its memory with it), the memory, or both.
      const stated = (predicates: string[]) => predicates.filter((p) => getTermAll(thing, p).length > 0).length;
      const snapshot = stated(SNAPSHOT);
      const snapshotMemory = stated(SNAPSHOT_MEMORY);
      const snapshotWhole =
        (snapshot === 0 || snapshot === SNAPSHOT.length) &&
        (snapshotMemory === 0 || (snapshotMemory === SNAPSHOT_MEMORY.length && snapshot === SNAPSHOT.length));
      const memory = stated(MEMORY);
      const dropped = [
        ...(snapshotWhole ? [] : [...SNAPSHOT, ...SNAPSHOT_MEMORY]),
        ...(memory === 0 || memory === MEMORY.length ? [] : MEMORY),
      ];
      return dropped.reduce((b, predicate) => b.removeAll(predicate), builder).build();
    }
    case "recompute-due": {
      const last = getDatetime(thing, SM.lastReviewedAt);
      const interval = getInteger(thing, SM.intervalDays);
      if (last === null || interval === null) return thing;
      const due = new Date(last.getTime() + interval * 86_400_000).toISOString().slice(0, 10);
      return builder.setStringNoLocale(SM.due, due).build();
    }
    case "name-agent": {
      const url = repair.subjectUrl;
      const name = url.includes("#") ? url.slice(url.indexOf("#") + 1) : url;
      return builder.setStringNoLocale(FOAF_NAME, name).build();
    }
  }
}
