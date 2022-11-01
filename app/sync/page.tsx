import Button from "@/ui/Button";
import Title from "@/ui/Title";
import SyncLink from "components/link/SyncLink";

export default async function Decks() {
  return (
    <div className="space-y-2">
      <SyncLink />
      <Title text="My synchronization" />
      <p>Synchronize your decks with your Solid pod</p>
      <Button>Synchronize</Button>
    </div>
  );
}
