import { fetcher } from "@/lib/swr";

global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve('result'),
  })
) as jest.Mock;

describe('swr', () => {
  describe('fetcher', () => {
    it('tests', async () => {
      const result = await fetcher('http://test.url');
      expect(result).toBeDefined();
      expect(result).toBe('result');
    });
  });
});
