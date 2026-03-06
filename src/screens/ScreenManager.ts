type RenderFn = (
  header: HTMLElement,
  main: HTMLElement,
  footer: HTMLElement
) => void;

const screens = new Map<string, RenderFn>();
let headerEl: HTMLElement;
let mainEl: HTMLElement;
let footerEl: HTMLElement;

export function initScreenManager(
  header: HTMLElement,
  main: HTMLElement,
  footer: HTMLElement
): void {
  headerEl = header;
  mainEl = main;
  footerEl = footer;
}

export function registerScreen(name: string, render: RenderFn): void {
  screens.set(name, render);
}

export function navigateTo(name: string): void {
  const render = screens.get(name);
  if (!render) throw new Error(`Unknown screen: ${name}`);
  headerEl.innerHTML = '';
  mainEl.innerHTML = '';
  footerEl.innerHTML = '';
  render(headerEl, mainEl, footerEl);
}
