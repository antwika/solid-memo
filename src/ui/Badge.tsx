'use client';

import Link from "./Link";

type Props = {
  dataTestid?: string,
  children?: React.ReactNode,
  className?: string,
};

export default function Badge({ dataTestid, children, className }: Props) {
  return (
    <Link dataTestid={dataTestid} uri={"/"} className={["text-xl font-bold no-underline", className].join(' ')}>
      <div className="flex items-center space-x-2 p-1 bg-white rounded-md shadow-md">
        {children}
      </div>
    </Link>
  );
}
