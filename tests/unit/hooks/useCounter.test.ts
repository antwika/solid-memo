import { renderHook, act } from '@testing-library/react';
import useCounter from '@/hooks/useCounter';

describe('useCounter', () => {
  it('initialize with count "0"', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
