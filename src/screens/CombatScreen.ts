import { navigateTo } from './ScreenManager.js';
import { EnemyInstance, spawnEnemy } from '../entities/Enemy.js';
import { FOREST_ENEMIES, randomEnemy } from '../data/enemies.js';
import { getPlayer, addXp, addGold } from '../state/GameState.js';
import { executeTurn } from '../combat/CombatEngine.js';

let currentEnemy: EnemyInstance | null = null;
let combatLog: string[] = [];
let combatOver = false;

export function renderCombatScreen(
  header: HTMLElement,
  main: HTMLElement,
  footer: HTMLElement
): void {
  const player = getPlayer();

  if (!currentEnemy) {
    const template = randomEnemy(FOREST_ENEMIES);
    currentEnemy = spawnEnemy(template);
    combatLog = [`A wild ${currentEnemy.name} appears!`];
    combatOver = false;
  }

  const enemy = currentEnemy;
  const derived = player.character.derivedStats;
  const eHpPct = Math.max(0, (enemy.currentHp / enemy.maxHp) * 100);
  const pHpPct = Math.max(0, (player.currentHp / derived.maxHp) * 100);
  const pMpPct = derived.maxMp > 0
    ? (player.currentMp / derived.maxMp) * 100
    : 0;

  header.innerHTML = `<h1>⚔️ Combat</h1>`;

  main.innerHTML = `
    <div class="combat-arena">
      <div class="combatant enemy-side">
        <strong>${enemy.name}</strong>
        <div class="bar-container">
          <div class="bar hp-bar" style="width:${eHpPct}%"></div>
          <span class="bar-label">${enemy.currentHp} / ${enemy.maxHp}</span>
        </div>
      </div>
      <div class="combat-log" id="combat-log">
        ${combatLog.map(l => `<p>${l}</p>`).join('')}
      </div>
      <div class="combatant player-side">
        <strong>${player.character.name} — Lv ${player.level}</strong>
        <div class="bar-container">
          <div class="bar hp-bar" style="width:${pHpPct}%"></div>
          <span class="bar-label">HP ${player.currentHp} / ${derived.maxHp}</span>
        </div>
        <div class="bar-container">
          <div class="bar mp-bar" style="width:${pMpPct}%"></div>
          <span class="bar-label">MP ${player.currentMp} / ${derived.maxMp}</span>
        </div>
      </div>
    </div>
  `;

  const logEl = document.getElementById('combat-log');
  if (logEl) logEl.scrollTop = logEl.scrollHeight;

  if (!combatOver) {
    footer.innerHTML = `
      <button id="btn-attack" class="action-btn">⚔️ Attack</button>
      <button id="btn-defend" class="action-btn">🛡️ Defend</button>
      <button id="btn-flee"   class="action-btn">🏃 Flee</button>
    `;
    document.getElementById('btn-attack')!.addEventListener('click', () =>
      handleAction('attack', header, main, footer));
    document.getElementById('btn-defend')!.addEventListener('click', () =>
      handleAction('defend', header, main, footer));
    document.getElementById('btn-flee')!.addEventListener('click', () =>
      handleAction('flee', header, main, footer));
  }
}

function handleAction(
  type: 'attack' | 'defend' | 'flee',
  header: HTMLElement,
  main: HTMLElement,
  footer: HTMLElement
): void {
  if (!currentEnemy || combatOver) return;

  const result = executeTurn(currentEnemy, { type });
  combatLog.push(...result.log);

  if (result.fled) {
    endCombat();
    navigateTo('town');
    return;
  }

  if (result.enemyDead) {
    const xp = currentEnemy.xp;
    const gold = currentEnemy.gold;
    addGold(gold);
    const leveled = addXp(xp);
    combatLog.push(`Gained ${xp} XP and ${gold} gold.`);
    if (leveled) {
      combatLog.push(`🎉 Level up! Now level ${getPlayer().level}!`);
    }
    combatOver = true;
    renderCombatScreen(header, main, footer);
    footer.innerHTML = `
      <button id="btn-continue" class="action-btn">✅ Continue</button>
    `;
    document.getElementById('btn-continue')!.addEventListener('click', () => {
      endCombat();
      navigateTo('town');
    });
    return;
  }

  if (result.playerDead) {
    combatOver = true;
    renderCombatScreen(header, main, footer);
    footer.innerHTML = `
      <button id="btn-return" class="action-btn">💀 Return to Town</button>
    `;
    document.getElementById('btn-return')!.addEventListener('click', () => {
      const p = getPlayer();
      p.currentHp = Math.ceil(p.character.derivedStats.maxHp * 0.25);
      endCombat();
      navigateTo('town');
    });
    return;
  }

  renderCombatScreen(header, main, footer);
}

function endCombat(): void {
  currentEnemy = null;
  combatLog = [];
  combatOver = false;
}
