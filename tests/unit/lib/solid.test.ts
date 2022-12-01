import axios from 'axios';
import { registerClient } from '@/lib/solid';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('src/lib/env', () => ({
  getClientEnv: () => ({ NEXT_PUBLIC_BASE_URL: 'http://test.example.com' }),
}));

describe('solid', () => {
  it('tests', async () => {
    mockedAxios.post.mockResolvedValue({ data: { client_id: 'a', client_secret: 'b' } });
    const client = await registerClient('http://test.idp.example.com');
    expect(mockedAxios.post).toHaveBeenCalledWith('http://test.idp.example.com/.oidc/reg', {
      application_type: 'web',
      client_name: 'Solid Memo',
      grant_types: ['authorization_code', 'refresh_token'],
      id_token_signed_response_alg: 'ES256',
      redirect_uris: ['http://test.example.com/api/auth/callback/solid'],
      subject_type: 'public',
      token_endpoint_auth_method: 'client_secret_basic',
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    expect(client).toStrictEqual({ clientId: 'a', clientSecret: 'b' });
  });
});
