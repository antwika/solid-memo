'use client';

type Props = React.ButtonHTMLAttributes<HTMLInputElement> & {
};

export default function TextField(props: Props) {
  return (
    <input
      type="text"
      className="bg-white border-2 border-blue-500 hover:border-blue-700 active:border-blue-900 text-black font-bold py-2 px-4 rounded-lg select-none"
      {...props}
    />
  );
};
