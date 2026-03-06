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

export function spawnEnemy(template: EnemyTemplate): EnemyInstance {
  const [minG, maxG] = template.gold;
  return {
    name: template.name,
    maxHp: template.hp,
    currentHp: template.hp,
    attack: template.attack,
    defense: template.defense,
    speed: template.speed,
    xp: template.xp,
    gold: minG + Math.floor(Math.random() * (maxG - minG + 1))
  };
}
