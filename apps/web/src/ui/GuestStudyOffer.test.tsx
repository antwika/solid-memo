import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { UseCases } from "@solid-memo/application/useCases";
import type { GuestTransferProgress } from "@solid-memo/domain/guest";
import type { Session } from "@solid-memo/domain/session";
import { AppError } from "@solid-memo/domain/appError";
import { alertTexts, unexpectedText } from "../test/liveRegions";
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

  it("moves the focus with each stage, all but the offer as the page loads, and back to the offer", async () => {
    renderOffer();
    const offer = await screen.findByRole("region", { name: "Your study as a guest" });
    expect(offer).not.toHaveFocus();
    expect(offer).toHaveAccessibleDescription(/My study has 1 deck/);

    fireEvent.click(screen.getByRole("button", { name: "Discard it" }));
    const question = screen.getByRole("region", { name: "Your study as a guest" });
    expect(question).toHaveFocus();
    expect(question).toHaveAccessibleDescription("Delete everything you studied as a guest? This cannot be undone.");
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.getByRole("region", { name: "Your study as a guest" })).toHaveFocus();

    expect(await openForm()).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(screen.getByRole("region", { name: "Your study as a guest" })).toHaveFocus();
  });

  it("keeps the pressed button focused while the study is discarded, and ignores the buttons meanwhile", async () => {
    const useCases = renderOffer({ discardGuest: vi.fn(() => new Promise<void>(() => {})) });
    fireEvent.click(await screen.findByRole("button", { name: "Discard it" }));
    const deleteIt = screen.getByRole("button", { name: "Delete it" });
    deleteIt.focus();
    fireEvent.click(deleteIt);
    await waitFor(() => expect(deleteIt).toHaveAttribute("aria-disabled", "true"));
    expect(deleteIt).toHaveFocus();
    fireEvent.click(deleteIt);
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(useCases.discardGuest).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveAttribute("aria-disabled", "true");
  });

  it("keeps the form's buttons focusable while the move starts, and ignores them meanwhile", async () => {
    const transferGuestStudy = vi.fn(() => new Promise<never>(() => {}));
    renderOffer({ transferGuestStudy });
    await openForm();
    await waitFor(() => expect(screen.getByLabelText("Location in your Pod")).toHaveValue("https://alice.example/solid-memo/main/"));
    const start = screen.getByRole("button", { name: "Move it" });
    start.focus();
    fireEvent.click(start);
    await waitFor(() => expect(start).toHaveAttribute("aria-disabled", "true"));
    expect(start).toHaveFocus();
    fireEvent.submit(start.closest("form")!);
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(transferGuestStudy).toHaveBeenCalledOnce();
    expect(screen.getByRole("region", { name: "Move your study into your Pod" })).toBeInTheDocument();
  });

  it("says why the study could not be discarded, and forgets it on cancel", async () => {
    const useCases = renderOffer({
      discardGuest: vi.fn(async () => {
        throw new Error("storage blocked");
      }),
    });
    fireEvent.click(await screen.findByRole("button", { name: "Discard it" }));
    expect(alertTexts()).toEqual([]);
    fireEvent.click(screen.getByRole("button", { name: "Delete it" }));
    await waitFor(() => expect(alertTexts()).toEqual([unexpectedText("storage blocked")]));
    expect(useCases.discardGuest).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    fireEvent.click(screen.getByRole("button", { name: "Discard it" }));
    expect(alertTexts()).toEqual([]);
  });

  it("says why a move that threw could not start, with no steps left on screen, and forgets it on going back", async () => {
    let report!: (progress: GuestTransferProgress) => void;
    let fail!: (error: unknown) => void;
    renderOffer({
      transferGuestStudy: vi.fn(
        (_session: Session, _instance: unknown, _target: unknown, onProgress?: (p: GuestTransferProgress) => void) =>
          new Promise<never>((_resolve, reject) => {
            report = onProgress!;
            fail = reject;
          }),
      ),
    });
    await openForm();
    await waitFor(() => expect(screen.getByLabelText("Location in your Pod")).toHaveValue("https://alice.example/solid-memo/main/"));
    fireEvent.click(screen.getByRole("button", { name: "Move it" }));
    await waitFor(() => expect(report).toBeDefined());
    report({ step: "copy", done: 1, total: 7 });
    // The steps take the place of the form, and its focus.
    expect(await screen.findByRole("region", { name: "Moving your study" })).toHaveFocus();
    fail(new Error("pod unreachable"));
    await waitFor(() => expect(alertTexts()).toEqual([unexpectedText("pod unreachable")]));
    // The form comes back with the error holding the focus, so it is heard.
    expect(screen.getByRole("alert")).toHaveFocus();
    expect(screen.queryByRole("region", { name: "Moving your study" })).toBeNull();
    expect(screen.getByRole("button", { name: "Move it" })).toBeEnabled();

    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    fireEvent.click(await screen.findByRole("button", { name: "Move it into my Pod" }));
    expect(alertTexts()).toEqual([]);
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
    const announced = screen.getByRole("status");
    expect(announced.textContent).toBe("");
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
    expect(await screen.findByText("Copying your study…")).toBeInTheDocument();
    expect(screen.getByText("1 of 4")).toBeInTheDocument();
    report({ step: "register", done: 5, total: 7 });
    expect(await screen.findByText("Registering it in your Pod…")).toBeInTheDocument();
    vi.mocked(useCases.findGuestStudy).mockResolvedValue(null);
    finish();
    // Said by a status line mounted all along, which a screen reader hears; the Close button is not in it.
    await waitFor(() => expect(announced).toHaveTextContent("Your study is in your Pod now."));
    // Not focused: an element with nothing to read, and the instance the move opens takes the focus.
    expect(screen.getByText("Your study is in your Pod now.", { ignore: "[role=status]" }).parentElement).not.toHaveFocus();
    expect(within(announced).queryByRole("button")).toBeNull();
    expect(screen.getByText("Your study is in your Pod now.", { ignore: "[role=status]" })).toHaveAttribute("aria-hidden", "true");
    await waitFor(() => expect(window.location.hash).toContain(encodeURIComponent("https://alice.example/solid-memo/main/")));
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(screen.queryByText("Your study is in your Pod now.")).toBeNull());
    expect(announced.textContent).toBe("");
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
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent(/It could not be removed from this browser/));
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
    // It takes the focus, read out with why as its description.
    expect(failed).toHaveFocus();
    expect(failed).toHaveAccessibleDescription(/Moving your study failed while copying your study/);
    // Heard through the focus alone: the status line does not say it again.
    expect(screen.getByRole("status").textContent).toBe("");
    expect(failed).toHaveAccessibleDescription(/Something is already kept at that place in your Pod\. Choose another place\./);
    // The address is under the failure's technical details.
    expect(failed).toHaveTextContent("Moving your study failed while copying your study:");
    expect(within(failed).getByText("Technical details").closest("details")).toHaveTextContent(
      "url: https://alice.example/solid-memo/main/",
    );
    expect(failed).toHaveTextContent("Your study is still in this browser. The partial copy was removed from your Pod.");
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    fireEvent.click(await screen.findByRole("button", { name: "Move it" }));
    expect(await screen.findByRole("region", { name: "Moving failed" })).toHaveTextContent(
      "The partial copy could not be removed from your Pod; it is at https://alice.example/solid-memo/main/.",
    );
  });
});
