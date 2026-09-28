import { render } from "preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createUseCases } from "./application/useCases";
import { authFetch } from "./infrastructure/solid/authFetch";
import { createWriteFence } from "./infrastructure/solid/writeFence";
import { createSolidSessionGateway } from "./infrastructure/solid/solidSessionGateway";
import { createShaclShapeValidator } from "./infrastructure/shacl/shaclShapeValidator";
import { createSolidDeckLibrary } from "./infrastructure/solid/solidDeckLibrary";
import { createSolidDeckRepository } from "./infrastructure/solid/solidDeckRepository";
import { createSolidInstanceRepository } from "./infrastructure/solid/solidInstanceRepository";
import { createSolidPreferencesRepository } from "./infrastructure/solid/solidPreferencesRepository";
import { createLocalStorageUpdateJournal } from "./infrastructure/browser/localStorageUpdateJournal";
import { createSolidInstanceCopier } from "./infrastructure/solid/solidInstanceCopier";
import { createSolidRepairRepository } from "./infrastructure/solid/solidRepairRepository";
import { createSolidReviewStateRepository } from "./infrastructure/solid/solidReviewStateRepository";
import { createSolidStorageGateway } from "./infrastructure/solid/solidStorageGateway";
import { createSolidWebIdDocumentRepository } from "./infrastructure/solid/solidWebIdDocumentRepository";
import { App } from "./ui/App";
import "./style.css";

/** Every pod request goes through the fence, so an instance being updated cannot be written (docs/migrations.md). */
const writeFence = createWriteFence(authFetch);
const podFetch = writeFence.fetch;

const shapeValidator = createShaclShapeValidator({
  fetch: podFetch,
  shapesFetch: (input, init) => globalThis.fetch(input, init),
  shapesBaseUrl: new URL("shapes/", document.baseURI).href,
});
/** Every write is checked against the shapes before it reaches the pod (docs/validation.md). */
const checkWrite = shapeValidator.checkSubjects;

const useCases = createUseCases({
  sessionGateway: createSolidSessionGateway("Solid Memo"),
  webIdDocumentRepository: createSolidWebIdDocumentRepository({
    fetch: podFetch,
  }),
  storageGateway: createSolidStorageGateway({ fetch: podFetch }),
  instanceRepository: createSolidInstanceRepository({
    fetch: podFetch,
    checkWrite,
    now: () => new Date(),
    randomId: () => crypto.randomUUID(),
  }),
  deckRepository: createSolidDeckRepository({
    fetch: podFetch,
    checkWrite,
    now: () => new Date(),
    randomId: () => crypto.randomUUID(),
  }),
  deckLibrary: createSolidDeckLibrary({
    fetch: (input, init) => globalThis.fetch(input, init),
    indexUrl: new URL("decks/index.ttl", document.baseURI).href,
  }),
  preferencesRepository: createSolidPreferencesRepository({
    fetch: podFetch,
    checkWrite,
  }),
  reviewStateRepository: createSolidReviewStateRepository({
    fetch: podFetch,
    checkWrite,
  }),
  shapeValidator,
  repairRepository: createSolidRepairRepository({ fetch: podFetch }),
  instanceCopier: createSolidInstanceCopier({ fetch: podFetch }),
  updateJournal: createLocalStorageUpdateJournal(),
  writeFence,
});

const queryClient = new QueryClient();

render(
  <QueryClientProvider client={queryClient}>
    <App useCases={useCases} />
  </QueryClientProvider>,
  document.getElementById("app")!,
);
