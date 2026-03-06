import { EnemyTemplate, EnemyInstance } from '../types/enemy.js';

export function spawnEnemy(t: EnemyTemplate): EnemyInstance {
  const [minG, maxG] = t.gold;
  return {
    name: t.name, maxHp: t.hp, currentHp: t.hp,
    attack: t.attack, defense: t.defense, speed: t.speed,
    xp: t.xp,
    gold: minG + Math.floor(Math.random() * (maxG - minG + 1)),
  };
}
