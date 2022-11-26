'use client';

import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth/core/types';
import React from 'react';

interface NextAuthProps {
  dataTestid?: string,
  children: React.ReactNode,
  session?: Session | null;
}

export default function NextAuthSessionProvider({ dataTestid, children, session }: NextAuthProps) {
  return (
    <div data-testid={dataTestid}>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    </div>
  );
}
