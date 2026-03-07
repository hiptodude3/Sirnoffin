import { getEl } from './elements.js';
import { Character } from '../types/character.js';
import { renderHeader } from './render-header.js';
import { getCombat } from '../state/combat-state.js';
import { spawnEnemy } from '../combat/spawn-enemy.js';
import { randomEnemy, FOREST } from '../data/enemies/index.js';
import { calcBaseTu } from '../combat/tu-cost.js';
import { renderCombatActions } from './combat-actions.js';
import { formatLogLine } from './combat-log.js';
import { renderVitals } from './bars.js';

export function renderCombat(
  char: Character, onDone: () => void
): void {
  renderHeader(char);
  const main = getEl('main-content');
  const cs = getCombat();

  if (!cs.enemy) {
    cs.enemy = spawnEnemy(randomEnemy(FOREST), char.level);
    cs.log = [`A wild ${cs.enemy.name} appears!`];
    cs.clock = 0;
    cs.enemyNextAt = calcBaseTu(cs.enemy.speed);
  }

  const e = cs.enemy;
  const gap = Math.max(0, cs.enemyNextAt - cs.clock);
  const d = char.derived;
  main.innerHTML =
    `<h2 style="color:#7a7aff">⚔ Combat</h2>`
    + `<p><strong>${e.name}</strong> HP ${e.currentHp}/${e.maxHp}</p>`
    + `<p style="color:#666">TU ${cs.clock} · next strike in ${gap}</p>`
    + `<div id="combat-log">${cs.log.map(formatLogLine).join('')}</div>`
    + `<hr style="border-color:#2a2a3a;margin:.5rem 0">`
    + `<p><strong>${char.name}</strong></p>`
    + renderVitals(d.currentHp, d.maxHp, d.currentMp, d.maxMp);

  const logEl = document.getElementById('combat-log');
  if (logEl) logEl.scrollTop = logEl.scrollHeight;

  if (!cs.over) {
    renderCombatActions(char, onDone, () => renderCombat(char, onDone));
  }
}
