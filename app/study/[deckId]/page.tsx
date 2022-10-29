import { getCardById, getDeckById } from "@/lib/mockData";
import Button from "@/ui/Button";
import DeckLink from "@/ui/links/DeckLink";
import Table from "@/ui/Table";
import TableTd from "@/ui/TableTd";
import TableTh from "@/ui/TableTh";

type Props = {
  params?: any;
  children?: React.ReactNode;
};

export default async function Page({ params }: Props) {
  const { deckId } = params;
  const deck = await getDeckById(deckId);
  const cards = await Promise.all(deck.cards.map(cardId => getCardById(cardId)));
  return (
    <div className="space-y-2">
      <DeckLink deckId={deck.key} label={"Deck: " + deck.name} />
      <Table>
        <thead>
          <tr>
            <TableTh>Property</TableTh>
            <TableTh>Value</TableTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableTd>Cards to study</TableTd>
            <TableTd>{cards.length}</TableTd>
          </tr>
        </tbody>
      </Table>
      <Button>Begin study</Button>
    </div>
  );
}
