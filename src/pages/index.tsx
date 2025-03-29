import usePodUrls from "@src/hooks/usePodUrls";
import { useContext } from "react";
import { SessionContext } from "@src/providers/SessionProvider";
import Layout from "@src/pages/layout";
import { Button } from "@src/components/ui";
import {
  getSolidDataset,
  getStringNoLocaleAll,
  getThingAll,
  getUrlAll,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import useDatasets from "@src/hooks/useDatasets";

export default function Home() {
  const { session, tryLogOut } = useContext(SessionContext);
  const { podUrls } = usePodUrls(session);
  const { datasets } = useDatasets(podUrls);

  const renderedPodUrls = podUrls.map((podUrl) => (
    <div key={podUrl} className="rounded-xl bg-white/10 p-4 text-white">
      Pod: <span className="text-[hsl(280,100%,70%)]">{podUrl}</span>
    </div>
  ));

  const renderedThings = datasets.map((dataset) => {
    return getThingAll(dataset).map((thing) => {
      const { url, type, predicates } = thing;
      const predicateTypes = Object.keys(predicates);

      console.log("predicates", predicates);
      console.log("predicateTypes", predicateTypes);

      const renderedPredicates = predicateTypes.map((predicateType) => {
        const predicateUrls = getUrlAll(thing, predicateType);
        console.log("predicateUrls", predicateUrls);

        return predicateUrls.map((predicateUrl) => {
          return (
            <div>
              <div>
                Predicate:{" "}
                <span className="text-[hsl(280,100%,70%)]">{predicateUrl}</span>
              </div>
              <div className="pl-4">
                <span className="text-[hsl(280,100%,70%)]">{predicateUrl}</span>
              </div>
            </div>
          );
        });
      });

      return (
        <div key={url} className="rounded-xl bg-white/10 p-4 text-white">
          <div>
            Thing: <span className="text-[hsl(280,100%,70%)]">{url}</span>
          </div>
          <div>
            Type: <span className="text-[hsl(280,100%,70%)]">{type}</span>
          </div>
          {renderedPredicates}
        </div>
      );
    });
  });

  return (
    <Layout>
      <Button onClick={tryLogOut}>
        Logged in as{" "}
        <span className="text-[hsl(280,100%,70%)]">{session.info.webId}</span>
      </Button>
      {renderedPodUrls}
      {renderedThings}
    </Layout>
  );
}
