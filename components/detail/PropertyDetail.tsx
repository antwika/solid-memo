import { asyncComponent } from "@/lib/hack";
import { getCardSetByPropertyUuid, getDeckSetByPropertyUuid, getPropertyByUuid, getStudySetByPropertyUuid, StudyUuid } from "@/lib/mockData";
import Title from "@/ui/Title";
import CardTable from "../table/CardTable";
import DeckTable from "../table/DeckTable";
import PropertyTable from "../table/PropertyTable";
import StudyTable from "../table/StudyTable";

type Props = {
  uuid: StudyUuid,
};

export default asyncComponent(async function PropertyDetail(props: Props) {
  const { uuid } = props;
  const property = await getPropertyByUuid(uuid);
  const [cardSet, deckSet, studySet] = await Promise.all(
    [
      getCardSetByPropertyUuid(property.uuid),
      getDeckSetByPropertyUuid(property.uuid),
      getStudySetByPropertyUuid(property.uuid),
    ],
  );
  
  return (
    <>
      <PropertyTable propertySet={{ [property.uuid]: property }} />
      { Object.values(cardSet).length > 0 && (
        <>
          <Title text="Used in cards" />
          <CardTable cardSet={cardSet} />
        </>
      )}
      { Object.values(deckSet).length > 0 && (
        <>
          <Title text="Used in decks" />
          <DeckTable deckSet={deckSet} />
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
