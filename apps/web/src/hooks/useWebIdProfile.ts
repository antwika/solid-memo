import useSWR from "swr";
import * as solidClient from "@inrupt/solid-client";
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import { useEffect, useState } from "react";
import { multiFetcher } from "@lib/utils";
import useDatasets from "./useDatasets";

export default function useWebIdProfile() {
  const session = getDefaultSession();

  const { data: webIdProfileDatasets, isLoading: isLoadingWebId } = useDatasets(
    session.info.webId
  );

  const [privateTypeIndexUrls, setPrivateTypeIndexUrls] = useState<string[]>(
    []
  );

  const [seeAlsoPrivateTypeIndexUrls, setSeeAlsoPrivateTypeIndexUrls] =
    useState<string[]>([]);

  const [seeAlsoUrls, setSeeAlsoUrls] = useState<string[]>([]);
  const { data: seeAlsoDatasets } = useDatasets(seeAlsoUrls);

  const [instanceUrls, setInstanceUrls] = useState<string[]>([]);

  const {
    data: privateTypeIndexDatasets,
    mutate: mutate1,
    isLoading: isLoadingPrivateTypeIndexDatasets,
  } = useSWR(privateTypeIndexUrls, multiFetcher);

  const {
    data: seeAlsoPrivateTypeIndexDatasets,
    mutate: mutate2,
    isLoading: isLoadingSeeAlsoPrivateTypeIndexDatasets,
  } = useSWR(seeAlsoPrivateTypeIndexUrls, multiFetcher);

  useEffect(() => {
    if (!webIdProfileDatasets) {
      setPrivateTypeIndexUrls([]);
      return;
    }

    // Find all private type indices
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

    // Find all see also references
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
              "http://www.w3.org/2000/01/rdf-schema#seeAlso"
            )
          )
        );
      })
      .then((urls) => urls.flat())
      .then((urls) => setSeeAlsoUrls(urls))
      .catch((err) =>
        console.error("Failed to fetch see also references, error:", err)
      );
  }, [webIdProfileDatasets]);

  useEffect(() => {
    if (!seeAlsoDatasets) {
      setSeeAlsoPrivateTypeIndexUrls([]);
      return;
    }

    // Find all private type indices
    Promise.all(
      seeAlsoDatasets.map((dataset) => solidClient.getThingAll(dataset))
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
      .then((urls) => setSeeAlsoPrivateTypeIndexUrls(urls))
      .catch((err) =>
        console.error(
          "Failed to fetch see also private type indices, error:",
          err
        )
      );
  }, [seeAlsoDatasets]);

  useEffect(() => {
    const datasets = [
      ...(privateTypeIndexDatasets ?? []),
      ...(seeAlsoPrivateTypeIndexDatasets ?? []),
    ];

    datasets.map((privateTypeIndexDataset) => {
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
  }, [privateTypeIndexDatasets, seeAlsoPrivateTypeIndexDatasets]);

  const isLoading =
    isLoadingWebId ||
    isLoadingPrivateTypeIndexDatasets ||
    isLoadingSeeAlsoPrivateTypeIndexDatasets;

  return {
    webIdProfileDatasets,
    privateTypeIndexDatasets,
    instanceUrls,
    mutate: () => {
      mutate1(privateTypeIndexDatasets).catch((err) =>
        console.error("Failed to mutate, error:", err)
      );
      mutate2(seeAlsoPrivateTypeIndexDatasets).catch((err) =>
        console.error("Failed to mutate, error:", err)
      );
    },
    isLoading,
  };
}
