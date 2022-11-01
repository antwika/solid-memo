import { getData } from "@/lib/mockData"
import Button from "@/ui/Button";
import Title from "@/ui/Title";
import DeckLink from "components/link/DeckLink";
import DeckTable from "components/table/DeckTable";

export default async function Page() {
  const { deckSet } = await getData();

  return (
    <div className="space-y-2">
      <DeckLink />
      <Title text="My decks" />
      <DeckTable deckSet={deckSet} />
      <Button>Create new deck</Button>
    </div>
  );
}
