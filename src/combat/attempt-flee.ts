import { Character } from '../types/character.js';
import { EnemyInstance } from '../types/enemy.js';
import { TurnResult } from './types.js';
import { calcDamage } from './calc-damage.js';

export function attemptFlee(
  char: Character, enemy: EnemyInstance
): TurnResult {
  const log: string[] = [];
  const chance = 50 + (char.derived.speed - enemy.speed) * 5;

  if (Math.random() * 100 < chance) {
    log.push('You fled successfully!');
    return { log, enemyDead: false, playerDead: false, fled: true };
  }

  log.push('Failed to flee!');
  const dmg = calcDamage(enemy.attack, char.derived.defense);
  char.derived.currentHp = Math.max(0, char.derived.currentHp - dmg);
  log.push(`${enemy.name} attacks for ${dmg} damage!`);

  const playerDead = char.derived.currentHp === 0;
  if (playerDead) log.push('You have been defeated...');
  return { log, enemyDead: false, playerDead, fled: false };
}
