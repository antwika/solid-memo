type Props = React.TableHTMLAttributes<HTMLTableCellElement> & {
  children: React.ReactNode;
};

export default function TableTh(props: Props) {
  const { children } = props;
  return (
    <th {...props} className="bg-blue-500 border text-left px-4 py-2 text-white select-none">{ children }</th>
  );
}
