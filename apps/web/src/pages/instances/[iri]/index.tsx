import { preferFragment } from "@solid-memo/core";
import Layout from "@pages/layout";
import { ServiceContext } from "@providers/service.provider";
import { Button, Card } from "@ui/index";
import { Calendar, Database, Layers } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import useInstances from "src/hooks/useInstances";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const { getService } = useContext(ServiceContext);
  const service = getService();

  const { iri } = useParams();
  const { instanceMap, mutate, isLoading } = useInstances(
    iri ? [iri?.toString()] : []
  );
  const instance = iri ? instanceMap[iri.toString()] : undefined;

  if (isLoading) {
    return (
      <Layout>
        <Card className="p-2">
          <div>Loading instance...</div>
        </Card>
      </Layout>
    );
  }

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
            <Link
              href={`/instances/${encodeURIComponent(instance.iri)}`}
              className="hover:underline"
            >
              <div className="flex gap-1" title={instance.iri}>
                <Database />
                <strong>
                  <span>{instance.name}</span>
                </strong>{" "}
                (Instance)
              </div>
            </Link>
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
                  <Link
                    href={`/decks/${encodeURIComponent(deckIri)}`}
                    className="hover:underline"
                  >
                    <div className="flex gap-1" title={deckIri}>
                      <Layers />
                      <strong>
                        <span>{preferFragment(deckIri)}</span>
                      </strong>{" "}
                      (Deck)
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div>
            <strong>• Has schedule:</strong>{" "}
            <div className="flex flex-col gap-1">
              {instance.hasSchedule.map((scheduleIri) => (
                <div key={scheduleIri} className="flex gap-1 items-center">
                  <Calendar />
                  <strong>
                    <span title={scheduleIri}>
                      {preferFragment(scheduleIri)}
                    </span>
                  </strong>{" "}
                  (Schedule)
                  <Button
                    size={"sm"}
                    onClick={() => {
                      router.push(
                        `/schedules/${encodeURIComponent(scheduleIri)}`
                      );
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
                .removeInstance(instance)
                .then(() => router.push(`/instances`))
                .catch((err) => console.error("Failed with error:", err));
            }}
          >
            Delete instance
          </Button>
          <Button
            onClick={() => {
              router.push(
                `/instances/${encodeURIComponent(instance.iri)}/edit`
              );
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              service
                .newDeck({
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
