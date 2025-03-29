import type React from "react";
import type { MouseEventHandler } from "react";

export type Props = {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function Button({ children, onClick }: Props) {
  return (
    <button
      className="rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
