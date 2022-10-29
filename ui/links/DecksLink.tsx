import { FiBook } from "react-icons/fi";
import Link from "./Link";

export default function DecksLink() {
  return <Link uri={`/decks`} icon={<FiBook />} label="Decks" />;
}
