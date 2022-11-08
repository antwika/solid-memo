type Sm2Args = {
  grade: number,
  repetition: number,
  ease: number,
  interval: number,
};

export const sm2 = ({ grade, repetition, ease, interval }: Sm2Args) => {
  if (grade >= 3) {
    if (repetition === 0) {
      interval = 1;
    } else if (repetition === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * ease)
    }
    repetition += 1;
  } else {
    repetition = 0;
    interval = 1;
  }

  ease = ease + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  ease = +ease.toFixed(2);

  if (ease < 1.3) {
    ease = 1.3;
  }

  return { repetition, ease, interval };
}
