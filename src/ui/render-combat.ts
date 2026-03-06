import { getEl, clearEl, makeBtn } from './elements.js';
import { Character } from '../types/character.js';
import { renderHeader } from './render-header.js';
import { getCombat, resetCombat } from '../state/combat-state.js';
import { spawnEnemy } from '../combat/spawn-enemy.js';
import { randomEnemy, FOREST_ENEMIES } from '../data/enemies.js';
import { executeTurn } from '../combat/execute-turn.js';
import { CombatAction } from '../combat/types.js';
import { showVictory, showDefeat } from './combat-end.js';
import { actionTuCost, calcBaseTu } from '../combat/tu-cost.js';

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
    cs.clock = 0;
    cs.enemyNextAt = calcBaseTu(cs.enemy.speed);
  }

  const e = cs.enemy;
  const gap = Math.max(0, cs.enemyNextAt - cs.clock);
  main.innerHTML =
    `<h2 style="color:#7a7aff">⚔ Combat</h2>`
    + `<p><strong>${e.name}</strong> HP ${e.currentHp}/${e.maxHp}</p>`
    + `<p style="color:#666">TU ${cs.clock} · enemy strikes in ${gap}</p>`
    + `<div id="combat-log">${cs.log.map(l => `<p>${l}</p>`).join('')}</div>`
    + `<hr style="border-color:#2a2a3a;margin:.5rem 0">`
    + `<p><strong>${char.name}</strong> HP ${char.derived.currentHp}/${char.derived.maxHp}`
    + ` · MP ${char.derived.currentMp}/${char.derived.maxMp}</p>`;

  if (cs.over) return;
  const reRender = () => renderCombat(char, onDone);
  const spd = char.derived.speed;

  const act = (t: CombatAction) => {
    const r = executeTurn(char, cs.enemy!, t, cs);
    cs.log.push(...r.log);
    if (r.fled) { resetCombat(); onDone(); return; }
    if (r.enemyDead) return showVictory(char, onDone, reRender);
    if (r.playerDead) return showDefeat(char, onDone, reRender);
    reRender();
  };

  const a = actionTuCost('attack', spd);
  const d = actionTuCost('defend', spd);
  const f = actionTuCost('flee', spd);
  actions.appendChild(makeBtn(`Attack (${a})`, () => act('attack')));
  actions.appendChild(makeBtn(`Defend (${d})`, () => act('defend')));
  actions.appendChild(makeBtn(`Flee (${f})`, () => act('flee')));
}
