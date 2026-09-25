import type { Thing, ThingPersisted } from "@inrupt/solid-client";
import type { Instance, InstanceMeta } from "../../../domain/instance";
import { ensureTrailingSlash } from "../../../domain/instanceLayout";
import { instanceMetaFromRecord, instanceMetaToRecord } from "../../../domain/instanceRecord";
import { migrate } from "../../../domain/shapes/migrations";
import { INSTANCE_V1 } from "../../shacl/shapes.generated";
import { readVersioned, recordThing } from "../records";
import type { InstanceRegistration } from "../typeIndex";
import { lastPathSegment } from "../urls";

/**
 * A registration's display name is its dcterms:title, falling back to the
 * container's last path segment.
 */
export function toInstance(registration: InstanceRegistration): Instance {
  const url = ensureTrailingSlash(registration.containerUrl);
  return {
    url,
    name: registration.title ?? lastPathSegment(url),
  };
}

/** The meta document's subject as an InstanceMeta; null when it does not fit. */
export function toInstanceMeta(thing: Thing): InstanceMeta | null {
  const read = readVersioned(thing, "instance");
  if (read === null) return null;
  return instanceMetaFromRecord(read.storedVersion, migrate("instance", read.record));
}

/** The meta subject as this app writes it, in place when it exists. */
export function toInstanceMetaThing(
  url: string,
  meta: InstanceMeta,
  existing: ThingPersisted | null,
): ThingPersisted {
  return recordThing(url, INSTANCE_V1, instanceMetaToRecord(meta), existing);
}
