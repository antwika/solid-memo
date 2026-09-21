import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Workspace } from "./Workspace";
import type { UseCases } from "../application/useCases";
import type { Deck } from "../domain/deck";
import type { Instance } from "../domain/instance";
import type { Session } from "../domain/session";
import type { Storage } from "../domain/storage";
import { makeUseCasesFake } from "../test/useCasesFake";

const session: Session = { webId: "https://alice.example/profile/card#me" };
const storageA: Storage = { url: "https://pod.example/", source: "profile" };
const storageB: Storage = { url: "https://backup.example/", source: "profile" };
const instanceA: Instance = {
  url: "https://pod.example/solid-memo/a/",
  name: "Deck set A",
};
const instanceB: Instance = {
  url: "https://pod.example/solid-memo/b/",
  name: "Deck set B",
};

function makeUseCases(overrides: Partial<UseCases> = {}): UseCases {
  return makeUseCasesFake({
    listStorages: vi.fn(async () => [storageA, storageB]),
    addManualStorage: vi.fn(async () => storageA),
    createInstance: vi.fn(async () => instanceA),
    attachInstanceByUrl: vi.fn(async () => instanceB),
    ...overrides,
  });
}

function renderWorkspace(useCases: UseCases) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <Workspace useCases={useCases} session={session} />
    </QueryClientProvider>,
  );
}

