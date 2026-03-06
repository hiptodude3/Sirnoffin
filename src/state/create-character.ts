import { Character } from '../types/character.js';
import { createPrimaryStats } from '../types/primary-stats.js';
import { calcMaxHp } from '../formulas/max-hp.js';
import { calcMaxMp } from '../formulas/max-mp.js';
import { calcMaxSp } from '../formulas/max-sp.js';

export function createCharacter(name: string): Character {
  const s = createPrimaryStats();
  const level = 1;
  const maxHp = calcMaxHp(level, s.end);
  const maxMp = calcMaxMp(level, s.wis);
  const maxSp = calcMaxSp(s);

  return {
    name, level, exp: 0, credits: 0, stats: s,
    derived: {
      maxHp, maxMp, maxSp,
      currentHp: maxHp, currentMp: maxMp, currentSp: maxSp,
      attack: s.str * 2 + Math.floor(s.dex * 0.5),
      defense: Math.floor(s.end * 1.5 + s.str * 0.5),
      magAttack: s.int * 2 + s.wis,
      magDefense: Math.floor(s.wis * 1.5 + s.int * 0.5),
      speed: s.agi * 2 + Math.floor(s.dex * 0.5),
      critical: s.dex * 0.5 + s.wis * 0.25,
      physMitigation: 0, magMitigation: 0,
      evade: 0, parry: 0, resist: 0, block: 0,
    },
  };
}
