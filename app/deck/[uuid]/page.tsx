import { getDeckByUuid } from "@/lib/mockData";
import DeckDetail from "components/detail/DeckDetail";
import DeckLink from "components/link/DeckLink";

type Props = {
  params?: any;
  children?: React.ReactNode;
};

export default async function Page({ params }: Props) {
  const { uuid } = params;
  const deck = await getDeckByUuid(uuid);
  return (
    <div className="space-y-2">
      <DeckLink uuid={deck.uuid} />
      <DeckDetail uuid={deck.uuid} />
    </div>
  );
}
