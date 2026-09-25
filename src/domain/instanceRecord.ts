import type { InstanceMeta } from "./instance";
import type { InstanceV1 } from "./shapes/generated";

/** An instance's meta document between its shape record and the model. */
export function instanceMetaFromRecord(storedVersion: number, data: InstanceV1): InstanceMeta {
  return { name: data.title, createdAt: data.created, formatVersion: storedVersion };
}

export function instanceMetaToRecord(meta: InstanceMeta): InstanceV1 {
  return { title: meta.name, created: meta.createdAt };
}
