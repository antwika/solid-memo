import { z } from "zod";

export const scheduleSchema = z.object({
  iri: z.string(),
  version: z.string(),
  forFlashcard: z.string(),
  lastReviewed: z.string().date().optional(),
  nextReview: z.string().date(),
});

export type ScheduleModel = z.infer<typeof scheduleSchema>;

export function parseSchedule(obj: object) {
  return scheduleSchema.parse(obj);
}
