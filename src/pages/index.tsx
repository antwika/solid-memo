import { useContext } from "react";
import { SessionContext } from "@src/providers/SessionProvider";
import Layout from "@src/pages/layout";
import { LogoutForm } from "@src/components/LogoutForm";
import { useRouter } from "next/navigation";
import { Button } from "@src/components/ui";
import { QueryEngineContext } from "@src/providers/QueryEngineProvider";
import { useSolidMemoData } from "@src/hooks/useSolidMemoData";

export default function Home() {
  const router = useRouter();
  const { session, tryLogOut } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);
  const { solidMemoDataIris } = useSolidMemoData(session, queryEngine);

  return (
    <Layout>
      <LogoutForm loggedInAs={session.info.webId!} onLogOut={tryLogOut} />
      <div>Choose Solid Memo Data instance:</div>
      {solidMemoDataIris.map((solidMemoDataIri) => {
        return (
          <Button
            key={solidMemoDataIri}
            onClick={() => {
              router.push(`/instance/${encodeURIComponent(solidMemoDataIri)}`);
            }}
          >
            {solidMemoDataIri}
          </Button>
        );
      })}
    </Layout>
  );
}
