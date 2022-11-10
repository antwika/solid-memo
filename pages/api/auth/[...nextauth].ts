import NextAuth, { NextAuthOptions, LoggerInstance, EventCallbacks } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { JWK, exportJWK, generateKeyPair } from 'jose';
import SolidProvider from '../../../lib/SolidProvider';
import { registerClient } from '@/lib/solid';
import env from '@/lib/env';

type Extra = {
  debug: boolean,
  logger?: Partial<LoggerInstance>,
  events?: Partial<EventCallbacks>,
  idpBaseUrl: string,
  clientId: string,
  clientSecret: string,
  privateKey: JWK,
  publicKey: JWK,
};

export function authOptions(req: NextApiRequest, res: NextApiResponse, extra: Extra): NextAuthOptions {
  return {
    debug: extra.debug,
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      SolidProvider({
        clientId: extra.clientId,
        clientSecret: extra.clientSecret,
      }, {
        idpBaseUrl: extra.idpBaseUrl,
        privateKey: extra.privateKey,
        publicKey: extra.publicKey,
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

        const now = Math.floor(Date.now() / 1000);
        // console.log(`Token expires in ${(token.dpopTokenExpiresAt as number) - now}`);
        // if ((token.dpopTokenExpiresAt as number) < now) {
        //   signOut();
        // }

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
    events: extra.events,
    logger: extra.logger,
  };
}

const customLogger: Partial<LoggerInstance> = {
  error(code, metadata) {
    console.log('[NEXTAUTH ERROR] ', metadata, code);
  },
  warn(code) {
    console.log('[NEXTAUTH WARNING] ', code);
  },
  debug: env.NODE_ENV !== "production" && env.NEXTAUTH_DEBUG === "1" ? (code, metadata) => {
    console.log('[NEXTAUTH DEBUG] ', metadata, code);
  } : undefined,
};

const customEvents: Partial<EventCallbacks> = {
  signIn: (user) => {
    console.log('User successfully signed in:', user.user, 'provider:', user.account!.provider);
  },
  signOut: (token) => {
    console.log('Signing out user:', token.token.webid);
  },
};

let options: { clientId: string, clientSecret: string } | undefined;
let keyPair: { privateKey: JWK, publicKey: JWK } | undefined;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const idpBaseUrl = 'http://localhost:4000'; // Somehow get the webid/idp choice from the client-side

  if (!options) options = await registerClient(idpBaseUrl);
  if (!keyPair) {
    const temp = await generateKeyPair('ES256');
    keyPair = {
      privateKey: await exportJWK(temp.privateKey),
      publicKey: await exportJWK(temp.publicKey),
    };
  }

  const extra: Extra = {
    debug: env.NODE_ENV !== "production" && env.NEXTAUTH_DEBUG === "1",
    logger: customLogger,
    events: customEvents,
    idpBaseUrl: 'http://localhost:4000',
    clientId: options.clientId,
    clientSecret: options.clientSecret,
    privateKey: keyPair.privateKey,
    publicKey: keyPair.publicKey,
  };

  return NextAuth(req, res, authOptions(req, res, extra));
}

export default handler;
