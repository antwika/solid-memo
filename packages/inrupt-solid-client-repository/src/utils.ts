import type { Thing } from "@inrupt/solid-client";

export function stripFragment(iri: string) {
  return iri.split("#")[0];
}

export const thingContains = (
  privateTypeIndexThing: Thing,
  type: string,
  value: string
) => privateTypeIndexThing.predicates[type]?.namedNodes?.includes(value);
