import { EnemyTemplate } from '../../types/enemy.js';

export const FOREST: EnemyTemplate[] = [
  { name: 'Slime',         str: 12, dex: 8,  agi: 6,  end: 14, int: 2, wis: 2, xp: 15, gold: [3, 8]  },
  { name: 'Goblin',        str: 18, dex: 14, agi: 10, end: 16, int: 6, wis: 4, xp: 25, gold: [5, 15] },
  { name: 'Wolf',          str: 20, dex: 16, agi: 18, end: 12, int: 3, wis: 3, xp: 20, gold: [4, 10] },
  { name: 'Forest Spider', str: 22, dex: 18, agi: 16, end: 10, int: 4, wis: 4, xp: 22, gold: [4, 12] },
];
