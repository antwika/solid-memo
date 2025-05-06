import { z } from "zod";

export const scheduleSchema = z.object({
  iri: z.string(),
  version: z.string(),
  forFlashcard: z.string(),
  isInSolidMemoDataInstance: z.string(),
  lastReviewed: z.date().optional().nullable(),
  nextReview: z.date(),
});

export type ScheduleModel = z.infer<typeof scheduleSchema>;

export function parseSchedule(obj: object) {
  return scheduleSchema.parse(obj);
}
