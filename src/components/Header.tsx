'use client';

import Link from "src/ui/Link";
import SessionBadge from "./badge/SessionBadge";
import SolidMemoBadge from "./badge/SolidMemoBadge";

type Props = {
  dataTestid?: string,
}

export default function Header({ dataTestid }: Props) {
  return (
    <div data-testid={dataTestid} className="flex p-2 bg-slate-300 select-none">
        <div className="flex flex-grow space-x-2 items-center">
          <SolidMemoBadge dataTestid={`${dataTestid}-solidMemoBadge`} />
          <SessionBadge dataTestid={`${dataTestid}-sessionBadge`} />
        </div>
        <div className="flex space-x-2 items-center">
          <Link dataTestid={`${dataTestid}-resourceLink`} uri={'/resource'}>Resource</Link>
        </div>
    </div>
  );
}
