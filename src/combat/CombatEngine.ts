import { EnemyInstance } from '../entities/Enemy.js';
import { getPlayer } from '../state/GameState.js';

export interface CombatAction {
  type: 'attack' | 'defend' | 'flee';
}

export interface TurnResult {
  log: string[];
  enemyDead: boolean;
  playerDead: boolean;
  fled: boolean;
}

function randomInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function calcDamage(atk: number, def: number): number {
  return Math.max(1, atk - Math.floor(def * 0.5) + randomInt(-2, 2));
}

export function executeTurn(
  enemy: EnemyInstance,
  action: CombatAction
): TurnResult {
  const player = getPlayer();
  const derived = player.character.derivedStats;
  const log: string[] = [];
  let enemyDead = false;
  let playerDead = false;

  if (action.type === 'flee') {
    const chance = 50 + (derived.speed - enemy.speed) * 5;
    if (Math.random() * 100 < chance) {
      log.push('You fled successfully!');
      return { log, enemyDead, playerDead, fled: true };
    }
    log.push('Failed to flee!');
    const dmg = calcDamage(enemy.attack, derived.defense);
    player.currentHp = Math.max(0, player.currentHp - dmg);
    log.push(`${enemy.name} attacks for ${dmg} damage!`);
    if (player.currentHp === 0) {
      playerDead = true;
      log.push('You have been defeated...');
    }
    return { log, enemyDead, playerDead, fled: false };
  }

  const defending = action.type === 'defend';
  if (defending) log.push('You take a defensive stance.');

  const playerFirst = derived.speed >= enemy.speed;

  const doPlayerAttack = (): boolean => {
    if (defending) return false;
    const crit = Math.random() * 100 < derived.critical;
    let dmg = calcDamage(derived.attack, enemy.defense);
    if (crit) dmg = Math.floor(dmg * 1.5);
    enemy.currentHp = Math.max(0, enemy.currentHp - dmg);
    log.push(
      crit ? `⚡ Critical hit for ${dmg} damage!` : `You attack for ${dmg} damage.`
    );
    if (enemy.currentHp === 0) {
      enemyDead = true;
      log.push(`${enemy.name} defeated!`);
    }
    return enemyDead;
  };

  const doEnemyAttack = (): boolean => {
    const defValue = defending ? derived.defense * 2 : derived.defense;
    const dmg = calcDamage(enemy.attack, defValue);
    player.currentHp = Math.max(0, player.currentHp - dmg);
    log.push(
      defending
        ? `${enemy.name} attacks — blocked! Only ${dmg} damage.`
        : `${enemy.name} attacks for ${dmg} damage!`
    );
    if (player.currentHp === 0) {
      playerDead = true;
      log.push('You have been defeated...');
    }
    return playerDead;
  };

  if (playerFirst) {
    if (!doPlayerAttack()) doEnemyAttack();
  } else {
    if (!doEnemyAttack()) doPlayerAttack();
  }

  return { log, enemyDead, playerDead, fled: false };
}
