'use client';

import Link from "./Link";

type Props = {
  children?: React.ReactNode,
  className?: string,
};

export default function Badge({ children, className }: Props) {
  return (
    <>
      <Link uri={"/"} className={["text-xl font-bold no-underline", className].join(' ')}>
        <div className="flex items-center space-x-2 p-1 bg-white rounded-md shadow-md">
          {children}
        </div>
      </Link>
    </>
  );
}
