'use client';

type Props = React.TableHTMLAttributes<HTMLTableCellElement> & {
  children: React.ReactNode;
};

export default function Th(props: Props) {
  const { children } = props;
  return (
    <th {...props} className="bg-blue-500 border text-left px-2 py-1 text-white select-none">{ children }</th>
  );
}
