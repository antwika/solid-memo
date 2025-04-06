import { useRouter } from "next/router";
import { Deck } from "@components/Deck";
import Layout from "@pages/layout";

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
    <Layout>
      <Deck deckIri={iri} />
    </Layout>
  );
}
