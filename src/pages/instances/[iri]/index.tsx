import { preferFragment } from "@lib/utils";
import Layout from "@pages/layout";
import { RepositoryContext } from "@providers/repository.provider";
import { ServiceContext } from "@providers/service.provider";
import { Button, Card } from "@ui/index";
import { Database, Layers } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import useInstances from "src/hooks/useInstances";

export default function Page() {
  const router = useRouter();
  const { getRepository } = useContext(RepositoryContext);
  const { getService } = useContext(ServiceContext);
  const repository = getRepository();
  const service = getService();

  const { iri } = useParams();
  const { instanceMap, mutate } = useInstances(iri ? [iri?.toString()] : []);
  const instance = iri ? instanceMap[iri.toString()] : undefined;

  if (!instance) {
    return (
      <Layout>
        <div>No instance found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Card key={instance.iri} className="p-2">
        <div className="space-x-2 space-y-1">
          <div className="mb-2 flex gap-1">
            <div className="width: 32px" title="Instance">
              <Database />
            </div>
            <strong>{instance.name}</strong> (Instance)
          </div>
          <div>
            <span title={instance.iri}>
              <strong>• Iri:</strong> {preferFragment(instance.iri)}
            </span>
          </div>
          <div>
            <strong>• Version:</strong> {instance.version}
          </div>
          <div>
            <strong>• Name:</strong> {instance.name}
          </div>
          <div>
            <strong>• Is in private type index:</strong>{" "}
            {preferFragment(instance.isInPrivateTypeIndex)}
          </div>
          <div>
            <strong>• Has deck:</strong>{" "}
            <div className="flex flex-col gap-1">
              {instance.hasDeck.map((deckIri) => (
                <div key={deckIri} className="flex gap-1 items-center">
                  <Layers />
                  <strong>
                    <span title={deckIri}>{preferFragment(deckIri)}</span>
                  </strong>{" "}
                  (Deck)
                  <Button
                    size={"sm"}
                    onClick={() => {
                      router.push(`/decks/${encodeURIComponent(deckIri)}`);
                    }}
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <Button
            variant={"destructive"}
            onClick={() => {
              service
                .removeInstance(repository, instance)
                .then(() => router.push(`/instances`))
                .catch((err) => console.error("Failed with error:", err));
            }}
          >
            Delete instance
          </Button>
          <Button
            onClick={() => {
              service
                .newDeck(repository, {
                  version: "1",
                  name: "New deck name",
                  isInSolidMemoDataInstance: instance.iri,
                  hasCard: [],
                })
                .then(() => mutate())
                .catch((err) => console.error("Failed with error:", err));
            }}
          >
            Create deck
          </Button>
        </div>
      </Card>
    </Layout>
  );
}
