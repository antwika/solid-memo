import { createAppSlice } from "@src/redux/createAppSlice";
import {
  fetchAllPrivateTypeIndexIris,
  fetchSolidMemoDataInstances,
} from "@src/services/solid.service";
import type { Session } from "@inrupt/solid-client-authn-browser";
import type { QueryEngine } from "@comunica/query-sparql-solid";
import type { SolidMemoData } from "@src/domain/SolidMemoData";
import { type PayloadAction } from "@reduxjs/toolkit";

export interface SolidMemoDataSliceState {
  value: Record<string, SolidMemoData>;
  currentInstance: string | undefined;
  status: "idle" | "loading" | "failed";
}

const initialState: SolidMemoDataSliceState = {
  value: {},
  currentInstance: undefined,
  status: "idle",
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const solidMemoDataSlice = createAppSlice({
  name: "solidMemoData",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    pickInstance: create.reducer((state, action: PayloadAction<string>) => {
      state.currentInstance = action.payload;
    }),
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
        if (!webId) return {};

        const privateTypeIndices = await fetchAllPrivateTypeIndexIris(
          session,
          queryEngine,
          webId,
        );

        const solidMemoDataArray = (
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

        // Merge all solidMemoData records found in various private type indices
        const solidMemoData = solidMemoDataArray.reduce<
          Record<string, SolidMemoData>
        >((acc, solidMemoDataRecord) => {
          for (const key in solidMemoDataRecord) {
            const solidMemoData = solidMemoDataRecord[key];
            if (!solidMemoData) return acc;
            acc[key] = solidMemoData;
          }
          return acc;
        }, {});

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
    selectSolidMemoDataByIri: (state, solidMemoDataIri: string) => {
      const entry = state.value[solidMemoDataIri];
      if (entry) {
        return entry;
      }
    },
    selectCurrentInstance: (state) => state.currentInstance,
    selectStatus: (state) => state.status,
  },
});

// Action creators are generated for each case reducer function.
export const { pickInstance, fetchSolidMemoDataThunk } =
  solidMemoDataSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectSolidMemoData,
  selectSolidMemoDataByIri,
  selectCurrentInstance,
  selectStatus,
} = solidMemoDataSlice.selectors;
