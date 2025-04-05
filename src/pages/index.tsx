import { useContext } from "react";
import { SessionContext } from "@src/providers/SessionProvider";
import Layout from "@src/pages/layout";
import { useRouter } from "next/navigation";
import { Button } from "@src/components/ui";
import { QueryEngineContext } from "@src/providers/QueryEngineProvider";
import { useSolidMemoDataInstances } from "@src/hooks/useSolidMemoDataInstances";

export default function Home() {
  const router = useRouter();
  const { session, tryLogOut } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);
  const { solidMemoDataInstances } = useSolidMemoDataInstances(
    session,
    queryEngine,
  );

  return (
    <Layout>
      <div>Choose Solid Memo Data instance:</div>
      {solidMemoDataInstances.map((solidMemoDataInstance) => {
        return (
          <Button
            key={solidMemoDataInstance.iri}
            onClick={() => {
              router.push(
                `/instance/${encodeURIComponent(solidMemoDataInstance.iri)}`,
              );
            }}
          >
            {solidMemoDataInstance.iri}
          </Button>
        );
      })}
    </Layout>
  );
}
