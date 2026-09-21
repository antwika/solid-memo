import { useQuery } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Session } from "../domain/session";
import { errorMessage } from "./errorMessage";
import { WebIdDocumentView } from "./WebIdDocumentView";

/**
 * Developer tool: the raw WebID document of the logged-in user. Only
 * mounted while developer mode is on, so the profile is not even fetched
 * otherwise.
 */
export function WebIdDocumentContainer({
  useCases,
  session,
}: {
  useCases: UseCases;
  session: Session;
}) {
  const documentQuery = useQuery({
    queryKey: ["webIdDocument", session.webId],
    queryFn: () => useCases.viewWebIdDocument(session),
  });

  return (
    <details>
      <summary>WebID document</summary>
      {documentQuery.isPending && <p>Loading profile…</p>}
      {documentQuery.error && (
        <p class="error">{errorMessage(documentQuery.error)}</p>
      )}
      {documentQuery.data && (
        <WebIdDocumentView document={documentQuery.data} />
      )}
    </details>
  );
}
