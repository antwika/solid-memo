import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { UseCases } from "@solid-memo/application/useCases";
import type { GuestTransferProgress } from "@solid-memo/domain/guest";
import type { Session } from "@solid-memo/domain/session";
import { AppError } from "@solid-memo/domain/appError";
import { makeUseCasesFake } from "../test/useCasesFake";
import { I18nProvider } from "./i18n";
import { GuestStudyOffer } from "./GuestStudyOffer";

const session: Session = { webId: "https://alice.example/profile/card#me" };
const guestInstance = { url: "https://guest.solid-memo.invalid/solid-memo/", name: "My study" };
const TODAY = new Date().toISOString().slice(0, 10);

function renderOffer(overrides: Partial<UseCases> = {}) {
  const useCases = makeUseCasesFake({
    findGuestStudy: vi.fn(async () => ({ instances: [{ instance: guestInstance, deckCount: 1 }] })),
    listStorages: vi.fn(async () => [{ url: "https://alice.example/", source: "profile" as const }]),
    ...overrides,
  });
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={queryClient}>
      <I18nProvider locale="en" onChoose={() => undefined}>
        <GuestStudyOffer useCases={useCases} session={session} />
      </I18nProvider>
    </QueryClientProvider>,
  );
  return useCases;
}

async function openForm() {
  fireEvent.click(await screen.findByRole("button", { name: "Move it into my Pod" }));
  return screen.findByRole("region", { name: "Move your study into your Pod" });
}

