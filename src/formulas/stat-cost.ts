export function statUpgradeCost(currentStat: number): number {
  const base = 2.5475566751265;
  const exponent = base ** (1 + currentStat / 950);
  return Math.ceil((currentStat + 1) ** exponent);
}
