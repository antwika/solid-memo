'use client'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button(props: Props) {
  const { children } = props;
  return (
    <button
      {...props}
      className={["bg-blue-500 hover:bg-blue-700 active:bg-blue-900 border-2 border-blue-500 hover:border-blue-700 active:border-blue-900 text-white font-bold py-2 px-4 rounded-lg select-none", props.className].join(' ')}
    >
      { children }
    </button>
  );
}
