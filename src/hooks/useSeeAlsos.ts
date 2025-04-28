import { getThingAll, getUrlAll } from "@inrupt/solid-client";
import useDatasets from "@hooks/useDatasets";
import { useEffect, useState } from "react";

export default function useSeeAlsos(iris: string[]) {
  const { data: datasets } = useDatasets(iris);
  const [seeAlsoUrls, setSeeAlsoUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!datasets) return;

    Promise.all(datasets.map((dataset) => getThingAll(dataset)))
      .then((things) => things.flat())
      .then((things) => {
        return Promise.all(
          things.map((thing) =>
            getUrlAll(thing, "http://www.w3.org/2000/01/rdf-schema#seeAlso")
          )
        );
      })
      .then((urls) => urls.flat())
      .then((urls) => setSeeAlsoUrls(urls))
      .catch((err) =>
        console.error("Failed to fetch see also references, error:", err)
      );
  }, [datasets]);

  return { seeAlsoUrls };
}
