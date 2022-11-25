import type { OAuthConfig, OAuthUserConfig } from 'next-auth/providers';

export interface SolidProfile extends Record<string, any> {
  sub: string;
  aud: string;
  webid: string;
  iss: string;
  azp: string;
  iat: number;
  exp: number;
}

export interface SolidProviderOptions<P> extends OAuthUserConfig<P> {
  idpBaseUrl: string,
}

export default function SolidProvider<P extends SolidProfile>(
  options: SolidProviderOptions<P>,
): OAuthConfig<P> {
  return {
    id: 'solid',
    name: 'Solid',
    type: 'oauth',
    wellKnown: new URL('.well-known/openid-configuration', options.idpBaseUrl).toString(),
    authorization: { params: { grant_type: 'authorization_code', scope: 'openid offline_access webid' } },
    idToken: true,
    checks: ['pkce'],
    client: {
      authorization_signed_response_alg: 'ES256',
      id_token_signed_response_alg: 'ES256',
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
