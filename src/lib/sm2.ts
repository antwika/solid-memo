type Sm2Args = {
  grade: number,
  repetition: number,
  ease: number,
  interval: number,
};

export const sm2 = ({
  grade,
  repetition,
  ease,
  interval,
}: Sm2Args) => {
  let newRepetition = repetition;
  let newEase = ease;
  let newInterval = interval;

  if (grade >= 3) {
    if (newRepetition === 0) {
      newInterval = 1;
    } else if (newRepetition === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(newInterval * newEase);
    }
    newRepetition += 1;
  } else {
    newRepetition = 0;
    newInterval = 1;
  }

  newEase += (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  newEase = +newEase.toFixed(2);

  if (newEase < 1.3) {
    newEase = 1.3;
  }

  return { repetition: newRepetition, ease: newEase, interval: newInterval };
};
