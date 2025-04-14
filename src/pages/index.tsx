import Layout from "@pages/layout";
import { useRouter } from "next/navigation";
import { Button } from "@ui/index";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  fetchSolidMemoDataThunk,
  pickInstance,
  selectInstances,
} from "@redux/features/instances.slice";
import { useContext, useEffect } from "react";
import { SessionContext, QueryEngineContext } from "@providers/index";

export default function Home() {
  const { session } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);
  const router = useRouter();
  const instances = useAppSelector(selectInstances);
  const dispatch = useAppDispatch();

  return (
    <Layout>
      <Button
        onClick={() => {
          router.push(`/test`);
        }}
      >
        Go to Test page
      </Button>
      <Button
        onClick={() => {
          dispatch(fetchSolidMemoDataThunk({ session, queryEngine }));
          console.log("Fetch instances!");
        }}
      >
        Fetch instances
      </Button>
      <div>Choose instance:</div>
      {Object.keys(instances).map((iri) => {
        const entry = instances[iri];
        if (!entry) return;
        return (
          <Button
            key={entry.iri}
            onClick={() => {
              dispatch(pickInstance(entry));
              router.push(`/instances/${encodeURIComponent(entry.iri)}`);
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
