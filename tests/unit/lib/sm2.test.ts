import { sm2 } from 'src/lib/sm2';

describe('sm2', () => {
  describe('computes the correct outputs', () => {
    // Card first seen (repetitions 0)
    it.each([
      { input: { grade: 0, repetition: 0, ease: 2.5, interval: 1 }, expected: { repetition: 0, ease: 1.70, interval: 1 } },
      { input: { grade: 0, repetition: 0, ease: 2.5, interval: 2 }, expected: { repetition: 0, ease: 1.70, interval: 1 } },
      { input: { grade: 0, repetition: 0, ease: 2.5, interval: 3 }, expected: { repetition: 0, ease: 1.70, interval: 1 } },
      { input: { grade: 0, repetition: 0, ease: 2.5, interval: 4 }, expected: { repetition: 0, ease: 1.70, interval: 1 } },
      { input: { grade: 0, repetition: 0, ease: 2.5, interval: 5 }, expected: { repetition: 0, ease: 1.70, interval: 1 } },

      { input: { grade: 1, repetition: 0, ease: 2.5, interval: 1 }, expected: { repetition: 0, ease: 1.96, interval: 1 } },
      { input: { grade: 1, repetition: 0, ease: 2.5, interval: 2 }, expected: { repetition: 0, ease: 1.96, interval: 1 } },
      { input: { grade: 1, repetition: 0, ease: 2.5, interval: 3 }, expected: { repetition: 0, ease: 1.96, interval: 1 } },
      { input: { grade: 1, repetition: 0, ease: 2.5, interval: 4 }, expected: { repetition: 0, ease: 1.96, interval: 1 } },
      { input: { grade: 1, repetition: 0, ease: 2.5, interval: 5 }, expected: { repetition: 0, ease: 1.96, interval: 1 } },

      { input: { grade: 2, repetition: 0, ease: 2.5, interval: 1 }, expected: { repetition: 0, ease: 2.18, interval: 1 } },
      { input: { grade: 2, repetition: 0, ease: 2.5, interval: 2 }, expected: { repetition: 0, ease: 2.18, interval: 1 } },
      { input: { grade: 2, repetition: 0, ease: 2.5, interval: 3 }, expected: { repetition: 0, ease: 2.18, interval: 1 } },
      { input: { grade: 2, repetition: 0, ease: 2.5, interval: 4 }, expected: { repetition: 0, ease: 2.18, interval: 1 } },
      { input: { grade: 2, repetition: 0, ease: 2.5, interval: 5 }, expected: { repetition: 0, ease: 2.18, interval: 1 } },

      { input: { grade: 3, repetition: 0, ease: 2.5, interval: 1 }, expected: { repetition: 1, ease: 2.36, interval: 1 } },
      { input: { grade: 3, repetition: 0, ease: 2.5, interval: 2 }, expected: { repetition: 1, ease: 2.36, interval: 1 } },
      { input: { grade: 3, repetition: 0, ease: 2.5, interval: 3 }, expected: { repetition: 1, ease: 2.36, interval: 1 } },
      { input: { grade: 3, repetition: 0, ease: 2.5, interval: 4 }, expected: { repetition: 1, ease: 2.36, interval: 1 } },
      { input: { grade: 3, repetition: 0, ease: 2.5, interval: 5 }, expected: { repetition: 1, ease: 2.36, interval: 1 } },

      { input: { grade: 4, repetition: 0, ease: 2.5, interval: 1 }, expected: { repetition: 1, ease: 2.50, interval: 1 } },
      { input: { grade: 4, repetition: 0, ease: 2.5, interval: 2 }, expected: { repetition: 1, ease: 2.50, interval: 1 } },
      { input: { grade: 4, repetition: 0, ease: 2.5, interval: 3 }, expected: { repetition: 1, ease: 2.50, interval: 1 } },
      { input: { grade: 4, repetition: 0, ease: 2.5, interval: 4 }, expected: { repetition: 1, ease: 2.50, interval: 1 } },
      { input: { grade: 4, repetition: 0, ease: 2.5, interval: 5 }, expected: { repetition: 1, ease: 2.50, interval: 1 } },

      { input: { grade: 5, repetition: 0, ease: 2.5, interval: 1 }, expected: { repetition: 1, ease: 2.60, interval: 1 } },
      { input: { grade: 5, repetition: 0, ease: 2.5, interval: 2 }, expected: { repetition: 1, ease: 2.60, interval: 1 } },
      { input: { grade: 5, repetition: 0, ease: 2.5, interval: 3 }, expected: { repetition: 1, ease: 2.60, interval: 1 } },
      { input: { grade: 5, repetition: 0, ease: 2.5, interval: 4 }, expected: { repetition: 1, ease: 2.60, interval: 1 } },
      { input: { grade: 5, repetition: 0, ease: 2.5, interval: 5 }, expected: { repetition: 1, ease: 2.60, interval: 1 } },

      // Card seen again (repetitions 1)
      { input: { grade: 0, repetition: 1, ease: 2.5, interval: 1 }, expected: { repetition: 0, ease: 1.70, interval: 1 } },
      { input: { grade: 0, repetition: 1, ease: 2.5, interval: 2 }, expected: { repetition: 0, ease: 1.70, interval: 1 } },
      { input: { grade: 0, repetition: 1, ease: 2.5, interval: 3 }, expected: { repetition: 0, ease: 1.70, interval: 1 } },
      { input: { grade: 0, repetition: 1, ease: 2.5, interval: 4 }, expected: { repetition: 0, ease: 1.70, interval: 1 } },
      { input: { grade: 0, repetition: 1, ease: 2.5, interval: 5 }, expected: { repetition: 0, ease: 1.70, interval: 1 } },

      { input: { grade: 1, repetition: 1, ease: 2.5, interval: 1 }, expected: { repetition: 0, ease: 1.96, interval: 1 } },
      { input: { grade: 1, repetition: 1, ease: 2.5, interval: 2 }, expected: { repetition: 0, ease: 1.96, interval: 1 } },
      { input: { grade: 1, repetition: 1, ease: 2.5, interval: 3 }, expected: { repetition: 0, ease: 1.96, interval: 1 } },
      { input: { grade: 1, repetition: 1, ease: 2.5, interval: 4 }, expected: { repetition: 0, ease: 1.96, interval: 1 } },
      { input: { grade: 1, repetition: 1, ease: 2.5, interval: 5 }, expected: { repetition: 0, ease: 1.96, interval: 1 } },

      { input: { grade: 2, repetition: 1, ease: 2.5, interval: 1 }, expected: { repetition: 0, ease: 2.18, interval: 1 } },
      { input: { grade: 2, repetition: 1, ease: 2.5, interval: 2 }, expected: { repetition: 0, ease: 2.18, interval: 1 } },
      { input: { grade: 2, repetition: 1, ease: 2.5, interval: 3 }, expected: { repetition: 0, ease: 2.18, interval: 1 } },
      { input: { grade: 2, repetition: 1, ease: 2.5, interval: 4 }, expected: { repetition: 0, ease: 2.18, interval: 1 } },
      { input: { grade: 2, repetition: 1, ease: 2.5, interval: 5 }, expected: { repetition: 0, ease: 2.18, interval: 1 } },

      { input: { grade: 3, repetition: 1, ease: 2.5, interval: 1 }, expected: { repetition: 2, ease: 2.36, interval: 6 } },
      { input: { grade: 3, repetition: 1, ease: 2.5, interval: 2 }, expected: { repetition: 2, ease: 2.36, interval: 6 } },
      { input: { grade: 3, repetition: 1, ease: 2.5, interval: 3 }, expected: { repetition: 2, ease: 2.36, interval: 6 } },
      { input: { grade: 3, repetition: 1, ease: 2.5, interval: 4 }, expected: { repetition: 2, ease: 2.36, interval: 6 } },
      { input: { grade: 3, repetition: 1, ease: 2.5, interval: 5 }, expected: { repetition: 2, ease: 2.36, interval: 6 } },

      { input: { grade: 4, repetition: 1, ease: 2.5, interval: 1 }, expected: { repetition: 2, ease: 2.50, interval: 6 } },
      { input: { grade: 4, repetition: 1, ease: 2.5, interval: 2 }, expected: { repetition: 2, ease: 2.50, interval: 6 } },
      { input: { grade: 4, repetition: 1, ease: 2.5, interval: 3 }, expected: { repetition: 2, ease: 2.50, interval: 6 } },
      { input: { grade: 4, repetition: 1, ease: 2.5, interval: 4 }, expected: { repetition: 2, ease: 2.50, interval: 6 } },
      { input: { grade: 4, repetition: 1, ease: 2.5, interval: 5 }, expected: { repetition: 2, ease: 2.50, interval: 6 } },

      { input: { grade: 5, repetition: 1, ease: 2.5, interval: 1 }, expected: { repetition: 2, ease: 2.60, interval: 6 } },
      { input: { grade: 5, repetition: 1, ease: 2.5, interval: 2 }, expected: { repetition: 2, ease: 2.60, interval: 6 } },
      { input: { grade: 5, repetition: 1, ease: 2.5, interval: 3 }, expected: { repetition: 2, ease: 2.60, interval: 6 } },
      { input: { grade: 5, repetition: 1, ease: 2.5, interval: 4 }, expected: { repetition: 2, ease: 2.60, interval: 6 } },
      { input: { grade: 5, repetition: 1, ease: 2.5, interval: 5 }, expected: { repetition: 2, ease: 2.60, interval: 6 } },

      // Card seen again (repetitions 2)
      { input: { grade: 0, repetition: 2, ease: 2.5, interval: 1 }, expected: { repetition: 0, ease: 1.70, interval: 1 } },
      { input: { grade: 0, repetition: 2, ease: 2.5, interval: 2 }, expected: { repetition: 0, ease: 1.70, interval: 1 } },
      { input: { grade: 0, repetition: 2, ease: 2.5, interval: 3 }, expected: { repetition: 0, ease: 1.70, interval: 1 } },
      { input: { grade: 0, repetition: 2, ease: 2.5, interval: 4 }, expected: { repetition: 0, ease: 1.70, interval: 1 } },
      { input: { grade: 0, repetition: 2, ease: 2.5, interval: 5 }, expected: { repetition: 0, ease: 1.70, interval: 1 } },

      { input: { grade: 1, repetition: 2, ease: 2.5, interval: 1 }, expected: { repetition: 0, ease: 1.96, interval: 1 } },
      { input: { grade: 1, repetition: 2, ease: 2.5, interval: 2 }, expected: { repetition: 0, ease: 1.96, interval: 1 } },
      { input: { grade: 1, repetition: 2, ease: 2.5, interval: 3 }, expected: { repetition: 0, ease: 1.96, interval: 1 } },
      { input: { grade: 1, repetition: 2, ease: 2.5, interval: 4 }, expected: { repetition: 0, ease: 1.96, interval: 1 } },
      { input: { grade: 1, repetition: 2, ease: 2.5, interval: 5 }, expected: { repetition: 0, ease: 1.96, interval: 1 } },

      { input: { grade: 2, repetition: 2, ease: 2.5, interval: 1 }, expected: { repetition: 0, ease: 2.18, interval: 1 } },
      { input: { grade: 2, repetition: 2, ease: 2.5, interval: 2 }, expected: { repetition: 0, ease: 2.18, interval: 1 } },
      { input: { grade: 2, repetition: 2, ease: 2.5, interval: 3 }, expected: { repetition: 0, ease: 2.18, interval: 1 } },
      { input: { grade: 2, repetition: 2, ease: 2.5, interval: 4 }, expected: { repetition: 0, ease: 2.18, interval: 1 } },
      { input: { grade: 2, repetition: 2, ease: 2.5, interval: 5 }, expected: { repetition: 0, ease: 2.18, interval: 1 } },

      { input: { grade: 3, repetition: 2, ease: 2.5, interval: 1 }, expected: { repetition: 3, ease: 2.36, interval: 3 } },
      { input: { grade: 3, repetition: 2, ease: 2.5, interval: 2 }, expected: { repetition: 3, ease: 2.36, interval: 5 } },
      { input: { grade: 3, repetition: 2, ease: 2.5, interval: 3 }, expected: { repetition: 3, ease: 2.36, interval: 8 } },
      { input: { grade: 3, repetition: 2, ease: 2.5, interval: 4 }, expected: { repetition: 3, ease: 2.36, interval: 10 } },
      { input: { grade: 3, repetition: 2, ease: 2.5, interval: 5 }, expected: { repetition: 3, ease: 2.36, interval: 13 } },

      { input: { grade: 4, repetition: 2, ease: 2.5, interval: 1 }, expected: { repetition: 3, ease: 2.50, interval: 3 } },
      { input: { grade: 4, repetition: 2, ease: 2.5, interval: 2 }, expected: { repetition: 3, ease: 2.50, interval: 5 } },
      { input: { grade: 4, repetition: 2, ease: 2.5, interval: 3 }, expected: { repetition: 3, ease: 2.50, interval: 8 } },
      { input: { grade: 4, repetition: 2, ease: 2.5, interval: 4 }, expected: { repetition: 3, ease: 2.50, interval: 10 } },
      { input: { grade: 4, repetition: 2, ease: 2.5, interval: 5 }, expected: { repetition: 3, ease: 2.50, interval: 13 } },

      { input: { grade: 5, repetition: 2, ease: 2.5, interval: 1 }, expected: { repetition: 3, ease: 2.60, interval: 3 } },
      { input: { grade: 5, repetition: 2, ease: 2.5, interval: 2 }, expected: { repetition: 3, ease: 2.60, interval: 5 } },
      { input: { grade: 5, repetition: 2, ease: 2.5, interval: 3 }, expected: { repetition: 3, ease: 2.60, interval: 8 } },
      { input: { grade: 5, repetition: 2, ease: 2.5, interval: 4 }, expected: { repetition: 3, ease: 2.60, interval: 10 } },
      { input: { grade: 5, repetition: 2, ease: 2.5, interval: 5 }, expected: { repetition: 3, ease: 2.60, interval: 13 } },
    ])('computes $input to be $expected', ({ input, expected }) => {
      const result = sm2(input);
      expect(result.repetition).toBe(expected.repetition);
      expect(result.ease).toBeCloseTo(expected.ease);
      expect(result.interval).toBe(expected.interval);
    });
  });

  describe('ease factor', () => {
    it('does not allow ease factor to fall below 1.3', () => {
      const result = sm2({ grade: 0, repetition: 0, ease: 1.3, interval: 1 });
      expect(result.ease).toBeCloseTo(1.3);
    });
  });
});
