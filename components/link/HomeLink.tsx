import { asyncComponent } from "@/lib/hack";
import Link from "@/ui/Link";
import { FiHome } from "react-icons/fi";

export default asyncComponent(async function HomeLink() {
  return <Link uri={`/`} icon={<FiHome />} label="Home" />;
})
