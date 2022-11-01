import { asyncComponent } from "@/lib/hack";
import { getCardByUuid, getPropertySetByCardUuid, getPropertyValueByName } from "@/lib/mockData";
import Link from "@/ui/Link";
import { RiStickyNoteLine } from "react-icons/ri";

type Props = {
  uuid?: string,
};

export default asyncComponent(async function CardLink(props: Props) {
  const { uuid } = props;
  const card = uuid ? await getCardByUuid(uuid) : undefined;
  const propertySet = card ? await getPropertySetByCardUuid(card.uuid) : {};
  const name = card ? await getPropertyValueByName(propertySet, 'Name') ?? 'Unnamed card' : 'Cards';
  const uri = card ? `/card/${card.uuid}` : '/card';
  const icon = <RiStickyNoteLine />;
  return <Link uri={uri} icon={icon} label={name} />;
});
