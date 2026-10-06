import { LeaderboardResult } from '../storage/leaderboard';
import { el } from './dom';

export interface Win {
  numberMoves: number;
}

export function createModal() {
  const modal = el('div', { class: 'modal' });
  const modalOverlay = el(
    'div',
    {
      class: 'modal-overlay',
      attrs: {
        role: 'dialog',
        'aria-modal': 'true',
      },
    },
    [modal]
  );

  function closeModal(): void {
    modalOverlay.classList.remove('is-active');
    document.documentElement.classList.remove('is-locked');
    modal.replaceChildren();
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('is-active')) {
      closeModal();
    }
  });

  return { overlay: modalOverlay, modal, closeModal };
}

// ---------- Win modal ---------------

export function createWinContent(data: Win): DocumentFragment {
  const content = document.createDocumentFragment();

  const title = el('h2', {
    id: 'modal__title',
    class: 'modal__title',
    text: 'Победа!',
  });

  const body = el('div', { class: 'modal__body' }, [
    el('p', { text: 'Вы успешно нашли все пары!' }),
    el('p', {}, [
      'Итоговое количество ходов: ',
      el('strong', { text: String(data.numberMoves) }),
    ]),
  ]);

  const actions = el('div', { class: 'modal__actions' }, [
    el('button', {
      id: 'modal-btn-new-game',
      class: 'btn',
      text: 'Новая игра',
    }),
    el('button', {
      id: 'modal-btn-close',
      class: 'btn btn--secondary',
      text: 'Закрыть',
    }),
  ]);

  content.append(title, body, actions);
  return content;
}

// ---------- leaderboard modal ---------------

export function createLeaderboardContent(
  results: LeaderboardResult[]
): DocumentFragment {
  const content = document.createDocumentFragment();

  const title = el('h2', { class: 'modal__title', text: 'Таблица лидеров' });
  const body = el('div', { class: 'modal__body' });
  const actions = el('div', { class: 'modal__actions' }, [
    el('button', {
      id: 'modal-btn-close',
      class: 'btn btn--secondary',
      text: 'Закрыть',
    }),
  ]);

  if (results.length === 0) {
    const empty = el('p', {
      class: 'leaderboard-empty',
      text: 'Пока нет результатов',
    });
    body.append(empty);
    content.append(title, body, actions);
    return content;
  }

  const headRow = el(
    'tr',
    {},
    ['Место', 'Ходы', 'Дата'].map((label) => el('th', { text: label }))
  );

  const tBody = el('tbody');
  results.forEach((result, index) => {
    const row = el('tr', {}, [
      el('td', { text: String(index + 1) }),
      el('td', { text: String(result.moves) }),
      el('td', { text: result.dateDisplay }),
    ]);
    tBody.append(row);
  });

  const table = el('table', { class: 'leaderboard-table' }, [headRow, tBody]);
  body.append(table);

  content.append(title, body, actions);
  return content;
}
