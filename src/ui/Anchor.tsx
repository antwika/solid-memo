'use client';

import NextLink from "next/link";

type Props = {
  dataTestid?: string,
  children: React.ReactNode;
  href: string,
  className?: string,
};

export default function Anchor(props: Props) {
  const { dataTestid, children, href } = props;
  return (
    <NextLink data-testid={dataTestid} {...props} className="font-bold text-blue-500 hover:text-blue-300 active:text-blue-700" href={href}>{ children }</NextLink>
  );
}
