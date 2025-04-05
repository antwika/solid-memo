import { Button } from "@src/components/ui";
import { useDecks } from "@src/hooks/useDecks";
import { useIris } from "@src/hooks/useIris";
import Layout from "@src/pages/layout";
import { useRouter } from "next/router";

export default function InstancePage() {
  const router = useRouter();
  const { iri } = router.query;

  const { iris } = useIris(
    Array.isArray(iri) ? undefined : iri,
    "http://antwika.com/ns/solid-memo#Deck",
  );

  const { decks } = useDecks(iris);

  if (!iri) {
    return <div>Loading instance...</div>;
  }

  if (Array.isArray(iri)) {
    return <div>Instance iri must not be array</div>;
  }

  return (
    <Layout>
      <div>Choose deck:</div>
      {decks.map((deck) => (
        <div key={deck.iri}>
          <Button
            onClick={() =>
              router.push(`/decks/${encodeURIComponent(deck.iri)}`)
            }
            title={deck.iri}
          >
            Deck: {deck.name}
          </Button>
        </div>
      ))}
    </Layout>
  );
}
