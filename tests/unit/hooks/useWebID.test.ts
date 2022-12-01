import { renderHook, cleanup } from '@testing-library/react';
import useWebID from '@/hooks/useWebID';
import * as useTypedSession from '@/hooks/useTypedSession';

jest.mock('@/hooks/useTypedSession');

describe('useWebID', () => {
  let useTypedSessionSpy: jest.SpyInstance<any, []>;

  beforeEach(() => {
    useTypedSessionSpy = jest.spyOn(useTypedSession, 'default');
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('returns undefined when session is undefined', () => {
    useTypedSessionSpy.mockReturnValue(undefined);
    const { result } = renderHook(() => useWebID());
    expect(result.current).toBeUndefined();
  });

  it('returns the token webid when session exists', () => {
    useTypedSessionSpy.mockReturnValue({
      data: {
        token: {
          sub: 'webid',
        },
      },
      status: 'authenticated',
    });
    const { result } = renderHook(() => useWebID());
    expect(result.current).toBe('webid');
  });
});
