import { asyncComponent } from "@/lib/hack";
import { CardData, CardSet, getPropertySetByCardUuid, getPropertyValueByName } from "@/lib/mockData";
import Table from "@/ui/table/Table";
import Td from "@/ui/table/Td";
import Th from "@/ui/table/Th";
import CardLink from "components/link/CardLink";

type Props = {
  cardSet: CardSet,
};

export default asyncComponent(async function DeckTable(props: Props) {
  const { cardSet } = props;
  
  const renderTableRow = async (card: CardData) => {
    const propertySet = await getPropertySetByCardUuid(card.uuid);
    const front = await getPropertyValueByName(propertySet, 'Front') ?? '';
    const back = await getPropertyValueByName(propertySet, 'Back') ?? '';
    return (
      <tr key={ card.uuid }>
        <Td>
          <CardLink uuid={card.uuid} />
        </Td>
        <Td>
          {front}
        </Td>
        <Td>
          {back}
        </Td>
      </tr>
    );
  }

  const promises = Object.values(cardSet).map(card => renderTableRow(card));
  const tableRows = await Promise.all(promises);

  return (
    <Table>
      <thead>
        <tr>
          <Th>Card name</Th>
          <Th>Front</Th>
          <Th>Back</Th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </Table>
  );
})
