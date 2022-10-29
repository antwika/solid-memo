export function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export async function wait(ms: number) {
  return new Promise((resolve) => { setTimeout(() => { resolve(true); }, ms); });
}
