import { z } from "zod";

export const instanceSchema = z.object({
  iri: z.string(),
  version: z.string(),
  name: z.string(),
  hasDeck: z.array(z.string()),
  isInPrivateTypeIndex: z.string(),
  hasSchedule: z.array(z.string()),
});

export type InstanceModel = z.infer<typeof instanceSchema>;

export function parseInstance(obj: object) {
  return instanceSchema.parse(obj);
}
