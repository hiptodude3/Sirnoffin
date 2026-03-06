import { getEl, clearEl, makeBtn } from './elements.js';
import { Character } from '../types/character.js';
import { getCombat, resetCombat } from '../state/combat-state.js';
import { expForNextLevel } from '../formulas/exp-next-level.js';
import { recalcDerived } from '../state/recalc-derived.js';

const POINTS_PER_LEVEL = 3;

export function showVictory(
  char: Character, onDone: () => void, reRender: () => void
): void {
  const cs = getCombat();
  if (!cs.enemy) return;
  char.exp += cs.enemy.xp;
  char.credits += cs.enemy.gold;
  cs.log.push(`+${cs.enemy.xp} XP, +${cs.enemy.gold} credits.`);

  const needed = expForNextLevel(char.level);
  if (char.exp >= needed) {
    char.exp -= needed;
    char.level++;
    char.statPoints += POINTS_PER_LEVEL;
    recalcDerived(char);
    char.derived.currentHp = char.derived.maxHp;
    char.derived.currentMp = char.derived.maxMp;
    cs.log.push(
      `🎉 Level ${char.level}! +${POINTS_PER_LEVEL} stat points!`
    );
  }
  cs.over = true;
  reRender();
  clearEl(getEl('action-bar'));
  getEl('action-bar').appendChild(
    makeBtn('Continue', () => { resetCombat(); onDone(); })
  );
}

export function showDefeat(
  char: Character, onDone: () => void, reRender: () => void
): void {
  getCombat().over = true;
  reRender();
  clearEl(getEl('action-bar'));
  getEl('action-bar').appendChild(
    makeBtn('Return', () => {
      char.derived.currentHp = Math.ceil(char.derived.maxHp * 0.25);
      resetCombat(); onDone();
    })
  );
}
