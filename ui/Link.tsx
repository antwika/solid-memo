import { asyncComponent } from "@/lib/hack";
import Anchor from "./Anchor";

type Props = {
  className?: string,
  uri: string,
  icon?: React.ReactNode,
  label?: string,
  children?: React.ReactNode,
};

export default asyncComponent(async function Link(props: Props) {
  return (
    <div className="flex">
      <Anchor className="no-select" href={ props.uri }>
        <div className={["flex items-center space-x-1 underline", props.className].join(' ')}>
          {props.icon && <div>{ props.icon }</div>}
          {props.label && <div>{ props.label }</div>}
        </div>
        {props.children}
      </Anchor>
    </div>
  );
})
