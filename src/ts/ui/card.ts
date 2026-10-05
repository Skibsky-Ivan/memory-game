export function createCard(typeCard: string, src: string): HTMLButtonElement {
  const card = document.createElement('button');
  card.classList.add('card');
  card.setAttribute('aria-label', 'Закрытая карточка');
  card.dataset.value = typeCard;

  const cardInner = document.createElement('div');
  cardInner.classList.add('card__inner');

  const cardFaceFront = document.createElement('div');
  cardFaceFront.classList.add('card__face', 'card__face--front');
  const cardFaceFrontSpan = document.createElement('span');
  cardFaceFrontSpan.textContent = '?';
  cardFaceFront.append(cardFaceFrontSpan);

  const cardFaceBack = document.createElement('div');
  cardFaceBack.classList.add('card__face', 'card__face--back');
  const cardFaceBackImg = document.createElement('img');
  cardFaceBackImg.classList.add('card__img');
  cardFaceBackImg.src = src;
  cardFaceBackImg.alt = '';
  cardFaceBack.append(cardFaceBackImg);

  cardInner.append(cardFaceFront, cardFaceBack);
  card.append(cardInner);

  return card;
}
