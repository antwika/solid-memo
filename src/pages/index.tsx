import { useContext } from "react";
import Layout from "@src/pages/layout";
import { useRouter } from "next/navigation";
import { Button } from "@src/components/ui";
import { SolidMemoDataContext } from "@src/providers/SolidMemoDataProvider";

export default function Home() {
  const router = useRouter();
  const { solidMemoDataInstances, selectSolidMemoDataInstance } =
    useContext(SolidMemoDataContext);

  return (
    <Layout>
      <div>Choose Solid Memo Data instance:</div>
      {solidMemoDataInstances.map((solidMemoDataInstance) => {
        return (
          <Button
            key={solidMemoDataInstance.iri}
            onClick={() => {
              selectSolidMemoDataInstance(solidMemoDataInstance);
              router.push(
                `/instance/${encodeURIComponent(solidMemoDataInstance.iri)}`,
              );
            }}
            title={solidMemoDataInstance.iri}
          >
            {solidMemoDataInstance.name}
          </Button>
        );
      })}
    </Layout>
  );
}
