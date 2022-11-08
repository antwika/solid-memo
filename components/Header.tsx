import Link from "@/ui/Link";
import SolidMemoBadge from "./badge/SolidMemoBadge";

export default function Header() {
  return (
    <div className="flex p-2 bg-slate-300 select-none">
        <div className="flex flex-grow">
          <SolidMemoBadge />
        </div>
        <div className="flex space-x-2 items-center">
          <Link uri={'/resource'}>Resource</Link>
          <Link uri={'/design'}>Design</Link>
        </div>
    </div>
  );
}
