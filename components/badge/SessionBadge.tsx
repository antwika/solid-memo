'use client';

import Badge from "src/ui/Badge";
import useWebID from "src/hooks/useWebID";
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
