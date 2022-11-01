import { asyncComponent } from "@/lib/hack";
import { StudySet } from "@/lib/mockData";
import Table from "@/ui/table/Table";
import Td from "@/ui/table/Td";
import Th from "@/ui/table/Th";
import StudyLink from "components/link/StudyLink";

type Props = {
  studySet: StudySet,
};

export default asyncComponent(async function StudyTable(props: Props) {
  const { studySet } = props;
  return (
    <Table>
      <thead>
        <tr>
          <Th>Study name</Th>
          <Th>Decks</Th>
        </tr>
      </thead>
      <tbody>
        {
          Object.values(studySet).map(study => {
            return (
              <tr key={ study.uuid }>
                <Td>
                  <StudyLink uuid={ study.uuid } />
                </Td>
                <Td>
                  { study.deckUuidList.length }
                </Td>
              </tr>
            );
          })
        }
      </tbody>
    </Table>
  );
})
