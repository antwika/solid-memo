import useSWR from "swr";
import { multiFetcher } from "@lib/utils";
import { useEffect, useState } from "react";
import { getThingAll, getUrlAll } from "@inrupt/solid-client";

export default function usePrivateTypeIndices(iris: string[]) {
  const { data: datasets, mutate } = useSWR(iris, multiFetcher);

  const [privateTypeIndexUrls, setPrivateTypeIndexUrls] = useState<string[]>(
    []
  );

  const { data: privateTypeIndexDatasets, mutate: mutate1 } = useSWR(
    privateTypeIndexUrls,
    multiFetcher
  );

  useEffect(() => {
    if (!datasets) {
      setPrivateTypeIndexUrls([]);
      return;
    }
    Promise.all(datasets.map((dataset) => getThingAll(dataset)))
      .then((things) => things.flat())
      .then((things) =>
        things.flatMap((thing) =>
          getUrlAll(thing, "http://www.w3.org/ns/solid/terms#privateTypeIndex")
        )
      )
      .then((urls) => setPrivateTypeIndexUrls(urls))
      .catch((err) =>
        console.error("Failed to fetch private type indices, error:", err)
      );
  }, [datasets]);

  return { privateTypeIndexUrls, privateTypeIndexDatasets, mutate };
}
