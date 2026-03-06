export type CombatAction = 'attack' | 'defend' | 'flee';

export interface TurnResult {
  log: string[];
  enemyDead: boolean;
  playerDead: boolean;
  fled: boolean;
}

export interface TuClock {
  clock: number;
  enemyNextAt: number;
}
