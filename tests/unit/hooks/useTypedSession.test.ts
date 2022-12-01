import { renderHook, cleanup } from '@testing-library/react';
import useWebID from '@/hooks/useWebID';
import * as NextAuthReact from 'next-auth/react';

describe('useWebID', () => {
  afterEach(cleanup);

  it('returns a typed session if parsing succeeded', () => {
    jest.spyOn(NextAuthReact, 'useSession').mockReturnValueOnce({
      data: {
        token: {
          sub: 'sub',
        },
      },
      status: 'authenticated',
    } as any);
    const { result } = renderHook(() => useWebID());
    expect(result.current).toBe('sub');
  });

  it('returns undefined if parsing failed', () => {
    jest.spyOn(NextAuthReact, 'useSession').mockReturnValueOnce({} as any);
    const { result } = renderHook(() => useWebID());
    expect(result.current).toBeUndefined();
  });
});
