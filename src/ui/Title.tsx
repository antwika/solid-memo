'use client';

type Props = {
  icon?: React.ReactNode,
  text: string,
}

export default function Title({ icon, text }: Props) {
 return (
  <div className="mb-4">
      <div className="flex items-center space-x-1 text-2xl font-bold">
        {icon && <div>{icon}</div>}
        <div>{ text }</div>
      </div>
    </div>
  );
};
