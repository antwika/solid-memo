import {
  getStringNoLocale,
  getThingAll,
  getUrl,
  getUrlAll,
  type Thing,
} from "@inrupt/solid-client";
import useDatasets from "./useDatasets";
import { parseInstance, type InstanceModel } from "@solid-memo/core";

function parseInstanceFromThing(thing: Thing) {
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

export default function useInstances(instanceUrls: string[]) {
  const {
    data: instanceDatasets,
    mutate,
    isLoading,
  } = useDatasets(instanceUrls);

  const instances = (instanceDatasets ?? [])
    .map((dataset) => getThingAll(dataset))
    .flat()
    .filter((thing) => instanceUrls.includes(thing.url))
    .map((thing) => parseInstanceFromThing(thing));

  const instanceMap = instances.reduce<Record<string, InstanceModel>>(
    (acc, instance) => {
      acc[instance.iri] = instance;
      return acc;
    },
    {}
  );

  return { instanceDatasets, instances, instanceMap, mutate, isLoading };
}