describe("GuestStudyOffer", () => {
  it("offers nothing when no guest studied in this browser, or the guest has no instance", async () => {
    const useCases = renderOffer({ findGuestStudy: vi.fn(async () => null) });
    await waitFor(() => expect(useCases.findGuestStudy).toHaveBeenCalled());
    expect(screen.queryByRole("region")).toBeNull();
  });

  it("names the study and its decks, and can be put off", async () => {
    renderOffer();
    expect(await screen.findByText(/My study has 1 deck\. Move it into your Pod/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Not now" }));
    expect(screen.queryByRole("region", { name: "Your study as a guest" })).toBeNull();
  });

  it("discards the study only once the user confirms it", async () => {
    const useCases = renderOffer();
    fireEvent.click(await screen.findByRole("button", { name: "Discard it" }));
    expect(screen.getByText(/This cannot be undone/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(useCases.discardGuest).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Discard it" }));
    vi.mocked(useCases.findGuestStudy).mockResolvedValue(null);
    fireEvent.click(screen.getByRole("button", { name: "Delete it" }));
    await waitFor(() => expect(screen.queryByRole("region", { name: "Your study as a guest" })).toBeNull());
    expect(useCases.discardGuest).toHaveBeenCalledOnce();
  });

  it("moves the study where the user's first instance would go, showing each step, then opens it", async () => {
    let report!: (progress: GuestTransferProgress) => void;
    let finish!: () => void;
    const transferGuestStudy = vi.fn(
      (_session: Session, _instance: unknown, _target: unknown, onProgress?: (p: GuestTransferProgress) => void) =>
        new Promise<Awaited<ReturnType<UseCases["transferGuestStudy"]>>>((resolve) => {
          report = onProgress!;
          finish = () => resolve({ ok: true, instance: { url: "https://alice.example/solid-memo/main/", name: "My study" }, tidied: true });
        }),
    );
    const useCases = renderOffer({ transferGuestStudy });
    await openForm();
    const location = screen.getByLabelText("Location in your Pod");
    await waitFor(() => expect(location).toHaveValue("https://alice.example/solid-memo/main/"));
    fireEvent.click(screen.getByLabelText("Public type index"));
    fireEvent.click(screen.getByRole("button", { name: "Move it" }));
    await waitFor(() =>
      expect(transferGuestStudy).toHaveBeenCalledWith(
        session,
        guestInstance,
        { containerUrl: "https://alice.example/solid-memo/main/", registrationTarget: "public" },
        expect.any(Function),
      ),
    );
    report({ step: "copy", done: 1, total: 7, part: { done: 1, total: 4 } });
    expect(await screen.findByText("Copying your study… (1 of 4)")).toBeInTheDocument();
    report({ step: "register", done: 5, total: 7 });
    expect(await screen.findByText("Registering it in your Pod…")).toBeInTheDocument();
    vi.mocked(useCases.findGuestStudy).mockResolvedValue(null);
    finish();
    expect(await screen.findByText("Your study is in your Pod now.")).toBeInTheDocument();
    await waitFor(() => expect(window.location.hash).toContain(encodeURIComponent("https://alice.example/solid-memo/main/")));
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(screen.queryByText("Your study is in your Pod now.")).toBeNull());
  });

  it("says when the study moved but stayed in this browser too", async () => {
    renderOffer({
      transferGuestStudy: vi.fn(async () => ({
        ok: true as const,
        instance: { url: "https://alice.example/solid-memo/main/", name: "My study" },
        tidied: false,
      })),
    });
    await openForm();
    await waitFor(() => expect(screen.getByLabelText("Location in your Pod")).toHaveValue("https://alice.example/solid-memo/main/"));
    fireEvent.click(screen.getByRole("button", { name: "Move it" }));
    expect(await screen.findByText(/It could not be removed from this browser/)).toBeInTheDocument();
  });

  it("suggests another folder when an instance is where the first goes, and lets the user pick storage and folder", async () => {
    const useCases = renderOffer({
      listStorages: vi.fn(async () => [
        { url: "https://alice.example/", source: "profile" as const },
        { url: "https://backup.example/", source: "profile" as const },
      ]),
      listInstances: vi.fn(async () => [{ url: "https://alice.example/solid-memo/main/", name: "Main" }]),
    });
    await openForm();
    const location = screen.getByLabelText("Location in your Pod");
    await waitFor(() => expect(location).toHaveValue(`https://alice.example/solid-memo/guest-${TODAY}/`));
    fireEvent.click(screen.getByLabelText("https://backup.example/"));
    expect(location).toHaveValue("https://backup.example/solid-memo/main/");
    fireEvent.input(location, { target: { value: "https://backup.example/study/" } });
    fireEvent.click(screen.getByRole("button", { name: "Move it" }));
    await waitFor(() =>
      expect(useCases.transferGuestStudy).toHaveBeenCalledWith(
        session,
        guestInstance,
        { containerUrl: "https://backup.example/study/", registrationTarget: "private" },
        expect.any(Function),
      ),
    );
  });

  it("suggests where a first instance goes while the user's instances are still being listed", async () => {
    renderOffer({ listInstances: vi.fn(() => new Promise<never>(() => {})) });
    await openForm();
    await waitFor(() => expect(screen.getByLabelText("Location in your Pod")).toHaveValue("https://alice.example/solid-memo/main/"));
  });

  it("asks where to keep the study when the profile names no storage, and goes back on request", async () => {
    renderOffer({ listStorages: vi.fn(async () => []) });
    await openForm();
    expect(await screen.findByText(/Your profile names no Pod storage/)).toBeInTheDocument();
    expect(screen.getByLabelText("Location in your Pod")).toHaveValue("");
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(await screen.findByRole("button", { name: "Move it into my Pod" })).toBeInTheDocument();
  });

  it("says where the move failed, that the study is still here, and what became of the copy", async () => {
    const transferGuestStudy = vi
      .fn<UseCases["transferGuestStudy"]>()
      .mockResolvedValueOnce({ ok: false, step: "copy", error: new AppError("alreadyExists", { url: "https://alice.example/solid-memo/main/" }), cleanedUp: true })
      .mockResolvedValueOnce({ ok: false, step: "validate", error: "offline", cleanedUp: false, leftoverUrl: "https://alice.example/solid-memo/main/" });
    renderOffer({ transferGuestStudy });
    await openForm();
    await waitFor(() => expect(screen.getByLabelText("Location in your Pod")).toHaveValue("https://alice.example/solid-memo/main/"));
    fireEvent.click(screen.getByRole("button", { name: "Move it" }));
    const failed = await screen.findByRole("region", { name: "Moving failed" });
    expect(failed).toHaveTextContent("Moving your study failed while copying your study:");
    expect(failed).toHaveTextContent("Your study is still in this browser. The partial copy was removed from your Pod.");
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    fireEvent.click(await screen.findByRole("button", { name: "Move it" }));
    expect(await screen.findByRole("region", { name: "Moving failed" })).toHaveTextContent(
      "The partial copy could not be removed from your Pod; it is at https://alice.example/solid-memo/main/.",
    );
  });
});
