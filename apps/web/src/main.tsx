import { render } from "preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createUseCases } from "@solid-memo/application/useCases";
import { authFetch } from "@solid-memo/solid/authFetch";
import { createWriteFence } from "@solid-memo/solid/writeFence";
import { createSolidSessionGateway } from "@solid-memo/solid/solidSessionGateway";
import { createShaclShapeValidator } from "@solid-memo/solid/shaclShapeValidator";
import { createSolidDeckLibrary } from "@solid-memo/solid/solidDeckLibrary";
import { createSolidDeckRepository } from "@solid-memo/solid/solidDeckRepository";
import { createSolidDigestRepository } from "@solid-memo/solid/solidDigestRepository";
import { createSolidAnswerLog } from "@solid-memo/solid/solidAnswerLog";
import { createSolidInstanceRepository } from "@solid-memo/solid/solidInstanceRepository";
import { createSolidPreferencesRepository } from "@solid-memo/solid/solidPreferencesRepository";
import { createLocalStorageLanguagePreference } from "@solid-memo/browser/localStorageLanguagePreference";
import { createLocalStorageUpdateJournal } from "@solid-memo/browser/localStorageUpdateJournal";
import { createSolidInstanceCopier } from "@solid-memo/solid/solidInstanceCopier";
import { createSolidRepairRepository } from "@solid-memo/solid/solidRepairRepository";
import { createSolidReviewStateRepository } from "@solid-memo/solid/solidReviewStateRepository";
import { createSolidStorageGateway } from "@solid-memo/solid/solidStorageGateway";
import { createSolidWebIdDocumentRepository } from "@solid-memo/solid/solidWebIdDocumentRepository";
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
  languagePreference: createLocalStorageLanguagePreference(),
  writeFence,
  digestRepository: createSolidDigestRepository({ fetch: podFetch, checkWrite }),
  answerLog: createSolidAnswerLog({ fetch: podFetch, checkWrite }),
  ruleset: __SHAPES_RULESET__,
});

const queryClient = new QueryClient();

render(
  <QueryClientProvider client={queryClient}>
    <App useCases={useCases} />
  </QueryClientProvider>,
  document.getElementById("app")!,
);
