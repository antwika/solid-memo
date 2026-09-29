import { useEffect } from "preact/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "@solid-memo/application/useCases";
import { cardLabel, type Deck } from "@solid-memo/domain/deck";
import { DEFAULT_INVALID_DATA_POLICY } from "@solid-memo/domain/invalidDataPolicy";
import { setAsideDecks } from "@solid-memo/domain/validation";
import type { Instance, RegistrationTarget } from "@solid-memo/domain/instance";
import type { LibraryDeck } from "@solid-memo/domain/library";
import type { Session } from "@solid-memo/domain/session";
import { Breadcrumbs, breadcrumbsFor } from "./Breadcrumbs";
import { BrowserContainer } from "./BrowserContainer";
import { CardContainer } from "./CardContainer";
import { CardCreatorContainer } from "./CardCreatorContainer";
import { DeckCreatorContainer } from "./DeckCreatorContainer";
import { DeckDetailContainer } from "./DeckDetailContainer";
import { DeckListContainer } from "./DeckListContainer";
import { errorMessage } from "./errorMessage";
import { InstanceBar } from "./InstanceBar";
import { InstanceCreator } from "./InstanceCreator";
import { InstancePicker } from "./InstancePicker";
import { BackupContainer } from "./BackupContainer";
import { DataCheckNotice } from "./DataCheckNotice";
import { LibraryBrowserContainer } from "./LibraryBrowserContainer";
import { LibraryContainer } from "./LibraryContainer";
import { LibraryDeckContainer } from "./LibraryDeckContainer";
import { LibraryPreviewContainer } from "./LibraryPreviewContainer";
import { Loading } from "./Loading";
import { MigrationContainer } from "./MigrationContainer";
import { StudyContainer } from "./StudyContainer";
import { PreferencesContainer } from "./PreferencesContainer";
import { StoragePicker } from "./StoragePicker";
import {
  deckHref,
  libraryDeckHref,
  routeToHash,
  useHashRoute,
  validationHref,
} from "./router";
import { ValidationContainer } from "./ValidationContainer";
import { WebIdDocumentContainer } from "./WebIdDocumentContainer";

