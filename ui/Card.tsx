'use client'

type Props = {
  title?: string,
  children: React.ReactNode,
};

export default function Card({ title, children }: Props) {
  return (
    <div className="flex">
      <div className="bg-slate-200 dark:bg-slate-700 text-black dark:text-white rounded-xl shadow-lg border border-slate-300 dark:border-slate-600">
        { title && (
          <div className="flex">
            <div className="bg-slate-300 dark:bg-slate-600 rounded-br-xl rounded-tl-xl uppercase text-xs font-bold px-3 py-1">
              { title }
            </div>
          </div>
          )
        }
        <div className="p-4">
          { children }
        </div>
      </div>
    </div>
  );
}
