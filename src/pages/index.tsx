import Layout from "@pages/layout";
import { useRouter } from "next/navigation";
import { Button } from "@ui/index";

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <div className="space-x-2">
        <Button
          onClick={() => {
            router.push(`/test`);
          }}
        >
          Go to Test page
        </Button>
      </div>
    </Layout>
  );
}
