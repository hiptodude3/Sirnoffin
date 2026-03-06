export function randomInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function calcDamage(atk: number, def: number): number {
  return Math.max(1, atk - Math.floor(def * 0.5) + randomInt(-2, 2));
}
