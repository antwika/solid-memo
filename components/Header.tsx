import Logotype from "@/ui/Logotype";
import HomeLink from "@/ui/links/HomeLink";
import DecksLink from "@/ui/links/DecksLink";
import SyncLink from "@/ui/links/SyncLink";

export default function Header() {
  return (
    <div className="flex p-2 bg-slate-300 select-none">
        <div className="flex flex-grow">
          <Logotype />
        </div>
        <div className="flex space-x-2 items-center">
          <HomeLink />
          <DecksLink />
          <SyncLink />
        </div>
    </div>
  );
}
