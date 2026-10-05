import { createButton } from './button';
import { TOTAL_PAIRS } from '../data/cards';

function createStatItem(
  label: string,
  strongId: string,
  initialValue: string
): HTMLDivElement {
  const item = document.createElement('div');
  item.classList.add('stat-item');

  const labelSpan = document.createElement('span');
  labelSpan.textContent = label;

  const value = document.createElement('strong');
  value.id = strongId;
  value.textContent = initialValue;

  item.append(labelSpan, value);
  return item;
}

export function createHeader(): HTMLElement {
  const header = document.createElement('header');
  header.classList.add('header');

  const controls = document.createElement('div');
  controls.classList.add('header__controls');

  const btnNewGame = createButton('btn-new-game', 'Новая игра');
  const btnLeaderboard = createButton('btn-leaderboard', 'Таблица лидеров');
  controls.append(btnNewGame, btnLeaderboard);

  const stats = document.createElement('div');
  stats.classList.add('header__stats');

  const movesStat = createStatItem('Ходы:', 'moves-count', '0');
  const pairsStat = createStatItem('Пары:', 'pairs-count', '0 из 8');
  stats.append(movesStat, pairsStat);

  header.append(controls, stats);
  return header;
}

export function updateCounters(moves: number, pairs?: number) {
  const counterMoves = document.querySelector('#moves-count');
  const counterPairs = document.querySelector('#pairs-count');

  if (counterMoves) counterMoves.textContent = String(moves);
  if (pairs !== undefined && counterPairs) {
    counterPairs.textContent = `${pairs} из ${TOTAL_PAIRS}`;
  }
}
