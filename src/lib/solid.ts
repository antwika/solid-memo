import axios from 'axios';

export const registerClient = async (idpBaseUrl: string) => {
  if (!process.env.NEXT_PUBLIC_BASE_URL) throw new Error('NEXT_PUBLIC_BASE_URL must be defined');

  const body = {
    client_name: 'Solid Memo',
    application_type: 'web',
    redirect_uris: [new URL('/api/auth/callback/solid', process.env.NEXT_PUBLIC_BASE_URL).toString()],
    subject_type: 'public',
    token_endpoint_auth_method: 'client_secret_basic',
    id_token_signed_response_alg: 'ES256',
    grant_types: ['authorization_code', 'refresh_token'],
  };

  const response = await axios.post(new URL('.oidc/reg', idpBaseUrl).toString(), body, {
    headers: { 'Content-Type': 'application/json' },
  });

  const options = {
    clientId: response.data.client_id,
    clientSecret: response.data.client_secret,
  };

  return options;
};
