import { asyncComponent } from "@/lib/hack";
import { getCardSetByDeckUuid, getDeckByUuid, getPropertySetByDeckUuid, getStudySetByDeckUuid, StudyUuid } from "@/lib/mockData";
import Title from "@/ui/Title";
import CardTable from "components/table/CardTable";
import StudyTable from "components/table/StudyTable";
import PropertyTable from "../table/PropertyTable";

type Props = {
  uuid: StudyUuid,
};

export default asyncComponent(async function DeckDetail(props: Props) {
  const { uuid } = props;
  const deck = await getDeckByUuid(uuid);
  const [propertySet, cardSet, studySet] = await Promise.all(
    [
      getPropertySetByDeckUuid(deck.uuid),
      getCardSetByDeckUuid(deck.uuid),
      getStudySetByDeckUuid(deck.uuid),
    ],
  );

  return (
    <>
      { Object.values(propertySet).length > 0 && (
        <>
          <Title text="Properties" />
          <PropertyTable propertySet={propertySet} />
        </>
      )}
      { Object.values(cardSet).length > 0 && (
        <>
          <Title text="Includes cards" />
          <CardTable cardSet={cardSet} />
        </>
      )}
      { Object.values(studySet).length > 0 && (
        <>
          <Title text="Used in studies" />
          <StudyTable studySet={studySet} />
        </>
      )}
    </>
  );
})
