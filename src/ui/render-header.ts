import { getEl } from './elements.js';
import { Character } from '../types/character.js';

export function renderHeader(char: Character | null): void {
  const header = getEl('header-bar');
  if (!char) {
    header.textContent = '⚔ RPG';
    return;
  }
  const d = char.derived;
  header.innerHTML =
    `<strong>${char.name}</strong>&nbsp; Lv.${char.level} &nbsp;|&nbsp; `
    + `HP ${d.currentHp}/${d.maxHp} &nbsp;|&nbsp; `
    + `MP ${d.currentMp}/${d.maxMp}`;
}
