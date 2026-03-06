import { Character } from '../types/character.js';
import { EnemyInstance } from '../types/enemy.js';
import { TuClock } from './types.js';
import { doEnemyAttack } from './do-enemy-attack.js';
import { calcBaseTu } from './tu-cost.js';

export function processEnemyTurns(
  char: Character,
  enemy: EnemyInstance,
  tu: TuClock,
  defending: boolean,
  log: string[]
): boolean {
  const cost = calcBaseTu(enemy.speed);
  while (tu.enemyNextAt <= tu.clock && char.derived.currentHp > 0) {
    const dead = doEnemyAttack(char, enemy, defending, log);
    tu.enemyNextAt += cost;
    if (dead) return true;
  }
  return false;
}
