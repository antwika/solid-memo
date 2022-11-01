import { asyncComponent } from "@/lib/hack";
import Link from "./Link";

type Props = {
  children?: React.ReactNode,
  className?: string,
};

export default asyncComponent(async function Badge({ children, className }: Props) {
  return (
    <>
      <Link uri="/" className={["text-xl font-bold no-underline", className].join(' ')}>
        {children}
      </Link>
    </>
  );
})
