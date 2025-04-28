import {
  getStringNoLocale,
  getUrl,
  getUrlAll,
  type Thing,
} from "@inrupt/solid-client";
import { z } from "zod";

export const instanceSchema = z.object({
  iri: z.string(),
  version: z.string(),
  name: z.string(),
  hasDeck: z.array(z.string()),
  isInPrivateTypeIndex: z.string(),
});

export type InstanceModel = z.infer<typeof instanceSchema>;

export function parseInstance(obj: object) {
  return instanceSchema.parse(obj);
}

export function parseInstanceFromThing(thing: Thing) {
  return parseInstance({
    iri: thing.url,
    type: getUrl(thing, "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"),
    name: getStringNoLocale(thing, "http://antwika.com/ns/solid-memo#name"),
    version: getStringNoLocale(
      thing,
      "http://antwika.com/ns/solid-memo#version"
    ),
    isInPrivateTypeIndex: getUrl(
      thing,
      "http://antwika.com/ns/solid-memo#isInPrivateTypeIndex"
    ),
    hasDeck: getUrlAll(thing, "http://antwika.com/ns/solid-memo#hasDeck"),
  });
}
