import { createAppSlice } from "@src/redux/createAppSlice";
import {
  fetchAllPrivateTypeIndexIris,
  fetchSolidMemoDataInstances,
} from "@src/services/solid.service";
import type { Session } from "@inrupt/solid-client-authn-browser";
import type { QueryEngine } from "@comunica/query-sparql-solid";
import type { SolidMemoData } from "@src/domain/SolidMemoData";

export interface SolidMemoDataSliceState {
  value: SolidMemoData[];
  status: "idle" | "loading" | "failed";
}

const initialState: SolidMemoDataSliceState = {
  value: [],
  status: "idle",
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const solidMemoDataSlice = createAppSlice({
  name: "solidMemoData",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    fetchSolidMemoDataThunk: create.asyncThunk(
      async ({
        session,
        queryEngine,
        webId,
      }: {
        session: Session;
        queryEngine: QueryEngine;
        webId?: string;
      }) => {
        if (!webId) return [];

        const privateTypeIndices = await fetchAllPrivateTypeIndexIris(
          session,
          queryEngine,
          webId,
        );

        const solidMemoData = (
          await Promise.all(
            privateTypeIndices.map((privateTypeIndex) =>
              fetchSolidMemoDataInstances(
                session,
                queryEngine,
                privateTypeIndex,
              ),
            ),
          )
        ).flat();

        return solidMemoData;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.value = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectSolidMemoData: (state) => state.value,
    selectSolidMemoDataByIri: (state, solidMemoDataIri) =>
      state.value.find(
        (solidMemoData) => solidMemoData.iri === solidMemoDataIri,
      ),
    selectStatus: (state) => state.status,
  },
});

// Action creators are generated for each case reducer function.
export const { fetchSolidMemoDataThunk } = solidMemoDataSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectSolidMemoData, selectSolidMemoDataByIri, selectStatus } =
  solidMemoDataSlice.selectors;
