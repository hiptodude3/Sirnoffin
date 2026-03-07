import { getEl, clearEl, makeBtn } from './elements.js';
import { Character } from '../types/character.js';
import { getCombat, resetCombat } from '../state/combat-state.js';
import { expForNextLevel } from '../formulas/exp-next-level.js';
import { recalcDerived } from '../state/recalc-derived.js';

function endCombat(
  label: string, cb: () => void, reRender: () => void
): void {
  getCombat().over = true;
  reRender();
  clearEl(getEl('action-bar'));
  getEl('action-bar').appendChild(makeBtn(label, cb));
}

export function showVictory(
  char: Character, onDone: () => void, reRender: () => void
): void {
  const cs = getCombat();
  if (!cs.enemy) return;
  char.exp += cs.enemy.xp;
  char.credits += cs.enemy.gold;
  cs.log.push(`+${cs.enemy.xp} XP, +${cs.enemy.gold} credits.`);

  let needed = expForNextLevel(char.level);
  while (char.exp >= needed) {
    char.exp -= needed;
    char.level++;
    char.statPoints += 3;
    recalcDerived(char);
    cs.log.push(`🎉 Level ${char.level}! +3 stat points!`);
    needed = expForNextLevel(char.level);
  }

  const d = char.derived;
  d.currentHp = d.maxHp; d.currentMp = d.maxMp; d.currentSp = d.maxSp;
  endCombat('Continue', () => { resetCombat(); onDone(); }, reRender);
}

export function showDefeat(
  char: Character, onDone: () => void, reRender: () => void
): void {
  endCombat('Return', () => {
    char.derived.currentHp = Math.ceil(char.derived.maxHp * 0.25);
    resetCombat(); onDone();
  }, reRender);
}
