import { Character } from '../types/character.js';
import { EnemyInstance } from '../types/enemy.js';
import { calcDamage } from './calc-damage.js';

export function doPlayerAttack(
  char: Character, enemy: EnemyInstance, log: string[]
): boolean {
  const crit = Math.random() * 100 < char.derived.critical;
  let dmg = calcDamage(char.derived.attack, enemy.defense);
  if (crit) dmg = Math.floor(dmg * 1.5);
  enemy.currentHp = Math.max(0, enemy.currentHp - dmg);

  log.push(crit
    ? `⚡ Critical hit for ${dmg} damage!`
    : `You attack for ${dmg} damage.`);

  if (enemy.currentHp === 0) {
    log.push(`${enemy.name} defeated!`);
    return true;
  }
  return false;
}
