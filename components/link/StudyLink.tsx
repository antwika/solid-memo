import { asyncComponent } from "@/lib/hack";
import { getPropertyByName, getPropertySetByStudyUuid, getPropertyValueByName, getStudyByUuid } from "@/lib/mockData";
import Link from "@/ui/Link";
import { MdOutlineSchool } from "react-icons/md";

type Props = {
  uuid?: string,
};

export default asyncComponent(async function StudyLink(props: Props) {
  const { uuid } = props;
  const study = uuid ? await getStudyByUuid(uuid) : undefined;
  const propertySet = study ? await getPropertySetByStudyUuid(study.uuid) : {};
  const name = await getPropertyValueByName(propertySet, 'Name') ?? 'Studies';
  const uri = study ? `/study/${study.uuid}` : '/study';
  const icon = <MdOutlineSchool />;
  return <Link uri={uri} icon={icon} label={name} />;
});
