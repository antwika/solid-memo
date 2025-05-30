import { preferFragment } from "@solid-memo/core";
import Layout from "@pages/layout";
import { ServiceContext } from "@providers/service.provider";
import { Button } from "@ui/index";
import { Database } from "lucide-react";
import { useContext, useEffect } from "react";
import useWebIdProfile from "src/hooks/useWebIdProfile";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { getService } = useContext(ServiceContext);
  const service = getService();

  const {
    instanceUrls,
    mutate: mutateWebIdProfile,
    isLoading,
  } = useWebIdProfile();

  useEffect(() => {
    if (instanceUrls.length === 1) {
      const onlyInstanceUrl = instanceUrls[0];
      if (onlyInstanceUrl !== undefined) {
        console.log(
          "There's only one instance url, assume the user want to use that one."
        );
        router.push(`/instances/${encodeURIComponent(onlyInstanceUrl)}`);
      }
    }
  }, [router, instanceUrls]);

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
              <Link
                href={`/instances/${encodeURIComponent(instanceUrl)}`}
                className="hover:underline"
              >
                <div className="flex gap-1" title={instanceUrl}>
                  <Database />
                  <strong>
                    <span>{preferFragment(instanceUrl)}</span>
                  </strong>{" "}
                  (Instance)
                </div>
              </Link>
            </div>
          </div>
        ))}
    </Layout>
  );
}
