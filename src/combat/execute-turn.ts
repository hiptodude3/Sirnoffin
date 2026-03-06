import { Character } from '../types/character.js';
import { EnemyInstance } from '../types/enemy.js';
import { CombatAction, TurnResult, TuClock } from './types.js';
import { actionTuCost } from './tu-cost.js';
import { doPlayerAttack } from './do-player-attack.js';
import { processEnemyTurns } from './process-enemy-turns.js';

export function executeTurn(
  char: Character,
  enemy: EnemyInstance,
  action: CombatAction,
  tu: TuClock
): TurnResult {
  const log: string[] = [];
  const defending = action === 'defend';
  const cost = actionTuCost(action, char.derived.speed);

  if (action === 'attack') {
    if (doPlayerAttack(char, enemy, log)) {
      return { log, enemyDead: true, playerDead: false, fled: false };
    }
  } else if (action === 'defend') {
    log.push('You brace yourself.');
  } else {
    const chance = 50 + (char.derived.speed - enemy.speed) * 3;
    if (Math.random() * 100 < chance) {
      log.push('You fled!');
      return { log, enemyDead: false, playerDead: false, fled: true };
    }
    log.push('Escape failed!');
  }

  tu.clock += cost;
  const playerDead = processEnemyTurns(
    char, enemy, tu, defending, log
  );
  return { log, enemyDead: false, playerDead, fled: false };
}
