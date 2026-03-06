export interface EnemyTemplate {
  name: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
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
