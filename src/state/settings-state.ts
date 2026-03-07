import { Settings, createSettings } from '../types/settings.js';

const settings: Settings = createSettings();

export function getSettings(): Settings { return settings; }
