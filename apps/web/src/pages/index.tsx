import Layout from "@pages/layout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push(`/instances`);
  }, [router]);

  return <Layout>Loading...</Layout>;
}
