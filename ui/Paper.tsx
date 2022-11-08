'use client';

type Props = {
  children: React.ReactNode,
}

export default function Paper({ children }: Props) {
  return (
    <div className="p-2 bg-slate-50 shadow-md">
      {children}
    </div>
  );
};
