'use client'

import Anchor from "./Anchor";

type Props = {
  dataTestid?: string,
  className?: string,
  uri: string,
  icon?: React.ReactNode,
  label?: string,
  children?: React.ReactNode,
};

export default function Link({ dataTestid, uri, icon, children, className }: Props) {
  return (
    <div data-testid={dataTestid} className="flex">
      <Anchor dataTestid={`${dataTestid}-anchor`} className="no-select" href={ uri }>
        <div className={["flex items-center space-x-1 underline", className].join(' ')}>
          {icon && <div>{ icon }</div>}
          <div>{children}</div>
        </div>
      </Anchor>
    </div>
  );
}
