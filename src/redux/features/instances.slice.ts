import { createAppSlice } from "@redux/createAppSlice";
import {
  fetchAllPrivateTypeIndexIris,
  fetchSolidMemoDataInstances,
} from "@services/solid.service";
import type { Session } from "@inrupt/solid-client-authn-browser";
import type { QueryEngine } from "@comunica/query-sparql-solid";
import type { InstanceModel } from "@domain/instance.model";
import { type PayloadAction } from "@reduxjs/toolkit";

export interface InstancesSliceState {
  value: Record<string, InstanceModel>;
  instance: InstanceModel | undefined;
  status: "idle" | "loading" | "failed";
}

const initialState: InstancesSliceState = {
  value: {},
  instance: undefined,
  status: "idle",
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const instancesSlice = createAppSlice({
  name: "instances",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    pickInstance: create.reducer(
      (state, action: PayloadAction<InstanceModel>) => {
        state.instance = action.payload;
      },
    ),
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

        const instancesArray = (
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

        const instances = instancesArray.reduce<Record<string, InstanceModel>>(
          (acc, inst) => {
            for (const key in inst) {
              const solidMemoData = inst[key];
              if (!solidMemoData) return acc;
              acc[key] = solidMemoData;
            }
            return acc;
          },
          {},
        );

        return instances;
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
    selectInstances: (state) => state.value,
    selectInstanceByIri: (state, solidMemoDataIri: string) => {
      const entry = state.value[solidMemoDataIri];
      if (entry) {
        return entry;
      }
    },
    selectInstance: (state) => state.instance,
    selectStatus: (state) => state.status,
  },
});

// Action creators are generated for each case reducer function.
export const { pickInstance, fetchSolidMemoDataThunk } = instancesSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectInstances,
  selectInstanceByIri,
  selectInstance,
  selectStatus,
} = instancesSlice.selectors;
