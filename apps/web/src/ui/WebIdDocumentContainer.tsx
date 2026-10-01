import { useQuery } from "@tanstack/react-query";
import type { UseCases } from "@solid-memo/application/useCases";
import type { Session } from "@solid-memo/domain/session";
import { errorMessage } from "./errorMessage";
import { useI18n } from "./i18n";
import { Loading } from "./Loading";
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
  const { t } = useI18n();
  const documentQuery = useQuery({
    queryKey: ["webIdDocument", session.webId],
    queryFn: () => useCases.viewWebIdDocument(session),
  });

  return (
    <details>
      <summary>{t("webIdDocument.summary")}</summary>
      {documentQuery.isPending && <Loading label={t("webIdDocument.loading")} />}
      {documentQuery.error && (
        <p class="error">{errorMessage(documentQuery.error)}</p>
      )}
      {documentQuery.data && (
        <WebIdDocumentView document={documentQuery.data} />
      )}
    </details>
  );
}
