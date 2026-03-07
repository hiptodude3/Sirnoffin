import { getSettings } from '../state/settings-state.js';

interface BarOpts {
  label: string; cur: number; max: number; color: string;
}

function bar(o: BarOpts): string {
  const pct = o.max > 0 ? (o.cur / o.max) * 100 : 0;
  return `<div style="display:flex;align-items:center;gap:.4rem;margin:.15rem 0">`
    + `<span style="width:2rem;font-size:.85rem;color:#8888cc">${o.label}</span>`
    + `<div style="flex:1;height:.6rem;background:#1a1a2e;border-radius:.2rem;overflow:hidden">`
    + `<div style="width:${pct}%;height:100%;background:${o.color}"></div></div>`
    + `<span style="font-size:.8rem;width:5.5rem;text-align:right">`
    + `${o.cur}/${o.max}</span></div>`;
}

export function renderVitals(
  hp: number, mhp: number, mp: number, mmp: number,
  sp?: number, msp?: number
): string {
  if (!getSettings().visualBars) {
    let t = `HP ${hp}/${mhp} · MP ${mp}/${mmp}`;
    if (sp !== undefined) t += ` · SP ${sp}/${msp}`;
    return `<p>${t}</p>`;
  }
  let h = bar({ label: 'HP', cur: hp, max: mhp, color: '#44aa44' });
  h += bar({ label: 'MP', cur: mp, max: mmp, color: '#4466cc' });
  if (sp !== undefined && msp !== undefined) {
    h += bar({ label: 'SP', cur: sp, max: msp, color: '#cc9933' });
  }
  return h;
}
