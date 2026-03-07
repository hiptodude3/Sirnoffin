export function scaleStat(base: number, level: number): number {
  return Math.floor(
    0.01 * base * level + Math.pow(level, 1.076675) * 0.3325
  );
}

export function enemyMaxHp(level: number, scaledEnd: number): number {
  return Math.floor(100 + level * 10 + scaledEnd * 5);
}

export function enemyBaseDamage(
  scaledStr: number, scaledDex: number
): number {
  const raw = Math.log(3330 + scaledStr * 2 + scaledDex)
    / Math.log(1.0003) - 27039.81;
  return Math.max(1, Math.floor(raw));
}
