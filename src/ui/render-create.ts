import { getEl, clearEl, makeBtn } from './elements.js';

export function renderCreate(
  onConfirm: (name: string) => void
): void {
  const main = getEl('main-content');
  const actions = getEl('action-bar');
  clearEl(main);
  clearEl(actions);

  main.innerHTML = `
    <h2 style="color:#7a7aff; margin-bottom:12px">
      Create Character</h2>
    <label>Name:
      <input id="name-input" type="text" maxlength="20"
        style="background:#0a0a0f; color:#c8c8d0;
        border:1px solid #3a3a5a; padding:4px 8px;
        font-family:inherit">
    </label>`;

  actions.appendChild(makeBtn('Confirm', () => {
    const input = getEl('name-input') as HTMLInputElement;
    onConfirm(input.value.trim() || 'Hero');
  }));
}
