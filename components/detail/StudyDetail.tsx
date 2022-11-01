import { asyncComponent } from "@/lib/hack";
import { getDeckSetByStudyUuid, getPropertySetByStudyUuid, getStudyByUuid, StudyUuid } from "@/lib/mockData";
import Title from "@/ui/Title";
import DeckTable from "components/table/DeckTable";
import PropertyTable from "../table/PropertyTable";

type Props = {
  uuid: StudyUuid,
};

export default asyncComponent(async function StudyDetail(props: Props) {
  const { uuid } = props;
  const study = await getStudyByUuid(uuid);
  const [propertySet, deckSet] = await Promise.all(
    [
      getPropertySetByStudyUuid(study.uuid),
      getDeckSetByStudyUuid(study.uuid),
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
          <Title text="Includes decks" />
          <DeckTable deckSet={deckSet} />
        </>
      )}
    </>
  );
})
