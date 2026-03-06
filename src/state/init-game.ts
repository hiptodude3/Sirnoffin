import { GameState } from '../types/game-state.js';

export function initGameState(): GameState {
  return {
    screen: 'title',
    character: null,
    battleLog: [],
    turn: 0,
  };
}
