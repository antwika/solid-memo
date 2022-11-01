import { asyncComponent } from "@/lib/hack";
import { getDeckByUuid, getPropertySetByDeckUuid, getPropertyValueByName } from "@/lib/mockData";
import Link from "@/ui/Link";
import { TbStack2 } from "react-icons/tb";

type Props = {
  uuid?: string,
};

export default asyncComponent(async function DeckLink(props: Props) {
  const { uuid } = props;
  const deck = uuid ? await getDeckByUuid(uuid) : undefined;
  const propertySet = deck ? await getPropertySetByDeckUuid(deck.uuid) : {};
  const name = deck ? await getPropertyValueByName(propertySet, 'Name') ?? 'Unnamed deck' : 'Decks';
  const uri = deck ? `/deck/${deck.uuid}` : '/deck';
  const icon = <TbStack2 />;
  return <Link uri={uri} icon={icon} label={name} />;
});
