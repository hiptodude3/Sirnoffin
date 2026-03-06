import { GameState } from './types/game-state.js';
import { initGameState } from './state/init-game.js';
import { createCharacter } from './state/create-character.js';
import { renderHeader } from './ui/render-header.js';
import { renderTitle } from './ui/render-title.js';
import { renderCreate } from './ui/render-create.js';
import { renderTown } from './ui/render-town.js';

const state: GameState = initGameState();

function navigate(screen: GameState['screen']): void {
  state.screen = screen;
  render();
}

function render(): void {
  renderHeader(state.character);

  switch (state.screen) {
    case 'title':
      return renderTitle(() => navigate('create'));
    case 'create':
      return renderCreate((name) => {
        state.character = createCharacter(name);
        navigate('town');
      });
    case 'town':
      if (!state.character) return navigate('title');
      return renderTown(
        state.character,
        () => navigate('battle'),
        () => navigate('stats'),
      );
  }
}

render();
