import { Character } from '../types/character.js';
import { EnemyInstance } from '../types/enemy.js';
import { calcDamage } from './calc-damage.js';

export function doEnemyAttack(
  char: Character, enemy: EnemyInstance,
  defending: boolean, log: string[]
): boolean {
  const def = defending ? char.derived.defense * 2 : char.derived.defense;
  const dmg = calcDamage(enemy.attack, def);
  char.derived.currentHp = Math.max(0, char.derived.currentHp - dmg);

  log.push(defending
    ? `${enemy.name} attacks — blocked! Only ${dmg} damage.`
    : `${enemy.name} attacks for ${dmg} damage!`);

  if (char.derived.currentHp === 0) {
    log.push('You have been defeated...');
    return true;
  }
  return false;
}
