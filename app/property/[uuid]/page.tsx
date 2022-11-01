import PropertyDetail from "@/components/detail/PropertyDetail";
import PropertyLink from "@/components/link/PropertyLink";
import { getPropertyByUuid } from "@/lib/mockData";

type Props = {
  params?: any;
  children?: React.ReactNode;
};

export default async function Page({ params }: Props) {
  const { uuid } = params;
  const property = await getPropertyByUuid(uuid);
  return (
    <div className="space-y-2">
      <PropertyLink uuid={property.uuid} />
      <PropertyDetail uuid={property.uuid} />
    </div>
  );
}
