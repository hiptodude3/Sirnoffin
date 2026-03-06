export function getEl(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Element #${id} not found`);
  return el;
}

export function clearEl(el: HTMLElement): void {
  el.innerHTML = '';
}

export function makeBtn(
  label: string, onClick: () => void
): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.className = 'btn';
  btn.textContent = label;
  btn.onclick = onClick;
  return btn;
}
