import { createAppSlice } from "@src/redux/createAppSlice";
import { fetchAllIriOfRdfType, fetchCard } from "@src/services/solid.service";
import type { Session } from "@inrupt/solid-client-authn-browser";
import type { QueryEngine } from "@comunica/query-sparql-solid";
import type { FlashcardModel } from "@src/domain/flashcard.model";

export interface FlashcardSliceState {
  value: FlashcardModel[];
  status: "idle" | "loading" | "failed";
}

const initialState: FlashcardSliceState = {
  value: [],
  status: "idle",
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const flashcardsSlice = createAppSlice({
  name: "flashcards",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    fetchFlashcardsThunk: create.asyncThunk(
      async ({
        session,
        queryEngine,
        solidMemoDataIri,
      }: {
        session: Session;
        queryEngine: QueryEngine;
        solidMemoDataIri: string;
      }) => {
        const flashcardIris = await fetchAllIriOfRdfType(
          session,
          queryEngine,
          solidMemoDataIri,
          "http://antwika.com/ns/solid-memo#Flashcard",
        );

        const flashcards = (
          await Promise.all(
            flashcardIris.map((flashcardIri) =>
              fetchCard(session, queryEngine, flashcardIri),
            ),
          )
        ).filter((flashcard) => flashcard !== undefined);

        return flashcards;
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
    selectFlashcards: (state) => state.value,
    selectFlashcardByIri: (state, flashcardIri) =>
      state.value.find((flashcard) => flashcard.iri === flashcardIri),
    selectFlashcardByDeck: (state, deckIri: string) =>
      state.value.filter((flashcard) => flashcard.isInDeck.includes(deckIri)),
    selectStatus: (state) => state.status,
  },
});

// Action creators are generated for each case reducer function.
export const { fetchFlashcardsThunk } = flashcardsSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectFlashcards,
  selectFlashcardByIri,
  selectFlashcardByDeck,
  selectStatus,
} = flashcardsSlice.selectors;
