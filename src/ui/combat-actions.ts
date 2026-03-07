import { getEl, clearEl, makeBtn } from './elements.js';
import { Character } from '../types/character.js';
import { getCombat, resetCombat } from '../state/combat-state.js';
import { executeTurn } from '../combat/execute-turn.js';
import { CombatAction } from '../combat/types.js';
import { actionTuCost } from '../combat/tu-cost.js';
import { showVictory, showDefeat } from './combat-end.js';

export function renderCombatActions(
  char: Character, onDone: () => void, reRender: () => void
): void {
  const actions = getEl('action-bar');
  clearEl(actions);
  const cs = getCombat();
  const spd = char.derived.speed;

  const act = (t: CombatAction) => {
    const r = executeTurn(char, cs.enemy!, t, cs);
    cs.log.push(...r.log);
    if (r.fled) { resetCombat(); onDone(); return; }
    if (r.enemyDead) return showVictory(char, onDone, reRender);
    if (r.playerDead) return showDefeat(char, onDone, reRender);
    reRender();
  };

  const labels: [CombatAction, string][] = [
    ['attack', 'Attack'], ['defend', 'Defend'], ['flee', 'Flee'],
  ];
  for (const [key, label] of labels) {
    const cost = actionTuCost(key, spd);
    actions.appendChild(makeBtn(`${label} (${cost})`, () => act(key)));
  }
}
