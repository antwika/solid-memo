'use client';

import NextLink from "next/link";

type Props = {
  children: React.ReactNode;
  href: string,
  className?: string,
};

export default function Anchor(props: Props) {
  const { children } = props;
  return (
    <NextLink {...props} className="font-bold text-blue-500 hover:text-blue-300 active:text-blue-700" href={props.href}>{ children }</NextLink>
  );
}
