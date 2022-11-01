import DeckLink from "./link/DeckLink";
import HomeLink from "./link/HomeLink";
import StudyLink from "./link/StudyLink";
import SyncLink from "./link/SyncLink";
import SolidMemoBadge from "./badge/SolidMemoBadge";
import CardLink from "./link/CardLink";
import PropertyLink from "./link/PropertyLink";

export default function Header() {
  return (
    <div className="flex p-2 bg-slate-300 select-none">
        <div className="flex flex-grow">
          <SolidMemoBadge />
        </div>
        <div className="flex space-x-2 items-center">
          <HomeLink />
          <PropertyLink />
          <CardLink />
          <DeckLink />
          <StudyLink />
          <SyncLink />
        </div>
    </div>
  );
}
