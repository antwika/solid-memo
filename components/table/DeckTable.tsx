import { asyncComponent } from "@/lib/hack";
import { DeckSet } from "@/lib/mockData";
import Table from "@/ui/table/Table";
import Td from "@/ui/table/Td";
import Th from "@/ui/table/Th";
import DeckLink from "components/link/DeckLink";

type Props = {
  deckSet: DeckSet,
};

export default asyncComponent(async function DeckTable(props: Props) {
  const { deckSet } = props;
  return (
    <Table>
      <thead>
        <tr>
          <Th>Deck name</Th>
          <Th>Studies</Th>
          <Th>Cards</Th>
        </tr>
      </thead>
      <tbody>
        {
          Object.values(deckSet).map(deck => {
            return (
              <tr key={ deck.uuid }>
                <Td>
                  <DeckLink uuid={deck.uuid} />
                </Td>
                <Td>
                  { deck.studyUuidList.length }
                </Td>
                <Td>
                  { deck.cardUuidList.length }
                </Td>
              </tr>
            );
          })
        }
      </tbody>
    </Table>
  );
})
