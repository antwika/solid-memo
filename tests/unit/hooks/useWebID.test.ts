import { renderHook, act, cleanup } from '@testing-library/react'
import useCounter from '@/hooks/useCounter'
import useWebID from "@/hooks/useWebID";
import * as NextAuthReact from "next-auth/react"

describe('useWebID', () => {
  afterEach(cleanup);

  it('returns undefined when session is "unauthenticated"', () => {
    jest.spyOn(NextAuthReact, 'useSession').mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });
    const { result } = renderHook(() => useWebID())
    expect(result.current).toBeUndefined();
  });

  it('returns undefined when session is "loading"', () => {
    jest.spyOn(NextAuthReact, 'useSession').mockReturnValueOnce({
      data: null,
      status: "loading",
    });
    const { result } = renderHook(() => useWebID())
    expect(result.current).toBeUndefined();
  });

  it('return the WebID when session is "authenticated"', () => {
    jest.spyOn(NextAuthReact, 'useSession').mockReturnValueOnce({
      data: {
        webid: 'http://example.com/test/profile/card#me',
        expires: new Date().toISOString(),
      } as any,
      status: "authenticated",
    });
    const { result } = renderHook(() => useWebID())
    expect(result.current).toBe('http://example.com/test/profile/card#me')
  });
});