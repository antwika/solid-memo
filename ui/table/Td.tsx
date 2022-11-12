'use client';

type Props = React.TableHTMLAttributes<HTMLTableCellElement> & {
  children: React.ReactNode;
};

export default function Td(props: Props) {
  const { children } = props;
  return (
    <td {...props} className="border px-2 py-1">{ children }</td>
  );
}
