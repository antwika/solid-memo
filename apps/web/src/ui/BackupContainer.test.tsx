import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BackupContainer } from "./BackupContainer";
import { I18nProvider } from "./i18n";
import type { UseCases } from "@solid-memo/application/useCases";
import type { Instance } from "@solid-memo/domain/instance";
import { makeUseCasesFake } from "../test/useCasesFake";

const instance: Instance = { url: "https://pod.example/solid-memo/a-1/", name: "Main" };
const previous: Instance = { url: "https://pod.example/solid-memo/a/", name: "Main" };
const session = { webId: "https://alice.example/profile/card#me" };

function renderContainer(useCases: UseCases) {
  const onRestored = vi.fn();
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const view = render(
    <QueryClientProvider client={queryClient}>
      <BackupContainer useCases={useCases} session={session} instance={instance} onRestored={onRestored} />
    </QueryClientProvider>,
  );
  return { ...view, onRestored };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("BackupContainer", () => {
  it("shows nothing without a backup", async () => {
    const useCases = makeUseCasesFake();
    const { container } = renderContainer(useCases);
    await waitFor(() => expect(useCases.readBackup).toHaveBeenCalledWith(instance));
    expect(container).toBeEmptyDOMElement();
  });

  it("says where the backup is and when it was made, and restores it once confirmed", async () => {
    const confirm = vi.fn().mockReturnValueOnce(false).mockReturnValueOnce(true);
    vi.stubGlobal("confirm", confirm);
    const useCases = makeUseCasesFake({
      readBackup: vi.fn(async () => ({ url: previous.url, replacedAt: "2026-09-28T10:00:00.000Z" })),
      restoreBackup: vi.fn(async () => previous),
    });
    const { onRestored } = renderContainer(useCases);
    const section = await screen.findByRole("region", { name: "Previous version" });
    expect(section).toHaveTextContent(previous.url);
    expect(section).toHaveTextContent("(");
    fireEvent.click(screen.getByRole("button", { name: "Restore previous version" }));
    expect(useCases.restoreBackup).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Restore previous version" }));
    await waitFor(() => expect(onRestored).toHaveBeenCalledWith(previous));
    expect(useCases.restoreBackup).toHaveBeenCalledWith(session, instance);
  });

  it("says what it is doing while it restores or deletes", async () => {
    vi.stubGlobal("confirm", vi.fn(() => true));
    const useCases = makeUseCasesFake({
      readBackup: vi.fn(async () => ({ url: previous.url })),
      restoreBackup: vi.fn(() => new Promise<Instance>(() => undefined)),
      deleteBackup: vi.fn(() => new Promise<void>(() => undefined)),
    });
    renderContainer(useCases);
    fireEvent.click(await screen.findByRole("button", { name: "Restore previous version" }));
    expect(await screen.findByRole("button", { name: "Restoring…" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Delete backup" })).toBeDisabled();
    cleanup();
    renderContainer(useCases);
    fireEvent.click(await screen.findByRole("button", { name: "Delete backup" }));
    expect(await screen.findByRole("button", { name: "Deleting…" })).toBeDisabled();
  });

  it("deletes the backup once confirmed, and shows errors", async () => {
    const confirm = vi.fn().mockReturnValueOnce(false).mockReturnValue(true);
    vi.stubGlobal("confirm", confirm);
    let backup: { url: string } | null = { url: previous.url };
    const useCases = makeUseCasesFake({
      readBackup: vi.fn(async () => backup),
      deleteBackup: vi
        .fn()
        .mockRejectedValueOnce(new Error("not allowed"))
        .mockImplementation(async () => {
          backup = null;
        }),
    });
    const { container } = renderContainer(useCases);
    const section = await screen.findByRole("region", { name: "Previous version" });
    expect(section).not.toHaveTextContent("(");
    fireEvent.click(screen.getByRole("button", { name: "Delete backup" }));
    expect(useCases.deleteBackup).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Delete backup" }));
    expect(await screen.findByText("not allowed")).toHaveClass("error");
    fireEvent.click(screen.getByRole("button", { name: "Delete backup" }));
    await waitFor(() => expect(container).toBeEmptyDOMElement());
    expect(useCases.deleteBackup).toHaveBeenCalledWith(instance);
  });

  it("speaks Swedish", async () => {
    const useCases = makeUseCasesFake({
      readBackup: vi.fn(async () => ({ url: previous.url, replacedAt: "2026-09-28T10:00:00.000Z" })),
    });
    render(
      <I18nProvider locale="sv" onChoose={() => undefined}>
        <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
          <BackupContainer useCases={useCases} session={session} instance={instance} onRestored={vi.fn()} />
        </QueryClientProvider>
      </I18nProvider>,
    );
    const section = await screen.findByRole("region", { name: "Föregående version" });
    expect(section).toHaveTextContent("(28 september 2026)");
    expect(screen.getByRole("button", { name: "Ta bort säkerhetskopian" })).toBeInTheDocument();
  });
});
