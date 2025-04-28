import { useEffect, useState } from "react";
import useDatasets from "@hooks/useDatasets";
import { getThingAll } from "@inrupt/solid-client";

export function useTypeRegistrations(iris: string[]) {
  const { data: datasets } = useDatasets(iris);
  const [typeRegistrationUrls, setTypeRegistrationUrls] = useState<string[]>(
    []
  );
  const [instanceUrls, setInstanceUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!datasets) return;

    const found = datasets
      .flatMap((dataset) => {
        const things = getThingAll(dataset);

        const typeRegistrations = things.filter((thing) =>
          thing.predicates[
            "http://www.w3.org/ns/solid/terms#forClass"
          ]?.namedNodes?.includes(
            "http://antwika.com/ns/solid-memo#SolidMemoData"
          )
        );

        const typeRegistrationUrls = typeRegistrations.map(
          (typeRegistration) => typeRegistration.url
        );

        const instanceUrls = typeRegistrations.flatMap(
          (typeRegistration) =>
            typeRegistration.predicates[
              "http://www.w3.org/ns/solid/terms#instance"
            ]?.namedNodes ?? []
        );
        return { typeRegistrationUrls, instanceUrls };
      })
      .reduce<{ typeRegistrationUrls: string[]; instanceUrls: string[] }>(
        (acc, item) => {
          acc.typeRegistrationUrls.push(...item.typeRegistrationUrls);
          acc.instanceUrls.push(...item.instanceUrls);
          return acc;
        },
        { typeRegistrationUrls: [], instanceUrls: [] }
      );

    setTypeRegistrationUrls(found.typeRegistrationUrls);
    setInstanceUrls(found.instanceUrls);
  }, [datasets]);

  return { typeRegistrationUrls, instanceUrls };
}
