import SolidProvider from "@/lib/SolidProvider";

describe('SolidProvider', () => {
  it('tests', () => {
    const oauthConfig = SolidProvider({
      idpBaseUrl: 'http://test.idp.example.com',
      clientId: 'test client id',
      clientSecret: 'test client secret',
    });

    expect(oauthConfig).toStrictEqual({
      authorization: {
        params: {
          grant_type: "authorization_code",
          scope: "openid offline_access webid",
        },
      },
      checks: [
        'pkce',
      ],
      client: {
        authorization_signed_response_alg: "ES256",
        id_token_signed_response_alg: "ES256",
      },
      id: "solid",
      idToken: true,
      name: "Solid",
      options: {
        clientId: "test client id",
        clientSecret: "test client secret",
        idpBaseUrl: "http://test.idp.example.com",
      },
      profile: expect.any(Function),
      type: "oauth",
      wellKnown: "http://test.idp.example.com/.well-known/openid-configuration",
    });

    const user = oauthConfig.profile({
      sub: 'test sub',
      aud: 'test aud',
      webid: 'test webid',
      iss: 'test iss',
      azp: 'test azp',
      iat: 111,
      exp: 222,
    }, {});

    expect(user).toStrictEqual({
      aud: 'test aud',
      azp: 'test azp',
      email: undefined,
      exp: 222,
      iat: 111,
      id: 'test sub',
      iss: 'test iss',
      name: undefined,
      sub: 'test sub',
      webid: 'test sub',
    });
  });
});
