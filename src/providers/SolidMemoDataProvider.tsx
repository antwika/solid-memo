import type { SolidMemoData } from "@src/domain/SolidMemoData";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { QueryEngineContext } from "./QueryEngineProvider";
import { SessionContext } from "./SessionProvider";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import {
  fetchSolidMemoDataThunk,
  selectSolidMemoData,
} from "@src/redux/features/solidMemoData.slice";

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
  const solidMemoData = useAppSelector(selectSolidMemoData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(
      fetchSolidMemoDataThunk({
        session,
        queryEngine,
        webId: session.info.webId,
      }),
    );
  }, [dispatch, session, queryEngine]);

  const [selectedSolidMemoData, setSelectedSolidMemoData] =
    useState<SolidMemoData>();

  const selectSolidMemoDataInstance = (
    solidMemoDataInstance: SolidMemoData,
  ) => {
    if (!solidMemoData.includes(solidMemoDataInstance)) {
      console.log(
        "Could not select solid memo instance",
        solidMemoDataInstance,
      );
    }
    setSelectedSolidMemoData(solidMemoDataInstance);
  };

  return (
    <SolidMemoDataContext.Provider
      value={{
        solidMemoDataInstances: solidMemoData,
        solidMemoData: selectedSolidMemoData,
        selectSolidMemoDataInstance,
      }}
    >
      {children}
    </SolidMemoDataContext.Provider>
  );
}
