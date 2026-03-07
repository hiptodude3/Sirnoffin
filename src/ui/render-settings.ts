import { getEl, clearEl, makeBtn } from './elements.js';
import { getSettings } from '../state/settings-state.js';
import { Settings } from '../types/settings.js';

const TOGGLES: { key: keyof Settings; label: string }[] = [
  { key: 'visualBars', label: 'Visual HP/MP/SP bars' },
  { key: 'coloredLog', label: 'Colored combat log' },
];

export function renderSettings(onBack: () => void): void {
  const main = getEl('main-content');
  clearEl(main); clearEl(getEl('action-bar'));
  const s = getSettings();

  main.innerHTML = `<h2 style="color:#7a7aff">⚙ Settings</h2>`
    + `<div id="toggle-list" style="margin-top:.5rem"></div>`;

  const list = document.getElementById('toggle-list')!;
  for (const t of TOGGLES) {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:.5rem;padding:.3rem 0';
    const btn = document.createElement('button');
    btn.className = 'btn btn-sm';
    btn.textContent = s[t.key] ? 'ON' : 'OFF';
    btn.style.width = '3.5rem';
    if (s[t.key]) btn.style.borderColor = '#5a8a5a';
    btn.onclick = () => { s[t.key] = !s[t.key]; renderSettings(onBack); };
    const lbl = document.createElement('span');
    lbl.textContent = t.label;
    row.append(btn, lbl);
    list.appendChild(row);
  }
  getEl('action-bar').appendChild(makeBtn('Back', onBack));
}
