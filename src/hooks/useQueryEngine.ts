import { QueryEngine } from "@comunica/query-sparql-solid";
import { useEffect, useState } from "react";

export function useQueryEngine() {
  const [queryEngine, setQueryEngine] = useState<QueryEngine>();

  useEffect(() => {
    setQueryEngine(new QueryEngine());
  }, []);

  return { queryEngine };
}
