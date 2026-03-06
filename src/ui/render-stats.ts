import { getEl, clearEl, makeBtn } from './elements.js';
import { Character } from '../types/character.js';
import { PrimaryStats } from '../types/primary-stats.js';
import { renderHeader } from './render-header.js';
import { recalcDerived } from '../state/recalc-derived.js';

const KEYS: (keyof PrimaryStats)[] = [
  'str', 'dex', 'agi', 'end', 'int', 'wis',
];

export function renderStats(
  char: Character, onBack: () => void
): void {
  renderHeader(char);
  const main = getEl('main-content');
  const actions = getEl('action-bar');
  clearEl(main); clearEl(actions);

  const s = char.stats, d = char.derived;
  const rows = KEYS.map(k => `
    <div class="stat-row">
      <span class="stat-label">${k.toUpperCase()}</span>
      <span class="stat-value">${s[k]}</span>
      <button class="btn btn-sm" data-stat="${k}"
        ${char.statPoints < 1 ? 'disabled' : ''}>+</button>
    </div>`).join('');

  main.innerHTML =
    `<h2 style="color:#7a7aff">Character Stats</h2>`
    + `<p>Unspent points: <strong>${char.statPoints}</strong></p>`
    + `<div class="stat-grid">${rows}</div>`
    + `<hr style="border-color:#2a2a3a;margin:.5rem 0">`
    + `<p>ATK ${d.attack} · DEF ${d.defense} · SPD ${d.speed}`
    + ` · CRIT ${d.critical.toFixed(1)}%</p>`
    + `<p>mATK ${d.magAttack} · mDEF ${d.magDefense}</p>`
    + `<p>HP ${d.currentHp}/${d.maxHp} · MP ${d.currentMp}/${d.maxMp}`
    + ` · SP ${d.currentSp}/${d.maxSp}</p>`;

  main.querySelectorAll<HTMLButtonElement>('[data-stat]')
    .forEach(btn => btn.addEventListener('click', () => {
      const k = btn.dataset.stat as keyof PrimaryStats;
      if (char.statPoints > 0) {
        s[k]++; char.statPoints--;
        recalcDerived(char);
        renderStats(char, onBack);
      }
    }));

  actions.appendChild(makeBtn('Back', onBack));
}
