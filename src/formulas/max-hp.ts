export function calcMaxHp(
  level: number,
  end: number,
  hpTank: number = 1,
  vigorousVitality: number = 1
): number {
  return Math.floor(
    (500 + level * 10 + end * 6) * hpTank * vigorousVitality
  );
}
