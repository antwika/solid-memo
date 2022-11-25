'use client';

import Badge from 'src/ui/Badge';
import useWebID from 'src/hooks/useWebID';
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai';

type Props = {
  dataTestid?: string,
};

export default function SessionBadge({ dataTestid }: Props) {
  const webID = useWebID();

  return (
    <Badge dataTestid={dataTestid} className="text-sm">
      { !webID ? <AiOutlineLock data-testid={`${dataTestid}-icon-lock`} /> : <AiOutlineUnlock data-testid={`${dataTestid}-icon-unlock`} /> }
      <span data-testid={`${dataTestid}-text`} >
        { !webID ? 'Not logged in' : webID }
      </span>
    </Badge>
  );
}
