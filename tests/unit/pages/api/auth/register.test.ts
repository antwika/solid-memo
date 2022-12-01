import * as solid from 'src/lib/solid';
import { lazyRegisterClient } from '@/pages/api/auth/register';

jest.mock('src/lib/solid');

describe('register', () => {
  describe('lazyRegisterClient', () => {
    it('registers, remembers and always return the first registered client', async () => {
      const registerClientSpy = jest.spyOn(solid, 'registerClient');
      registerClientSpy.mockResolvedValueOnce({ clientId: 'foo', clientSecret: 'bar' });
      registerClientSpy.mockResolvedValueOnce({ clientId: 'never', clientSecret: 'happens' });
      const client1 = await lazyRegisterClient('http://example.idp.com');
      const client2 = await lazyRegisterClient('http://example.idp.com');
      expect(client1).toStrictEqual({ clientId: 'foo', clientSecret: 'bar' });
      expect(client2).toStrictEqual({ clientId: 'foo', clientSecret: 'bar' });
      expect(registerClientSpy).toHaveBeenCalledTimes(1);
    });
  });
});
