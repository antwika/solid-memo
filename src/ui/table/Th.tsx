'use client';

type Props = React.TableHTMLAttributes<HTMLTableCellElement> & {
  dataTestid?: string,
  children: React.ReactNode;
};

export default function Th(props: Props) {
  const { dataTestid, children, ...thProps } = props;
  return (
    <th data-testid={dataTestid} {...thProps} className="bg-blue-500 border text-left px-2 py-1 text-white select-none">{ children }</th>
  );
}
