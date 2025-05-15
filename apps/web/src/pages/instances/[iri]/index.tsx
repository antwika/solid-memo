import Layout from "@pages/layout";
import { ServiceContext } from "@providers/service.provider";
import { Button, Card } from "@ui/index";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import useInstances from "src/hooks/useInstances";
import Link from "next/link";
import useDecks from "@hooks/useDecks";

export default function Page() {
  const router = useRouter();
  const { getService } = useContext(ServiceContext);
  const service = getService();

  const { iri } = useParams();
  const { instanceMap, mutate, isLoading } = useInstances(
    iri ? [iri?.toString()] : []
  );
  const instance = iri ? instanceMap[iri.toString()] : undefined;
  const { deckMap } = useDecks(instance?.hasDeck ?? []);

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
      <div className="flex flex-col gap-2">
        <h2 className="flex gap-2 items-center">
          Study Decks
          <Button
            size={"sm"}
            variant={"default"}
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
            Create
          </Button>
        </h2>
        <div className="gap-2 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
          {Object.keys(deckMap).map((deckIri) => {
            const deck = deckMap[deckIri];
            if (!deck) return undefined;
            return (
              <Link
                key={deck.iri}
                href={`/decks/${encodeURIComponent(deck.iri)}/study`}
              >
                <Card title={deckIri} className="h-full hover:bg-primary/5">
                  <h3 className="flex justify-between">
                    <span>{deck.name}</span>
                    <Button
                      size={"sm"}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        router.push(
                          `/decks/${encodeURIComponent(deck.iri)}/edit`
                        );
                      }}
                    >
                      Edit
                    </Button>
                  </h3>
                  <span className="grow">{deck.hasCard.length} cards</span>
                </Card>
              </Link>
            );
          })}
        </div>
        <h3>Other instance actions:</h3>
        <div className="flex sm:flex-row flex-col gap-1">
          <Button
            variant={"secondary"}
            onClick={() => {
              router.push(
                `/instances/${encodeURIComponent(instance.iri)}/edit`
              );
            }}
          >
            Edit
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => {
              service
                .removeInstance(instance)
                .then(() => router.push(`/instances`))
                .catch((err) => console.error("Failed with error:", err));
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </Layout>
  );
}
