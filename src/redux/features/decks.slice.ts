import { createAppSlice } from "@redux/createAppSlice";
import {
  createDeck,
  deleteDeck,
  fetchAllDeckIris,
  fetchDeck,
} from "@services/solid.service";
import type { Session } from "@inrupt/solid-client-authn-browser";
import type { QueryEngine } from "@comunica/query-sparql-solid";
import type { DeckModel } from "@domain/index";
import { createFlashcardThunk, deleteFlashcardThunk } from "./flashcards.slice";

export interface DecksSliceState {
  value: Record<string, DeckModel>;
  status: "idle" | "loading" | "failed";
}

const initialState: DecksSliceState = {
  value: {},
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
          for (const deck of action.payload) {
            state.value[deck.iri] = deck;
          }
          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
    createDeckThunk: create.asyncThunk(
      async ({
        session,
        queryEngine,
        solidMemoDataIri,
        deck,
      }: {
        session: Session;
        queryEngine: QueryEngine;
        solidMemoDataIri: string;
        deck: Omit<DeckModel, "iri">;
      }) => createDeck(session, queryEngine, solidMemoDataIri, deck),
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          const createdDeck = action.payload;
          if (!createdDeck) return;

          state.value[createdDeck.iri] = createdDeck;

          state.status = "idle";
          console.log("Deck created", createdDeck);
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
    deleteDeckThunk: create.asyncThunk(
      async ({
        session,
        queryEngine,
        solidMemoDataIri,
        deck,
      }: {
        session: Session;
        queryEngine: QueryEngine;
        solidMemoDataIri: string;
        deck: DeckModel;
      }) => {
        await deleteDeck(session, queryEngine, solidMemoDataIri, deck.iri);
        return deck;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          const deletedDeck = action.payload;

          if (state.value[deletedDeck.iri]) {
            delete state.value[deletedDeck.iri];
          }
          state.status = "idle";
          console.log("Deck deleted", deletedDeck);
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
  }),
  extraReducers: (builder) => {
    builder.addCase(createFlashcardThunk.fulfilled, (state, action) => {
      const flashcard = action.payload;
      if (!flashcard) return;
      state.value[flashcard.isInDeck]?.hasCard.push(flashcard.iri);
      console.log("Updated deck hasCard to include", flashcard.iri);
    });

    builder.addCase(deleteFlashcardThunk.fulfilled, (state, action) => {
      const deletedFlashcard = action.payload;
      const deck = state.value[deletedFlashcard.isInDeck];
      if (deck) {
        const index = deck.hasCard.indexOf(deletedFlashcard.iri);
        if (index !== -1) {
          deck.hasCard.splice(index, 1);
          console.log(
            "Updated deck hasCard to not include",
            deletedFlashcard.iri,
          );
        }
      }
    });
  },
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectDecks: (state) => state.value,
    selectDeckByIri: (state, deckIri: string) => state.value[deckIri],
    selectStatus: (state) => state.status,
  },
});

// Action creators are generated for each case reducer function.
export const { fetchDecksThunk, createDeckThunk, deleteDeckThunk } =
  decksSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectDecks, selectDeckByIri, selectStatus } =
  decksSlice.selectors;
