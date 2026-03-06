import { Character } from '../types/character.js';
import { EnemyInstance } from '../types/enemy.js';
import { CombatAction, TurnResult } from './types.js';
import { attemptFlee } from './attempt-flee.js';
import { doPlayerAttack } from './do-player-attack.js';
import { doEnemyAttack } from './do-enemy-attack.js';

export function executeTurn(
  char: Character, enemy: EnemyInstance, action: CombatAction
): TurnResult {
  if (action === 'flee') return attemptFlee(char, enemy);

  const log: string[] = [];
  const defending = action === 'defend';
  if (defending) log.push('You take a defensive stance.');

  const playerFirst = char.derived.speed >= enemy.speed;
  const pAtk = () => !defending && doPlayerAttack(char, enemy, log);
  const eAtk = () => doEnemyAttack(char, enemy, defending, log);

  if (playerFirst) { if (!pAtk()) eAtk(); }
  else { if (!eAtk()) pAtk(); }

  return {
    log,
    enemyDead: enemy.currentHp === 0,
    playerDead: char.derived.currentHp === 0,
    fled: false,
  };
}
