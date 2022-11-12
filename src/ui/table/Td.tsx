'use client';

type Props = React.TableHTMLAttributes<HTMLTableCellElement> & {
  dataTestid?: string,
  children: React.ReactNode;
};

export default function Td(props: Props) {
  const { dataTestid, children, ...tdProps } = props;
  return (
    <td data-testid={dataTestid} {...tdProps} className="border px-2 py-1">{ children }</td>
  );
}
