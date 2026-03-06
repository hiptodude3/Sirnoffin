import { EnemyInstance } from '../types/enemy.js';
import { TuClock } from '../combat/types.js';

export interface CombatState extends TuClock {
  enemy: EnemyInstance | null;
  log: string[];
  over: boolean;
}

const combat: CombatState = {
  enemy: null, log: [], over: false,
  clock: 0, enemyNextAt: 0,
};

export function getCombat(): CombatState { return combat; }

export function resetCombat(): void {
  combat.enemy = null;
  combat.log = [];
  combat.over = false;
  combat.clock = 0;
  combat.enemyNextAt = 0;
}
