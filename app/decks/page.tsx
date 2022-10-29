import { getData } from "@/lib/mockData"
import DeckLink from "@/ui/links/DeckLink";
import DecksLink from "@/ui/links/DecksLink";
import Table from "@/ui/Table";
import TableTd from "@/ui/TableTd";
import TableTh from "@/ui/TableTh";

export default async function Decks() {
  const { decks } = await getData();
  return (
    <div className="space-y-2">
      <DecksLink />
      <Table>
        <thead>
          <tr>
            <TableTh>Deck</TableTh>
            <TableTh>Cards</TableTh>
          </tr>
        </thead>
        <tbody>
          { Object.values(decks).map(deck => {
            return (
              <tr key={deck.key}>
                <TableTd>
                  <DeckLink deckId={deck.key} label={deck.name} />
                </TableTd>
                <TableTd>{deck.cards.length}</TableTd>
              </tr>
            );
          }) }
        </tbody>
      </Table>
    </div>
  );
}
