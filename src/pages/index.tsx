import Layout from "@pages/layout";
import { useRouter } from "next/navigation";
import { Button } from "@ui/index";

export default function Home() {
  console.log("Render Home");
  const router = useRouter();

  return (
    <Layout>
      <div className="space-x-2">
        <Button
          onClick={() => {
            console.log("Go to test page");
            router.push(`/test`);
          }}
        >
          Go to Test page
        </Button>
      </div>
    </Layout>
  );
}
