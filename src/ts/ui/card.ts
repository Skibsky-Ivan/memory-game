import { el } from './dom';

export function createCard(typeCard: string, src: string): HTMLButtonElement {
  const card = el(
    'button',
    {
      class: 'card',
      attrs: { 'aria-label': 'Закрытая карточка' },
      dataset: { value: typeCard },
    },
    [
      el('div', { class: 'card__inner' }, [
        el('div', { class: 'card__face card__face--front' }, [
          el('span', { text: '?' }),
        ]),
        el('div', { class: 'card__face card__face--back' }, [
          el('img', {
            class: 'card__img',
            attrs: {
              alt: '',
              src,
            },
          }),
        ]),
      ]),
    ]
  );

  return card;
}
