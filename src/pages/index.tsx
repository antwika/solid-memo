import Layout from "@src/pages/layout";
import { useRouter } from "next/navigation";
import { Button } from "@src/components/ui";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import {
  fetchSolidMemoDataThunk,
  pickInstance,
  selectSolidMemoData,
} from "@src/redux/features/solidMemoData.slice";
import { useContext, useEffect } from "react";
import { SessionContext } from "@src/providers/SessionProvider";
import { QueryEngineContext } from "@src/providers/QueryEngineProvider";

export default function Home() {
  const { session } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);
  const router = useRouter();
  const instances = useAppSelector(selectSolidMemoData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(
      fetchSolidMemoDataThunk({
        session,
        queryEngine,
        webId: session.info.webId,
      }),
    );
  }, [dispatch, queryEngine, session]);

  return (
    <Layout>
      <div>
        Choose Solid Memo Data instance: count: {Object.keys(instances)}
      </div>
      {Object.keys(instances).map((iri) => {
        const entry = instances[iri];
        if (!entry) return;
        return (
          <Button
            key={entry.iri}
            onClick={() => {
              dispatch(pickInstance(entry.iri));
              router.push(`/instance/${encodeURIComponent(entry.iri)}`);
            }}
            title={entry.iri}
          >
            {entry.name}
          </Button>
        );
      })}
    </Layout>
  );
}
