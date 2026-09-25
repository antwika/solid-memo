import { render } from "preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createUseCases } from "./application/useCases";
import { authFetch } from "./infrastructure/solid/authFetch";
import { createSolidSessionGateway } from "./infrastructure/solid/solidSessionGateway";
import { createSolidDeckLibrary } from "./infrastructure/solid/solidDeckLibrary";
import { createSolidDeckRepository } from "./infrastructure/solid/solidDeckRepository";
import { createSolidInstanceRepository } from "./infrastructure/solid/solidInstanceRepository";
import { createSolidPreferencesRepository } from "./infrastructure/solid/solidPreferencesRepository";
import { createSolidReviewStateRepository } from "./infrastructure/solid/solidReviewStateRepository";
import { createSolidStorageGateway } from "./infrastructure/solid/solidStorageGateway";
import { createSolidWebIdDocumentRepository } from "./infrastructure/solid/solidWebIdDocumentRepository";
import { App } from "./ui/App";
import "./style.css";

const useCases = createUseCases({
  sessionGateway: createSolidSessionGateway("Solid Memo"),
  webIdDocumentRepository: createSolidWebIdDocumentRepository({
    fetch: authFetch,
  }),
  storageGateway: createSolidStorageGateway({ fetch: authFetch }),
  instanceRepository: createSolidInstanceRepository({
    fetch: authFetch,
    now: () => new Date(),
    randomId: () => crypto.randomUUID(),
  }),
  deckRepository: createSolidDeckRepository({
    fetch: authFetch,
    now: () => new Date(),
    randomId: () => crypto.randomUUID(),
  }),
  deckLibrary: createSolidDeckLibrary({
    fetch: (input, init) => globalThis.fetch(input, init),
    indexUrl: new URL("decks/index.ttl", document.baseURI).href,
  }),
  preferencesRepository: createSolidPreferencesRepository({
    fetch: authFetch,
  }),
  reviewStateRepository: createSolidReviewStateRepository({
    fetch: authFetch,
  }),
});

const queryClient = new QueryClient();

render(
  <QueryClientProvider client={queryClient}>
    <App useCases={useCases} />
  </QueryClientProvider>,
  document.getElementById("app")!,
);
