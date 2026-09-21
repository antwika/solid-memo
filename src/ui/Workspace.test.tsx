import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Workspace } from "./Workspace";
import type { UseCases } from "../application/useCases";
import type { Card, Deck } from "../domain/deck";
import { DEFAULT_PREFERENCES } from "../domain/preferences";
import type { Instance } from "../domain/instance";
import type { Session } from "../domain/session";
import type { Storage } from "../domain/storage";
import { makeUseCasesFake } from "../test/useCasesFake";
import { routeToHash } from "./router";

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
      await screen.findByRole("link", { name: "Back to decks" }),
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
      await screen.findByRole("link", { name: "Kana" }),
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

    fireEvent.click(await screen.findByRole("link", { name: "Kanji N5" }));
    expect(
      await screen.findByRole("heading", { name: "Kanji N5" }),
    ).toBeInTheDocument();

    fireEvent.click(
      await screen.findByRole("link", { name: "Back to decks" }),
    );
    expect(
      await screen.findByRole("heading", { name: "Decks" }),
    ).toBeInTheDocument();
  });

  it("reaches the card creator from the Browser only, and returns there", async () => {
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

    // The deck detail is for studying: no card editing there.
    fireEvent.click(await screen.findByRole("link", { name: "Kanji N5" }));
    const browserButton = await screen.findByRole("button", {
      name: "Browser",
    });
    expect(screen.queryByRole("button", { name: "Add card" })).toBeNull();

    fireEvent.click(browserButton);
    fireEvent.click(await screen.findByRole("button", { name: "Add card" }));
    expect(
      await screen.findByRole("heading", { name: "New card" }),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(
      await screen.findByRole("heading", { name: "Browser: Kanji N5" }),
    ).toBeInTheDocument();
  });

  it("removes a deck from the Browser and lands on the deck list", async () => {
    vi.stubGlobal("confirm", vi.fn(() => true));
    const deck: Deck = {
      id: "deck-1",
      url: `${instanceA.url}catalog.ttl#deck-1`,
      name: "Kanji N5",
      cardsDocumentUrl: `${instanceA.url}decks/deck-1.ttl`,
      reviewsDocumentUrl: `${instanceA.url}reviews/deck-1.ttl`,
      createdAt: "2026-09-21T10:00:00.000Z",
    };
    let removed = false;
    const useCases = makeUseCases({
      listInstances: vi.fn(async () => [instanceA]),
      listDecks: vi.fn(async () => (removed ? [] : [deck])),
      removeDeck: vi.fn(async () => {
        removed = true;
      }),
    });
    renderWorkspace(useCases);

    fireEvent.click(await screen.findByRole("link", { name: "Kanji N5" }));
    fireEvent.click(await screen.findByRole("button", { name: "Browser" }));
    fireEvent.click(await screen.findByRole("button", { name: "Remove deck" }));

    expect(await screen.findByText(/No decks yet/)).toBeInTheDocument();
    expect(useCases.removeDeck).toHaveBeenCalledWith(deck);
    expect(window.location.hash).toContain("#/decks");
  });

  it("shows a deck's new name after renaming it in the Browser", async () => {
    const deck: Deck = {
      id: "deck-1",
      url: `${instanceA.url}catalog.ttl#deck-1`,
      name: "Kanji N5",
      cardsDocumentUrl: `${instanceA.url}decks/deck-1.ttl`,
      reviewsDocumentUrl: `${instanceA.url}reviews/deck-1.ttl`,
      createdAt: "2026-09-21T10:00:00.000Z",
    };
    let name = deck.name;
    renderWorkspace(
      makeUseCases({
        listInstances: vi.fn(async () => [instanceA]),
        listDecks: vi.fn(async () => [{ ...deck, name }]),
        renameDeck: vi.fn(async (renamed: Deck, newName: string) => {
          name = newName;
          return { ...renamed, name: newName };
        }),
      }),
    );

    fireEvent.click(await screen.findByRole("link", { name: "Kanji N5" }));
    fireEvent.click(await screen.findByRole("button", { name: "Browser" }));
    fireEvent.click(await screen.findByRole("button", { name: "Rename deck" }));
    fireEvent.input(screen.getByLabelText("Deck name"), {
      target: { value: "Kanji N4" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save name" }));

    expect(
      await screen.findByRole("heading", { name: "Browser: Kanji N4" }),
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

    fireEvent.click(await screen.findByRole("link", { name: "Kanji N5" }));
    fireEvent.click(await screen.findByRole("button", { name: "Browser" }));
    expect(
      await screen.findByRole("heading", { name: "Browser: Kanji N5" }),
    ).toBeInTheDocument();

    fireEvent.click(
      await screen.findByRole("link", { name: "Back to deck" }),
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
        // A due card, so the deck detail offers both sessions.
        getStudyQueue: vi.fn(async () => ({
          due: [
            {
              id: "card-1",
              url: `${deck.cardsDocumentUrl}#card-1`,
              front: "水",
              back: "water",
              createdAt: "2026-09-21T10:00:00.000Z",
            } satisfies Card,
          ],
          newCards: [],
        })),
      }),
    );

    fireEvent.click(await screen.findByRole("link", { name: "Kanji N5" }));
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
        // A due card, so the deck detail offers both sessions.
        getStudyQueue: vi.fn(async () => ({
          due: [
            {
              id: "card-1",
              url: `${deck.cardsDocumentUrl}#card-1`,
              front: "水",
              back: "water",
              createdAt: "2026-09-21T10:00:00.000Z",
            } satisfies Card,
          ],
          newCards: [],
        })),
      }),
    );

    fireEvent.click(await screen.findByRole("link", { name: "Kanji N5" }));
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

    fireEvent.click(await screen.findByRole("link", { name: "Kanji N5" }));
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

    fireEvent.click(await screen.findByRole("link", { name: "Kanji N5" }));
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

  describe("card pages", () => {
    const card: Card = {
      id: "card-1",
      url: `${deck.cardsDocumentUrl}#card-1`,
      front: "水",
      back: "water",
      createdAt: "2026-09-21T10:00:00.000Z",
    };

    function openBrowser(useCases: UseCases) {
      renderWorkspace(useCases);
      return (async () => {
        fireEvent.click(await screen.findByRole("link", { name: deck.name }));
        fireEvent.click(await screen.findByRole("button", { name: "Browser" }));
      })();
    }

    it("opens a card on its own page, with its own breadcrumb", async () => {
      await openBrowser(
        makeUseCases({
          listInstances: vi.fn(async () => [instanceA]),
          listDecks: vi.fn(async () => [deck]),
          listCards: vi.fn(async () => [card]),
        }),
      );

      fireEvent.click(await screen.findByRole("link", { name: "水" }));

      expect(
        await screen.findByRole("heading", { name: "Card" }),
      ).toBeInTheDocument();
      expect(window.location.hash).toContain("#/card?");
      const trail = within(
        screen.getByRole("navigation", { name: "Breadcrumb" }),
      );
      expect(
        trail.getAllByRole("link").map((link) => link.textContent),
      ).toEqual(["Decks", deck.name, "Browser", "水"]);
      expect(trail.getByRole("link", { name: "水" })).toHaveAttribute(
        "aria-current",
        "page",
      );

      // And back, by link.
      fireEvent.click(screen.getByRole("link", { name: "Back to Browser" }));
      expect(
        await screen.findByRole("heading", { name: `Browser: ${deck.name}` }),
      ).toBeInTheDocument();
    });

    it("shows a saved edit on the page and in its breadcrumb", async () => {
      let front = card.front;
      await openBrowser(
        makeUseCases({
          listInstances: vi.fn(async () => [instanceA]),
          listDecks: vi.fn(async () => [deck]),
          listCards: vi.fn(async () => [{ ...card, front }]),
          updateCard: vi.fn(async (_deck, edited: Card, newFront: string) => {
            front = newFront;
            return { ...edited, front: newFront };
          }),
        }),
      );
      fireEvent.click(await screen.findByRole("link", { name: "水" }));

      fireEvent.input(await screen.findByLabelText("Front"), {
        target: { value: "火" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Save" }));

      expect(await screen.findByRole("link", { name: "火" })).toHaveAttribute(
        "aria-current",
        "page",
      );
    });

    it("returns to the Browser after removing the card", async () => {
      vi.stubGlobal("confirm", vi.fn(() => true));
      let removed = false;
      await openBrowser(
        makeUseCases({
          listInstances: vi.fn(async () => [instanceA]),
          listDecks: vi.fn(async () => [deck]),
          listCards: vi.fn(async () => (removed ? [] : [card])),
          removeCard: vi.fn(async () => {
            removed = true;
          }),
        }),
      );
      fireEvent.click(await screen.findByRole("link", { name: "水" }));
      fireEvent.click(
        await screen.findByRole("button", { name: "Remove card" }),
      );

      expect(
        await screen.findByText("No cards in this deck yet."),
      ).toBeInTheDocument();
      expect(window.location.hash).toContain("#/browse?");
    });

    it("sends a deep link to an unknown card back to the Browser", async () => {
      window.history.replaceState(
        null,
        "",
        routeToHash({
          screen: "card",
          instanceUrl: instanceA.url,
          deckUrl: deck.url,
          cardUrl: `${deck.cardsDocumentUrl}#gone`,
        }),
      );
      renderWorkspace(
        makeUseCases({
          listInstances: vi.fn(async () => [instanceA]),
          listDecks: vi.fn(async () => [deck]),
          listCards: vi.fn(async () => [card]),
        }),
      );
      expect(
        await screen.findByRole("heading", { name: `Browser: ${deck.name}` }),
      ).toBeInTheDocument();
    });

    it("shows a loading state, then an error, when the cards cannot be read", async () => {
      window.history.replaceState(
        null,
        "",
        routeToHash({
          screen: "card",
          instanceUrl: instanceA.url,
          deckUrl: deck.url,
          cardUrl: card.url,
        }),
      );
      let fail: (error: Error) => void = () => undefined;
      const useCases = makeUseCases({
        listInstances: vi.fn(async () => [instanceA]),
        listDecks: vi.fn(async () => [deck]),
        listCards: vi.fn(
          () => new Promise<Card[]>((_resolve, reject) => (fail = reject)),
        ),
      });
      renderWorkspace(useCases);
      expect(await screen.findByText("Loading card…")).toBeInTheDocument();
      // The query starts a tick after the loading state renders.
      await waitFor(() => {
        expect(useCases.listCards).toHaveBeenCalled();
      });
      await act(async () => fail(new Error("cards unreachable")));
      expect(await screen.findByText("cards unreachable")).toBeInTheDocument();
    });
  });

  describe("developer settings", () => {
    it("hides the WebID document by default, without fetching it", async () => {
      const useCases = makeUseCases({
        listInstances: vi.fn(async () => [instanceA]),
        listDecks: vi.fn(async () => [deck]),
      });
      renderWorkspace(useCases);

      await screen.findByRole("heading", { name: "Decks" });
      await waitFor(() => {
        expect(useCases.getPreferences).toHaveBeenCalledWith(instanceA.url);
      });
      expect(screen.queryByText("WebID document")).toBeNull();
      expect(useCases.viewWebIdDocument).not.toHaveBeenCalled();
    });

    it("shows the WebID document once developer mode is activated", async () => {
      const useCases = makeUseCases({
        listInstances: vi.fn(async () => [instanceA]),
        listDecks: vi.fn(async () => [deck]),
        getPreferences: vi.fn(async () => ({
          ...DEFAULT_PREFERENCES,
          developerMode: true,
        })),
      });
      renderWorkspace(useCases);

      expect(await screen.findByText("WebID document")).toBeInTheDocument();
      await waitFor(() => {
        expect(useCases.viewWebIdDocument).toHaveBeenCalledWith(session);
      });
    });

    it("keeps developer tools hidden when preferences cannot be read", async () => {
      renderWorkspace(
        makeUseCases({
          listInstances: vi.fn(async () => [instanceA]),
          listDecks: vi.fn(async () => [deck]),
          getPreferences: vi.fn(async () => {
            throw new Error("preferences unreachable");
          }),
        }),
      );

      await screen.findByRole("heading", { name: "Decks" });
      expect(screen.queryByText("WebID document")).toBeNull();
      expect(screen.queryByText("preferences unreachable")).toBeNull();
    });

    it("turns on as soon as the setting is saved", async () => {
      let developerMode = false;
      const useCases = makeUseCases({
        listInstances: vi.fn(async () => [instanceA]),
        listDecks: vi.fn(async () => [deck]),
        getPreferences: vi.fn(async () => ({
          ...DEFAULT_PREFERENCES,
          developerMode,
        })),
        savePreferences: vi.fn(async (_url, preferences) => {
          developerMode = preferences.developerMode;
        }),
      });
      renderWorkspace(useCases);

      fireEvent.click(
        await screen.findByRole("button", { name: "Preferences" }),
      );
      fireEvent.click(await screen.findByLabelText("Developer mode"));
      fireEvent.click(screen.getByRole("button", { name: "Save" }));

      expect(await screen.findByText("WebID document")).toBeInTheDocument();
    });
  });

  it("shows a breadcrumb trail whose links lead back up", async () => {
    renderWorkspace(
      makeUseCases({
        listInstances: vi.fn(async () => [instanceA]),
        listDecks: vi.fn(async () => [deck]),
      }),
    );

    // Top level: "Decks" is already there, as a link to the deck list.
    await screen.findByRole("heading", { name: "Decks" });
    expect(
      within(screen.getByRole("navigation", { name: "Breadcrumb" })).getByRole(
        "link",
        { name: "Decks" },
      ),
    ).toHaveAttribute("aria-current", "page");

    fireEvent.click(screen.getByRole("link", { name: "Kanji N5" }));
    fireEvent.click(await screen.findByRole("button", { name: "Browser" }));
    await screen.findByRole("heading", { name: "Browser: Kanji N5" });

    const trail = within(
      screen.getByRole("navigation", { name: "Breadcrumb" }),
    );
    expect(trail.getByText("Browser")).toHaveAttribute("aria-current", "page");

    // Following a crumb is an ordinary hash navigation.
    const decksHref = trail.getByRole("link", { name: "Decks" }).getAttribute("href")!;
    window.history.pushState(null, "", decksHref);
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

    fireEvent.click(await screen.findByRole("link", { name: "Kanji N5" }));
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
