import { useSession } from "next-auth/react"

export default function useWebID() {
  const session = useSession();
  if (session && session.status === 'authenticated') {
    return (session.data as any).webid;
  }
  return undefined;
}
