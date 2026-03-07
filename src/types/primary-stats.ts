// src/types/primary-stats.ts
export interface PrimaryStats {
  str: number;
  dex: number;
  agi: number;
  end: number;
  int: number;
  wis: number;
}

export function createPrimaryStats(): PrimaryStats {
  return { str: 10, dex: 10, agi: 10, end: 10, int: 10, wis: 10 };
}
