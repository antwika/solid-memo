import Image from "next/image";
import localFont from '@next/font/local'
import Badge from "src/ui/Badge";

const myLogoFont = localFont({ src: '../../../fonts/PatrickHand-Regular.ttf' })

type Props = {
  dataTestid?: string,
};

export default function SolidMemoBadge({ dataTestid }: Props) {
  return (
    <Badge
      dataTestid={dataTestid}
      className={myLogoFont.className}
    >
      <Image
        data-testid={`${dataTestid}-image`}
        src="/logo.svg"
        className="rounded-lg"
        width="32"
        height="32"
        alt="Solid Memo logotype"
      />
      <span data-testid={`${dataTestid}-text`} className={myLogoFont.className}>Solid Memo</span>
    </Badge>
  );
}
