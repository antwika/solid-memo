import { createAppSlice } from "@redux/createAppSlice";
import { fetchAllDeckIris, fetchDeck } from "@services/solid.service";
import type { Session } from "@inrupt/solid-client-authn-browser";
import type { QueryEngine } from "@comunica/query-sparql-solid";
import type { DeckModel } from "@domain/index";

export interface DecksSliceState {
  value: DeckModel[];
  status: "idle" | "loading" | "failed";
}

const initialState: DecksSliceState = {
  value: [],
  status: "idle",
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const decksSlice = createAppSlice({
  name: "decks",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    fetchDecksThunk: create.asyncThunk(
      async ({
        session,
        queryEngine,
        solidMemoDataIri,
      }: {
        session: Session;
        queryEngine: QueryEngine;
        solidMemoDataIri: string;
      }) => {
        const deckIris = await fetchAllDeckIris(
          session,
          queryEngine,
          solidMemoDataIri,
        );

        const fetchDeckPromises = deckIris.map((deckIri) =>
          fetchDeck(session, queryEngine, deckIri),
        );
        const fetched = await Promise.all(fetchDeckPromises);
        const filtered = fetched.filter((deckData) => deckData !== undefined);

        return filtered;
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
    selectDecks: (state) => state.value,
    selectDeckByIri: (state, deckIri) =>
      state.value.find((deck) => deck.iri === deckIri),
    selectStatus: (state) => state.status,
  },
});

// Action creators are generated for each case reducer function.
export const { fetchDecksThunk } = decksSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectDecks, selectDeckByIri, selectStatus } =
  decksSlice.selectors;
