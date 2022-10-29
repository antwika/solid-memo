type Props = React.TableHTMLAttributes<HTMLTableCellElement> & {
  children: React.ReactNode;
};

export default function TableTd(props: Props) {
  const { children } = props;
  return (
    <td {...props} className="border px-4 py-2">{ children }</td>
  );
}
