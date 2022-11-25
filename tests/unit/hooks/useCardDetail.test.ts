import { renderHook, act, cleanup } from '@testing-library/react'
import useCardDetail from "@/hooks/useCardDetail";
import * as useSWR from "swr";
import * as n3 from "n3";

jest.mock('swr');

var mockParse = jest.fn();
var mockGetObjects = jest.fn();

jest.mock('n3', () => ({
  Parser: jest.fn(),
  Store: jest.fn(),
}));

describe('useCardDetail', () => {
  beforeEach(() => {
    const useSWRSpy = jest.spyOn(useSWR, 'default');
    useSWRSpy.mockReturnValue({ data: 'hello' } as any);
    
    const parserSpy = jest.spyOn(n3, 'Parser');
    parserSpy.mockImplementation(() => ({ parse: mockParse }))

    const storeSpy = jest.spyOn(n3, 'Store');
    storeSpy.mockImplementation(() => ({ getObjects: mockGetObjects } as any))
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    cleanup();
  });

  it('fetches and parses card detail from iri', () => {
    mockGetObjects.mockReturnValue([{ value: '123' }]);

    jest.spyOn(useSWR, 'default').mockReturnValueOnce({ data: 'world' } as any);
    const { result } = renderHook(() => useCardDetail('https://test.example.com'))
    expect(result.current.cardDetail).toStrictEqual({
      repetition: 123,
      ease: 123,
      interval: 123,
      front: '123',
      back: '123',
    });
  });

  it('does not attempt to parse if data fetching is incomplete', () => {
    const useSWRSpy = jest.spyOn(useSWR, 'default');
    useSWRSpy.mockReturnValue({ data: undefined } as any);

    const { result } = renderHook(() => useCardDetail('https://test.example.com'))
    expect(result.current.cardDetail).toBeUndefined();
  });
});
