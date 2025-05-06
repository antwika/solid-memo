import { z } from "zod";

export const assessmentSchema = z.object({
  iri: z.string(),
  version: z.string(),
  forCard: z.string(),
  date: z.string().date(),
  score: z.number(),
});

export type AssessmentModel = z.infer<typeof assessmentSchema>;

export function parseAssessment(obj: object) {
  return assessmentSchema.parse(obj);
}
