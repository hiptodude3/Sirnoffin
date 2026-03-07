import { EnemyTemplate, EnemyInstance } from '../types/enemy.js';
import {
  scaleStat, enemyMaxHp, enemyBaseDamage,
} from '../formulas/enemy-scaling.js';

export function spawnEnemy(
  t: EnemyTemplate, level: number
): EnemyInstance {
  const str = scaleStat(t.str, level);
  const dex = scaleStat(t.dex, level);
  const agi = scaleStat(t.agi, level);
  const end = scaleStat(t.end, level);
  const hp = enemyMaxHp(level, end);
  const [minG, maxG] = t.gold;

  return {
    name: t.name, maxHp: hp, currentHp: hp,
    attack: enemyBaseDamage(str, dex),
    defense: Math.floor(end * 1.5 + str * 0.5),
    speed: agi * 2 + Math.floor(dex * 0.5),
    xp: t.xp + Math.floor(t.xp * (level - 1) * 0.15),
    gold: minG + Math.floor(Math.random() * (maxG - minG + 1)),
  };
}
