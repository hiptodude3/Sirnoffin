import { Character } from '../types/character.js';
import { createPrimaryStats } from '../types/primary-stats.js';
import { recalcDerived } from './recalc-derived.js';

export function createCharacter(name: string): Character {
  const char: Character = {
    name, level: 1, exp: 0, credits: 0, statPoints: 0,
    stats: createPrimaryStats(),
    derived: {
      maxHp: 0, maxMp: 0, maxSp: 0,
      currentHp: 0, currentMp: 0, currentSp: 0,
      attack: 0, defense: 0, magAttack: 0, magDefense: 0,
      speed: 0, critical: 0,
      physMitigation: 0, magMitigation: 0,
      evade: 0, parry: 0, resist: 0, block: 0,
    },
  };
  recalcDerived(char);
  char.derived.currentHp = char.derived.maxHp;
  char.derived.currentMp = char.derived.maxMp;
  char.derived.currentSp = char.derived.maxSp;
  return char;
}
