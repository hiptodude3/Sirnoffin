export interface BaseStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface DerivedStats {
  maxHp: number;
  maxMp: number;
  attack: number;
  defense: number;
  magicAttack: number;
  magicDefense: number;
  speed: number;
  critical: number;
}

export interface Character {
  name: string;
  race: string;
  characterClass: string;
  baseStats: BaseStats;
  derivedStats: DerivedStats;
}

export function calculateDerived(
  base: BaseStats,
  _charClass: string
): DerivedStats {
  return {
    maxHp: 30 + base.constitution * 5 + base.strength * 2,
    maxMp: 10 + base.intelligence * 4 + base.wisdom * 2,
    attack: base.strength * 2 + Math.floor(base.dexterity * 0.5),
    defense: Math.floor(base.constitution * 1.5 + base.strength * 0.5),
    magicAttack: base.intelligence * 2 + base.wisdom,
    magicDefense: Math.floor(base.wisdom * 1.5 + base.intelligence * 0.5),
    speed: base.dexterity * 2 + Math.floor(base.wisdom * 0.5),
    critical: base.dexterity * 0.5 + base.wisdom * 0.25
  };
}
