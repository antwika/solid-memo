import useSWR from "swr";
import * as solidClient from "@inrupt/solid-client";
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import { useEffect, useState } from "react";
import { multiFetcher } from "@lib/utils";
import useDatasets from "./useDatasets";

export default function useWebIdProfile() {
  const session = getDefaultSession();

  const { data: webIdProfileDatasets } = useDatasets(session.info.webId);

  /* TODO: Probably traverse seeAlso to find more profiles */

  const [privateTypeIndexUrls, setPrivateTypeIndexUrls] = useState<string[]>(
    []
  );

  const [instanceUrls, setInstanceUrls] = useState<string[]>([]);

  const { data: privateTypeIndexDatasets, mutate } = useSWR(
    privateTypeIndexUrls,
    multiFetcher
  );

  useEffect(() => {
    if (!webIdProfileDatasets) {
      setPrivateTypeIndexUrls([]);
      return;
    }

    Promise.all(
      webIdProfileDatasets.map((webIdProfileDataset) =>
        solidClient.getThingAll(webIdProfileDataset)
      )
    )
      .then((things) => things.flat())
      .then((things) => {
        return Promise.all(
          things.map((thing) =>
            solidClient.getUrlAll(
              thing,
              "http://www.w3.org/ns/solid/terms#privateTypeIndex"
            )
          )
        );
      })
      .then((urls) => urls.flat())
      .then((urls) => setPrivateTypeIndexUrls(urls))
      .catch((err) =>
        console.error("Failed to fetch private type indices, error:", err)
      );
  }, [webIdProfileDatasets]);

  useEffect(() => {
    if (!privateTypeIndexDatasets) {
      return;
    }

    privateTypeIndexDatasets.map((privateTypeIndexDataset) => {
      const things = solidClient.getThingAll(privateTypeIndexDataset);

      const foundInstanceUrls = things.reduce<string[]>((acc, thing) => {
        const { predicates } = thing;
        if (
          predicates[
            "http://www.w3.org/ns/solid/terms#forClass"
          ]?.namedNodes?.includes(
            "http://antwika.com/ns/solid-memo#SolidMemoData"
          )
        ) {
          return [
            ...acc,
            ...(predicates["http://www.w3.org/ns/solid/terms#instance"]
              ?.namedNodes ?? []),
          ];
        }
        return acc;
      }, []);

      setInstanceUrls(foundInstanceUrls);
    });
  }, [privateTypeIndexDatasets]);

  return {
    webIdProfileDatasets,
    privateTypeIndexDatasets,
    instanceUrls,
    mutate: () => mutate(privateTypeIndexDatasets),
  };
}
