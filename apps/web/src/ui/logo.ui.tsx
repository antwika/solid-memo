import Image from "next/image";
import { env } from "@lib/env";
import { ensureTrailingSlash } from "@solid-memo/core";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

type Props = {
  size: Size;
};

function Logo({ size }: Props) {
  const { NEXT_PUBLIC_BASE_PATH } = env();
  let pixels;
  switch (size) {
    case "xs":
      pixels = 46;
      break;
    case "sm":
      pixels = 93;
      break;
    case "md":
      pixels = 185;
      break;
    case "lg":
      pixels = 370;
      break;
    case "xl":
      pixels = 740;
      break;
  }

  return (
    <Image
      src={`${ensureTrailingSlash(NEXT_PUBLIC_BASE_PATH)}sm-logo-${size}.png`}
      width={pixels}
      height={pixels}
      alt="Picture of the author"
    />
  );
}

export { Logo };
