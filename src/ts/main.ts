import { createGameBoard } from './ui/board';
import { createHeader } from './ui/header';
import {
  createModal,
  createWinContent,
  createLeaderboardContent,
} from './ui/modal';

function createApp() {
  const app = document.createElement('div');
  app.id = 'app';

  const header = createHeader();
  const gameBoard = createGameBoard();
  const modal = createModal();

  app.append(header, gameBoard);
  document.body.append(app, modal);
}

createApp();
