import { asyncComponent } from "@/lib/hack";
import { getCardByUuid, getDeckSetByCardUuid, getPropertySetByCardUuid, getStudySetByCardUuid, StudyUuid } from "@/lib/mockData";
import Title from "@/ui/Title";
import DeckTable from "components/table/DeckTable";
import StudyTable from "components/table/StudyTable";
import PropertyTable from "../table/PropertyTable";

type Props = {
  uuid: StudyUuid,
};

export default asyncComponent(async function CardDetail(props: Props) {
  const { uuid } = props;
  const card = await getCardByUuid(uuid);
  const [propertySet, deckSet, studySet] = await Promise.all(
    [
      getPropertySetByCardUuid(card.uuid),
      getDeckSetByCardUuid(card.uuid),
      getStudySetByCardUuid(card.uuid),
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
