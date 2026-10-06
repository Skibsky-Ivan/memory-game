import { TOTAL_PAIRS } from '../data/cards';
import { el } from './dom';

let movesEl: HTMLElement;
let pairsEl: HTMLElement;

function createStatItem(
  label: string,
  strongId: string,
  initialValue: string
): { item: HTMLDivElement; value: HTMLElement } {
  const value = el('strong', { id: strongId, text: initialValue });

  const item = el('div', { class: 'stat-item' }, [
    el('span', { text: label }),
    value,
  ]);

  return { item, value };
}

export function createHeader(): HTMLElement {
  const moves = createStatItem('Ходы:', 'moves-count', '0');
  const pairs = createStatItem('Пары:', 'pairs-count', `0 из ${TOTAL_PAIRS}`);

  movesEl = moves.value;
  pairsEl = pairs.value;

  const header = el('header', { class: 'header' }, [
    el('div', { class: 'header__controls' }, [
      el('button', { id: 'btn-new-game', class: 'btn', text: 'Новая игра' }),
      el('button', {
        id: 'btn-leaderboard',
        class: 'btn',
        text: 'Таблица лидеров',
      }),
    ]),
    el('div', { class: 'header__stats' }, [moves.item, pairs.item]),
  ]);

  return header;
}

export function updateCounters(moves: number, pairs?: number) {
  movesEl.textContent = String(moves);
  if (pairs !== undefined) {
    pairsEl.textContent = `${pairs} из ${TOTAL_PAIRS}`;
  }
}
