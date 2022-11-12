'use client';

import useWebID from "@/hooks/useWebID";
import { signIn, signOut } from "next-auth/react"
import Button from "src/ui/Button";

export default function SignInOutButton() {
  const webID = useWebID();

  if (!webID) {
    return <Button onClick={() => signIn()}>Sign in</Button>
  }
  
  return <Button onClick={() => signOut()}>Sign out</Button>
}
