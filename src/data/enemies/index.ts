import { EnemyTemplate } from '../../types/enemy.js';
import { FOREST } from './forest.js';

export { FOREST };

export const ALL_ENEMIES: EnemyTemplate[] = [...FOREST];

export function randomEnemy(pool: EnemyTemplate[]): EnemyTemplate {
  return pool[Math.floor(Math.random() * pool.length)];
}
