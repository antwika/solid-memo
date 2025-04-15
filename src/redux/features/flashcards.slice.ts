import { createAppSlice } from "@redux/createAppSlice";
import {
  createFlashcard,
  deleteFlashcard,
  fetchCard,
} from "@services/old-solid.service";
import type { Session } from "@inrupt/solid-client-authn-browser";
import type { QueryEngine } from "@comunica/query-sparql-solid";
import type { FlashcardModel } from "@domain/index";
import { fetchDeckThunk } from "./decks.slice";

export interface FlashcardSliceState {
  iris: string[];
  value: Record<string, FlashcardModel>;
  status: "idle" | "loading" | "failed";
}

const initialState: FlashcardSliceState = {
  iris: [],
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
        flashcardIris,
      }: {
        session: Session;
        queryEngine: QueryEngine;
        flashcardIris: string[];
      }) => {
        const flashcards = (
          await Promise.all(
            flashcardIris.map((flashcardIri) =>
              fetchCard(session, queryEngine, flashcardIri)
            )
          )
        ).filter((flashcard) => flashcard !== undefined);

        return flashcards;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          const flashcards = action.payload;
          for (const flashcard of flashcards) {
            const index = state.iris.indexOf(flashcard.iri);
            if (index === -1) state.iris.push(flashcard.iri);
            state.value[flashcard.iri] = flashcard;
          }

          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    fetchFlashcardThunk: create.asyncThunk(
      async ({
        session,
        queryEngine,
        flashcardIri,
      }: {
        session: Session;
        queryEngine: QueryEngine;
        flashcardIri: string;
      }) => fetchCard(session, queryEngine, flashcardIri),
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          const flashcard = action.payload;
          if (!flashcard) return;
          const index = state.iris.indexOf(flashcard.iri);
          if (index === -1) state.iris.push(flashcard.iri);
          state.value[flashcard.iri] = flashcard;

          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
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
          flashcard
        ),
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          const createdFlashcard = action.payload;
          if (!createdFlashcard) return;

          state.value[createdFlashcard.iri] = createdFlashcard;

          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    deleteFlashcardThunk: create.asyncThunk(
      async ({
        session,
        queryEngine,
        solidMemoDataIri,
        flashcard,
      }: {
        session: Session;
        queryEngine: QueryEngine;
        solidMemoDataIri: string;
        flashcard: FlashcardModel;
      }) => {
        await deleteFlashcard(
          session,
          queryEngine,
          solidMemoDataIri,
          flashcard.iri
        );
        return flashcard;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          const deletedFlashcard = action.payload;

          delete state.value[deletedFlashcard.iri];

          const index = state.iris.indexOf(deletedFlashcard.iri);
          if (index !== -1) state.iris.splice(index, 1);

          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
  extraReducers: (builder) => {
    builder.addCase(fetchDeckThunk.fulfilled, (state, action) => {
      const fetchedDeck = action.payload;
      for (const flashcardIri of fetchedDeck.hasCard) {
        const index = state.iris.indexOf(flashcardIri);
        if (index === -1) state.iris.push(flashcardIri);
      }
    });
  },
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectIris: (state) => state.iris,
    selectFlashcards: (state) => state.value,
    selectFlashcardByIri: (state, flashcardIri: string) =>
      state.value[flashcardIri],
    selectFlashcardsByIris: (state, flashcardIris: string[]) => {
      const subset: Record<string, FlashcardModel> = {};
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
  fetchFlashcardThunk,
  createFlashcardThunk,
  deleteFlashcardThunk,
} = flashcardsSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectIris,
  selectFlashcards,
  selectFlashcardByIri,
  selectFlashcardsByIris,
  selectStatus,
} = flashcardsSlice.selectors;
