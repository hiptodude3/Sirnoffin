export interface EnemyTemplate {
  name: string;
  str: number;
  dex: number;
  agi: number;
  end: number;
  int: number;
  wis: number;
  xp: number;
  gold: [number, number];
}

export interface EnemyInstance {
  name: string;
  maxHp: number;
  currentHp: number;
  attack: number;
  defense: number;
  speed: number;
  xp: number;
  gold: number;
}
