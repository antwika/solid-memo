import { asyncComponent } from "@/lib/hack";

type Props = React.TableHTMLAttributes<HTMLTableCellElement> & {
  children: React.ReactNode;
};

export default asyncComponent(async function Th(props: Props) {
  const { children } = props;
  return (
    <th {...props} className="bg-blue-500 border text-left px-2 py-1 text-white select-none">{ children }</th>
  );
})
