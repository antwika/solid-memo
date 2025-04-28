import { getThingAll } from "@inrupt/solid-client";
import useDatasets from "@hooks/useDatasets";
import { parseInstanceFromThing } from "@domain/index";
import { mapArrayToRecord } from "@lib/utils";

export default function useInstances(instanceUrls: string[]) {
  const { data: instanceDatasets, mutate } = useDatasets(instanceUrls);

  const instances =
    instanceDatasets
      ?.map((dataset) => getThingAll(dataset))
      .flat()
      .filter((thing) => instanceUrls.includes(thing.url))
      .map((thing) => parseInstanceFromThing(thing)) ?? [];

  const instanceMap = mapArrayToRecord(instances, "iri");

  return { instanceDatasets, instances, instanceMap, mutate };
}
