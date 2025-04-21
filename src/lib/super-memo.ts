type Interval = number;
type EaseFactor = number;
type Quality = number;
type Repetition = number;
type Item = {
  i: Interval;
  ef: EaseFactor;
  r: Repetition;
  q: Quality;
};
type Assessment = Item & { q: Quality };

export function item(i: Interval, ef: EaseFactor, r: Repetition, q: Quality) {
  return { i, ef, r, q };
}

function nextInterval(repetition: Repetition, easeFactor: EaseFactor): number {
  repetition = Math.ceil(repetition);
  if (repetition === 1) return 1;
  if (repetition === 2) return 6;
  return Math.ceil(nextInterval(repetition - 1, easeFactor) * easeFactor);
}

function nextEaseFactor(easeFactor: EaseFactor, quality: Quality) {
  easeFactor = easeFactor >= 1.3 ? easeFactor : 1.3;
  return Math.max(
    parseFloat(
      (easeFactor - 0.8 + 0.28 * quality - 0.02 * quality * quality).toFixed(2)
    ),
    1.3
  );
}

function nextRepetition(repetition: Repetition, quality: Quality): number {
  repetition = Math.ceil(repetition);
  if (quality >= 3) return repetition + 1;
  else return 1;
}

export function sm2(assessment: Assessment): Item {
  return {
    ...assessment,
    i: nextInterval(assessment.r, assessment.ef),
    ef: nextEaseFactor(assessment.ef, assessment.q),
    r: nextRepetition(assessment.r, assessment.q),
  };
}
