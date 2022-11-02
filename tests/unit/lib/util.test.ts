import { randomRange, wait } from '@/lib/util';

describe('util', () => {
  describe('randomRange', () => {
    beforeEach(() => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.123);
    });
    
    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    })
    
    it('can generate a random number within the expected range 0-1', () => {
      expect(randomRange(0, 1)).toBe(0.123);
    });
    
    it('can generate a random number, within a broad range 0-2', () => {
      expect(randomRange(0, 2)).toBe(0.246);
    });
    
    it('can generate a random number, within a broad range 1-2', () => {
      expect(randomRange(1, 2)).toBe(1.123);
    });
    
    it('can generate a random number, within a broad range 1-3', () => {
      expect(randomRange(1, 3)).toBe(1.246);
    });
  });

  describe('wait', () => {
    it('resolves after some time delay', async () => {
      const hit = jest.fn();
      wait(10).then(() => hit());
      expect(hit).not.toHaveBeenCalled();
      await wait(50);
      expect(hit).toHaveBeenCalled();
    });
  })
});
