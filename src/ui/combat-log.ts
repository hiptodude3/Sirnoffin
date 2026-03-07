import { getSettings } from '../state/settings-state.js';

const RULES: [RegExp, string][] = [
  [/^⚡/, '#ffdd44'],
  [/Critical hit/, '#ffdd44'],
  [/Level \d/, '#bb66ff'],
  [/🎉/, '#bb66ff'],
  [/\+\d+\s*(XP|credits)/, '#55cc55'],
  [/You attack|You deal/, '#cc4444'],
  [/attacks.*damage|Only \d+ damage/, '#dd8833'],
  [/fled|Escape/, '#888888'],
  [/defeated!/, '#cc4444'],
  [/been defeated/, '#dd8833'],
];

export function formatLogLine(line: string): string {
  if (!getSettings().coloredLog) return `<p>${line}</p>`;
  for (const [re, color] of RULES) {
    if (re.test(line)) {
      return `<p style="color:${color}">${line}</p>`;
    }
  }
  return `<p>${line}</p>`;
}
