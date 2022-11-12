import axios from 'axios';
import { getClientEnv } from 'src/lib/env';

export const registerClient = async (idpBaseUrl: string) => {
  const body = {
    client_name: 'Solid Memo',
    application_type: 'web',
    redirect_uris: [new URL('/api/auth/callback/solid', getClientEnv().NEXT_PUBLIC_BASE_URL).toString()],
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
