import { getEl, clearEl, makeBtn } from './elements.js';
import { Character } from '../types/character.js';
import { renderHeader } from './render-header.js';
import { getCombat, resetCombat } from '../state/combat-state.js';
import { spawnEnemy } from '../combat/spawn-enemy.js';
import { randomEnemy, FOREST_ENEMIES } from '../data/enemies.js';
import { executeTurn } from '../combat/execute-turn.js';
import { CombatAction } from '../combat/types.js';
import { showVictory, showDefeat } from './combat-end.js';

export function renderCombat(
  char: Character, onDone: () => void
): void {
  renderHeader(char);
  const main = getEl('main-content');
  const actions = getEl('action-bar');
  clearEl(main); clearEl(actions);

  const cs = getCombat();
  if (!cs.enemy) {
    cs.enemy = spawnEnemy(randomEnemy(FOREST_ENEMIES));
    cs.log = [`A wild ${cs.enemy.name} appears!`];
  }

  const e = cs.enemy, d = char.derived;
  main.innerHTML = `
    <h2 style="color:#7a7aff">⚔ Combat</h2>
    <p><strong>${e.name}</strong> HP: ${e.currentHp}/${e.maxHp}</p>
    <div id="combat-log" style="min-height:80px;color:#999">
      ${cs.log.map(l => `<p>${l}</p>`).join('')}</div>
    <hr style="border-color:#2a2a3a;margin:8px 0">
    <p><strong>${char.name}</strong> HP:${d.currentHp}/${d.maxHp}
      | MP:${d.currentMp}/${d.maxMp}</p>`;

  if (cs.over) return;

  const reRender = () => renderCombat(char, onDone);
  const act = (type: CombatAction) => {
    const r = executeTurn(char, cs.enemy!, type);
    cs.log.push(...r.log);
    if (r.fled) { resetCombat(); onDone(); return; }
    if (r.enemyDead) return showVictory(char, onDone, reRender);
    if (r.playerDead) return showDefeat(char, onDone, reRender);
    reRender();
  };

  actions.appendChild(makeBtn('Attack', () => act('attack')));
  actions.appendChild(makeBtn('Defend', () => act('defend')));
  actions.appendChild(makeBtn('Flee', () => act('flee')));
}
