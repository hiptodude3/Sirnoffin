import { Character } from '../types/character.js';
import { calcMaxHp } from '../formulas/max-hp.js';
import { calcMaxMp } from '../formulas/max-mp.js';
import { calcMaxSp } from '../formulas/max-sp.js';

export function recalcDerived(char: Character): void {
  const s = char.stats;
  const d = char.derived;
  const oldHp = d.maxHp, oldMp = d.maxMp, oldSp = d.maxSp;

  d.maxHp = calcMaxHp(char.level, s.end);
  d.maxMp = calcMaxMp(char.level, s.wis);
  d.maxSp = calcMaxSp(s);
  d.attack = s.str * 2 + Math.floor(s.dex * 0.5);
  d.defense = Math.floor(s.end * 1.5 + s.str * 0.5);
  d.magAttack = s.int * 2 + s.wis;
  d.magDefense = Math.floor(s.wis * 1.5 + s.int * 0.5);
  d.speed = s.agi * 2 + Math.floor(s.dex * 0.5);
  d.critical = s.dex * 0.5 + s.wis * 0.25;

  d.currentHp = Math.min(d.maxHp, d.currentHp + (d.maxHp - oldHp));
  d.currentMp = Math.min(d.maxMp, d.currentMp + (d.maxMp - oldMp));
  d.currentSp = Math.min(d.maxSp, d.currentSp + (d.maxSp - oldSp));
}
