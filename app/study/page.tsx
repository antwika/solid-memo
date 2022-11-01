import { getData } from "@/lib/mockData"
import Button from "@/ui/Button";
import Title from "@/ui/Title";
import StudyLink from "components/link/StudyLink";
import StudyTable from "components/table/StudyTable";

export default async function Page() {
  const { studySet } = await getData();

  return (
    <div className="space-y-2">
      <StudyLink />
      <Title text="My studies" />
      <StudyTable studySet={studySet} />
      <Button>Create new study</Button>
    </div>
  );
}
