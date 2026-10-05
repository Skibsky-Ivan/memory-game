import { createButton } from './button';

export interface Win {
  numberMoves: number;
}

interface LeaderboardResult {
  moves: number;
  date: string;
}

export function createModal() {
  const modalOverlay = document.createElement('div');
  modalOverlay.role = 'dialog';
  modalOverlay.classList.add('modal-overlay');
  modalOverlay.setAttribute('aria-modal', true);

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modalOverlay.append(modal);

  function closeModal() {
    modalOverlay.classList.remoce('is-active');
    document.documentElement.classList.remove('is-locked');
    modal.replaceChildren();
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('is-actice')) {
      closeModal();
    }
  });

  return modalOverlay;
}

// ---------- Win modal ---------------

export function createWinContent(data: Win) {
  const content = document.createDocumentFragment();

  const title = document.createElement('h2');
  title.classList.add('modal__title');
  title.id = 'modal__title';
  title.textContent = 'Победа!';

  const body = document.createElement('div');
  body.classList.add('modal__body');

  const line1 = document.createElement('p');
  line1.textContent = 'Вы успешно нашли все пары!';

  const line2 = document.createElement('p');
  const strong = document.createElement('strong');
  strong.textContent = String(data.numberMoves);
  line2.append('Итоговое количество ходов: ', strong);

  body.append(line1, line2);

  const actions = document.createElement('div');
  actions.classList.add('modal__actions');

  const btnNewGame = createButton('modal-btn-new-game', 'Новая игра');
  const btnClose = createButton('modal-btn-close', 'Закрыть');
  btnClose.classList.add('btn--secondary');
  actions.append(btnNewGame, btnClose);

  content.append(title, body, actions);
  return content;
}

// ---------- leaderboard modal ---------------

export function createLeaderboardContent(
  results: LeaderboardResult[]
): HTMLElement {
  const content = document.createDocumentFragment();

  const title = document.createElement('h2');
  title.classList.add('modal__title');
  title.textContent = 'Таблица лидеров';

  const body = document.createElement('div');
  body.classList.add('modal__body');

  if (results.length === 0) {
    const empty = document.createElement('p');
    empty.classList.add('leaderboard-empty');
    empty.textContent = 'Пока нет результатов';
    body.append(empty);
    return body;
  }

  const table = document.createElement('table');
  table.classList.add('leaderboard-table');

  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  ['Место', 'Ходы', 'Дата'].forEach((label) => {
    const th = document.createElement('th');
    th.textContent = label;
    headRow.append(th);
  });
  thead.append(headRow);

  const tbody = document.createElement('tbody');
  results.forEach((result, index) => {
    const row = document.createElement('tr');

    const place = document.createElement('td');
    place.textContent = String(index + 1);

    const moves = document.createElement('td');
    moves.textContent = String(result.moves);

    const date = document.createElement('td');
    date.textContent = result.date;

    row.append(place, moves, date);
    tbody.append(row);
  });

  table.append(thead, tbody);
  body.append(table);

  const actions = document.createElement('div');
  actions.classList.add('modal__actions');
  const btnClose = createButton('modal-btn-close', 'Закрыть');
  btnClose.classList.add('btn--secondary');
  actions.append(btnClose);

  content.append(title, body, actions);
  return content;
}
