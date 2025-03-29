import { fetch } from "@inrupt/solid-client-authn-browser";
import {
  getSolidDataset,
  type SolidDataset,
  type UrlString,
  type WithServerResourceInfo,
} from "@inrupt/solid-client";
import { useEffect, useState } from "react";

export default function useDatasets(podUrls: UrlString[]) {
  const [datasets, setDatasets] = useState<
    (SolidDataset & WithServerResourceInfo)[]
  >([]);

  const promises = podUrls.map((podUrl) => getSolidDataset(podUrl, { fetch }));

  useEffect(() => {
    Promise.all(promises)
      .then((datasets) => {
        console.log("Successfully fetched datasets:", datasets);
        setDatasets(datasets);
      })
      .catch((err) => {
        console.error("Failed to fetch datasets, error:", err);
        setDatasets([]);
      });
  }, [podUrls]);

  return { datasets };
}
