import events from '@/pages/api/auth/events';
import logger from '@/pages/api/auth/logger';

jest.mock('@/pages/api/auth/logger');

describe('events', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('logs event upon user sign in', () => {
    const loggerInfoSpy = jest.spyOn(logger, 'info');
    events.signIn!({
      user: {
        id: 'test-user-id',
      },
      account: {
        type: 'oauth',
        provider: 'test-provider',
        providerAccountId: 'test-provider-id',
      },
    });
    expect(loggerInfoSpy).toHaveBeenCalledTimes(1);
    expect(loggerInfoSpy).toHaveBeenCalledWith('User successfully signed in:', { id: 'test-user-id' }, 'provider:', 'test-provider');
  });

  it('logs event upon user sign out', () => {
    const loggerInfoSpy = jest.spyOn(logger, 'info');
    events.signOut!({
      token: {
        webid: 'http://example.com/test/profile/card#me',
      },
    } as any);
    expect(loggerInfoSpy).toHaveBeenCalledTimes(1);
    expect(loggerInfoSpy).toHaveBeenCalledWith('Signing out user:', 'http://example.com/test/profile/card#me');
  });
});
