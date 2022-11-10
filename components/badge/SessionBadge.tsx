'use client';

import Image from "next/image";
import localFont from '@next/font/local'
import Badge from "@/ui/Badge";
import useWebID from "@/hooks/useWebID";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { signIn, signOut } from "next-auth/react"
import Button from "@/ui/Button";

const myLogoFont = localFont({ src: '../../fonts/PatrickHand-Regular.ttf' })

export default function SessionBadge() {
  const webID = useWebID();

  return (
    <Badge className="text-sm">
      { !webID ? <AiOutlineLock /> : <AiOutlineUnlock /> }
      <span>
        { !webID ? 'Not logged in' : webID }
      </span>
    </Badge>
  );
}
