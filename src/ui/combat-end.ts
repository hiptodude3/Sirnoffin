import { getEl, clearEl, makeBtn } from './elements.js';
import { Character } from '../types/character.js';
import { getCombat, resetCombat } from '../state/combat-state.js';
import { expForNextLevel } from '../formulas/exp-next-level.js';
import { calcMaxHp } from '../formulas/max-hp.js';
import { calcMaxMp } from '../formulas/max-mp.js';

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
    char.derived.maxHp = calcMaxHp(char.level, char.stats.end);
    char.derived.maxMp = calcMaxMp(char.level, char.stats.wis);
    char.derived.currentHp = char.derived.maxHp;
    char.derived.currentMp = char.derived.maxMp;
    cs.log.push(`🎉 Level up! Now level ${char.level}!`);
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
