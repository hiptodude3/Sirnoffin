import { CombatAction } from './types.js';

const ACTION_MULT: Record<CombatAction, number> = {
  attack: 1.0,
  defend: 0.6,
  flee: 0.8,
};

export function calcBaseTu(speed: number): number {
  return Math.max(20, 100 - speed * 2);
}

export function actionTuCost(
  action: CombatAction, speed: number
): number {
  return Math.max(10, Math.floor(calcBaseTu(speed) * ACTION_MULT[action]));
}
