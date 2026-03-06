import { Character } from '../entities/Character.js';

export interface PlayerState {
  character: Character;
  currentHp: number;
  currentMp: number;
  level: number;
  xp: number;
  gold: number;
}

let player: PlayerState | null = null;

export function initPlayer(char: Character): void {
  player = {
    character: char,
    currentHp: char.derivedStats.maxHp,
    currentMp: char.derivedStats.maxMp,
    level: 1,
    xp: 0,
    gold: 50
  };
}

export function getPlayer(): PlayerState {
  if (!player) throw new Error('Player not initialized');
  return player;
}

export function xpToNextLevel(level: number): number {
  return level * 100;
}

export function addXp(amount: number): boolean {
  const p = getPlayer();
  p.xp += amount;
  const needed = xpToNextLevel(p.level);
  if (p.xp >= needed) {
    p.xp -= needed;
    p.level++;
    p.currentHp = p.character.derivedStats.maxHp;
    p.currentMp = p.character.derivedStats.maxMp;
    return true;
  }
  return false;
}

export function addGold(amount: number): void {
  getPlayer().gold += amount;
}

export function restoreAll(): void {
  const p = getPlayer();
  p.currentHp = p.character.derivedStats.maxHp;
  p.currentMp = p.character.derivedStats.maxMp;
}
