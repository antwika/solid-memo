'use client';

import Badge from "@/ui/Badge";
import useWebID from "@/hooks/useWebID";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";

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
