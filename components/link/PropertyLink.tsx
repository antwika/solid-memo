import { asyncComponent } from "@/lib/hack";
import { getCardByUuid, getPropertyByUuid } from "@/lib/mockData";
import Link from "@/ui/Link";
import { TbCircleDot } from "react-icons/tb";

type Props = {
  uuid?: string,
};

export default asyncComponent(async function PropertyLink(props: Props) {
  const { uuid } = props;
  const property = uuid ? await getPropertyByUuid(uuid) : undefined;
  const uri = property ? `/property/${property.uuid}` : '/property';
  const label = property ? property.name : 'Properties';
  const icon = <TbCircleDot />;
  return <Link uri={uri} icon={icon} label={label} />;
});
