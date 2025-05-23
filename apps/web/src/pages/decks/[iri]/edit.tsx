import Layout from "@pages/layout";
import { ServiceContext } from "@providers/service.provider";
import { Button, Card, Input } from "@ui/index";
import { Layers } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import useDecks from "src/hooks/useDecks";
import { useForm, type SubmitHandler } from "react-hook-form";
import Link from "next/link";

type Inputs = {
  name: string;
};

export default function Page() {
  const router = useRouter();
  const { getService } = useContext(ServiceContext);
  const service = getService();

  const { iri } = useParams();
  const { deckMap, mutate, isLoading } = useDecks(iri ? [iri?.toString()] : []);
  const deck = iri ? deckMap[iri.toString()] : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  if (isLoading) {
    return (
      <Layout>
        <Card className="p-2">
          <div>Loading deck...</div>
        </Card>
      </Layout>
    );
  }

  if (!deck) {
    return (
      <Layout>
        <div>No deck found</div>
      </Layout>
    );
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    service
      .updateDeck({ ...deck, name: data.name })
      .then(() => mutate())
      .then(() => {
        console.log("Updated deck!");
      })
      .catch((err) => {
        console.error("Failed to update deck, error:", err);
      });
  };

  return (
    <Layout>
      <Card key={deck.iri} className="p-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-x-2 space-y-1">
            <div className="mb-2 flex gap-1 justify-between">
              <Link
                href={`/decks/${encodeURIComponent(deck.iri)}`}
                className="hover:underline"
              >
                <div className="flex gap-1">
                  <Layers />
                  <strong>
                    <span>{deck.name}</span>
                  </strong>
                </div>
              </Link>
              <Button
                size={"sm"}
                variant={"destructive"}
                onClick={() => {
                  service
                    .removeDeck(deck)
                    .then(() => router.push(`/decks`))
                    .catch((err) => console.error("Failed with error:", err));
                }}
              >
                Delete
              </Button>
            </div>
            <div>
              <strong>• Name:</strong> {deck.name}
              <Input
                id="name"
                type="text"
                defaultValue={deck.name}
                {...register("name", { required: true })}
              />
              {errors.name && <span>This field is required</span>}
            </div>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Card>
    </Layout>
  );
}
