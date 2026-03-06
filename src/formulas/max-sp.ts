import { PrimaryStats } from '../types/primary-stats.js';

export function calcMaxSp(
  stats: PrimaryStats,
  spTank: number = 1,
  suffusiveSpirit: number = 1
): number {
  const sum = stats.str + stats.dex + stats.agi
    + stats.end + stats.int + stats.wis;
  return Math.floor((1 + sum / 5) * spTank * suffusiveSpirit);
}
