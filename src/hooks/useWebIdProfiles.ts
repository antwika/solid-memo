import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import { useEffect, useState } from "react";
import useDatasets from "@hooks/useDatasets";

export default function useWebIdProfiles() {
  const session = getDefaultSession();
  const [webIdProfileUrls, setWebIdProfileUrls] = useState<string[]>([]);
  const { data: webIdProfileDatasets } = useDatasets(webIdProfileUrls);

  useEffect(() => {
    const webId = session.info.webId ? [session.info.webId] : [];
    setWebIdProfileUrls([...webId]);
  }, [session.info.webId]);

  return { webIdProfileUrls, webIdProfileDatasets };
}
