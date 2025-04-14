import { createAppSlice } from "@redux/createAppSlice";
import {
  createInstance,
  fetchAllPrivateTypeIndexIris,
  fetchSolidMemoDataInstances,
} from "@services/solid.service";
import type { Session } from "@inrupt/solid-client-authn-browser";
import type { QueryEngine } from "@comunica/query-sparql-solid";
import type { InstanceModel } from "@domain/index";
import { type PayloadAction } from "@reduxjs/toolkit";
import { createDeckThunk, deleteDeckThunk } from "./decks.slice";

export interface InstancesSliceState {
  iris: string[];
  value: Record<string, InstanceModel>;
  instanceIri: string | undefined;
  status: "idle" | "loading" | "failed";
}

const initialState: InstancesSliceState = {
  iris: [],
  value: {},
  instanceIri: undefined,
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
        state.instanceIri = action.payload.iri;
      },
    ),
    createInstanceThunk: create.asyncThunk(
      async ({
        session,
        storageIri,
        privateTypeIndexIri,
      }: {
        session: Session;
        storageIri: string;
        privateTypeIndexIri: string;
      }) => createInstance(session, storageIri, privateTypeIndexIri),
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, _action) => {
          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
    fetchSolidMemoDataThunk: create.asyncThunk(
      async ({
        session,
        queryEngine,
      }: {
        session: Session;
        queryEngine: QueryEngine;
      }) => {
        const webId = session.info?.webId;
        if (!webId) {
          console.error("No WebID");
          return undefined;
        }

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
          const fetchedInstances = action.payload;
          if (!fetchedInstances) return;

          for (const fetchedInstanceIri in fetchedInstances) {
            const fetchedInstance = fetchedInstances[fetchedInstanceIri];
            if (!fetchedInstance) continue;
            const index = state.iris.indexOf(fetchedInstance.iri);
            if (index === -1) state.iris.push(fetchedInstance.iri);
            state.value[fetchedInstance.iri] = fetchedInstance;
          }
          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
  }),
  extraReducers: (builder) => {
    builder.addCase(createDeckThunk.fulfilled, (state, action) => {
      const createdDeck = action.payload;
      if (!createdDeck) return;
      state.value[createdDeck.isInSolidMemoDataInstance]?.hasDeck.push(
        createdDeck.iri,
      );
      console.log("Updated instance hasDeck to include", createdDeck.iri);
    });

    builder.addCase(deleteDeckThunk.fulfilled, (state, action) => {
      const deletedDeck = action.payload;
      const instance = state.value[deletedDeck.isInSolidMemoDataInstance];
      if (instance) {
        const index = instance.hasDeck.indexOf(deletedDeck.iri);
        if (index !== -1) {
          instance.hasDeck.splice(index, 1);
          console.log(
            "Updated instance hasDeck to not include",
            deletedDeck.iri,
          );
        }
      }
    });
  },
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectIris: (state) => state.iris,
    selectInstances: (state) => state.value,
    selectInstanceByIri: (state, solidMemoDataIri: string | undefined) => {
      if (!solidMemoDataIri) return;
      const entry = state.value[solidMemoDataIri];
      if (entry) {
        return entry;
      }
    },
    selectInstanceIri: (state) => state.instanceIri,
    selectStatus: (state) => state.status,
  },
});

// Action creators are generated for each case reducer function.
export const { pickInstance, createInstanceThunk, fetchSolidMemoDataThunk } =
  instancesSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectIris,
  selectInstances,
  selectInstanceByIri,
  selectInstanceIri,
  selectStatus,
} = instancesSlice.selectors;
