import type { SolidMemoData } from "@src/domain/SolidMemoData";
import { useSolidMemoDataInstances } from "@src/hooks/useSolidMemoDataInstances";
import { createContext, useContext, useState, type ReactNode } from "react";
import { QueryEngineContext } from "./QueryEngineProvider";
import { SessionContext } from "./SessionProvider";

export const SolidMemoDataContext = createContext<{
  solidMemoDataInstances: SolidMemoData[];
  solidMemoData?: SolidMemoData;
  selectSolidMemoDataInstance: (solidMemoDataInstance: SolidMemoData) => void;
}>({
  solidMemoDataInstances: [],
  solidMemoData: {} as SolidMemoData,
  selectSolidMemoDataInstance: () => {
    /* NOP */
  },
});

type Props = {
  children: ReactNode;
};

export function SolidMemoDataProvider({ children }: Props) {
  const { session } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);
  const { solidMemoDataInstances } = useSolidMemoDataInstances(
    session,
    queryEngine,
  );
  const [solidMemoData, setSolidMemoData] = useState<SolidMemoData>();

  const selectSolidMemoDataInstance = (
    solidMemoDataInstance: SolidMemoData,
  ) => {
    if (!solidMemoDataInstances.includes(solidMemoDataInstance)) {
      console.log(
        "Could not select solid memo instance",
        solidMemoDataInstance,
      );
    }
    setSolidMemoData(solidMemoDataInstance);
  };

  return (
    <SolidMemoDataContext.Provider
      value={{
        solidMemoDataInstances,
        solidMemoData,
        selectSolidMemoDataInstance,
      }}
    >
      {children}
    </SolidMemoDataContext.Provider>
  );
}
