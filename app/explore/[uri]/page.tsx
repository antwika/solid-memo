import PropertyDetail from "@/components/detail/PropertyDetail";
import PropertyLink from "@/components/link/PropertyLink";
import { getPropertyByUuid } from "@/lib/mockData";

type Props = {
  params?: any;
  children?: React.ReactNode;
};

export default async function Page({ params }: Props) {
  const { uri } = params;
  // const property = await getPropertyByUuid(uri);
  return (
    <div className="space-y-2">
      Explore: {uri} !
    </div>
  );
}
