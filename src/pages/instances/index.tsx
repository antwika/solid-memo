import { preferFragment } from "@lib/utils";
import Layout from "@pages/layout";
import { RepositoryContext } from "@providers/repository.provider";
import { ServiceContext } from "@providers/service.provider";
import { Button } from "@ui/index";
import { Database } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import usePrivateTypeIndices from "src/hooks/usePrivateTypeIndices";
import useWebIdProfile from "src/hooks/useWebIdProfile";

export default function Page() {
  const router = useRouter();
  const { getRepository } = useContext(RepositoryContext);
  const { getService } = useContext(ServiceContext);
  const repository = getRepository();
  const service = getService();

  const {
    webIdProfileUrls,
    instanceUrls,
    mutate: mutateWebIdProfile,
  } = useWebIdProfile();

  const { privateTypeIndexUrls } = usePrivateTypeIndices(webIdProfileUrls);

  return (
    <Layout>
      <div>webIdProfileUrls: {webIdProfileUrls}</div>
      <div>privateTypeIndexUrls: {privateTypeIndexUrls}</div>
      <Button
        onClick={() => {
          service
            .newInstance(repository)
            .then(() => mutateWebIdProfile())
            .catch((err) => console.error("Failed with error:", err));
        }}
      >
        Create new instance
      </Button>
      {instanceUrls.map((instanceUrl) => (
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
                  router.push(`/instances/${encodeURIComponent(instanceUrl)}`);
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
