import { useSession } from 'next-auth/react';
import { z } from 'zod';

const sessionSchema = z.object({
  status: z.string(),
  data: z.object({
    token: z.object({
      sub: z.string(),
    }),
  }),
});

export default function useTypedSession() {
  const session = useSession();
  try {
    return sessionSchema.parse(session);
  } catch (err) {
    return undefined;
  }
}
