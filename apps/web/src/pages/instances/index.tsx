import { preferFragment } from "@solid-memo/core";
import Layout from "@pages/layout";
import { ServiceContext } from "@providers/service.provider";
import { Button } from "@ui/index";
import { Database } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import useWebIdProfile from "src/hooks/useWebIdProfile";

export default function Page() {
  const router = useRouter();
  const { getService } = useContext(ServiceContext);
  const service = getService();

  const {
    instanceUrls,
    mutate: mutateWebIdProfile,
    isLoading,
  } = useWebIdProfile();

  return (
    <Layout>
      <Button
        onClick={() => {
          service
            .newInstance()
            .then(() => mutateWebIdProfile())
            .catch((err) => console.error("Failed with error:", err));
        }}
      >
        Create new instance
      </Button>
      {isLoading && <div>Loading instances...</div>}
      {!isLoading && instanceUrls.length === 0 && <div>No instances found</div>}
      {!isLoading &&
        instanceUrls.map((instanceUrl) => (
          <div key={instanceUrl} className="items-center gap-2">
            <div className="flex gap-2">
              <div title="Instance">
                <Database />
              </div>
              <div className="flex grow-1 break-all gap-1">
                <span title={instanceUrl}>
                  <strong>{preferFragment(instanceUrl)}</strong> (Instance)
                </span>
              </div>
              <div>
                <Button
                  size={"sm"}
                  onClick={() => {
                    router.push(
                      `/instances/${encodeURIComponent(instanceUrl)}`
                    );
                  }}
                >
                  View
                </Button>
              </div>
            </div>
          </div>
        ))}
    </Layout>
  );
}
