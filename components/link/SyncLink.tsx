import { asyncComponent } from "@/lib/hack";
import Link from "@/ui/Link";
import { FiBook } from "react-icons/fi";

export default asyncComponent(async function SyncLink() {
  return <Link uri={`/sync`} icon={<FiBook />} label="Sync" />;
})
