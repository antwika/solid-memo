import NextAuth, { NextAuthOptions } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { JWK, exportJWK, generateKeyPair } from 'jose';
import SolidProvider from '../../../lib/SolidProvider';
import axios from 'axios';

const baseUrl = 'http://localhost:3000';
const idpBaseUrl = 'http://localhost:4000';

export function registerCredentials() {
  console.log('Registering new application credentials.');

  const options = { clientId: '', clientSecret: '' };
  const body = {
    client_name: 'Solid Memo',
    application_type: 'web',
    redirect_uris: [new URL('/api/auth/callback/solid', baseUrl).toString()],
    subject_type: 'public',
    token_endpoint_auth_method: 'client_secret_basic',
    id_token_signed_response_alg: 'ES256',
    grant_types: ['authorization_code', 'refresh_token'],
  };

  console.log('Preparing application credentials registration.', body);

  const response = fetch(new URL('.oidc/reg', idpBaseUrl), {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then(
      (json) => {
        options.clientId = json.client_id;
        options.clientSecret = json.client_secret;

        return options;
      },
      (error) => {
        console.log('Failed to register application credentials with IDP.', error);
      },
    );
  return options;
}

const register = async () => {
  const body = {
    client_name: 'Solid Memo',
    application_type: 'web',
    redirect_uris: [new URL('/api/auth/callback/solid', baseUrl).toString()],
    subject_type: 'public',
    token_endpoint_auth_method: 'client_secret_basic',
    id_token_signed_response_alg: 'ES256',
    grant_types: ['authorization_code', 'refresh_token'],
  };

  const response = await axios(new URL('.oidc/reg', idpBaseUrl).toString(), {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    data: body,
  });
  
  const options = {
    clientId: response.data.client_id,
    clientSecret: response.data.client_secret,
  };

  console.log('Returning options:', options);

  return options;
};

type Extra = {
  options: any,
  privateKey: JWK,
  publicKey: JWK,
};

export function authOptions(req: NextApiRequest, res: NextApiResponse, extra: Extra): NextAuthOptions {
  return {
    debug: process.env.NODE_ENV !== 'production',
    providers: [SolidProvider(extra.options, {
      privateKey: extra.privateKey,
      publicKey: extra.publicKey,
    })],
    callbacks: {
      async jwt({ token, account }) {
        token.webid = token.sub;

        // Login?
        if (account) {
          token.dpopToken = account.access_token;
          token.dpopTokenExpiresAt = account.expires_at;
          token.keys = account.keys;
        }

        // Check if token has expired
        const now = Math.floor(Date.now() / 1000);
        console.log(`Token expires in ${(token.dpopTokenExpiresAt as number) - now}`);
        // if ((token.dpopTokenExpiresAt as number) < now) {
        //   signOut();
        // }

        return token;
      },
      async session({ session, token, user }) {
        console.log('session callback, session:', session);
        console.log('session callback, token:', token);
        console.log('session callback, user:', user);
        session.user = user;

        if (token.webid) {
          (session as any).webid = token.webid as string;
        }

        return session;
      },
    },
    events: {
      signIn: (user) => {
        console.log('User successfully signed in:', user.user, 'provider:', user.account!.provider);
      },
      signOut: (token) => {
        console.log('Signing out user:', token.token.webid);
      },
    },
    logger: {
      error(code, metadata) {
        console.log('An error:', metadata, code);
      },
      warn(code) {
        console.log('A warning:', code);
      },
      debug(code, metadata) {
        console.log('A debug:', metadata, code);
      },
    },
  };
}

let options: { clientId: string, clientSecret: string } | undefined;
let keyPair: { privateKey: JWK, publicKey: JWK } | undefined;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!options) options = await register();
  if (!keyPair) {
    console.log('\n\n\nGenerating key pair\n\n\n');
    const temp = await generateKeyPair('ES256');
    keyPair = {
      privateKey: await exportJWK(temp.privateKey),
      publicKey: await exportJWK(temp.publicKey),
    };
  }

  return NextAuth(req, res, authOptions(req, res, { options, privateKey: keyPair.privateKey, publicKey: keyPair.publicKey }));
}

export default handler;
