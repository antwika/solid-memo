import type { QueryEngine } from "@comunica/query-sparql-solid";
import type { Session } from "@inrupt/solid-client-authn-browser";
import { usePrivateTypeIndices } from "./usePrivateTypeIndices";
import { useEffect, useState } from "react";
import type { SolidMemoData } from "@src/domain/SolidMemoData";
import { fetchSolidMemoDataInstances } from "@src/services/solid.service";

export function useSolidMemoDataInstances(
  session: Session,
  queryEngine: QueryEngine,
) {
  const { privateTypeIndexIris } = usePrivateTypeIndices(session, queryEngine);
  const [solidMemoDataInstances, setSolidMemoDataInstances] = useState<
    SolidMemoData[]
  >([]);

  useEffect(() => {
    const promises = privateTypeIndexIris.map((privateTypeIndex) => {
      return fetchSolidMemoDataInstances(
        session,
        queryEngine,
        privateTypeIndex,
      );
    });
    Promise.all(promises)
      .then((solidMemoDataIris) => {
        setSolidMemoDataInstances(solidMemoDataIris.flat());
      })
      .catch((err) => console.log("Failed to fetch solid memo data iris", err));
  }, [privateTypeIndexIris, session, queryEngine]);

  return { solidMemoDataInstances };
}
