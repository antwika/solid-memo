import { getPodUrlAll } from "@inrupt/solid-client";
import { Session, fetch } from "@inrupt/solid-client-authn-browser";
import { useEffect, useState } from "react";

export default function usePodUrls(session: Session) {
  const [podUrls, setPodUrls] = useState<string[]>([]);

  const tryGetPodUrls = async () => {
    const { info } = session;
    const { webId } = info;
    if (!webId) {
      setPodUrls([]);
      return;
    }
    const podUrls = await getPodUrlAll(webId, { fetch });
    setPodUrls(podUrls);
  };

  useEffect(() => {
    tryGetPodUrls()
      .then(() => {
        console.log("Successfully fetched pod urls");
      })
      .catch(() => {
        console.log("Failed to fetch pod urls");
      });
  }, [session]);

  return { podUrls };
}
