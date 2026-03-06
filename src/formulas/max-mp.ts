export function calcMaxMp(
  level: number,
  wis: number,
  mpTank: number = 1,
  effluentEther: number = 1
): number {
  return Math.floor(
    (10 + level + wis) * mpTank * effluentEther
  );
}
