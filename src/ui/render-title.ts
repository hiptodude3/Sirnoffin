import { getEl, clearEl, makeBtn } from './elements.js';

export function renderTitle(onStart: () => void): void {
  const main = getEl('main-content');
  const actions = getEl('action-bar');
  clearEl(main);
  clearEl(actions);

  main.innerHTML = `
    <h1 style="color:#7a7aff; margin-bottom:8px">⚔ RPG ⚔</h1>
    <p>A menu-driven RPG with deep stat mechanics.</p>
    <p style="margin-top:12px; color:#666">
      Press [New Game] to begin.
    </p>`;

  actions.appendChild(makeBtn('New Game', onStart));
}
