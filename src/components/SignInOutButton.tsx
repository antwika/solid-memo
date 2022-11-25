'use client';

import useWebID from 'src/hooks/useWebID';
import { signIn, signOut } from 'next-auth/react';
import Button from 'src/ui/Button';

type Props = {
  dataTestid?: string,
}

export default function SignInOutButton({ dataTestid }: Props) {
  const webID = useWebID();

  if (!webID) {
    return <Button dataTestid={dataTestid} onClick={() => signIn()}>Sign in</Button>;
  }

  return <Button dataTestid={dataTestid} onClick={() => signOut()}>Sign out</Button>;
}
