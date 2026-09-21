import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Instance } from "../domain/instance";
import { DeckCreatorScreen } from "./DeckCreatorScreen";
import { errorMessage } from "./errorMessage";
import { decksHref } from "./router";

/** Owns the create-deck mutation; returns to the deck list on success. */
export function DeckCreatorContainer({
  useCases,
  instance,
  onDone,
}: {
  useCases: UseCases;
  instance: Instance;
  /** Called after a successful creation. */
  onDone: () => void;
}) {
  const queryClient = useQueryClient();

  const createDeckMutation = useMutation({
    mutationFn: (name: string) => useCases.createDeck(instance.url, name),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["decks", instance.url],
      });
      onDone();
    },
  });

  return (
    <DeckCreatorScreen
      busy={createDeckMutation.isPending}
      error={errorMessage(createDeckMutation.error)}
      onCreate={(name) => createDeckMutation.mutate(name)}
      decksHref={decksHref(instance.url)}
    />
  );
}
