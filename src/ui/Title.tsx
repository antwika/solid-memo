'use client';

type Props = {
  dataTestid?: string,
  icon?: React.ReactNode,
  text: string,
}

export default function Title({ dataTestid, icon, text }: Props) {
 return (
  <div data-testid={dataTestid} className="mb-4">
      <div className="flex items-center space-x-1 text-2xl font-bold">
        {icon && <div data-testid={`${dataTestid}-icon`}>{icon}</div>}
        <div data-testid={`${dataTestid}-text`}>{ text }</div>
      </div>
    </div>
  );
};
