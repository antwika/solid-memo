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

export default function SolidProvider<P extends SolidProfile>(options: OAuthUserConfig<P>): OAuthConfig<P> {
  let privateKey: JWK;
  let publicKey: JWK;

  generateKeyPair('ES256').then((kp) =>
    Promise.all([
      exportJWK(kp.privateKey).then((key) => (privateKey = key)),
      exportJWK(kp.publicKey).then((key) => (publicKey = key)),
    ]),
  );

  return {
    id: 'solid',
    name: 'Solid',
    type: 'oauth',
    wellKnown: `${process.env.NEXT_PUBLIC_IDP_BASE_URL}.well-known/openid-configuration`,
    authorization: { params: { grant_type: 'authorization_code', scope: 'openid offline_access webid' } },
    idToken: true,
    checks: ['pkce', 'state'], // TODO: Is "state" useful?
    client: {
      authorization_signed_response_alg: 'ES256',
      id_token_signed_response_alg: 'ES256',
    },
    token: {
      url: `${process.env.NEXT_PUBLIC_IDP_BASE_URL}.oidc/token`,
      async request({ params, checks, client, provider }) {
        // Request a bearer token, default behaviour.
        // const tokens = await client.grant({
        //   grant_type: "authorization_code",
        //   code: params.code,
        //   redirect_uri: provider.callbackUrl,
        //   code_verifier: checks.code_verifier,
        // });

        // Request DPoP token.
        const tokens = await client.grant(
          {
            grant_type: 'authorization_code',
            code: params.code,
            redirect_uri: provider.callbackUrl,
            code_verifier: checks.code_verifier,
          },
          {
            DPoP: { key: privateKey, format: 'jwk' },
          },
        );

        tokens.keys = {
          privateKey,
          publicKey,
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
