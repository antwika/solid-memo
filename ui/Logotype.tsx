import Image from "next/image";
import localFont from '@next/font/local'
import Link from "./links/Link";

const myLogoFont = localFont({ src: '../fonts/PatrickHand-Regular.ttf' })

export default function Logotype() {
  return (
    <div className="flex items-center space-x-2 p-1 bg-white rounded-md shadow-md">
      <Link uri="/" icon={<Image src="/logo.svg" className="rounded-lg" width="32" height="32" alt="Solid Memo logotype" />} label="Solid Memo" className={`text-xl font-bold ${myLogoFont.className} no-underline`} />
    </div>
  );
}
