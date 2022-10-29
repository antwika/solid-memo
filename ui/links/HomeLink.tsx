import { FiHome } from "react-icons/fi";
import Link from "./Link";

export default function HomeLink() {
  return <Link uri={`/`} icon={<FiHome />} label="Home" />;
}
