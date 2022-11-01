import { asyncComponent } from "@/lib/hack";

type Props = React.TableHTMLAttributes<HTMLTableElement> & {
  children: React.ReactNode;
};

export default asyncComponent(async function Table(props: Props) {
  const { children } = props;
  return (
    <table {...props} className="table-auto shadow-lg bg-white rounded-lg overflow-hidden">{ children }</table>
  );
})
