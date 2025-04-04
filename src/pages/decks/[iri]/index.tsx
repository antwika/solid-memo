import { useRouter } from "next/router";
import { Deck } from "@src/components/Deck";

export default function DeckPage() {
  const router = useRouter();
  const { iri } = router.query;

  if (!iri) {
    return <div>Loading deck...</div>;
  }

  if (Array.isArray(iri)) {
    return <div>Deck iri must not be array</div>;
  }

  return (
    <div>
      <Deck deckIri={iri} />
    </div>
  );
}
