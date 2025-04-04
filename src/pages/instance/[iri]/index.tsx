import { Button } from "@src/components/ui";
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

  if (!iri) {
    return <div>Loading instance...</div>;
  }

  if (Array.isArray(iri)) {
    return <div>Instance iri must not be array</div>;
  }

  return (
    <Layout>
      <div>Choose deck:</div>
      {iris.map((deckIri) => (
        <div key={deckIri}>
          <Button
            onClick={() => router.push(`/decks/${encodeURIComponent(deckIri)}`)}
          >
            Deck: {deckIri}
          </Button>
        </div>
      ))}
    </Layout>
  );
}
