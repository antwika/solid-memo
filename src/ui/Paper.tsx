'use client';

type Props = {
  dataTestid?: string,
  children: React.ReactNode,
}

export default function Paper({ dataTestid, children }: Props) {
  return (
    <div data-testid={dataTestid} className="p-2 bg-slate-50 shadow-md">
      {children}
    </div>
  );
};
