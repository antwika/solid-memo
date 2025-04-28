import { preferFragment } from "@lib/utils";
import Layout from "@pages/layout";
import { RepositoryContext } from "@providers/repository.provider";
import { ServiceContext } from "@providers/service.provider";
import { Button } from "@ui/index";
import { Database } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import useInstances from "src/hooks/useInstances";
import usePrivateTypeIndices from "src/hooks/usePrivateTypeIndices";
import useSeeAlsos from "src/hooks/useSeeAlsos";
import { useTypeRegistrations } from "src/hooks/useTypeRegistrations";
import useWebIdProfiles from "src/hooks/useWebIdProfiles";

export default function Page() {
  const router = useRouter();
  const { getRepository } = useContext(RepositoryContext);
  const { getService } = useContext(ServiceContext);
  const repository = getRepository();
  const service = getService();
  const { webIdProfileUrls } = useWebIdProfiles();
  const { seeAlsoUrls } = useSeeAlsos(webIdProfileUrls);
  const { privateTypeIndexUrls } = usePrivateTypeIndices([
    ...webIdProfileUrls,
    ...seeAlsoUrls,
  ]);
  const { typeRegistrationUrls, instanceUrls } =
    useTypeRegistrations(privateTypeIndexUrls);
  const { instances } = useInstances(instanceUrls);

  return (
    <Layout>
      <div>webIdProfileUrls: {webIdProfileUrls}</div>
      <div>seeAlsoUrls: {seeAlsoUrls}</div>
      <div>privateTypeIndexUrls: {privateTypeIndexUrls}</div>
      <div>typeRegistrationUrls: {typeRegistrationUrls}</div>
      <div>instanceUrls: {instanceUrls}</div>
      <div>instances: {instances?.length}</div>

      {privateTypeIndexUrls.length === 0 && (
        <>
          <Button
            onClick={() => {
              service
                .newPrivateTypeIndex(repository)
                .then(() => {
                  console.log("Created private type index");
                })
                .catch((err) => {
                  console.error(
                    "Failed to create private type index, error:",
                    err
                  );
                });
            }}
          >
            New private type index
          </Button>
        </>
      )}
    </Layout>
  );
}
