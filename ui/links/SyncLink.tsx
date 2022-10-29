import { FiBook } from "react-icons/fi";
import Link from "./Link";

export default function SyncLink() {
  return <Link uri={`/sync`} icon={<FiBook />} label="Sync" />;
}
