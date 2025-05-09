import Layout from "@pages/layout";
import { ServiceContext } from "@providers/service.provider";
import { Button, Card, Input } from "@ui/index";
import { Layers } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import useDecks from "src/hooks/useDecks";
import { useForm, type SubmitHandler } from "react-hook-form";
import { preferFragment } from "@solid-memo/core";

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

  return (
    <Layout>
      <Card key={deck.iri} className="p-2">
        <div className="space-x-2 space-y-1">
          <div>You are studying:</div>
          <div key={deck.iri} className="flex gap-1 items-center">
            <Layers />
            <strong>
              <span title={deck.iri}>{preferFragment(deck.iri)}</span>
            </strong>{" "}
            (Deck)
            <Button
              size={"sm"}
              onClick={() => {
                router.push(`/decks/${encodeURIComponent(deck.iri)}`);
              }}
            >
              View
            </Button>
          </div>
          <Button>Easy</Button>
          <Button>Good</Button>
          <Button>Hard</Button>
          <Button>Again</Button>
        </div>
      </Card>
    </Layout>
  );
}
