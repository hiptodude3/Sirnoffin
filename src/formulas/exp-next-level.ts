export function expForNextLevel(currentLevel: number): number {
  const base = 2.850263212287058;
  const a = (currentLevel + 4)
    ** (base ** (1 + (currentLevel + 1) / 1000));
  const b = (currentLevel + 3)
    ** (base ** (1 + currentLevel / 1000));
  return Math.ceil(a - b);
}
