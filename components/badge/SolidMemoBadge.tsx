import Image from "next/image";
import localFont from '@next/font/local'
import { asyncComponent } from "@/lib/hack";
import Badge from "@/ui/Badge";

const myLogoFont = localFont({ src: '../../fonts/PatrickHand-Regular.ttf' })

export default asyncComponent(async function SolidMemoBadge() {
  return (
    <Badge
      className={myLogoFont.className}
    >
      <div className="flex items-center space-x-2 p-1 bg-white rounded-md shadow-md">
        <Image
          src="/logo.svg"
          className="rounded-lg"
          width="32"
          height="32"
          alt="Solid Memo logotype"
        />
        <span className={myLogoFont.className}>Solid Memo</span>
      </div>
    </Badge>
  );
})
