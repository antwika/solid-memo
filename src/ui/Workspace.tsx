import { useEffect } from "preact/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Instance, RegistrationTarget } from "../domain/instance";
import type { Session } from "../domain/session";
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
import { Loading } from "./Loading";
import { PracticeContainer } from "./PracticeContainer";
import { PreferencesContainer } from "./PreferencesContainer";
import { StoragePicker } from "./StoragePicker";
import { deckHref, routeToHash, useHashRoute } from "./router";
import { WebIdDocumentContainer } from "./WebIdDocumentContainer";

export function Workspace({
  useCases,
  session,
}: {
  useCases: UseCases;
  session: Session;
}) {
  const queryClient = useQueryClient();
  // The URL hash is the route state, so every view has a shareable URL
  // and Back/Forward walk the app's screens. The hash carries only
  // identifiers; the instance and deck objects are resolved below.
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

  // Initial route, once instances are known: one instance goes straight
  // in, several offer a choice, none starts the create funnel. Replaces
  // the URL so the empty hash is not a Back stop.
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

  // A deep link naming an unknown instance falls back to the picker (or
  // the create funnel when there is nothing to pick).
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

  // Shares the ["decks", instanceUrl] cache with DeckListContainer, so
  // navigating from the deck list resolves instantly.
  const decksQuery = useQuery({
    queryKey: ["decks", instanceUrl],
    queryFn: () => useCases.listDecks(instanceUrl!),
    enabled: needsDeck,
  });
  const activeDeck =
    needsDeck
      ? (decksQuery.data?.find((d) => d.url === deckUrl) ?? null)
      : null;

  // A deep link naming an unknown deck falls back to the instance home.
  useEffect(() => {
    if (!needsDeck || decksQuery.data === undefined) return;
    if (!decksQuery.data.some((d) => d.url === deckUrl)) {
      replace({ screen: "home", instanceUrl: instanceUrl! });
    }
  }, [needsDeck, decksQuery.data, deckUrl, instanceUrl]);

  // A card page names its card by URL; resolve it from the deck's cards
  // (the cache entry the Browser and the card page's saves share).
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

  // A deep link naming an unknown card (or a card just removed) falls
  // back to the deck's Browser.
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

  // Developer settings are a per-instance preference. Shares the cache
  // entry PreferencesContainer invalidates on save, so toggling takes
  // effect immediately. A failed read just leaves developer tools hidden.
  const preferencesQuery = useQuery({
    queryKey: ["preferences", instanceUrl],
    queryFn: () => useCases.getPreferences(instanceUrl!),
    enabled: activeInstance !== null,
  });
  const developerMode = preferencesQuery.data?.developerMode === true;

  const storagesQuery = useQuery({
    queryKey: ["storages", webId],
    queryFn: () => useCases.listStorages(session),
    enabled: route?.screen === "storagePicker",
  });

  // Auto-skip the storage picker when there is exactly one storage.
  // Replaces the URL: pushing would make Back bounce straight forward
  // again.
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

  if (instancesQuery.error) {
    return <p class="error">{errorMessage(instancesQuery.error)}</p>;
  }
  if (route === null || instances === undefined) {
    return <Loading label="Loading your Solid Memo instances…" />;
  }
  // An unknown instance in the URL: the redirect effect is about to
  // replace the route.
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
    // Unknown deck: the redirect effect is about to replace the route.
    if (activeDeck === null) {
      return <Loading label="Loading deck…" />;
    }
  }
  if (needsCard) {
    if (cardsQuery.error) {
      return <p class="error">{errorMessage(cardsQuery.error)}</p>;
    }
    // Still loading, or unknown: the redirect effect is about to replace
    // the route.
    if (activeCard === null) {
      return <Loading label="Loading card…" />;
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
            busy={attachInstanceMutation.isPending}
            error={errorMessage(attachInstanceMutation.error)}
            onSelect={(instance: Instance) =>
              navigate({ screen: "home", instanceUrl: instance.url })
            }
            onNewInstance={() => navigate({ screen: "storagePicker" })}
            onAttach={(url, target) =>
              attachInstanceMutation.mutate({ url, target })
            }
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
            // Never back to the storage picker: with exactly one storage it
            // would auto-forward straight here again.
            onBack={() => navigate({ screen: "instancePicker" })}
          />
        );
      case "home":
        return (
          <DeckListContainer
            useCases={useCases}
            instance={activeInstance!}
            onStudyDeck={(deck) =>
              navigate({
                screen: "practice",
                instanceUrl: instanceUrl!,
                deckUrl: deck.url,
                mode: "study",
              })
            }
            onPracticeDeck={(deck) =>
              navigate({
                screen: "practice",
                instanceUrl: instanceUrl!,
                deckUrl: deck.url,
                mode: "practice",
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
      case "deckDetail":
        return (
          <DeckDetailContainer
            useCases={useCases}
            instance={activeInstance!}
            deck={activeDeck!}
            onStudy={() =>
              navigate({
                screen: "practice",
                instanceUrl: instanceUrl!,
                deckUrl: deckUrl!,
                mode: "study",
              })
            }
            onPractice={() =>
              navigate({
                screen: "practice",
                instanceUrl: instanceUrl!,
                deckUrl: deckUrl!,
                mode: "practice",
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
            // Replace: the removed deck's Browser must not be a Back stop.
            onDeckRemoved={() =>
              replace({ screen: "home", instanceUrl: instanceUrl! })
            }
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
            // Keyed by card: the form's draft must not leak between cards.
            key={activeCard!.url}
            useCases={useCases}
            deck={activeDeck!}
            card={activeCard!}
            // Replace: the removed card's page must not be a Back stop.
            onRemoved={() => replace(browser)}
          />
        );
      }
      case "practice":
        return (
          <PracticeContainer
            useCases={useCases}
            instance={activeInstance!}
            deck={activeDeck!}
            mode={route.mode}
            onExit={() =>
              navigate({
                screen: "deckDetail",
                instanceUrl: instanceUrl!,
                deckUrl: deckUrl!,
              })
            }
          />
        );
      case "preferences":
        return (
          <PreferencesContainer
            useCases={useCases}
            instance={activeInstance!}
            onBack={() =>
              navigate({ screen: "home", instanceUrl: instanceUrl! })
            }
          />
        );
    }
  })();

  return (
    <>
      {activeInstance !== null && (
        <InstanceBar
          instance={activeInstance}
          onSwitch={() => navigate({ screen: "instancePicker" })}
          onOpenPreferences={() =>
            navigate({ screen: "preferences", instanceUrl: instanceUrl! })
          }
        />
      )}
      <Breadcrumbs
        crumbs={breadcrumbsFor(route, {
          deck: activeDeck?.name ?? "",
          card: activeCard?.front ?? "",
        })}
      />
      {screen}
      {developerMode && (
        <WebIdDocumentContainer useCases={useCases} session={session} />
      )}
    </>
  );
}
