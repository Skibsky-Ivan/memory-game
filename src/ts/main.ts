import { createHeader } from './ui/header';
import { createGameBoard } from './ui/board';
import {
  createModal,
  createWinContent,
  createLeaderboardContent,
} from './ui/modal';
import { initGame, gameLoop, startNewGame } from './game/game';
import { getTopResults } from './storage/leaderboard';

// ---------- Модалка ------- ----------
const { overlay: modalOverlay, modal: modalBox, closeModal } = createModal();

function openModal(content: Node): void {
  modalBox.replaceChildren(content);
  modalOverlay.classList.add('is-active');
  document.documentElement.classList.add('is-locked');
}

// ---------- Сборка страницы ----------
const app = document.createElement('div');
app.id = 'app';
app.addEventListener('click', gameLoop);

const header = createHeader();
let board = createGameBoard();
app.append(header, board);
document.body.append(app, modalOverlay);

// ---------- Перезапуск ---------------
function restartGame(): void {
  startNewGame();
  board.replaceWith((board = createGameBoard()));
  closeModal();
}

header.querySelector('#btn-new-game')?.addEventListener('click', restartGame);

// ---------- Таблица лидеров ----------
header.querySelector('#btn-leaderboard')?.addEventListener('click', () => {
  const content = createLeaderboardContent(getTopResults());
  content
    .querySelector('#modal-btn-close')
    ?.addEventListener('click', closeModal);
  openModal(content);
});

// ---------- Связка с game.ts ----------
initGame({
  onWin: (moves) => {
    const content = createWinContent({ numberMoves: moves });
    content
      .querySelector('#modal-btn-new-game')
      ?.addEventListener('click', restartGame);
    content
      .querySelector('#modal-btn-close')
      ?.addEventListener('click', closeModal);
    openModal(content);
  },
});
