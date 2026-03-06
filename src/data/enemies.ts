import { EnemyTemplate } from '../entities/Enemy.js';

export const FOREST_ENEMIES: EnemyTemplate[] = [
  { name: 'Slime',         hp: 40, attack: 15, defense: 8,  speed: 4,  xp: 15, gold: [3, 8]  },
  { name: 'Goblin',        hp: 55, attack: 22, defense: 12, speed: 8,  xp: 25, gold: [5, 15] },
  { name: 'Wolf',          hp: 45, attack: 25, defense: 8,  speed: 12, xp: 20, gold: [4, 10] },
  { name: 'Forest Spider', hp: 35, attack: 28, defense: 5,  speed: 11, xp: 22, gold: [4, 12] }
];

export function randomEnemy(pool: EnemyTemplate[]): EnemyTemplate {
  return pool[Math.floor(Math.random() * pool.length)];
}
