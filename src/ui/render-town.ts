import { getEl, clearEl, makeBtn } from './elements.js';
import { Character } from '../types/character.js';

export function renderTown(
  char: Character,
  onBattle: () => void,
  onStats: () => void
): void {
  const main = getEl('main-content');
  const actions = getEl('action-bar');
  clearEl(main);
  clearEl(actions);

  const d = char.derived;
  main.innerHTML = `
    <h2 style="color:#7a7aff">${char.name} — Level ${char.level}</h2>
    <p>HP: ${d.currentHp}/${d.maxHp} | 
       MP: ${d.currentMp}/${d.maxMp} | 
       SP: ${d.currentSp}/${d.maxSp}</p>
    <p style="margin-top:8px">Credits: ${char.credits}</p>
    <p style="margin-top:12px; color:#666">
      You stand in the town square.</p>`;

  actions.appendChild(makeBtn('Battle', onBattle));
  actions.appendChild(makeBtn('Stats', onStats));
}
