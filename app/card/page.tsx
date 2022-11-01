import { getData } from "@/lib/mockData"
import Button from "@/ui/Button";
import Title from "@/ui/Title";
import CardLink from "components/link/CardLink";
import CardTable from "components/table/CardTable";

export default async function Page() {
  const { cardSet } = await getData();

  return (
    <div className="space-y-2">
      <CardLink />
      <Title text="My cards" />
      <CardTable cardSet={cardSet} />
      <Button>Create new card</Button>
    </div>
  );
}
