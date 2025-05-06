import { z } from "zod";

export const scheduleSchema = z.object({
  iri: z.string(),
  version: z.string(),
  interval: z.number(),
  repetition: z.number(),
  easeFactor: z.number(),
  lastReviewed: z.string().date(),
  nextReview: z.string().date(),
});

export type ScheduleModel = z.infer<typeof scheduleSchema>;

export function parseSchedule(obj: object) {
  return scheduleSchema.parse(obj);
}
