import { getStudyByUuid } from "@/lib/mockData";
import StudyDetail from "components/detail/StudyDetail";
import StudyLink from "components/link/StudyLink";

type Props = {
  params?: any;
  children?: React.ReactNode;
};

export default async function Page({ params }: Props) {
  const { uuid } = params;
  const study = await getStudyByUuid(uuid);
  return (
    <div className="space-y-2">
      <StudyLink uuid={study.uuid} />
      <StudyDetail uuid={study.uuid} />
    </div>
  );
}
