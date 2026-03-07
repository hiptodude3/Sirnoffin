import { Character } from './character.js';

export type Screen =
  | 'title' | 'create' | 'town'
  | 'battle' | 'stats' | 'inventory' | 'settings';

export interface GameState {
  screen: Screen;
  character: Character | null;
  battleLog: string[];
  turn: number;
}
