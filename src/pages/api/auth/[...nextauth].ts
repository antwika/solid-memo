import NextAuth, { NextAuthOptions, LoggerInstance, EventCallbacks } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import SolidProvider from '../../../lib/SolidProvider';
import logger from './logger';
import events from './events';
import { lazyRegisterClient } from './register';
import { getServerEnv } from 'src/lib/env';

export type NextAuthOptionsExtraParams = {
  debug: boolean,
  logger?: Partial<LoggerInstance>,
  events?: Partial<EventCallbacks>,
  idpBaseUrl: string,
  clientId: string,
  clientSecret: string,
};

export function createNextAuthOptions(extra: NextAuthOptionsExtraParams): NextAuthOptions {
  const { debug, idpBaseUrl, clientId, clientSecret, events, logger } = extra;
  return {
    debug,
    secret: getServerEnv().NEXTAUTH_SECRET,
    providers: [
      SolidProvider({
        idpBaseUrl,
        clientId,
        clientSecret,
      })
    ],
    callbacks: {
      async jwt({ token, account }) {
        token.webid = token.sub;

        if (account) {
          token.dpopToken = account.access_token;
          token.dpopTokenExpiresAt = account.expires_at;
          token.keys = account.keys;
        }

        return token;
      },
      async session({ session, token, user }) {
        session.user = user;

        if (token.webid) {
          (session as any).webid = token.webid as string;
        }

        return session;
      },
    },
    events,
    logger,
  };
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const idpBaseUrl = 'http://localhost:4000'; // TODO: Somehow get the webid/idp choice from the client-side

  const { clientId, clientSecret } = await lazyRegisterClient(idpBaseUrl);

  return NextAuth(req, res, createNextAuthOptions({
    debug: getServerEnv().NODE_ENV !== "production" && getServerEnv().NEXTAUTH_DEBUG === "1",
    logger,
    events,
    idpBaseUrl,
    clientId,
    clientSecret,
  }));
}

export default handler;