export function Workspace({
  useCases,
  session,
}: {
  useCases: UseCases;
  session: Session;
}) {
  const queryClient = useQueryClient();
  const { route, navigate, replace } = useHashRoute();
  const webId = session.webId;

  const instancesQuery = useQuery({
    queryKey: ["instances", webId],
    queryFn: () => useCases.listInstances(session),
  });
  const instances = instancesQuery.data;

  const instanceUrl =
    route !== null && "instanceUrl" in route ? route.instanceUrl : null;
  const activeInstance =
    instanceUrl === null
      ? null
      : (instances?.find((i) => i.url === instanceUrl) ?? null);

  const deckUrl = route !== null && "deckUrl" in route ? route.deckUrl : null;
  const needsDeck = deckUrl !== null && activeInstance !== null;

  useEffect(() => {
    if (route !== null || instances === undefined) return;
    if (instances.length === 1) {
      replace({ screen: "home", instanceUrl: instances[0].url });
    } else if (instances.length > 1) {
      replace({ screen: "instancePicker" });
    } else {
      replace({ screen: "storagePicker" });
    }
  }, [route, instances]);

  useEffect(() => {
    if (instanceUrl === null || instances === undefined) return;
    if (!instances.some((i) => i.url === instanceUrl)) {
      replace(
        instances.length > 0
          ? { screen: "instancePicker" }
          : { screen: "storagePicker" },
      );
    }
  }, [instanceUrl, instances]);

  const decksQuery = useQuery({
    queryKey: ["decks", instanceUrl],
    queryFn: () => useCases.listDecks(instanceUrl!),
    enabled: needsDeck,
  });
  const activeDeck =
    needsDeck
      ? (decksQuery.data?.find((d) => d.url === deckUrl) ?? null)
      : null;

  useEffect(() => {
    if (!needsDeck || decksQuery.data === undefined) return;
    if (!decksQuery.data.some((d) => d.url === deckUrl)) {
      replace({ screen: "home", instanceUrl: instanceUrl! });
    }
  }, [needsDeck, decksQuery.data, deckUrl, instanceUrl]);

  const cardUrl = route?.screen === "card" ? route.cardUrl : null;
  const needsCard = cardUrl !== null && activeDeck !== null;
  const cardsQuery = useQuery({
    queryKey: ["cards", activeDeck?.cardsDocumentUrl],
    queryFn: () => useCases.listCards(activeDeck!),
    enabled: needsCard,
  });
  const activeCard = needsCard
    ? (cardsQuery.data?.find((c) => c.url === cardUrl) ?? null)
    : null;

  useEffect(() => {
    if (!needsCard || cardsQuery.data === undefined) return;
    if (!cardsQuery.data.some((c) => c.url === cardUrl)) {
      replace({
        screen: "browser",
        instanceUrl: instanceUrl!,
        deckUrl: deckUrl!,
      });
    }
  }, [needsCard, cardsQuery.data, cardUrl, instanceUrl, deckUrl]);

  const libraryDeckUrl =
    route?.screen === "libraryDeck" ||
    route?.screen === "libraryBrowser" ||
    route?.screen === "libraryPreview"
      ? route.libraryDeckUrl
      : null;
  const needsLibraryDeck = libraryDeckUrl !== null && activeInstance !== null;
  const libraryQuery = useQuery({
    queryKey: ["library"],
    queryFn: () => useCases.listLibraryDecks(),
    enabled: needsLibraryDeck,
  });
  // A library deck's page is addressed by its series, which outlives
  // releases; an address of one of its releases still finds it.
  const isAddressed = (d: LibraryDeck) =>
    d.seriesUrl === libraryDeckUrl || d.releases.some((r) => r.url === libraryDeckUrl);
  const activeLibraryDeck = needsLibraryDeck
    ? (libraryQuery.data?.find(isAddressed) ?? null)
    : null;

  useEffect(() => {
    if (!needsLibraryDeck || libraryQuery.data === undefined) return;
    if (!libraryQuery.data.some(isAddressed)) {
      replace({ screen: "library", instanceUrl: instanceUrl! });
    }
  }, [needsLibraryDeck, libraryQuery.data, libraryDeckUrl, instanceUrl]);

  const preferencesQuery = useQuery({
    queryKey: ["preferences", instanceUrl],
    queryFn: () => useCases.getPreferences(instanceUrl!),
    enabled: activeInstance !== null,
  });
  const developerMode = preferencesQuery.data?.developerMode === true;

  // Every instance is checked against Solid Memo's shapes and DCAT-AP
  // when it is opened (docs/validation.md); what happens with invalid
  // data is the user's invalid data policy. Writes are checked as they
  // are made, so the check runs again only after a repair or an update.
  const checkQuery = useQuery({
    queryKey: ["validation", instanceUrl],
    queryFn: () => useCases.validateInstance(instanceUrl!),
    enabled: activeInstance !== null,
    staleTime: Infinity,
  });
  const policy = preferencesQuery.data?.invalidDataPolicy ?? DEFAULT_INVALID_DATA_POLICY;
  const invalidReport =
    checkQuery.data !== undefined && !checkQuery.data.conforms ? checkQuery.data : null;
  const decksOfCheck = useQuery({
    queryKey: ["decks", instanceUrl],
    queryFn: () => useCases.listDecks(instanceUrl!),
    enabled: invalidReport !== null && policy === "block-subject",
  });
  const isSetAside = (deck: Deck) =>
    invalidReport !== null && policy === "block-subject" && setAsideDecks(invalidReport, [deck]).size > 0;
  /** Screens that stay reachable whatever the data: where the policy is changed and the report read. */
  const alwaysReachable = route?.screen === "preferences" || route?.screen === "validation";

  const storagesQuery = useQuery({
    queryKey: ["storages", webId],
    queryFn: () => useCases.listStorages(session),
    enabled: route?.screen === "storagePicker",
  });

  useEffect(() => {
    if (
      route?.screen === "storagePicker" &&
      storagesQuery.data?.length === 1
    ) {
      replace({
        screen: "instanceCreator",
        storageUrl: storagesQuery.data[0].url,
        source: storagesQuery.data[0].source,
      });
    }
  }, [route, storagesQuery.data]);

  const registrationOptionsQuery = useQuery({
    queryKey: ["registrationOptions", webId],
    queryFn: () => useCases.getRegistrationOptions(session),
    enabled:
      route?.screen === "instanceCreator" ||
      route?.screen === "instancePicker",
  });
  const registrationOptions = registrationOptionsQuery.data ?? null;

  const manualStorageMutation = useMutation({
    mutationFn: (url: string) => useCases.addManualStorage(url),
    onSuccess: (storage) =>
      navigate({
        screen: "instanceCreator",
        storageUrl: storage.url,
        source: storage.source,
      }),
  });

  const createInstanceMutation = useMutation({
    mutationFn: (args: {
      containerUrl: string;
      name: string;
      registrationTarget: RegistrationTarget;
    }) => useCases.createInstance(session, args),
    onSuccess: async (instance) => {
      await queryClient.invalidateQueries({ queryKey: ["instances", webId] });
      navigate({ screen: "home", instanceUrl: instance.url });
    },
  });

  const attachInstanceMutation = useMutation({
    mutationFn: (args: { url: string; target: RegistrationTarget }) =>
      useCases.attachInstanceByUrl(session, args.url, args.target),
    onSuccess: async (instance) => {
      await queryClient.invalidateQueries({ queryKey: ["instances", webId] });
      navigate({ screen: "home", instanceUrl: instance.url });
    },
  });

  const deleteInstanceMutation = useMutation({
    mutationFn: (instance: Instance) =>
      useCases.deleteInstance(session, instance),
    onSuccess: async (_, instance) => {
      queryClient.removeQueries({ queryKey: ["decks", instance.url] });
      queryClient.removeQueries({ queryKey: ["preferences", instance.url] });
      await queryClient.invalidateQueries({ queryKey: ["instances", webId] });
    },
  });

  if (instancesQuery.error) {
    return <p class="error">{errorMessage(instancesQuery.error)}</p>;
  }
  if (route === null || instances === undefined) {
    return <Loading label="Loading your Solid Memo instances…" />;
  }
  if (instanceUrl !== null && activeInstance === null) {
    return <Loading label="Loading your Solid Memo instances…" />;
  }
  if (needsDeck) {
    if (decksQuery.error) {
      return <p class="error">{errorMessage(decksQuery.error)}</p>;
    }
    if (decksQuery.data === undefined) {
      return <Loading label="Loading deck…" />;
    }
    if (activeDeck === null) {
      return <Loading label="Loading deck…" />;
    }
  }
  if (needsCard) {
    if (cardsQuery.error) {
      return <p class="error">{errorMessage(cardsQuery.error)}</p>;
    }
    if (activeCard === null) {
      return <Loading label="Loading card…" />;
    }
  }
  if (needsLibraryDeck) {
    if (libraryQuery.error) {
      return <p class="error">{errorMessage(libraryQuery.error)}</p>;
    }
    if (activeLibraryDeck === null) {
      return <Loading label="Loading the deck library…" />;
    }
  }

  const screen = (() => {
    switch (route.screen) {
      case "storagePicker":
        if (storagesQuery.error) {
          return <p class="error">{errorMessage(storagesQuery.error)}</p>;
        }
        if (storagesQuery.data === undefined) {
          return <Loading label="Discovering storages…" />;
        }
        return (
          <StoragePicker
            storages={storagesQuery.data}
            busy={manualStorageMutation.isPending}
            error={errorMessage(manualStorageMutation.error)}
            onSelect={(storage) =>
              navigate({
                screen: "instanceCreator",
                storageUrl: storage.url,
                source: storage.source,
              })
            }
            onAddManual={(url) => manualStorageMutation.mutate(url)}
          />
        );
      case "instancePicker":
        return (
          <InstancePicker
            instances={instances}
            options={registrationOptions}
            busy={
              attachInstanceMutation.isPending ||
              deleteInstanceMutation.isPending
            }
            error={
              errorMessage(attachInstanceMutation.error) ??
              errorMessage(deleteInstanceMutation.error)
            }
            onSelect={(instance: Instance) =>
              navigate({ screen: "home", instanceUrl: instance.url })
            }
            onNewInstance={() => navigate({ screen: "storagePicker" })}
            onAttach={(url, target) =>
              attachInstanceMutation.mutate({ url, target })
            }
            onDelete={(instance) => deleteInstanceMutation.mutate(instance)}
          />
        );
      case "instanceCreator":
        return (
          <InstanceCreator
            storage={{ url: route.storageUrl, source: route.source }}
            options={registrationOptions}
            busy={createInstanceMutation.isPending}
            error={errorMessage(createInstanceMutation.error)}
            onCreate={(args) => createInstanceMutation.mutate(args)}
            onBack={() => navigate({ screen: "instancePicker" })}
          />
        );
      case "home":
        return (
          <DeckListContainer
            useCases={useCases}
            instance={activeInstance!}
            isSetAside={isSetAside}
            onStudyDeck={(deck) =>
              navigate({
                screen: "study",
                instanceUrl: instanceUrl!,
                deckUrl: deck.url,
              })
            }
            onCreateDeck={() =>
              navigate({ screen: "deckCreator", instanceUrl: instanceUrl! })
            }
          />
        );
      case "deckCreator":
        return (
          <DeckCreatorContainer
            useCases={useCases}
            instance={activeInstance!}
            onDone={() =>
              navigate({ screen: "home", instanceUrl: instanceUrl! })
            }
          />
        );
      case "library":
        return (
          <LibraryContainer
            useCases={useCases}
            instance={activeInstance!}
            onDone={() =>
              navigate({ screen: "home", instanceUrl: instanceUrl! })
            }
          />
        );
      case "libraryDeck":
        return (
          <LibraryDeckContainer
            useCases={useCases}
            instance={activeInstance!}
            deck={activeLibraryDeck!}
            onBrowse={() =>
              navigate({
                screen: "libraryBrowser",
                instanceUrl: instanceUrl!,
                libraryDeckUrl: libraryDeckUrl!,
              })
            }
            onDone={() =>
              navigate({ screen: "home", instanceUrl: instanceUrl! })
            }
          />
        );
      case "libraryBrowser":
        return (
          <LibraryBrowserContainer
            useCases={useCases}
            deck={activeLibraryDeck!}
            deckHref={libraryDeckHref(instanceUrl!, libraryDeckUrl!)}
            page={route.page ?? 1}
            onPageChange={(page) => replace({ ...route, page })}
          />
        );
      case "libraryPreview":
        return (
          <LibraryPreviewContainer
            useCases={useCases}
            deck={activeLibraryDeck!}
            deckHref={libraryDeckHref(instanceUrl!, libraryDeckUrl!)}
            onExit={() =>
              navigate({ screen: "library", instanceUrl: instanceUrl! })
            }
          />
        );
      case "deckDetail":
        return (
          <DeckDetailContainer
            useCases={useCases}
            instance={activeInstance!}
            deck={activeDeck!}
            onStudy={() =>
              navigate({
                screen: "study",
                instanceUrl: instanceUrl!,
                deckUrl: deckUrl!,
              })
            }
            onBrowse={() =>
              navigate({
                screen: "browser",
                instanceUrl: instanceUrl!,
                deckUrl: deckUrl!,
              })
            }
          />
        );
      case "browser":
        return (
          <BrowserContainer
            useCases={useCases}
            deck={activeDeck!}
            deckHref={deckHref(instanceUrl!, deckUrl!)}
            page={route.page ?? 1}
            onAddCard={() =>
              navigate({
                screen: "cardCreator",
                instanceUrl: instanceUrl!,
                deckUrl: deckUrl!,
              })
            }
            cardHref={(card) =>
              routeToHash({
                screen: "card",
                instanceUrl: instanceUrl!,
                deckUrl: deckUrl!,
                cardUrl: card.url,
              })
            }
            onDeckRemoved={() =>
              replace({ screen: "home", instanceUrl: instanceUrl! })
            }
            onPageChange={(page) => replace({ ...route, page })}
          />
        );
      case "cardCreator":
        return (
          <CardCreatorContainer
            useCases={useCases}
            deck={activeDeck!}
            deckHref={deckHref(instanceUrl!, deckUrl!)}
            onBack={() =>
              navigate({
                screen: "browser",
                instanceUrl: instanceUrl!,
                deckUrl: deckUrl!,
              })
            }
          />
        );
      case "card": {
        const browser = {
          screen: "browser",
          instanceUrl: instanceUrl!,
          deckUrl: deckUrl!,
        } as const;
        return (
          <CardContainer
            key={activeCard!.url}
            useCases={useCases}
            deck={activeDeck!}
            card={activeCard!}
            onRemoved={() => replace(browser)}
          />
        );
      }
      case "study":
        return (
          <StudyContainer
            useCases={useCases}
            instance={activeInstance!}
            deck={activeDeck!}
            onExit={() =>
              navigate({ screen: "home", instanceUrl: instanceUrl! })
            }
          />
        );
      case "preferences":
        return (
          <>
          <PreferencesContainer
            useCases={useCases}
            instance={activeInstance!}
            onBack={() =>
              navigate({ screen: "home", instanceUrl: instanceUrl! })
            }
          />
          <BackupContainer
            useCases={useCases}
            session={session}
            instance={activeInstance!}
            onRestored={(restored) => replace({ screen: "home", instanceUrl: restored.url })}
          />
          </>
        );
      case "validation":
        if (developerMode) {
          return (
            <ValidationContainer useCases={useCases} instance={activeInstance!} />
          );
        }
        return preferencesQuery.isPending ? (
          <Loading label="Loading preferences…" />
        ) : (
          <p class="hint">
            Developer mode is off. Turn it on in{" "}
            <a href={routeToHash({ screen: "preferences", instanceUrl: instanceUrl! })}>
              Preferences
            </a>{" "}
            to check this instance against Solid Memo's shapes.
          </p>
        );
    }
  })();

  const blocked =
    activeInstance !== null && !alwaysReachable && policy === "block-instance" &&
    (checkQuery.isPending || invalidReport !== null);
  const deckSetAside = activeDeck !== null && isSetAside(activeDeck);
  const shown = blocked ? (
    invalidReport === null ? <Loading label="Checking this instance's data…" /> : null
  ) : deckSetAside ? (
    <p class="hint">This deck is set aside: its data does not conform. Repair it above to use it again.</p>
  ) : (
    screen
  );

  return (
    <>
      {activeInstance !== null && (
        <>
          <InstanceBar
            instance={activeInstance}
            onSwitch={() => navigate({ screen: "instancePicker" })}
            onOpenPreferences={() =>
              navigate({ screen: "preferences", instanceUrl: instanceUrl! })
            }
          />
          <MigrationContainer
            useCases={useCases}
            session={session}
            instance={activeInstance}
            onUpdated={(updated) => replace({ screen: "home", instanceUrl: updated.url })}
          />
          {checkQuery.error && (
            <p class="warning">
              Could not check this instance's data: {errorMessage(checkQuery.error)}
            </p>
          )}
          {invalidReport !== null && (
            <DataCheckNotice
              useCases={useCases}
              instance={activeInstance}
              report={invalidReport}
              policy={policy}
              setAside={(decksOfCheck.data ?? []).filter(isSetAside).map((deck) => deck.name)}
            />
          )}
        </>
      )}
      <Breadcrumbs
        crumbs={breadcrumbsFor(route, {
          deck: activeDeck?.name ?? "",
          card: activeCard === null ? "" : cardLabel(activeCard),
          libraryDeck: activeLibraryDeck?.name ?? "",
        })}
      />
      {shown}
      {developerMode && activeInstance !== null && (
        <nav class="developer-tools" aria-label="Developer tools">
          <a href={validationHref(activeInstance.url)}>Validate this instance</a>
        </nav>
      )}
      {developerMode && (
        <WebIdDocumentContainer useCases={useCases} session={session} />
      )}
    </>
  );
}
