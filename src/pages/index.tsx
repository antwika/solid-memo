import usePodUrls from "@src/hooks/usePodUrls";
import { useContext } from "react";
import { SessionContext } from "@src/providers/SessionProvider";
import Layout from "@src/pages/layout";
import { Button } from "@src/components/ui";
import { getSolidDataset } from "@inrupt/solid-client";

export default function Home() {
  const { session, tryLogOut } = useContext(SessionContext);
  const { podUrls } = usePodUrls(session);

  podUrls.map((podUrl) => {
    const tryGetDataset = async () => {
      const dataset = await getSolidDataset(podUrl);
      console.log("dataset:", dataset);
    };
    tryGetDataset()
      .then(() => {
        console.log("Successfully fetched dataset");
      })
      .catch(() => {
        console.log("Failed to fetch dataset");
      });
  });

  return (
    <Layout>
      <Button onClick={tryLogOut}>
        Logged in as{" "}
        <span className="text-[hsl(280,100%,70%)]">{session.info.webId}</span>
      </Button>
      {podUrls.map((podUrl) => (
        <div key={podUrl} className="rounded-xl bg-white/10 p-4 text-white">
          Pod: <span className="text-[hsl(280,100%,70%)]">{podUrl}</span>
        </div>
      ))}
    </Layout>
  );
}