describe("Workspace", () => {
  // Route state lives in the URL hash; give every test a clean one.
  beforeEach(() => {
    window.history.replaceState(null, "", window.location.pathname);
  });

  it("shows a loading state while instances are being listed", () => {
    renderWorkspace(
      makeUseCases({
        listInstances: vi.fn(() => new Promise<Instance[]>(() => {})),
      }),
    );
    expect(
      screen.getByText("Loading your Solid Memo instances…"),
    ).toBeInTheDocument();
  });

  it("shows an error when listing instances fails", async () => {
    renderWorkspace(
      makeUseCases({
        listInstances: vi.fn(async () => {
          throw new Error("indexes unreachable");
        }),
      }),
    );
    expect(
      await screen.findByText("indexes unreachable"),
    ).toBeInTheDocument();
  });

  it("goes straight home with exactly one instance, showing it in the bar", async () => {
    renderWorkspace(makeUseCases({ listInstances: vi.fn(async () => [instanceA]) }));
    expect(
      await screen.findByRole("heading", { name: "Decks" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Deck set A")).toBeInTheDocument();
    expect(screen.getByText(instanceA.url)).toBeInTheDocument();
  });

  it("offers the instance picker with several instances, then opens one", async () => {
    renderWorkspace(
      makeUseCases({
        listInstances: vi.fn(async () => [instanceA, instanceB]),
      }),
    );
    fireEvent.click(
      await screen.findByRole("button", { name: "Deck set B" }),
    );
    expect(
      await screen.findByRole("heading", { name: "Decks" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Deck set B")).toBeInTheDocument();
  });

  it("starts at the storage picker when no instances exist", async () => {
    renderWorkspace(makeUseCases());
    expect(
      await screen.findByRole("heading", { name: "Choose a storage" }),
    ).toBeInTheDocument();
  });

  it("shows a storage loading state", async () => {
    renderWorkspace(
      makeUseCases({
        listStorages: vi.fn(() => new Promise<Storage[]>(() => {})),
      }),
    );
    expect(
      await screen.findByText("Discovering storages…"),
    ).toBeInTheDocument();
  });

  it("shows an error when storage discovery fails", async () => {
    renderWorkspace(
      makeUseCases({
        listStorages: vi.fn(async () => {
          throw new Error("no storages");
        }),
      }),
    );
    expect(await screen.findByText("no storages")).toBeInTheDocument();
  });

  it("skips the storage picker when exactly one storage exists", async () => {
    renderWorkspace(makeUseCases({ listStorages: vi.fn(async () => [storageA]) }));
    expect(
      await screen.findByRole("heading", { name: "New Solid Memo instance" }),
    ).toBeInTheDocument();
  });

  it("selects a storage and creates an instance there", async () => {
    // After creation the instance shows up in the listing, which the
    // URL router resolves the instance from.
    const useCases = makeUseCases({
      listInstances: vi
        .fn<() => Promise<Instance[]>>()
        .mockResolvedValueOnce([])
        .mockResolvedValue([instanceA]),
    });
    renderWorkspace(useCases);

    fireEvent.click(
      await screen.findByRole("button", { name: "https://pod.example/" }),
    );
    fireEvent.input(await screen.findByLabelText("Name"), {
      target: { value: "Deck set A" },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: "Create instance" }).closest("form")!,
    );

    expect(
      await screen.findByRole("heading", { name: "Decks" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Deck set A")).toBeInTheDocument();
    expect(useCases.createInstance).toHaveBeenCalledWith(session, {
      containerUrl: "https://pod.example/solid-memo/main/",
      name: "Deck set A",
      registrationTarget: "private",
    });
  });

  it("adds a manual storage and continues to the creator", async () => {
    const useCases = makeUseCases();
    renderWorkspace(useCases);

    fireEvent.input(await screen.findByLabelText("Storage URL"), {
      target: { value: "https://pod.example/" },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: "Use this storage" }).closest("form")!,
    );

    expect(
      await screen.findByRole("heading", { name: "New Solid Memo instance" }),
    ).toBeInTheDocument();
    expect(useCases.addManualStorage).toHaveBeenCalledWith(
      "https://pod.example/",
    );
  });

  it("shows a create error and stays on the creator", async () => {
    const useCases = makeUseCases({
      listStorages: vi.fn(async () => [storageA]),
      createInstance: vi.fn(async () => {
        throw new Error("registration refused");
      }),
    });
    renderWorkspace(useCases);

    fireEvent.input(await screen.findByLabelText("Name"), {
      target: { value: "X" },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: "Create instance" }).closest("form")!,
    );
    expect(
      await screen.findByText("registration refused"),
    ).toBeInTheDocument();
  });

  it("navigates back from the creator to the instance picker", async () => {
    renderWorkspace(makeUseCases({ listStorages: vi.fn(async () => [storageA]) }));

    fireEvent.click(await screen.findByRole("button", { name: "Back" }));
    expect(
      await screen.findByRole("heading", {
        name: "Choose a Solid Memo instance",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("No instances are registered yet."),
    ).toBeInTheDocument();
  });

  it("reaches the creator from the instance picker via the storage picker", async () => {
    renderWorkspace(
      makeUseCases({
        listInstances: vi.fn(async () => [instanceA, instanceB]),
      }),
    );

    fireEvent.click(
      await screen.findByRole("button", { name: "New instance…" }),
    );
    fireEvent.click(
      await screen.findByRole("button", { name: "https://pod.example/" }),
    );
    expect(
      await screen.findByRole("heading", { name: "New Solid Memo instance" }),
    ).toBeInTheDocument();
  });

  it("attaches an instance by URL and opens it", async () => {
    const useCases = makeUseCases({
      listInstances: vi.fn(async () => [instanceA, instanceB]),
    });
    renderWorkspace(useCases);

    fireEvent.input(
      await screen.findByLabelText("Instance container URL"),
      { target: { value: "https://pod.example/solid-memo/b/" } },
    );
    fireEvent.submit(
      screen.getByRole("button", { name: "Attach" }).closest("form")!,
    );

    await waitFor(() => {
      expect(useCases.attachInstanceByUrl).toHaveBeenCalledWith(
        session,
        "https://pod.example/solid-memo/b/",
        "private",
      );
    });
    expect(
      await screen.findByRole("heading", { name: "Decks" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Deck set B")).toBeInTheDocument();
  });

  it("returns to the instance picker from home", async () => {
    renderWorkspace(makeUseCases({ listInstances: vi.fn(async () => [instanceA]) }));

    fireEvent.click(
      await screen.findByRole("button", { name: "Switch instance" }),
    );
    expect(
      await screen.findByRole("heading", {
        name: "Choose a Solid Memo instance",
      }),
    ).toBeInTheDocument();
  });

  it("opens the preferences from home and navigates back", async () => {
    renderWorkspace(
      makeUseCases({ listInstances: vi.fn(async () => [instanceA]) }),
    );

    fireEvent.click(
      await screen.findByRole("button", { name: "Preferences" }),
    );
    expect(
      await screen.findByRole("heading", { name: "Study preferences" }),
    ).toBeInTheDocument();

    fireEvent.click(
      await screen.findByRole("button", { name: "Back to decks" }),
    );
    expect(
      await screen.findByRole("heading", { name: "Decks" }),
    ).toBeInTheDocument();
  });

  it("creates a deck in the deck creator and returns to the deck list", async () => {
    const deck: Deck = {
      id: "deck-1",
      url: `${instanceA.url}catalog.ttl#deck-1`,
      name: "Kana",
      cardsDocumentUrl: `${instanceA.url}decks/deck-1.ttl`,
      reviewsDocumentUrl: `${instanceA.url}reviews/deck-1.ttl`,
      createdAt: "2026-09-21T10:00:00.000Z",
    };
    const listDecks = vi
      .fn<() => Promise<Deck[]>>()
      .mockResolvedValueOnce([])
      .mockResolvedValue([deck]);
    renderWorkspace(
      makeUseCases({
        listInstances: vi.fn(async () => [instanceA]),
        listDecks,
        createDeck: vi.fn(async () => deck),
      }),
    );

    fireEvent.click(
      await screen.findByRole("button", { name: "Create deck" }),
    );
    expect(
      await screen.findByRole("heading", { name: "New deck" }),
    ).toBeInTheDocument();

    fireEvent.input(screen.getByLabelText("Name"), {
      target: { value: "Kana" },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: "Create deck" }).closest("form")!,
    );

    expect(
      await screen.findByRole("heading", { name: "Decks" }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: "Kana" }),
    ).toBeInTheDocument();
  });

  it("opens a deck from home and navigates back", async () => {
    const deck: Deck = {
      id: "deck-1",
      url: `${instanceA.url}catalog.ttl#deck-1`,
      name: "Kanji N5",
      cardsDocumentUrl: `${instanceA.url}decks/deck-1.ttl`,
      reviewsDocumentUrl: `${instanceA.url}reviews/deck-1.ttl`,
      createdAt: "2026-09-21T10:00:00.000Z",
    };
    renderWorkspace(
      makeUseCases({
        listInstances: vi.fn(async () => [instanceA]),
        listDecks: vi.fn(async () => [deck]),
      }),
    );

    fireEvent.click(await screen.findByRole("button", { name: "Kanji N5" }));
    expect(
      await screen.findByRole("heading", { name: "Kanji N5" }),
    ).toBeInTheDocument();

    fireEvent.click(
      await screen.findByRole("button", { name: "Back to decks" }),
    );
    expect(
      await screen.findByRole("heading", { name: "Decks" }),
    ).toBeInTheDocument();
  });

  it("reaches the card creator from both the deck detail and the Browser", async () => {
    const deck: Deck = {
      id: "deck-1",
      url: `${instanceA.url}catalog.ttl#deck-1`,
      name: "Kanji N5",
      cardsDocumentUrl: `${instanceA.url}decks/deck-1.ttl`,
      reviewsDocumentUrl: `${instanceA.url}reviews/deck-1.ttl`,
      createdAt: "2026-09-21T10:00:00.000Z",
    };
    renderWorkspace(
      makeUseCases({
        listInstances: vi.fn(async () => [instanceA]),
        listDecks: vi.fn(async () => [deck]),
      }),
    );

    // From the deck detail; Back returns to the deck detail.
    fireEvent.click(await screen.findByRole("button", { name: "Kanji N5" }));
    fireEvent.click(await screen.findByRole("button", { name: "Add card" }));
    expect(
      await screen.findByRole("heading", { name: "New card" }),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(
      await screen.findByRole("heading", { name: "Kanji N5" }),
    ).toBeInTheDocument();

    // From the Browser; Back returns to the Browser.
    fireEvent.click(await screen.findByRole("button", { name: "Browser" }));
    fireEvent.click(await screen.findByRole("button", { name: "Add card" }));
    expect(
      await screen.findByRole("heading", { name: "New card" }),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(
      await screen.findByRole("heading", { name: "Browser: Kanji N5" }),
    ).toBeInTheDocument();
  });

  it("opens the Browser from the deck detail and navigates back", async () => {
    const deck: Deck = {
      id: "deck-1",
      url: `${instanceA.url}catalog.ttl#deck-1`,
      name: "Kanji N5",
      cardsDocumentUrl: `${instanceA.url}decks/deck-1.ttl`,
      reviewsDocumentUrl: `${instanceA.url}reviews/deck-1.ttl`,
      createdAt: "2026-09-21T10:00:00.000Z",
    };
    renderWorkspace(
      makeUseCases({
        listInstances: vi.fn(async () => [instanceA]),
        listDecks: vi.fn(async () => [deck]),
      }),
    );

    fireEvent.click(await screen.findByRole("button", { name: "Kanji N5" }));
    fireEvent.click(await screen.findByRole("button", { name: "Browser" }));
    expect(
      await screen.findByRole("heading", { name: "Browser: Kanji N5" }),
    ).toBeInTheDocument();

    fireEvent.click(
      await screen.findByRole("button", { name: "Back to deck" }),
    );
    expect(
      await screen.findByRole("heading", { name: "Kanji N5" }),
    ).toBeInTheDocument();
  });

  it("starts and ends a practice session from the deck detail", async () => {
    const deck: Deck = {
      id: "deck-1",
      url: `${instanceA.url}catalog.ttl#deck-1`,
      name: "Kanji N5",
      cardsDocumentUrl: `${instanceA.url}decks/deck-1.ttl`,
      reviewsDocumentUrl: `${instanceA.url}reviews/deck-1.ttl`,
      createdAt: "2026-09-21T10:00:00.000Z",
    };
    renderWorkspace(
      makeUseCases({
        listInstances: vi.fn(async () => [instanceA]),
        listDecks: vi.fn(async () => [deck]),
      }),
    );

    fireEvent.click(await screen.findByRole("button", { name: "Kanji N5" }));
    fireEvent.click(await screen.findByRole("button", { name: "Practice" }));
    expect(
      await screen.findByRole("heading", { name: "Practice: Kanji N5" }),
    ).toBeInTheDocument();

    fireEvent.click(
      await screen.findByRole("button", { name: "End session" }),
    );
    expect(
      await screen.findByRole("heading", { name: "Kanji N5" }),
    ).toBeInTheDocument();
  });

  it("starts a due-only study session from the deck detail", async () => {
    const deck: Deck = {
      id: "deck-1",
      url: `${instanceA.url}catalog.ttl#deck-1`,
      name: "Kanji N5",
      cardsDocumentUrl: `${instanceA.url}decks/deck-1.ttl`,
      reviewsDocumentUrl: `${instanceA.url}reviews/deck-1.ttl`,
      createdAt: "2026-09-21T10:00:00.000Z",
    };
    renderWorkspace(
      makeUseCases({
        listInstances: vi.fn(async () => [instanceA]),
        listDecks: vi.fn(async () => [deck]),
      }),
    );

    fireEvent.click(await screen.findByRole("button", { name: "Kanji N5" }));
    fireEvent.click(await screen.findByRole("button", { name: "Study" }));
    expect(
      await screen.findByRole("heading", { name: "Study: Kanji N5" }),
    ).toBeInTheDocument();
  });

  it("starts a study session straight from the deck list", async () => {
    renderWorkspace(
      makeUseCases({
        listInstances: vi.fn(async () => [instanceA]),
        listDecks: vi.fn(async () => [deck]),
      }),
    );

    fireEvent.click(
      await screen.findByRole("button", { name: "Study Kanji N5" }),
    );
    expect(
      await screen.findByRole("heading", { name: "Study: Kanji N5" }),
    ).toBeInTheDocument();
    expect(window.location.hash).toContain("mode=study");
  });

  const deck: Deck = {
    id: "deck-1",
    url: `${instanceA.url}catalog.ttl#deck-1`,
    name: "Kanji N5",
    cardsDocumentUrl: `${instanceA.url}decks/deck-1.ttl`,
    reviewsDocumentUrl: `${instanceA.url}reviews/deck-1.ttl`,
    createdAt: "2026-09-21T10:00:00.000Z",
  };

  it("keeps the URL in sync while navigating", async () => {
    renderWorkspace(
      makeUseCases({
        listInstances: vi.fn(async () => [instanceA]),
        listDecks: vi.fn(async () => [deck]),
      }),
    );

    await screen.findByRole("heading", { name: "Decks" });
    expect(window.location.hash).toBe(
      `#/decks?instance=${encodeURIComponent(instanceA.url)}`,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Kanji N5" }));
    await screen.findByRole("heading", { name: "Kanji N5" });
    expect(window.location.hash).toBe(
      `#/deck?instance=${encodeURIComponent(
        instanceA.url,
      )}&deck=${encodeURIComponent(deck.url)}`,
    );
  });

  it("restores the view from a deep link", async () => {
    window.history.replaceState(
      null,
      "",
      `#/deck?instance=${encodeURIComponent(
        instanceA.url,
      )}&deck=${encodeURIComponent(deck.url)}`,
    );
    renderWorkspace(
      makeUseCases({
        listInstances: vi.fn(async () => [instanceA]),
        listDecks: vi.fn(async () => [deck]),
      }),
    );

    expect(
      await screen.findByRole("heading", { name: "Kanji N5" }),
    ).toBeInTheDocument();
  });

  it("follows Back/Forward (external hash changes)", async () => {
    renderWorkspace(
      makeUseCases({
        listInstances: vi.fn(async () => [instanceA]),
        listDecks: vi.fn(async () => [deck]),
      }),
    );

    fireEvent.click(await screen.findByRole("button", { name: "Kanji N5" }));
    await screen.findByRole("heading", { name: "Kanji N5" });

    // The browser fires hashchange when the user walks history.
    window.history.replaceState(
      null,
      "",
      `#/decks?instance=${encodeURIComponent(instanceA.url)}`,
    );
    fireEvent(window, new Event("hashchange"));

    expect(
      await screen.findByRole("heading", { name: "Decks" }),
    ).toBeInTheDocument();
  });

  it("returns to the deck list when the brand link empties the route", async () => {
    renderWorkspace(
      makeUseCases({
        listInstances: vi.fn(async () => [instanceA]),
        listDecks: vi.fn(async () => [deck]),
      }),
    );

    fireEvent.click(await screen.findByRole("button", { name: "Kanji N5" }));
    await screen.findByRole("heading", { name: "Kanji N5" });

    // Clicking the logotype navigates to "#/", which parses to no
    // route and falls back to the default.
    window.history.replaceState(null, "", "#/");
    fireEvent(window, new Event("hashchange"));

    expect(
      await screen.findByRole("heading", { name: "Decks" }),
    ).toBeInTheDocument();
  });

  it("falls back to the instance picker for a deep link to an unknown instance", async () => {
    window.history.replaceState(
      null,
      "",
      "#/decks?instance=https%3A%2F%2Felsewhere.example%2F",
    );
    renderWorkspace(
      makeUseCases({
        listInstances: vi.fn(async () => [instanceA, instanceB]),
      }),
    );

    expect(
      await screen.findByRole("heading", {
        name: "Choose a Solid Memo instance",
      }),
    ).toBeInTheDocument();
  });

  it("falls back to the storage picker for an unknown instance when none exist", async () => {
    window.history.replaceState(
      null,
      "",
      "#/decks?instance=https%3A%2F%2Felsewhere.example%2F",
    );
    renderWorkspace(makeUseCases());

    expect(
      await screen.findByRole("heading", { name: "Choose a storage" }),
    ).toBeInTheDocument();
  });

  it("falls back to the deck list for a deep link to an unknown deck", async () => {
    window.history.replaceState(
      null,
      "",
      `#/deck?instance=${encodeURIComponent(
        instanceA.url,
      )}&deck=${encodeURIComponent(`${instanceA.url}catalog.ttl#gone`)}`,
    );
    renderWorkspace(
      makeUseCases({
        listInstances: vi.fn(async () => [instanceA]),
        listDecks: vi.fn(async () => [deck]),
      }),
    );

    expect(
      await screen.findByRole("heading", { name: "Decks" }),
    ).toBeInTheDocument();
  });

  it("shows a loading state while a deep-linked deck is being fetched", async () => {
    window.history.replaceState(
      null,
      "",
      `#/deck?instance=${encodeURIComponent(
        instanceA.url,
      )}&deck=${encodeURIComponent(deck.url)}`,
    );
    renderWorkspace(
      makeUseCases({
        listInstances: vi.fn(async () => [instanceA]),
        listDecks: vi.fn(() => new Promise<Deck[]>(() => {})),
      }),
    );

    expect(await screen.findByText("Loading deck…")).toBeInTheDocument();
  });

  it("shows an error when resolving a deep-linked deck fails", async () => {
    window.history.replaceState(
      null,
      "",
      `#/deck?instance=${encodeURIComponent(
        instanceA.url,
      )}&deck=${encodeURIComponent(deck.url)}`,
    );
    renderWorkspace(
      makeUseCases({
        listInstances: vi.fn(async () => [instanceA]),
        listDecks: vi.fn(async () => {
          throw new Error("catalog unreachable");
        }),
      }),
    );

    expect(
      await screen.findByText("catalog unreachable"),
    ).toBeInTheDocument();
  });
});
