export interface Settings {
  visualBars: boolean;
  coloredLog: boolean;
}

export function createSettings(): Settings {
  return { visualBars: false, coloredLog: false };
}
