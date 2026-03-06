import { EnemyInstance } from '../types/enemy.js';

export interface CombatState {
  enemy: EnemyInstance | null;
  log: string[];
  over: boolean;
}

const combat: CombatState = { enemy: null, log: [], over: false };

export function getCombat(): CombatState { return combat; }

export function resetCombat(): void {
  combat.enemy = null;
  combat.log = [];
  combat.over = false;
}
