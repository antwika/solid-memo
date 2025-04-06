import { createAppSlice } from "@redux/createAppSlice";
import {
  createFlashcard,
  deleteFlashcard,
  fetchAllIriOfRdfType,
  fetchCard,
} from "@services/solid.service";
import type { Session } from "@inrupt/solid-client-authn-browser";
import type { QueryEngine } from "@comunica/query-sparql-solid";
import type { FlashcardModel } from "@domain/index";

export interface FlashcardSliceState {
  value: Record<string, FlashcardModel>;
  status: "idle" | "loading" | "failed";
}

const initialState: FlashcardSliceState = {
  value: {},
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
        flashcardIris,
      }: {
        session: Session;
        queryEngine: QueryEngine;
        solidMemoDataIri: string;
        flashcardIris: string[];
      }) => {
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
          for (const flashcard of action.payload) {
            state.value[flashcard.iri] = flashcard;
          }

          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
    createFlashcardThunk: create.asyncThunk(
      async ({
        session,
        queryEngine,
        solidMemoDataIri,
        deckIri,
        flashcard,
      }: {
        session: Session;
        queryEngine: QueryEngine;
        solidMemoDataIri: string;
        deckIri: string;
        flashcard: Omit<FlashcardModel, "iri">;
      }) =>
        createFlashcard(
          session,
          queryEngine,
          solidMemoDataIri,
          deckIri,
          flashcard,
        ),
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          const flashcard = action.payload;
          if (!flashcard) return;
          state.value[flashcard.iri] = flashcard;

          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
    deleteFlashcardThunk: create.asyncThunk(
      async ({
        session,
        queryEngine,
        solidMemoDataIri,
        deckIri,
        flashcard,
      }: {
        session: Session;
        queryEngine: QueryEngine;
        solidMemoDataIri: string;
        deckIri: string;
        flashcard: FlashcardModel;
      }) => {
        await deleteFlashcard(
          session,
          queryEngine,
          solidMemoDataIri,
          flashcard.iri,
        );
        return flashcard;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          const flashcard = action.payload;

          delete state.value[flashcard.iri];

          state.status = "idle";
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
    selectFlashcardByIri: (state, flashcardIri) => state.value[flashcardIri],
    selectFlashcardsByIris: (state, flashcardIris: string[]) => {
      let subset: Record<string, FlashcardModel> = {};
      for (const iri of flashcardIris) {
        if (state.value[iri]) {
          subset[iri] = state.value[iri];
        }
      }
      return subset;
    },
    selectStatus: (state) => state.status,
  },
});

// Action creators are generated for each case reducer function.
export const {
  fetchFlashcardsThunk,
  createFlashcardThunk,
  deleteFlashcardThunk,
} = flashcardsSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectFlashcards,
  selectFlashcardByIri,
  selectFlashcardsByIris,
  selectStatus,
} = flashcardsSlice.selectors;
