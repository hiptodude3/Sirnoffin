import { Character } from '../types/character.js';
import { createPrimaryStats } from '../types/primary-stats.js';
import { calcMaxHp } from '../formulas/max-hp.js';
import { calcMaxMp } from '../formulas/max-mp.js';
import { calcMaxSp } from '../formulas/max-sp.js';

export function createCharacter(name: string): Character {
  const stats = createPrimaryStats();
  const level = 1;
  const maxHp = calcMaxHp(level, stats.end);
  const maxMp = calcMaxMp(level, stats.wis);
  const maxSp = calcMaxSp(stats);

  return {
    name, level, exp: 0, credits: 0, stats,
    derived: {
      maxHp, maxMp, maxSp,
      currentHp: maxHp, currentMp: maxMp, currentSp: maxSp,
      physMitigation: 0, magMitigation: 0,
      evade: 0, parry: 0, resist: 0, block: 0,
    },
  };
}
