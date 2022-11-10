import { JWK, exportJWK, generateKeyPair } from 'jose';
import type { OAuthConfig, OAuthUserConfig } from 'next-auth/providers';

export interface SolidProfile extends Record<string, any> {
  sub: string;
  aud: string;
  webid: string;
  iss: string;
  azp: string;
  iat: number;
  exp: number;
  name: string;
  email: string;
}

const idpBaseUrl = 'http://localhost:4000';

type Extra = {
  privateKey: JWK;
  publicKey: JWK;
};

export default function SolidProvider<P extends SolidProfile>(
  options: OAuthUserConfig<P>,
  extra: Extra,
): OAuthConfig<P> {
  return {
    id: 'solid',
    name: 'Solid',
    type: 'oauth',
    wellKnown: new URL('.well-known/openid-configuration', idpBaseUrl).toString(),
    authorization: { params: { grant_type: 'authorization_code', scope: 'openid offline_access webid' } },
    idToken: true,
    checks: ['pkce', 'state'], // TODO: Is "state" useful?
    client: {
      authorization_signed_response_alg: 'ES256',
      id_token_signed_response_alg: 'ES256',
    },
    token: {
      url: new URL('.oidc/token', idpBaseUrl).toString(),
      async request({ params, checks, client, provider }) {
        const tokens = await client.grant(
          {
            grant_type: 'authorization_code',
            code: params.code,
            redirect_uri: provider.callbackUrl,
            code_verifier: checks.code_verifier,
          },
          {
            DPoP: { key: extra.privateKey, format: 'jwk' },
          },
        );

        tokens.keys = {
          privateKey: extra.privateKey,
          publicKey: extra.publicKey,
        };

        return { tokens };
      },
    },
    profile(profile) {
      return {
        id: profile.sub,
        webid: profile.sub,
        name: profile.name,
        email: profile.email,
        sub: profile.sub,
        aud: profile.aud,
        iss: profile.iss,
        azp: profile.azp,
        iat: profile.iat,
        exp: profile.exp,
      };
    },
    options,
  };
}
