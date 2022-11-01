import { getCardByUuid } from "@/lib/mockData";
import CardDetail from "components/detail/CardDetail";
import CardLink from "components/link/CardLink";

type Props = {
  params?: any;
  children?: React.ReactNode;
};

export default async function Page({ params }: Props) {
  const { uuid } = params;
  const card = await getCardByUuid(uuid);
  return (
    <div className="space-y-2">
      <CardLink uuid={card.uuid} />
      <CardDetail uuid={card.uuid} />
    </div>
  );
}
