import Button from "@/ui/Button";
import SyncLink from "@/ui/links/SyncLink";

export default async function Decks() {
  return (
    <div className="space-y-2">
      <SyncLink />
      <p>Synchronize your decks with your Solid pod</p>
      <Button>Synchronize</Button>
    </div>
  );
}
